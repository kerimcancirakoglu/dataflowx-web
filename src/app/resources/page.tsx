import type { Metadata } from 'next';
import Nav from '@/components/Nav/Nav';
import Contact from '@/components/Contact/Contact';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import ResourcesClient from './ResourcesClient';

export const metadata: Metadata = {
  title: 'Resources & Datasheets | DataFlowX',
  description:
    'Download technical datasheets, whitepapers, and case studies about DataFlowX unidirectional gateways and OT network security solutions.',
  keywords: [
    'data diode datasheet',
    'unidirectional gateway whitepaper',
    'OT security resources',
    'DataFlowX documentation',
    'cybersecurity case studies',
    'hardware isolation technical specs',
  ],
  alternates: {
    canonical: 'https://dataflowx.com/resources',
  },
  openGraph: {
    title: 'DataFlowX Resources & Datasheets',
    description: 'Technical documentation and resources for DataFlowX OT security solutions.',
    url: 'https://dataflowx.com/resources',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dataflowx.com' },
    { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://dataflowx.com/resources' },
  ],
};

export default function ResourcesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main>
        <VideoBackground />
        <Nav />
        <ResourcesClient />
        <Contact />
      </main>
    </>
  );
}
