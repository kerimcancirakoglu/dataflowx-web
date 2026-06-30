import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '15oto8dp',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-06-29', // Tarih formatı (API versiyonu)
  useCdn: process.env.NODE_ENV === 'production', // Prod'da CDN kullan (Edge uyumlu)
  token: process.env.SANITY_API_READ_TOKEN, // Sadece draft/preview çekmek için (opsiyonel)
});
