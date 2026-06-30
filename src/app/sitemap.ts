import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity';
import { GET_ALL_POST_SLUGS_QUERY } from '@/lib/sanity-queries';
import { groq } from 'next-sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = ['en', 'tr', 'ar'];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dataflowx.com';

  // 1. Fetch Sanity Posts (Blog, News, Resources)
  let blogSlugs: any[] = [];
  let newsSlugs: any[] = [];
  let resourceSlugs: any[] = [];

  try {
    // Toplu cekim - slug ve language bilgileri
    const query = groq`{
      "blogs": *[_type == "blogPost"] { "slug": slug.current, language },
      "news": *[_type == "news"] { "slug": slug.current, language },
      "resources": *[_type == "resource"] { "slug": slug.current, language }
    }`;
    const data = await client.fetch(query);
    blogSlugs = data.blogs || [];
    newsSlugs = data.news || [];
    resourceSlugs = data.resources || [];
  } catch (err) {
    console.warn('[sitemap] Sanity API unreachable. Skipping dynamic slugs in sitemap.', err);
  }

  // 2. Generate Static Pages
  const staticRoutes = [
    '',
    '/unidirectional-gateway',
    '/secure-remote-access',
    '/sandbox',
    '/media-transfer-station',
    '/email-security-platform',
    '/intelroom',
    '/dfx-cdr',
    '/portx',
    '/resources',
    '/resources/blog',
    '/news',
    '/partners',
    '/about-us',
    '/contact',
  ];

  const staticPages = staticRoutes.flatMap((route) => {
    return locales.map((locale) => {
      const url = `${baseUrl}/${locale}${route}`;
      return {
        url,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}${route}`])),
        },
      };
    });
  });

  // 3. Generate Blog Pages
  const blogPages = blogSlugs.map((post) => {
    const loc = post.language ? post.language.toLowerCase() : 'en';
    return {
      url: `${baseUrl}/${loc}/resources/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    };
  });

  // 4. Generate News Pages
  const newsPages = newsSlugs.map((item) => {
    const loc = item.language ? item.language.toLowerCase() : 'en';
    return {
      url: `${baseUrl}/${loc}/news/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    };
  });

  // 5. Generate Resource Pages (e.g. whitepapers etc.)
  const resourcePages = resourceSlugs.map((item) => {
    const loc = item.language ? item.language.toLowerCase() : 'en';
    return {
      url: `${baseUrl}/${loc}/resources/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    };
  });

  return [...staticPages, ...blogPages, ...newsPages, ...resourcePages];
}
