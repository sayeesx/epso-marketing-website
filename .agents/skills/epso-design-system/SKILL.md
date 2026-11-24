---
name: epso-design-system
description: Design system guidelines and UI component patterns for the Epso FMCG marketing website. Use when creating or modifying UI components, layouts, styling, typography, spacing, or visual assets.
---

# Epso Design System

## Overview
Epso is an Indian FMCG brand making food and home care products for everyday households.
Design characteristics:
- Clean and modern, trustworthy, bright, and welcoming.
- Simple typography (Inter), good whitespace, and clear category navigation.
- Neutral, adaptable colour palette (awaiting official Epso logo and packaging).
- Mobile-first responsive layouts across 320px, 360px, 375px, 390px, 430px, tablet, and desktop.

## CSS Component Classes
Defined in `src/styles/global.css`:
- `.container-site`: Max width `1280px` (`max-w-screen-xl`) with responsive padding.
- `.section-pad`: Vertical padding `py-12 md:py-16 lg:py-20`.
- `.btn-primary`: Primary brand button with `bg-brand-700 hover:bg-brand-800`.
- `.btn-secondary`: Outlined button with `border-brand-300 text-brand-700`.
- `.btn-accent`: Highlight button with `bg-accent-500 hover:bg-accent-600`.
- `.card`: Product/category card wrapper with subtle shadow on hover.
- `.placeholder-image`: Centered label block for missing images.
- `.nav-link` & `.breadcrumb-item`: Navigation and breadcrumb styling.

## Image Placeholders & Ratios
Central asset directory: `public/assets/`
- Branding: `public/assets/branding/logo-placeholder.svg` (200x60), `favicon.svg` (32x32)
- Hero Banner: `public/assets/banners/hero-placeholder.svg` (1440x600, 24:10)
- Product: `public/assets/products/product-placeholder.svg` (800x800, 1:1 square)
- Category: `public/assets/categories/food-placeholder.svg`, `home-care-placeholder.svg` (400x300, 4:3)

Always use `SanityImage.astro` for Sanity images and `PlaceholderImage.astro` for structural placeholders. Always specify width and height to prevent Cumulative Layout Shift (CLS).
