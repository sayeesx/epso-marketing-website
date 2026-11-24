---
name: epso-sanity-content
description: Sanity CMS schemas, GROQ queries, structured content modeling, and studio configuration for Epso FMCG website.
---

# Epso Sanity Content Guide

## CMS Structure
The Sanity Studio lives in the `/sanity` directory and is configured for non-technical staff:
- **Products** (`sanity/schemas/product.ts`): Name, slug, category reference, images, packaging sizes, features, ingredients, usage instructions, featured/publish flags, SEO metadata.
- **Categories** (`sanity/schemas/category.ts`): Name, slug, parent category reference (supports unlimited nesting), image, display order, SEO metadata.
- **Homepage Content** (`sanity/schemas/homepageContent.ts`): Hero banner, brand intro, featured categories and products.
- **Blog Posts** (`sanity/schemas/blogPost.ts`): Articles, excerpts, published date, Portable Text body.
- **Site Settings** (`sanity/schemas/siteSettings.ts`): Brand name, logo, contact details, social links.

## Content Fetching Rules
- All GROQ queries live centrally in `src/lib/queries.ts`.
- Content is fetched strictly during build time (`astro build`), never from the browser.
- All fetches are wrapped in `try/catch` with graceful fallback placeholders when Sanity credentials are not yet configured.
- Slugs are always projected as `"slug": slug.current`.
- Never expose private Sanity write tokens in public frontend builds.

