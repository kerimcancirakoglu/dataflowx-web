import type { Metadata } from 'next';
import Nav from '@/components/Nav/Nav';
import Contact from '@/components/Contact/Contact';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import NewsClient from './NewsClient';
import { client } from '@/lib/sanity';
import { GET_ALL_NEWS_QUERY } from '@/lib/sanity-queries';
import type { WPRestPost } from '@/lib/wp-api';
import { buildAlternates } from '@/lib/seo-config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Newsroom | DataFlowX',
    description:
      'Follow the latest company news, press releases, and media coverage about DataFlowX.',
    keywords: [
      'DataFlowX news',
      'cybersecurity press release',
      'company news',
      'OT security news',
      'DataFlowX in the media',
    ],
    alternates: buildAlternates(locale, '/news'),
    openGraph: {
      title: 'DataFlowX Newsroom',
      description: 'DataFlowX company announcements and press releases.',
      url: `https://dataflowx.com/${locale}/news`,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
  };
}

export const revalidate = 3600;

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const sanityLocale = locale.toUpperCase();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dataflowx.com' },
      { '@type': 'ListItem', position: 2, name: 'News', item: 'https://dataflowx.com/news' },
    ],
  };

  let posts: WPRestPost[] = [];
  try {
    const sanityNews = await client.fetch(GET_ALL_NEWS_QUERY, { language: sanityLocale });
    // Map Sanity news → WPRestPost shape that NewsClient expects
    posts = (sanityNews || []).map((item: any, idx: number) => ({
      id: idx,
      slug: item.slug,
      date: item.date,
      title: { rendered: item.title },
      excerpt: { rendered: item.excerpt || '' },
      content: { rendered: '' },
      _embedded: item.featuredImage
        ? { 'wp:featuredmedia': [{ source_url: item.featuredImage, alt_text: item.title }] }
        : undefined,
    }));
  } catch (err) {
    console.warn('[NewsPage] Sanity API unreachable. Rendering with empty posts.', err);
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <VideoBackground />
      <Nav />
      <NewsClient posts={posts} />
      <Contact />
    </main>
  );
}
