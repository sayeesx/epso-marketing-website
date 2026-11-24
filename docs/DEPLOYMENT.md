# Deployment Guide

## Overview

The Epso website is deployed on **Cloudflare Pages** with automatic builds triggered by GitHub pushes and Sanity content publishes.

Both Cloudflare Pages and Sanity have fully usable free tiers with no credit card required for initial setup.

---

## Step 1: Sanity project setup

### 1.1 Create a Sanity account
1. Go to [sanity.io](https://sanity.io)
2. Sign up — no credit card required for the free tier
3. Create a new project: name it **Epso CMS**
4. Dataset: `production`
5. Copy the **Project ID** from the project dashboard

### 1.2 Configure environment variables

In the Astro project root (`.env`):
```
SANITY_PROJECT_ID=your_project_id_here
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
SITE_URL=https://epso.in
```

In the Sanity Studio directory (`sanity/.env`):
```
SANITY_STUDIO_PROJECT_ID=your_project_id_here
SANITY_STUDIO_DATASET=production
```

### 1.3 Deploy Sanity Studio
```powershell
cd sanity
pnpm install
pnpm run deploy
```

This deploys the Studio to `https://your-project.sanity.studio`.

---

## Step 2: GitHub repository setup

1. Create a new GitHub repository
2. Push the project:
   ```powershell
   cd "c:/path/to/epso-marketing-website"
   git init
   git add .
   git commit -m "feat: initial Epso website build"
   git remote add origin https://github.com/your-org/epso-marketing-website.git
   git push -u origin main
   ```

3. Add repository secrets in GitHub Settings → Secrets and variables → Actions:
   - `SANITY_PROJECT_ID` — your Sanity project ID

---

## Step 3: Cloudflare Pages setup

1. Go to [cloudflare.com](https://cloudflare.com) — sign up free, no credit card required
2. Navigate to **Pages** → **Create a project**
3. Connect your GitHub account and select the `epso-marketing-website` repository
4. Configure build settings:

| Setting | Value |
|---------|-------|
| Framework preset | Astro |
| Build command | `pnpm build` |
| Build output directory | `dist` |
| Root directory | `/` (project root) |
| Node.js version | `22` |

5. Add environment variables in Cloudflare Pages → Settings → Environment variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `SANITY_PROJECT_ID` | your project ID | Production + Preview |
| `SANITY_DATASET` | `production` | Production + Preview |
| `SANITY_API_VERSION` | `2024-01-01` | Production + Preview |
| `SITE_URL` | `https://epso.in` | Production only |
| `SITE_URL` | (auto) | Preview |

6. Click **Save and Deploy**

---

## Step 4: Sanity webhook (auto-rebuild on content publish)

This triggers a Cloudflare Pages rebuild whenever content is published in Sanity.

### 4.1 Get the Cloudflare deploy hook URL

1. Go to Cloudflare Pages → your project → **Settings** → **Builds & deployments**
2. Scroll to **Deploy hooks**
3. Create a new deploy hook named `sanity-publish`
4. Copy the generated URL (it looks like `https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/...`)

### 4.2 Add webhook in Sanity

1. Go to [sanity.io/manage](https://sanity.io/manage) → your project → **API** → **Webhooks**
2. Create new webhook:
   - **Name:** Cloudflare Pages Deploy
   - **URL:** paste the Cloudflare deploy hook URL
   - **Dataset:** `production`
   - **Trigger on:** Publish
   - **Enable webhook:** Yes
3. Save

Now every time a product, category, or blog post is published in Sanity, Cloudflare Pages will automatically rebuild and redeploy the website (usually within 2–3 minutes).

---

## Step 5: Custom domain

1. Go to Cloudflare Pages → your project → **Custom domains**
2. Add domain: `epso.in`
3. Follow Cloudflare's DNS setup instructions
4. Update `SITE_URL` in Cloudflare Pages environment variables to `https://epso.in`
5. Trigger a new deployment to apply the updated URL

---

## Environment variables reference

| Variable | Required | Description |
|----------|----------|-------------|
| `SANITY_PROJECT_ID` | ✅ | Sanity project ID from sanity.io/manage |
| `SANITY_DATASET` | ✅ | Usually `production` |
| `SANITY_API_VERSION` | ✅ | e.g. `2024-01-01` |
| `SITE_URL` | ✅ | Full URL: `https://epso.in` |
| `SANITY_API_TOKEN` | ❌ | Only for draft preview. Never in public build. |

---

## Build output verification

After deployment, check:
- `https://epso.in/` — homepage loads
- `https://epso.in/sitemap-index.xml` — sitemap accessible
- `https://epso.in/robots.txt` — robots.txt accessible
- `https://epso.in/404` — 404 page works

---

## Rollback

If a deployment causes issues:
1. Go to Cloudflare Pages → your project → **Deployments**
2. Find the last working deployment
3. Click the three-dot menu → **Rollback to this deployment**

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails: `SANITY_PROJECT_ID` missing | Add env variable in Cloudflare Pages dashboard |
| Sanity fetch returns empty | Publish content in Sanity Studio first |
| Sitemap not updating | Wait for next deploy or trigger manual rebuild |
| Images not loading | Check Sanity project ID is correct and content is published |

