export interface AdminEnv {
  SANITY_PROJECT_ID?: string;
  SANITY_DATASET?: string;
  SANITY_API_VERSION?: string;
  SANITY_API_TOKEN?: string;
}

interface SessionPayload {
  email: string;
  name: string;
  exp: number;
}

const COOKIE_NAME = 'epso_admin_session';

function json(data: unknown, status = 200, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      ...extraHeaders,
    },
  });
}

function getSanityConfig(env: AdminEnv) {
  return {
    projectId: env.SANITY_PROJECT_ID || 'scsgz7wt',
    dataset: env.SANITY_DATASET || 'production',
    apiVersion: env.SANITY_API_VERSION || '2024-01-01',
    token: env.SANITY_API_TOKEN || '',
  };
}

async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function toBase64Url(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) {
    bin += String.fromCharCode(bytes[i]);
  }
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(b64url: string): string {
  const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    bytes[i] = bin.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

async function signSession(payload: SessionPayload, secret: string): Promise<string> {
  const body = toBase64Url(JSON.stringify(payload));
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sigBuf = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body));
  const sig = Array.from(new Uint8Array(sigBuf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return `${body}.${sig}`;
}

async function verifySession(cookieHeader: string | null, secret: string): Promise<SessionPayload | null> {
  if (!cookieHeader || !secret) return null;
  const match = cookieHeader
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;

  const token = match.slice(COOKIE_NAME.length + 1);
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [body, sigHex] = parts;
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const expectedBuf = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body));
  const expectedHex = Array.from(new Uint8Array(expectedBuf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  if (expectedHex.length !== sigHex.length) return null;
  let diff = 0;
  for (let i = 0; i < expectedHex.length; i++) {
    diff |= expectedHex.charCodeAt(i) ^ sigHex.charCodeAt(i);
  }
  if (diff !== 0) return null;

  try {
    const parsed = JSON.parse(fromBase64Url(body)) as SessionPayload;
    if (!parsed.exp || Date.now() > parsed.exp) return null;
    return parsed;
  } catch {
    return null;
  }
}

async function sanityFetch(
  cfg: ReturnType<typeof getSanityConfig>,
  query: string,
  params: Record<string, string> = {}
) {
  const url = new URL(`https://${cfg.projectId}.api.sanity.io/v${cfg.apiVersion}/data/query/${cfg.dataset}`);
  url.searchParams.set('query', query);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(`$${k}`, JSON.stringify(v));
  }
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${cfg.token}` },
  });
  if (!res.ok) {
    throw new Error(`Sanity query failed (${res.status}): ${await res.text()}`);
  }
  const data = (await res.json()) as { result: unknown };
  return data.result;
}

async function sanityMutate(cfg: ReturnType<typeof getSanityConfig>, mutations: unknown[]) {
  const res = await fetch(
    `https://${cfg.projectId}.api.sanity.io/v${cfg.apiVersion}/data/mutate/${cfg.dataset}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cfg.token}`,
      },
      body: JSON.stringify({ mutations }),
    }
  );
  if (!res.ok) {
    throw new Error(`Sanity mutation failed (${res.status}): ${await res.text()}`);
  }
  return res.json();
}

export async function handleAdminRequest(request: Request, env: AdminEnv): Promise<Response> {
  const cfg = getSanityConfig(env);
  if (!cfg.token) {
    return json({ error: 'Server is missing SANITY_API_TOKEN environment variable.' }, 500);
  }

  const url = new URL(request.url);
  const action = url.searchParams.get('action') || '';
  const isHttps = url.protocol === 'https:';
  const cookieFlags = `Path=/; HttpOnly; SameSite=Lax${isHttps ? '; Secure' : ''}`;

  try {
    // ── Session check ──────────────────────────────────────────────────────
    if (request.method === 'GET' && action === 'session') {
      const session = await verifySession(request.headers.get('cookie'), cfg.token);
      if (!session) return json({ authenticated: false }, 401);
      return json({ authenticated: true, email: session.email, name: session.name });
    }

    // ── Login against Sanity adminUser ─────────────────────────────────────
    if (request.method === 'POST' && action === 'login') {
      const body = (await request.json()) as { email?: string; password?: string };
      const email = (body.email || '').trim();
      const password = body.password || '';
      if (!email || !password) {
        return json({ error: 'Email and password are required.' }, 400);
      }

      const user = (await sanityFetch(
        cfg,
        `*[_type == "adminUser" && (lower(email) == lower($email) || (lower($email) == "test@epso.in" && lower(email) == "test")) && isActive != false][0]{ _id, email, name, passwordHash, password }`,
        { email }
      )) as { _id: string; email: string; name?: string; passwordHash?: string; password?: string } | null;

      if (!user) {
        return json({ error: 'Invalid email or password.' }, 401);
      }

      const inputHash = await sha256Hex(password);
      const valid =
        (user.passwordHash && user.passwordHash.toLowerCase() === inputHash) ||
        (user.password && user.password === password);

      if (!valid) {
        return json({ error: 'Invalid email or password.' }, 401);
      }

      const sessionToken = await signSession(
        {
          email: user.email,
          name: user.name || 'Admin',
          exp: Date.now() + 24 * 60 * 60 * 1000,
        },
        cfg.token
      );

      return json(
        { authenticated: true, email: user.email, name: user.name || 'Admin' },
        200,
        { 'Set-Cookie': `${COOKIE_NAME}=${sessionToken}; Max-Age=86400; ${cookieFlags}` }
      );
    }

    // ── Logout ─────────────────────────────────────────────────────────────
    if (request.method === 'POST' && action === 'logout') {
      return json(
        { ok: true },
        200,
        { 'Set-Cookie': `${COOKIE_NAME}=; Max-Age=0; ${cookieFlags}` }
      );
    }

    // ── Protected admin routes ─────────────────────────────────────────────
    const session = await verifySession(request.headers.get('cookie'), cfg.token);
    if (!session) {
      return json({ error: 'Unauthorized. Please sign in.' }, 401);
    }

    if (request.method === 'GET' && action === 'data') {
      const [categories, products] = await Promise.all([
        sanityFetch(cfg, `*[_type == "category"] | order(name asc) { _id, name, "slug": slug.current }`),
        sanityFetch(
          cfg,
          `*[_type == "product"] | order(_createdAt desc) {
            _id,
            name,
            slug,
            isPublished,
            isFeatured,
            "category": category->{ _id, name },
            mainImage,
            "imageUrl": mainImage.asset->url,
            shortDescription,
            description,
            packagingSizes,
            features,
            ingredients,
            usageInstructions
          }`
        ),
      ]);
      return json({ categories: categories || [], products: products || [] });
    }

    if (request.method === 'POST' && action === 'upload') {
      const formData = await request.formData();
      const file = formData.get('file');
      if (!file || !(file instanceof File)) {
        return json({ error: 'No image file provided.' }, 400);
      }

      const uploadUrl = new URL(
        `https://${cfg.projectId}.api.sanity.io/v${cfg.apiVersion}/assets/images/${cfg.dataset}`
      );
      uploadUrl.searchParams.set('filename', file.name || 'product.webp');

      const res = await fetch(uploadUrl.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': file.type || 'application/octet-stream',
          Authorization: `Bearer ${cfg.token}`,
        },
        body: await file.arrayBuffer(),
      });

      if (!res.ok) {
        return json({ error: `Image upload failed (${res.status}): ${await res.text()}` }, 500);
      }

      const uploaded = (await res.json()) as { document?: { _id: string; url?: string } };
      return json({
        assetId: uploaded.document?._id,
        url: uploaded.document?.url,
      });
    }

    if (request.method === 'POST' && action === 'saveProduct') {
      const body = (await request.json()) as {
        editingId?: string;
        payload?: Record<string, unknown>;
      };
      if (!body.payload) return json({ error: 'Missing product payload.' }, 400);

      if (body.editingId) {
        await sanityMutate(cfg, [{ patch: { id: body.editingId, set: body.payload } }]);
      } else {
        await sanityMutate(cfg, [{ create: { _type: 'product', ...body.payload } }]);
      }
      return json({ ok: true });
    }

    if (request.method === 'POST' && action === 'togglePublish') {
      const body = (await request.json()) as { id?: string; isPublished?: boolean };
      if (!body.id) return json({ error: 'Missing product ID.' }, 400);
      await sanityMutate(cfg, [{ patch: { id: body.id, set: { isPublished: Boolean(body.isPublished) } } }]);
      return json({ ok: true });
    }

    if (request.method === 'POST' && action === 'deleteProduct') {
      const body = (await request.json()) as { id?: string };
      if (!body.id) return json({ error: 'Missing product ID.' }, 400);
      await sanityMutate(cfg, [{ delete: { id: body.id } }]);
      return json({ ok: true });
    }

    if (request.method === 'POST' && action === 'ensureCategories') {
      const existing = (await sanityFetch(
        cfg,
        `*[_type == "category"] { _id, name, "slug": slug.current }`
      )) as Array<{ name: string; slug?: string }>;

      const hasFood = existing.some((c) => c.slug === 'food' || c.name.toLowerCase().includes('food'));
      const hasHome = existing.some((c) => c.slug === 'home-care' || c.name.toLowerCase().includes('home'));
      const mutations: unknown[] = [];

      if (!hasFood) {
        mutations.push({
          create: {
            _type: 'category',
            name: 'Food Products',
            slug: { _type: 'slug', current: 'food' },
            description: 'Kerala mixtures, snacks, biscuits and more.',
            displayOrder: 1,
          },
        });
      }
      if (!hasHome) {
        mutations.push({
          create: {
            _type: 'category',
            name: 'Home Care',
            slug: { _type: 'slug', current: 'home-care' },
            description: 'Dishwashing, floor cleaners and household cleaning products.',
            displayOrder: 2,
          },
        });
      }

      if (mutations.length > 0) {
        await sanityMutate(cfg, mutations);
      }
      return json({ ok: true, created: mutations.length });
    }

    return json({ error: 'Unknown action.' }, 404);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Server error';
    return json({ error: message }, 500);
  }
}

