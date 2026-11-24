// All GROQ queries for the Epso website.
// Fetched during Astro SSG build — never called client-side.

// ─── Queries ──────────────────────────────────────────────────────────────────

export const getAllCategoriesQuery = `
  *[_type == "category"] | order(displayOrder asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    image,
    displayOrder,
    "parent": parent->{ _id, name, "slug": slug.current },
    "seo": seo{ title, description }
  }
`;

export const getRootCategoriesQuery = `
  *[_type == "category" && !defined(parent)] | order(displayOrder asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    image,
    displayOrder,
    "seo": seo{ title, description }
  }
`;

export const getCategoryBySlugQuery = `
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    image,
    displayOrder,
    "parent": parent->{ _id, name, "slug": slug.current },
    "seo": seo{ title, description },
    "children": *[_type == "category" && references(^._id)] | order(displayOrder asc) {
      _id,
      name,
      "slug": slug.current,
      description,
      image,
      displayOrder
    }
  }
`;

export const getProductsByCategoryQuery = `
  *[_type == "product" && isPublished == true && category->slug.current == $slug] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    shortDescription,
    mainImage,
    "category": category->{ _id, name, "slug": slug.current }
  }
`;

export const getAllProductsQuery = `
  *[_type == "product" && isPublished == true] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    shortDescription,
    mainImage,
    "category": category->{ _id, name, "slug": slug.current }
  }
`;

export const getFeaturedProductsQuery = `
  *[_type == "product" && isPublished == true && isFeatured == true] | order(_createdAt desc)[0...8] {
    _id,
    name,
    "slug": slug.current,
    shortDescription,
    mainImage,
    "category": category->{ _id, name, "slug": slug.current }
  }
`;

export const getProductBySlugQuery = `
  *[_type == "product" && slug.current == $slug && isPublished == true][0] {
    _id,
    name,
    "slug": slug.current,
    shortDescription,
    description,
    mainImage,
    images,
    packagingSizes,
    features,
    ingredients,
    usageInstructions,
    isFeatured,
    "category": category->{
      _id,
      name,
      "slug": slug.current,
      "parent": parent->{ _id, name, "slug": slug.current }
    },
    "seo": seo{ title, description },
    "relatedProducts": *[
      _type == "product" &&
      isPublished == true &&
      category._ref == ^.category._ref &&
      _id != ^._id
    ][0...4] {
      _id,
      name,
      "slug": slug.current,
      shortDescription,
      mainImage,
      "category": category->{ _id, name, "slug": slug.current }
    }
  }
`;

export const getAllProductSlugsQuery = `
  *[_type == "product" && isPublished == true] { "slug": slug.current }
`;

export const getAllCategorySlugsQuery = `
  *[_type == "category"] { "slug": slug.current }
`;

export const getHomepageContentQuery = `
  *[_type == "homepageContent"][0] {
    heroHeading,
    heroSubheading,
    heroImage,
    brandIntroTitle,
    brandIntroText,
    "featuredCategories": featuredCategories[]->{
      _id,
      name,
      "slug": slug.current,
      description,
      image
    },
    "featuredProducts": featuredProducts[]->{
      _id,
      name,
      "slug": slug.current,
      shortDescription,
      mainImage,
      "category": category->{ _id, name, "slug": slug.current }
    }
  }
`;

export const getSiteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    logo,
    contactEmail,
    contactPhone,
    whatsappNumber,
    address,
    socialLinks
  }
`;

export const getAllBlogPostsQuery = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    mainImage,
    "seo": seo{ title, description }
  }
`;

export const getBlogPostBySlugQuery = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body,
    publishedAt,
    mainImage,
    "seo": seo{ title, description }
  }
`;

export const getAllBlogSlugsQuery = `
  *[_type == "blogPost"] { "slug": slug.current }
`;

