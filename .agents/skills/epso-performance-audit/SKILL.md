---
name: epso-performance-audit
description: Performance optimization strategies, Core Web Vitals targets, and audit checklists for Epso FMCG website.
---

# Epso Performance Audit

## Performance Targets
- Lighthouse Mobile Performance: 95+
- SEO: 100
- Accessibility: 95+
- Best Practices: 95+
- LCP (Largest Contentful Paint): <= 2.5s
- INP (Interaction to Next Paint): <= 200ms
- CLS (Cumulative Layout Shift): <= 0.1

## Optimization Principles
1. **Zero Unnecessary JavaScript**: Static HTML output with no heavy client bundles.
2. **Above-the-fold Images**: Hero images use `loading="eager"` and `fetchpriority="high"`.
3. **Below-the-fold Images**: All other images use `loading="lazy"` and `decoding="async"`.
4. **Layout Shift Prevention**: Explicit `width` and `height` (and aspect ratios) on all `<img>` tags.
5. **Modern Image Formats**: Automatic AVIF/WebP transformations via Sanity Image CDN.
6. **Font Loading**: `preconnect` to Google Fonts and lightweight font weight subsets.
