# Image Guidelines

## Overview

Epso's brand assets are managed in `public/assets/`. Placeholder SVGs are used until official assets are provided. All product and category images are hosted on Sanity Image CDN.

## Asset directory structure

```
public/assets/
├── branding/
│   ├── logo-placeholder.svg     ← Replace with official Epso logo
│   ├── logo-dark-placeholder.svg ← Replace with logo variant for light backgrounds
│   └── favicon.svg              ← Replace with official favicon
├── products/
│   └── product-placeholder.svg  ← Used as fallback when product has no image
├── categories/
│   ├── food-placeholder.svg     ← Replace with food category image
│   └── home-care-placeholder.svg ← Replace with home care category image
└── banners/
    └── hero-placeholder.svg     ← Replace with main hero banner
```

## Required image dimensions

| Asset | Width | Height | Format | Notes |
|-------|-------|--------|--------|-------|
| Logo (light bg) | Min 200px wide | Auto | SVG preferred, PNG fallback | No border, transparent bg |
| Logo (dark bg) | Min 200px wide | Auto | SVG preferred | White version |
| Favicon | 32×32 | 32×32 | SVG or ICO | Simple mark only |
| Hero banner | 1440px | 600px | WebP/JPG | 24:10 ratio |
| Product (main) | 800px | 800px | WebP/JPG | 1:1 ratio, white/neutral bg |
| Product (thumb) | 400px | 400px | WebP/JPG | Used in cards |
| Category | 400px | 300px | WebP/JPG | 4:3 ratio |
| Blog post | 1200px | 630px | WebP/JPG | OG image ratio |

## Replacing placeholder images

### Logo

1. Place official logo in `public/assets/branding/`:
   - `logo.svg` (or `logo.png`)
   - `logo-dark.svg` (white version for dark backgrounds)
2. Update `src/components/navigation/Header.astro`:
   ```astro
   <img src="/assets/branding/logo.svg" alt="Epso" ... />
   ```
3. Update `src/components/navigation/Footer.astro` similarly.
4. Update `src/layouts/BaseLayout.astro` for structured data logo URL.

### Product and category images

Do not replace placeholder SVGs directly for products/categories.
Upload images to Sanity CMS instead:

1. Open Sanity Studio → Products or Categories
2. Upload the image in the Main Image field
3. Add descriptive alt text
4. Publish the document
5. The website rebuilds automatically (via webhook) and shows the real image

### Hero banner

Option A — Upload to Sanity (recommended):
1. Open Sanity Studio → Homepage content
2. Upload hero image
3. Publish

Option B — Static file:
1. Place image in `public/assets/banners/hero.webp`
2. Update `src/components/sections/Hero.astro` default `imageSrc`

## Sanity Image CDN usage

The `SanityImage` component automatically transforms images via Sanity's CDN:

```astro
<SanityImage
  image={product.mainImage}
  alt={product.name}
  width={400}
  height={400}
  loading="lazy"
  quality={80}
/>
```

This generates a URL like:
```
https://cdn.sanity.io/images/{projectId}/production/{assetId}-{dimensions}.webp?w=400&h=400&q=80&auto=format
```

## Image optimisation guidelines

| Setting | Value | Reason |
|---------|-------|--------|
| Quality | 75–85 | Good quality, smaller file |
| Format | auto (WebP/AVIF) | Modern format, smaller |
| Width | Match display size × 2 (for retina) | Sharp on all screens |
| Loading | `lazy` for below fold | Faster initial load |
| Loading | `eager` for above fold | No LCP delay |

## Alt text requirements

### Rules

- Always descriptive and specific.
- Describe what is in the image, not what it represents.
- Never: "image", "photo", "product", filename.
- Decorative images: `aria-hidden="true"` and no alt attribute.

### Examples

**Good alt text:**
- `Kerala mixture in a 250 g packet on a wooden surface`
- `Epso dishwashing liquid bottle, lemon scent`
- `Kerala snacks category — assorted chips and mixtures`

**Bad alt text:**
- `product`
- `epso-kerala-mixture-250g.jpg`
- `A premium artisanal product crafted with care`

## Formats to request from Epso

When requesting brand assets, ask for:

| Asset | Format | Minimum size |
|-------|--------|-------------|
| Logo | SVG (preferred), PNG with transparent bg | — |
| Logo (white) | SVG (preferred), PNG | — |
| Product photos | JPEG or WebP | 1600×1600 px |
| Category photos | JPEG or WebP | 1200×900 px |
| Hero banner | JPEG or WebP | 2880×1200 px |
| Favicon | SVG | — |

Do not accept:
- Low-resolution images (under 800px)
- Images with heavy compression artefacts
- Photos with text baked into them (use CSS overlay text)
- Images with watermarks

