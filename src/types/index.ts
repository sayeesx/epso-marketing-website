// ─── Sanity Document Types ────────────────────────────────────────────────────

export interface SanityImageAsset {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface SanitySlug {
  _type: 'slug';
  current: string;
}

export interface Category {
  _id: string;
  _type: 'category';
  name: string;
  slug: SanitySlug;
  description?: string;
  image?: SanityImageAsset;
  parent?: Category;
  displayOrder?: number;
  seo?: SEOFields;
  children?: Category[];
}

export interface PackagingSize {
  _key: string;
  size: string;
  unit: string;
  description?: string;
}

export interface ProductFeature {
  _key: string;
  feature: string;
}

export interface Product {
  _id: string;
  _type: 'product';
  name: string;
  slug: SanitySlug;
  category?: Category;
  shortDescription?: string;
  description?: unknown[]; // Portable Text blocks
  mainImage?: SanityImageAsset;
  images?: SanityImageAsset[];
  packagingSizes?: PackagingSize[];
  features?: ProductFeature[];
  ingredients?: string;
  usageInstructions?: string;
  isFeatured?: boolean;
  isPublished?: boolean;
  seo?: SEOFields;
  relatedProducts?: Product[];
}

export interface SEOFields {
  title?: string;
  description?: string;
  ogImage?: SanityImageAsset;
}

export interface BlogPost {
  _id: string;
  _type: 'blogPost';
  title: string;
  slug: string;
  excerpt?: string;
  body?: unknown[];
  publishedAt?: string;
  mainImage?: SanityImageAsset;
  seo?: SEOFields;
}

export interface SiteSettings {
  _id: string;
  siteName: string;
  tagline?: string;
  logo?: SanityImageAsset;
  ogImage?: SanityImageAsset;
  contactEmail?: string;
  contactPhone?: string;
  whatsappNumber?: string;
  address?: string;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
}

export interface HomepageContent {
  _id?: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroImage?: SanityImageAsset;
  ogImage?: SanityImageAsset;
  brandIntroTitle?: string;
  brandIntroText?: string;
  featuredCategories?: Category[];
  featuredProducts?: Product[];
}

// ─── Component Prop Types ─────────────────────────────────────────────────────

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}
