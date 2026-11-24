# Architecture

## Overview

The Epso marketing website is a static site (SSG) built with Astro. All pages are pre-rendered at build time. No server-side rendering. No backend API.

```
Build time:  Astro fetches content from Sanity via GROQ
             → generates static HTML pages
             → outputs to dist/

Runtime:     Cloudflare Pages serves pre-built HTML files
             → no database queries at page load
             → no server processes
```

## Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Frontend framework | Astro | Zero-JS by default, SSG, TypeScript |
| Styling | Tailwind CSS | Utility-first, no runtime CSS |
| CMS | Sanity v3 | GROQ, image CDN, free tier |
| Image CDN | Sanity Image API | Automatic transforms, free |
| Hosting | Cloudflare Pages | Free tier, global CDN, fast |
| Deployment | GitHub integration | Automatic builds on push |

## Directory structure

```
src/
├── components/
│   ├── navigation/
│   │   ├── Header.astro       # Sticky header + mobile menu
│   │   └── Footer.astro       # Footer with link columns
│   ├── sections/
│   │   ├── Hero.astro         # Homepage hero section
│   │   ├── FeaturedCategories.astro
│   │   ├── FeaturedProducts.astro
│   │   ├── WhyEpso.astro      # Trust signals section
│   │   └── ContactCta.astro   # Contact call-to-action
│   ├── ui/
│   │   ├── ProductCard.astro  # Reusable product card
│   │   ├── CategoryCard.astro # Reusable category card
│   │   ├── SanityImage.astro  # Sanity image with CDN + fallback
│   │   └── PlaceholderImage.astro
│   ├── catalogue/
│   │   └── ProductGrid.astro  # Product grid with empty state
│   └── seo/
│       ├── SEO.astro          # Meta tags, OG, Twitter card
│       ├── StructuredData.astro # JSON-LD injection
│       └── Breadcrumbs.astro  # Breadcrumb nav + JSON-LD
├── layouts/
│   └── BaseLayout.astro       # HTML shell, header, footer, SEO
├── lib/
│   ├── sanity.ts              # Client + image URL builder
│   └── queries.ts             # All GROQ queries
├── pages/
│   ├── index.astro            # Homepage
│   ├── about.astro
│   ├── contact.astro
│   ├── quality.astro
│   ├── privacy-policy.astro
│   ├── 404.astro
│   ├── products/
│   │   ├── index.astro        # Products catalogue
│   │   └── [slug].astro       # Individual product pages (SSG)
│   ├── category/
│   │   ├── index.astro        # Category listing
│   │   └── [slug].astro       # Category pages (SSG, nested support)
│   └── blog/
│       ├── index.astro        # Blog listing
│       └── [slug].astro       # Blog post pages (SSG)
├── styles/
│   └── global.css             # Tailwind layers + component classes
└── types/
    └── index.ts               # All TypeScript interfaces
```

## Data flow

```
Sanity CMS (Content editor publishes)
    ↓ Webhook (HTTP POST to Cloudflare deploy hook)
Cloudflare Pages (triggers build)
    ↓ pnpm build
Astro build (fetches via GROQ at build time)
    ↓ sanityClient.fetch(query)
Sanity API (returns JSON)
    ↓ Astro renders HTML
dist/ (static HTML + assets)
    ↓ Cloudflare Pages CDN
User browser (receives pre-built HTML)
```

## Sanity schema hierarchy

```
siteSettings (singleton)
homepageContent (singleton)
category (tree structure — parent reference)
  └── children (reverse reference in GROQ)
product
  └── category (reference)
blogPost
```

## Category URL structure

Categories use a flat slug URL scheme. The hierarchy is maintained via Sanity's `parent` reference, not nested URL paths. This avoids URL conflicts when categories are reorganised.

```
/category/food/
/category/mixtures/      ← child of food, but flat URL
/category/home-care/
/category/dishwashing/   ← child of home-care, but flat URL
```

## Image strategy

- All product and category images hosted on Sanity Image CDN.
- `SanityImage.astro` transforms images via Sanity's URL API (width, height, format, quality).
- Placeholder SVGs in `public/assets/` for pre-asset-delivery period.
- Above-the-fold images: `loading="eager" fetchpriority="high"`.
- All other images: `loading="lazy"` (browser default).

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `SANITY_PROJECT_ID` | Yes | Sanity project ID |
| `SANITY_DATASET` | Yes | Usually `production` |
| `SANITY_API_VERSION` | Yes | e.g. `2024-01-01` |
| `SITE_URL` | Yes | Production URL for canonical + sitemap |
| `SANITY_API_TOKEN` | No | Only for draft preview (never expose) |
| `ENQUIRY_WHATSAPP` | No | WhatsApp number for enquiries |
| `ENQUIRY_EMAIL` | No | Email for enquiries |

## Build output

Astro outputs to `dist/` in directory format:

```
dist/
├── index.html
├── products/
│   ├── index.html
│   └── [product-slug]/
│       └── index.html
├── category/
│   ├── index.html
│   └── [category-slug]/
│       └── index.html
├── blog/
│   ├── index.html
│   └── [post-slug]/
│       └── index.html
├── sitemap-index.xml
├── sitemap-0.xml
├── robots.txt
└── assets/
    └── branding/, products/, categories/, banners/
```

