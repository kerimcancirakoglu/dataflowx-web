import type { Metadata } from 'next';

import ContactMini from '@/components/ContactMini/ContactMini';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import BlogClient, { type WPPost } from './BlogClient';
import { client } from '@/lib/sanity';
import { GET_ALL_POSTS_QUERY } from '@/lib/sanity-queries';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Blog & Insights | DataFlowX Cybersecurity',
    description:
      'Trends shaping the cybersecurity world, threat intelligence analysis, and best practices for industrial control systems (ICS/OT).',
    keywords: [
      'cybersecurity blog',
      'OT security analysis',
      'threat intelligence',
      'supply chain security',
      'critical infrastructure security',
      'data diode articles',
      'ICS security',
      'zero trust blog',
    ],
    alternates: {
      canonical: `https://dataflowx.com/${locale}/resources/blog`,
    },
    openGraph: {
      title: 'DataFlowX Blog & Insights',
      description: 'Strategic analysis and industry insights for cybersecurity leaders.',
      url: `https://dataflowx.com/${locale}/resources/blog`,
      type: 'website',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'DataFlowX Blog' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'DataFlowX Blog & Insights',
      description: 'Strategic analysis and industry insights for cybersecurity leaders.',
      images: ['/og-image.jpg'],
    },
  };
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dataflowx.com' },
    { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://dataflowx.com/resources' },
    { '@type': 'ListItem', position: 3, name: 'Blog', item: 'https://dataflowx.com/resources/blog' },
  ],
};

const blogListingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'DataFlowX Blog & Insights',
  description: 'Cybersecurity trends, threat intelligence and ICS/OT best practices',
  url: 'https://dataflowx.com/resources/blog',
  publisher: {
    '@type': 'Organization',
    name: 'DataFlowX',
    url: 'https://dataflowx.com',
  },
};

export const revalidate = 3600;

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const sanityLocale = locale.toUpperCase();

  let posts: WPPost[] = [];
  try {
    const sanityPosts = await client.fetch(GET_ALL_POSTS_QUERY, { language: sanityLocale });
    posts = (sanityPosts || []).map((p: any) => ({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt || '',
      date: p.date,
      categories: { nodes: (p.categories || []).map((c: any) => ({ name: c.name })) },
      featuredImage: p.featuredImage
        ? { node: { sourceUrl: p.featuredImage, altText: p.title } }
        : undefined,
    }));
  } catch (err) {
    console.warn('[BlogPage] Sanity API unreachable. Rendering with empty posts.', err);
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListingSchema) }}
      />
      <VideoBackground />
      <BlogClient posts={posts} />
      <ContactMini />
    </main>
  );
}
