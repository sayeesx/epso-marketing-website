import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageAsset } from '../types/index';

const projectId = import.meta.env.SANITY_PROJECT_ID || 'scsgz7wt';
const dataset = import.meta.env.SANITY_DATASET || 'production';
const apiVersion = import.meta.env.SANITY_API_VERSION || '2024-01-01';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const builder = createImageUrlBuilder(sanityClient as any);

export function urlFor(source: SanityImageAsset) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return builder.image(source as any);
}

/**
 * Build a Sanity Image CDN URL with responsive transformations.
 * Always specify width/height to avoid layout shifts (CLS).
 */
export function sanityImageUrl(
  source: SanityImageAsset | undefined,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'jpg' | 'png';
    fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
  } = {}
): string {
  if (!source?.asset?._ref) return '/assets/products/product-placeholder.svg';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let imageRef: any = urlFor(source).auto('format');

  if (options.width) imageRef = imageRef.width(options.width);
  if (options.height) imageRef = imageRef.height(options.height);
  if (options.quality) imageRef = imageRef.quality(options.quality);
  if (options.format) imageRef = imageRef.format(options.format);
  if (options.fit) imageRef = imageRef.fit(options.fit);

  return imageRef.url() as string;
}
