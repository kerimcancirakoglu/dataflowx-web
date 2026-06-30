import imageUrlBuilder from '@sanity/image-url';
import { client } from './sanity';
import type { ImageLoaderProps } from 'next/image';

const builder = imageUrlBuilder(client);

export function sanityLoader({ src, width, quality }: ImageLoaderProps): string {
  // Local paths and non-Sanity URLs pass through unchanged
  if (src.startsWith('/') || (src.startsWith('http') && !src.includes('cdn.sanity.io'))) {
    return src;
  }
  // Sanity asset refs (e.g. "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg") or cdn.sanity.io URLs
  return builder.image(src).width(width).quality(quality ?? 75).format('webp').url();
}

export default sanityLoader;
