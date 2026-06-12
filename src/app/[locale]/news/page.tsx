import type { Metadata } from 'next';
import Nav from '@/components/Nav/Nav';
import Contact from '@/components/Contact/Contact';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import NewsClient from './NewsClient';

export const metadata: Metadata = {
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
  alternates: {
    canonical: 'https://dataflowx.com/news',
  },
  openGraph: {
    title: 'DataFlowX Newsroom',
    description: 'DataFlowX company announcements and press releases.',
    url: 'https://dataflowx.com/news',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function NewsPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dataflowx.com' },
      { '@type': 'ListItem', position: 2, name: 'News', item: 'https://dataflowx.com/news' },
    ],
  };

  return (
    <main>
      {/* JSON-LD structured data — inside main, React 19 Server Component hoists it */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <VideoBackground />
      <Nav />
      <NewsClient />
      <Contact />
    </main>
  );
}
