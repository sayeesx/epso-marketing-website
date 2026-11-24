---
name: epso-cloudflare-deployment
description: Cloudflare Pages deployment configuration, environment variables, GitHub integration, and Sanity deploy hook triggers for Epso website.
---

# Epso Cloudflare Deployment

## Hosting & Architecture
- **Platform**: Cloudflare Pages (free tier, global edge CDN).
- **Framework Preset**: Astro.
- **Build Command**: `pnpm build`.
- **Output Directory**: `dist`.
- **Node.js Version**: 22.

## Automated Deployment Workflow
1. **GitHub Integration**: Pushes to `main` branch trigger Cloudflare Pages automatic builds.
2. **Sanity Deploy Hook**:
   - In Cloudflare Pages project settings, create a Deploy Hook (e.g., `sanity-publish`).
   - In Sanity project settings (`sanity.io/manage`), add a Webhook pointing to the Deploy Hook URL triggered on document `Publish`.
   - Content changes in Sanity automatically rebuild and publish the static website.

## Environment Variables
Configured in Cloudflare Pages Dashboard:
- `SANITY_PROJECT_ID`: Sanity project identifier.
- `SANITY_DATASET`: `production`.
- `SANITY_API_VERSION`: `2024-01-01`.
- `SITE_URL`: `https://epso.in`.

