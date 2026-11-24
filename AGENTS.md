# Epso Marketing Website — Agent Instructions

## Project overview

Epso is an Indian FMCG brand making food and home care products.
This is a production marketing and product catalogue website — not a demo, not a template.

**Stack:** Astro (SSG) + TypeScript + Tailwind CSS + Sanity CMS + Cloudflare Pages

## Critical rules

1. **Never** introduce Next.js, WordPress, Shopify, Supabase, Firebase, or WooCommerce.
2. **Never** add paid services or libraries requiring credit card sign-up.
3. **Never** hardcode business information not confirmed by Epso (addresses, phone numbers, certifications).
4. **PowerShell environment** — use semicolons (`;`) as command separators, not `&&`.
5. **Never commit `.env`** — only commit `.env.example`.
6. All pages must be statically generated (SSG). No SSR unless a genuine requirement arises.
7. No client-side data fetching from Sanity. All content fetched at build time.
8. Minimal JavaScript — Astro islands (`client:*` directives) only when strictly necessary.
9. Mobile-first design. Test all layouts at 320px, 375px, 390px, and desktop.
10. One `h1` per page. Correct heading hierarchy: h1 → h2 → h3.

## Directory structure

```
epso-marketing-website/
├── src/
│   ├── components/
│   │   ├── navigation/   # Header.astro, Footer.astro
│   │   ├── sections/     # Hero, FeaturedCategories, FeaturedProducts, WhyEpso, ContactCta
│   │   ├── ui/           # ProductCard, CategoryCard, SanityImage, PlaceholderImage
│   │   ├── catalogue/    # ProductGrid
│   │   └── seo/          # SEO.astro, StructuredData.astro, Breadcrumbs.astro
│   ├── layouts/          # BaseLayout.astro
│   ├── lib/
│   │   ├── sanity.ts     # Sanity client + image URL builder
│   │   └── queries.ts    # All GROQ queries
│   ├── pages/            # All Astro pages (SSG)
│   ├── styles/           # global.css (Tailwind layers)
│   └── types/            # index.ts (all TypeScript interfaces)
├── public/
│   └── assets/
│       ├── branding/     # logo-placeholder.svg, favicon.svg
│       ├── products/     # product-placeholder.svg
│       ├── categories/   # category placeholder SVGs
│       └── banners/      # hero-placeholder.svg
├── sanity/               # Sanity Studio (separate pnpm workspace)
│   ├── schemas/          # product, category, blogPost, homepageContent, siteSettings
│   └── sanity.config.ts
├── docs/                 # All project documentation
├── .github/workflows/    # CI/CD (GitHub Actions)
└── [config files]        # astro.config.mjs, tailwind.config.mjs, tsconfig.json
```

## Import path aliases

Always use path aliases — never relative paths for cross-directory imports:

```typescript
import X from '@components/ui/ProductCard.astro';
import X from '@layouts/BaseLayout.astro';
import X from '@lib/sanity';
import X from '@lib/queries';
import type { Product } from '@types/index';
```

> Exception: Within `src/lib/` and `src/types/`, relative imports (`../types/index`) are acceptable.

## Tailwind CSS conventions

Use the component classes defined in `src/styles/global.css`:

| Class | Use |
|-------|-----|
| `.container-site` | Page width wrapper |
| `.section-pad` | Standard section vertical padding |
| `.btn-primary` | Primary call-to-action button |
| `.btn-secondary` | Secondary / outline button |
| `.btn-accent` | Accent / highlight button |
| `.card` | Product/category card wrapper |
| `.placeholder-image` | Image placeholder block |
| `.nav-link` | Navigation anchor style |
| `.breadcrumb-item` | Breadcrumb anchor style |

## SEO requirements

Every page must have:
- Unique title: `{Page Title} | Epso`
- Unique meta description (120–160 chars)
- `<link rel="canonical">` matching the page URL
- Exactly one `h1` per page
- JSON-LD structured data where applicable
- Descriptive `alt` text on all images
- Breadcrumb navigation on all pages except homepage

## Image handling rules

1. **SanityImage component** — for all Sanity-sourced images. Always pass `width`, `height`, `alt`.
2. **PlaceholderImage component** — for structurally required images with no source.
3. Hero images: `loading="eager" fetchpriority="high"`.
4. All other images: `loading="lazy"`.
5. Never use a bare `<img>` tag with a Sanity asset URL.
6. Placeholder SVGs live in `public/assets/`.

## Sanity content rules

- All content fetched at build time via GROQ in `src/lib/queries.ts`.
- All Sanity fetches must be wrapped in `try/catch`.
- Never call Sanity from the browser.
- Never expose `SANITY_API_TOKEN` in public build output.
- Slug fields: always project as `"slug": slug.current` in GROQ.

## TypeScript conventions

- Strict mode is on.
- All shared interfaces in `src/types/index.ts`.
- Astro component props: `interface Props { ... }` in frontmatter.
- No duplicated type definitions.

## Performance rules

- Zero unnecessary npm packages.
- CSS interactions preferred over JavaScript.
- No large icon libraries. Use inline SVG.
- Tailwind CSS only.
- Minimal Astro `client:*` directives.

## Security rules

- Never commit `.env` files.
- All credentials via environment variables.
- Never expose `SANITY_API_TOKEN` in frontend code.

## Adding dependencies

Before adding any npm package:
1. Is there a native Astro/Tailwind/browser approach?
2. Is the package actively maintained?
3. Does it have a free, credit-card-free usage tier?
4. Document the reason in a code comment.

## Prohibited technologies

- Next.js, Nuxt, Remix, SvelteKit
- WordPress, Shopify, WooCommerce
- Firebase, Supabase
- Cloudinary (use Sanity Image CDN)
- Shopping cart, checkout, or payment functionality
- Paid UI libraries

## Testing expectations

Before marking any task complete:
- Run `pnpm run type-check` — zero TypeScript errors
- Run `pnpm run build` — successful production build
- Do not claim tests passed without running them

## Content writing rules

- Simple Indian English. Short sentences. No jargon.
- Never claim: 100% natural, chemical-free, No. 1 brand — without evidence.
- Placeholder text must be clearly marked: `[To be updated]`.
- Do not invent company addresses, phone numbers, certifications.
