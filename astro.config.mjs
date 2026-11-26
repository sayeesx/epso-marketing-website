import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import fs from 'fs';
import path from 'path';

function readLocalEnv() {
  const env = { ...process.env };
  const envPath = path.resolve('.env');
  if (!fs.existsSync(envPath)) return env;
  for (const line of fs.readFileSync(envPath, 'utf-8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^(['"])(.*)\1$/, '$2');
    if (key && !(key in env)) env[key] = val;
  }
  return env;
}

export default defineConfig({
  site: 'https://epso.in',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) =>
        !page.includes('/studio') &&
        !page.includes('/admin') &&
        !page.includes('/privacy-policy') &&
        !page.includes('/404'),
      serialize(item) {
        const url = item.url;
        if (url === 'https://epso.in/' || url === 'https://epso.in') {
          return { ...item, changefreq: 'weekly', priority: 1.0, lastmod: new Date().toISOString() };
        }
        if (url.includes('/products/') || url.includes('/blog/')) {
          return { ...item, changefreq: 'weekly', priority: 0.9, lastmod: new Date().toISOString() };
        }
        if (url.includes('/about/') || url.includes('/quality/') || url.includes('/contact/')) {
          return { ...item, changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() };
        }
        return { ...item, changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() };
      },
    }),
  ],
  output: 'static',
  build: {
    format: 'directory',
    assets: '_assets',
  },
  vite: {
    plugins: [
      {
        name: 'epso-local-admin-api',
        configureServer(server) {
          const env = readLocalEnv();
          server.middlewares.use('/api/admin', async (req, res, next) => {
            try {
              const { handleAdminRequest } = await server.ssrLoadModule('/src/lib/adminServer.ts');
              const url = `http://${req.headers.host || 'localhost'}${req.originalUrl || '/api/admin'}`;
              const chunks = [];
              for await (const chunk of req) {
                chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
              }
              const bodyBuffer = chunks.length > 0 ? Buffer.concat(chunks) : undefined;
              const headers = new Headers();
              for (const [k, v] of Object.entries(req.headers)) {
                if (typeof v === 'string') headers.set(k, v);
              }
              const webReq = new Request(url, {
                method: req.method || 'GET',
                headers,
                body: req.method === 'GET' || req.method === 'HEAD' ? undefined : bodyBuffer,
              });
              const webRes = await handleAdminRequest(webReq, env);
              res.statusCode = webRes.status;
              webRes.headers.forEach((value, key) => res.setHeader(key, value));
              const out = Buffer.from(await webRes.arrayBuffer());
              res.end(out);
            } catch (err) {
              next(err);
            }
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@components': path.resolve('./src/components'),
        '@layouts': path.resolve('./src/layouts'),
        '@lib': path.resolve('./src/lib'),
        '@types': path.resolve('./src/types'),
      },
    },
    optimizeDeps: {
      include: ['@sanity/client', '@sanity/image-url'],
    },
  },
});
