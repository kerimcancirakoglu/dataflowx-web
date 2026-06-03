import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dataflowx.com'; // Replace with actual domain

  // Define static routes
  const routes = [
    '',
    '/about-us',
    '/solutions/network-security',
    '/solutions/file-security',
    '/solutions/email-security',
    '/solutions/cross-domain-solutions',
    '/partners',
    '/resources/datasheets',
    '/resources/blog',
    '/resources/news',
    '/resources/customer-success-stories',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // In the future, you would dynamically fetch blog posts from WP Engine here
  // and append them to the sitemap array.

  return [...routes];
}
