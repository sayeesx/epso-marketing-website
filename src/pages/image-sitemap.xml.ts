import type { APIRoute } from 'astro';
import { sanityClient, sanityImageUrl } from '../lib/sanity';
import { getSiteUrl } from '../lib/siteUrl';
import { getAllProductsQuery, getAllBlogPostsQuery } from '../lib/queries';
import { localBlogPosts } from '../data/blogPosts';
import type { Product, BlogPost } from '../types/index';

interface SitemapImage {
  loc: string;
  title: string;
  caption: string;
  geoLocation?: string;
}

interface PageImages {
  pageUrl: string;
  images: SitemapImage[];
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = getSiteUrl(site);
  const geo = 'Cherukulamba, Malappuram, Kerala, India';

  const pages: PageImages[] = [
    {
      pageUrl: `${siteUrl}/`,
      images: [
        {
          loc: `${siteUrl}/assets/banners/EPSO-Marketing-Truck-on-Globe.webp`,
          title: 'Epso Marketing Delivery Truck on Globe - Everyday Food and Home Care Products',
          caption: 'Epso Marketing truck delivering everyday Kerala food and home care products across India',
          geoLocation: geo,
        },
        {
          loc: `${siteUrl}/epso-food-products-kerala-mixture-snacks-biscuits.webp`,
          title: 'Epso Food Products - Kerala Mixture, Snacks and Biscuits',
          caption: 'Epso food products range including traditional Kerala mixtures, snacks, and biscuits',
          geoLocation: geo,
        },
        {
          loc: `${siteUrl}/epso-home-care-dishwash-floor-cleaner-products.webp`,
          title: 'Epso Home Care - Dishwashing Liquid and Floor Cleaners',
          caption: 'Epso home care range including dishwashing liquids, floor cleaners, and household cleaning products',
          geoLocation: geo,
        },
        {
          loc: `${siteUrl}/jabir-t-founder-epso-marketing-ponmala-grama-panchayat.webp`,
          title: 'Jabir T - Founder of Epso Marketing and Elected Member of Ponmala Grama Panchayat',
          caption: 'Portrait of Jabir T, Founder of Epso Marketing and Elected Member of Ponmala Grama Panchayat, Malappuram, Kerala',
          geoLocation: geo,
        },
        {
          loc: `${siteUrl}/epso-marketing-logo-cherukulamba-malappuram-kerala.png`,
          title: 'Epso Marketing Official Logo - Cherukulamba, Malappuram, Kerala',
          caption: 'Official logo of Epso and EPSO BAKERY & STATIONERY WHOLESALE in Cherukulamba, Malappuram district, Kerala',
          geoLocation: geo,
        },
      ],
    },
    {
      pageUrl: `${siteUrl}/about/`,
      images: [
        {
          loc: `${siteUrl}/jabir-t-founder-epso-marketing-ponmala-grama-panchayat.webp`,
          title: 'Jabir T - Founder of Epso Marketing and Ponmala Grama Panchayat Elected Member',
          caption: 'Jabir T, Founder of Epso Marketing and Elected Member of the Ponmala Grama Panchayat',
          geoLocation: geo,
        },
        {
          loc: `${siteUrl}/epso-marketing-logo-cherukulamba-malappuram-kerala.png`,
          title: 'EPSO BAKERY & STATIONERY WHOLESALE Brand Logo',
          caption: 'Epso Marketing and EPSO BAKERY & STATIONERY WHOLESALE in Cherukulamba, Malappuram, Kerala',
          geoLocation: geo,
        },
      ],
    },
    {
      pageUrl: `${siteUrl}/products/`,
      images: [
        {
          loc: `${siteUrl}/epso-food-products-kerala-mixture-snacks-biscuits.webp`,
          title: 'Epso Food Products Catalogue',
          caption: 'Browse Epso Kerala mixtures, snacks, and biscuits',
          geoLocation: geo,
        },
        {
          loc: `${siteUrl}/epso-home-care-dishwash-floor-cleaner-products.webp`,
          title: 'Epso Home Care Catalogue',
          caption: 'Browse Epso dishwashing liquids and floor cleaners',
          geoLocation: geo,
        },
      ],
    },
  ];

  // Include local curated blog post images
  for (const post of localBlogPosts) {
    pages.push({
      pageUrl: `${siteUrl}/blog/${post.slug}/`,
      images: [
        {
          loc: post.image.startsWith('http') ? post.image : `${siteUrl}${post.image}`,
          title: post.imageTitle,
          caption: post.imageAlt,
          geoLocation: geo,
        },
      ],
    });
  }

  // Include Sanity products & blog posts if configured
  try {
    const [products, blogPosts] = await Promise.all([
      sanityClient.fetch<Product[]>(getAllProductsQuery),
      sanityClient.fetch<BlogPost[]>(getAllBlogPostsQuery),
    ]);

    for (const p of products || []) {
      const slug = typeof p.slug === 'string' ? p.slug : p.slug?.current;
      if (!slug || !p.mainImage?.asset?._ref) continue;
      pages.push({
        pageUrl: `${siteUrl}/products/${slug}/`,
        images: [
          {
            loc: sanityImageUrl(p.mainImage, { width: 1200, height: 1200, format: 'webp' }),
            title: `${p.name} - Epso Product`,
            caption: p.mainImage.alt || p.shortDescription || `${p.name} by Epso Marketing`,
            geoLocation: geo,
          },
        ],
      });
    }

    for (const b of blogPosts || []) {
      if (!b.slug || !b.mainImage?.asset?._ref) continue;
      pages.push({
        pageUrl: `${siteUrl}/blog/${b.slug}/`,
        images: [
          {
            loc: sanityImageUrl(b.mainImage, { width: 1200, height: 630, format: 'webp' }),
            title: b.title,
            caption: b.excerpt || b.title,
            geoLocation: geo,
          },
        ],
      });
    }
  } catch {
    // Sanity not configured; static brand/product/founder/blog images still indexed
  }

  const urlsXml = pages
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(entry.pageUrl)}</loc>
${entry.images
  .map(
    (img) => `    <image:image>
      <image:loc>${escapeXml(img.loc)}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
      <image:caption>${escapeXml(img.caption)}</image:caption>${
        img.geoLocation
          ? `\n      <image:geo_location>${escapeXml(img.geoLocation)}</image:geo_location>`
          : ''
      }
    </image:image>`
  )
  .join('\n')}
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlsXml}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};

