---
name: epso-astro-development
description: Standards, coding conventions, and architectural rules for developing Astro components and SSG pages in the Epso marketing website.
---

# Epso Astro Development

## Architecture Rules
1. **Static Site Generation (SSG)**: All pages are pre-rendered at build time. No SSR.
2. **Minimal JavaScript**: Astro components (`.astro`) by default emit zero client JavaScript.
3. **No External Frameworks**: Strictly no Next.js, React SPA frameworks, WordPress, Shopify, WooCommerce, or Supabase.
4. **Import Path Aliases**: Always use configured aliases:
   - `@components/*` -> `src/components/*`
   - `@layouts/*` -> `src/layouts/*`
   - `@lib/*` -> `src/lib/*`
   - `@types/*` -> `src/types/*`
5. **TypeScript Strict Mode**: Shared interfaces in `src/types/index.ts`. All component props declared via `interface Props { ... }` in frontmatter.

## Reusable Components
- `src/components/navigation/Header.astro`: Sticky header with responsive mobile menu.
- `src/components/navigation/Footer.astro`: Semantic footer with category links and brand information.
- `src/components/ui/ProductCard.astro`: Reusable product card with image and details link.
- `src/components/ui/CategoryCard.astro`: Category card with image and description.
- `src/components/ui/SanityImage.astro`: Image loader using Sanity Image CDN with fallback.
- `src/components/catalogue/ProductGrid.astro`: Responsive grid with empty state handling.
- `src/components/seo/SEO.astro` & `Breadcrumbs.astro`: Complete SEO & JSON-LD handling.
