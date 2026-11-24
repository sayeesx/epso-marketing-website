---
name: epso-technical-seo
description: Technical SEO guidelines, schema markup, Open Graph, sitemap, and robots.txt implementation for Epso FMCG website.
---

# Epso Technical SEO

## Core Requirements
- **Titles**: Unique `<title>` tag for every page following the pattern `{Page Title} | Epso`.
- **Meta Descriptions**: 120–160 characters describing the page accurately in simple Indian English.
- **Canonical URLs**: Every page includes a canonical URL pointing to `https://epso.in{path}`.
- **Heading Hierarchy**: Exactly one `<h1>` per page, followed by logical `<h2>` and `<h3>` tags.
- **Breadcrumbs**: Breadcrumb navigation with `BreadcrumbList` schema on all inner pages.

## Structured Data (JSON-LD)
Handled via `src/components/seo/StructuredData.astro` and `src/layouts/BaseLayout.astro`:
- `Organization`: Epso brand metadata.
- `WebSite`: SearchAction schema.
- `Product`: In `src/pages/products/[slug].astro` without fake reviews/pricing.
- `Article`: In `src/pages/blog/[slug].astro`.
- `BreadcrumbList`: In `src/components/seo/Breadcrumbs.astro`.

## Indexing & Sitemap
- `public/robots.txt` points to `https://epso.in/sitemap-index.xml` and blocks `/studio/`.
- `@astrojs/sitemap` auto-generates the XML sitemap on build.
- `noindex` applied to utility pages (e.g. `/privacy-policy/` and `/404`).

