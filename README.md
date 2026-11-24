# Epso Marketing Website

A production FMCG marketing website for **Epso** — an Indian brand making everyday food and home care products.

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Astro (SSG) + TypeScript |
| Styling | Tailwind CSS |
| CMS | Sanity Studio v3 |
| Content API | Sanity GROQ + Image CDN |
| Hosting | Cloudflare Pages |
| Deployment | GitHub → Cloudflare Pages |
| Package manager | pnpm |

## Quick start

### Prerequisites
- Node.js 18+
- pnpm 8+
- Git

### Setup

```powershell
git clone <repository-url>
cd epso-marketing-website
pnpm install
cp .env.example .env
# Edit .env — add your SANITY_PROJECT_ID
pnpm dev
```

### Sanity Studio

```powershell
cd sanity
cp .env.example .env
# Edit sanity/.env — add SANITY_STUDIO_PROJECT_ID
pnpm install
pnpm dev
```

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Dev server at localhost:4321 |
| `pnpm build` | Production build to `dist/` |
| `pnpm preview` | Preview production build |
| `pnpm run type-check` | TypeScript check |

## Cloudflare Pages settings

| Setting | Value |
|---------|-------|
| Build command | `pnpm build` |
| Build output directory | `dist` |
| Node.js version | 22 |

## Documentation

- [AGENTS.md](./AGENTS.md) — Agent and developer instructions
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) — System architecture
- [docs/DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md) — Design tokens and components
- [docs/SEO_GUIDELINES.md](./docs/SEO_GUIDELINES.md) — SEO implementation
- [docs/CONTENT_GUIDELINES.md](./docs/CONTENT_GUIDELINES.md) — Content writing guide
- [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) — Deployment instructions
- [docs/IMAGE_GUIDELINES.md](./docs/IMAGE_GUIDELINES.md) — Image requirements
- [docs/PROJECT_STATUS.md](./docs/PROJECT_STATUS.md) — Current status and next steps
