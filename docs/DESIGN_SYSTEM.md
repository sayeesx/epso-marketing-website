# Design System

## Status

🟡 **Temporary neutral palette** — awaiting official Epso logo and packaging photographs.
Do not finalise brand colours until logo and packaging are available.

## Colour palette

Defined in `tailwind.config.mjs`. All colours use the `brand` and `accent` scale.

### Brand (neutral grey — temporary)

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-50` | `#f8f9fa` | Page background, light fills |
| `brand-100` | `#f0f2f5` | Section backgrounds, placeholder fills |
| `brand-200` | `#e1e5eb` | Borders, dividers |
| `brand-300` | `#c8d0dc` | Subdued borders |
| `brand-400` | `#9daab8` | Placeholder text, icons |
| `brand-500` | `#6b7a8d` | Secondary text, subtitles |
| `brand-600` | `#4a5568` | Body text, navigation links |
| `brand-700` | `#2d3748` | Primary button background |
| `brand-800` | `#1a202c` | Headings, main text |
| `brand-900` | `#0f1420` | Dark backgrounds |

### Accent (warm amber — adaptable)

| Token | Hex | Usage |
|-------|-----|-------|
| `accent-500` | `#f59e0b` | Primary accent, CTA buttons |
| `accent-600` | `#d97706` | Accent hover state |
| `accent-50` | `#fff9eb` | Accent background tints |

> When official Epso brand colours are confirmed, update `brand` and `accent` in `tailwind.config.mjs`.
> Do not change individual component files — they all reference the token names.

## Typography

Font: **Inter** (Google Fonts, free)
Fallback: system-ui, sans-serif

### Scale (Tailwind defaults, with custom breakpoints)

| Element | Mobile | Desktop |
|---------|--------|---------|
| `h1` | `text-3xl` (30px) | `text-5xl` (48px) |
| `h2` | `text-2xl` (24px) | `text-3xl` (30px) |
| `h3` | `text-xl` (20px) | `text-2xl` (24px) |
| Body | `text-base` (16px) | `text-base` |
| Small | `text-sm` (14px) | `text-sm` |
| Tiny | `text-xs` (12px) | `text-xs` |

## Spacing

Use Tailwind's default spacing scale. Avoid one-off values.
Custom additions: `18` (4.5rem), `88` (22rem), `128` (32rem).

## Breakpoints

| Name | Width | Purpose |
|------|-------|---------|
| Default | 0–639px | Mobile (320px–539px priority) |
| `sm` | 640px+ | Tablet portrait, 2-column grids |
| `md` | 768px+ | Tablet landscape, desktop nav |
| `lg` | 1024px+ | Desktop, 3–4 column grids |
| `xl` | 1280px+ | Wide desktop (max container width) |

## Component classes

Defined in `src/styles/global.css` using `@layer components`.

### Buttons

```html
<!-- Primary — dark background, white text -->
<a class="btn-primary">Enquire now</a>

<!-- Secondary — outlined, transparent background -->
<a class="btn-secondary">Browse products</a>

<!-- Accent — amber background, white text -->
<a class="btn-accent">Contact us</a>
```

### Cards

```html
<article class="card">...</article>
```

Hover: `shadow-md`. No border-radius changes.

### Layout

```html
<!-- Page width wrapper -->
<div class="container-site">...</div>

<!-- Section vertical padding -->
<section class="section-pad">...</section>

<!-- Section headings -->
<h2 class="section-title">What we make</h2>
<p class="section-subtitle">Supporting text here.</p>
```

### Images

```astro
<!-- Sanity image with CDN transform -->
<SanityImage image={product.mainImage} alt="..." width={400} height={400} />

<!-- Structural placeholder -->
<PlaceholderImage width={400} height={400} label="Product image" />
```

## Product grid

| Breakpoint | Columns |
|------------|---------|
| Mobile | 2 |
| Tablet (sm) | 2 |
| Tablet (md) | 3 |
| Desktop (lg) | 4 |

## Category grid

| Breakpoint | Columns |
|------------|---------|
| Mobile | 1 |
| Tablet (sm) | 2 |
| Desktop (lg) | 3 |

## Image placeholder sizes

| Context | Width | Height | Ratio |
|---------|-------|--------|-------|
| Logo | 200px | 60px | — |
| Hero | 1440px | 600px | 24:10 |
| Product | 800px | 800px | 1:1 |
| Category | 400px | 300px | 4:3 |
| Blog | 1200px | 630px | 1.9:1 |
| Thumbnail | 400px | 400px | 1:1 |

## Motion

Use only where it adds clarity, never for decoration.

| Animation | Usage |
|-----------|-------|
| `animate-slide-down` | Mobile navigation menu open |
| `transition-transform` | Product/category image hover zoom |
| `transition-colors` | Button hover, link hover |
| `transition-shadow` | Card hover shadow |

Duration: 150ms (interactions), 300ms (structural transitions).

