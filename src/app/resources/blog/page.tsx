import type { Metadata } from 'next';
import Nav from '@/components/Nav/Nav';
import Contact from '@/components/Contact/Contact';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Blog & İçgörüler | DataFlowX Siber Güvenlik',
  description:
    'Siber güvenlik dünyasını yönlendiren trendler, threat intelligence analizleri ve endüstriyel kontrol sistemleri (ICS/OT) için en iyi uygulamalar.',
  keywords: [
    'siber güvenlik blog',
    'OT güvenlik analizleri',
    'threat intelligence',
    'supply chain security',
    'kritik altyapı güvenliği',
    'data diode makaleleri',
  ],
  alternates: {
    canonical: 'https://dataflowx.com/resources/blog',
  },
  openGraph: {
    title: 'DataFlowX Blog & İçgörüler',
    description: 'Siber güvenlik liderleri için stratejik analizler ve sektörel içgörüler.',
    url: 'https://dataflowx.com/resources/blog',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://dataflowx.com' },
    { '@type': 'ListItem', position: 2, name: 'Kaynaklar', item: 'https://dataflowx.com/resources' },
    { '@type': 'ListItem', position: 3, name: 'Blog', item: 'https://dataflowx.com/resources/blog' },
  ],
};

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main>
        <VideoBackground />
        <Nav />
        <BlogClient />
        <Contact />
      </main>
    </>
  );
}
