import imageUrlBuilder from '@sanity/image-url';
import { client } from './sanity';
import type { ImageLoaderProps } from 'next/image';

const builder = imageUrlBuilder(client);

export function sanityLoader({ src, width, quality }: ImageLoaderProps): string {
  // src, Sanity'deki _ref değeridir (örn: "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg")
  // imageUrlBuilder bu referansı alır ve https://cdn.sanity.io/... formatına dönüştürür.
  return builder.image(src).width(width).quality(quality ?? 75).format('webp').url();
}
