import type { Metadata } from 'next';

import Nav from '@/components/Nav/Nav';
import ContactMini from '@/components/ContactMini/ContactMini';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import ResourcesClient from './ResourcesClient';
import { getResources } from '@/lib/wp-api';
import { buildAlternates } from '@/lib/seo-config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Resources & Data Sheets | DataFlowX',
    description:
      'Download technical data sheets, whitepapers, and case studies about DataFlowX unidirectional gateways and OT network security solutions.',
    keywords: [
      'data diode data sheet',
      'unidirectional gateway whitepaper',
      'OT security resources',
      'DataFlowX documentation',
      'cybersecurity case studies',
      'hardware isolation specs',
    ],
    alternates: buildAlternates(locale, '/resources'),
    openGraph: {
      title: 'DataFlowX Resources & Data Sheets',
      description: 'Technical documents and resources for DataFlowX OT security solutions.',
      url: `https://dataflowx.com/${locale}/resources`,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
  };
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dataflowx.com' },
    { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://dataflowx.com/resources' },
  ],
};

export const revalidate = 60; // ISR: Revalidate every hour

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const wpResources = await getResources(locale);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <VideoBackground />
      <Nav />
      <ResourcesClient wpResources={wpResources} />
      <ContactMini />
    </main>
  );
}
