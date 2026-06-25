import { MetadataRoute } from 'next';
import client from '@/lib/apollo-client';
import { GET_ALL_POST_SLUGS } from '@/lib/graphql-queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = ['en', 'tr', 'ar'];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dataflowx.com';

  // 1. Fetch WP Posts (with Pagination)
  let posts: any[] = [];
  try {
    let hasNextPage = true;
    let afterCursor = null;

    while (hasNextPage) {
      const response: any = await client.query({
        query: GET_ALL_POST_SLUGS,
        variables: { language: 'en', after: afterCursor }, // Primary language
        fetchPolicy: 'no-cache',
      });
      
      const newPosts = response.data?.posts?.nodes || [];
      posts = [...posts, ...newPosts];
      
      hasNextPage = response.data?.posts?.pageInfo?.hasNextPage || false;
      afterCursor = response.data?.posts?.pageInfo?.endCursor || null;
    }
  } catch (err) {
    console.warn('[sitemap] WordPress API unreachable. Skipping posts in sitemap.');
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

  // 3. Generate Post Pages
  const postUrls = locales.flatMap((locale) => {
    return posts.map((post) => {
      const slug = post.slug;
      return {
        url: `${baseUrl}/${locale}/resources/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/resources/blog/${slug}`])
          ),
        },
      };
    });
  });

  return [...staticPages, ...postUrls];
}
