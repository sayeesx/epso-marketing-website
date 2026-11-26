/**
 * Resolves the canonical production site URL for SEO, Open Graph, JSON-LD, and sitemaps.
 * Ignores local dev URLs (e.g., localhost) from `.env` so static production builds always
 * emit the live canonical domain.
 */
export function getSiteUrl(astroSite?: URL): string {
  const envUrl = import.meta.env.SITE_URL;
  if (envUrl && !envUrl.includes('localhost') && !envUrl.includes('127.0.0.1')) {
    return envUrl.replace(/\/$/, '');
  }
  if (astroSite) {
    return astroSite.toString().replace(/\/$/, '');
  }
  return 'https://www.epso.in';
}

