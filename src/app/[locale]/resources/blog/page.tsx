// src/app/resources/blog/page.tsx
import type { Metadata } from 'next';

import Nav from '@/components/Nav/Nav';
import ContactMini from '@/components/ContactMini/ContactMini';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
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
    canonical: 'https://dataflowx.com/resources/blog',
  },
  openGraph: {
    title: 'DataFlowX Blog & Insights',
    description: 'Strategic analysis and industry insights for cybersecurity leaders.',
    url: 'https://dataflowx.com/resources/blog',
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

import client from '@/lib/apollo-client';
import { GET_ALL_POSTS } from '@/lib/graphql-queries';

export const revalidate = 3600; // ISR: Revalidate every hour

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Convert our path locale to WPGraphQL LanguageCodeEnum if needed
  const wpLangCode = locale.toUpperCase(); 

  // Fetch real posts from WordPress — graceful fallback to empty array on error
  let wpPosts: any[] = [];
  try {
    const { data } = await client.query<any>({
      query: GET_ALL_POSTS,
      variables: { language: wpLangCode },
    });
    wpPosts = data?.posts?.nodes || [];
  } catch (err) {
    // WP down or WPGraphQL not configured yet — page still renders with empty state
    console.warn('[BlogPage] WordPress API unreachable. Rendering with empty posts.', err);
  }

  // Add mock posts if WordPress is not configured yet
  if (!wpPosts || wpPosts.length === 0) {
    wpPosts = [
      {
        title: 'M365 Email Attachment Disarming: Zero Trust in Practice',
        slug: 'content-disarm-reconstruction-cdr-8-best-vendors-in-2026',
        excerpt: '<p>Integrates directly with Microsoft 365 to disarm email attachments before users interact with them. Removes malicious macros, active content, and embedded payloads with zero workflow disruption.</p>',
        date: new Date().toISOString(),
        categories: {
          nodes: [{ name: 'Zero Trust' }]
        },
        featuredImage: {
          node: {
            sourceUrl: '/Kapak/kapaklar/datamessage1.jpg',
            altText: 'M365 Security'
          }
        }
      },
      {
        title: 'Network Segmentation vs. Isolation in OT Environments',
        slug: 'network-segmentation-vs-isolation',
        excerpt: '<p>A deep dive into why traditional firewalls fail in OT security and how physical isolation with data diodes guarantees unidirectional protection.</p>',
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        categories: {
          nodes: [{ name: 'OT Security' }]
        },
        featuredImage: {
          node: {
            sourceUrl: '/Kapak/kapaklar/datadiode1.jpg',
            altText: 'OT Security'
          }
        }
      },
      {
        title: 'Defending Critical Infrastructure from Nation-State Actors',
        slug: 'defending-critical-infrastructure',
        excerpt: '<p>How air-gapped systems and zero-trust principles prevent lateral movement during sophisticated cyber attacks on national grids.</p>',
        date: new Date(Date.now() - 86400000 * 5).toISOString(),
        categories: {
          nodes: [{ name: 'Threat Intelligence' }]
        },
        featuredImage: {
          node: {
            sourceUrl: '/Kapak/kapaklar/datasecure1.jpg',
            altText: 'Critical Infrastructure'
          }
        }
      },
      {
        title: 'The Evolution of Malware: Why Antivirus is No Longer Enough',
        slug: 'evolution-of-malware',
        excerpt: '<p>With polymorphic viruses and fileless malware on the rise, organizations must adopt proactive measures like CDR to stay secure.</p>',
        date: new Date(Date.now() - 86400000 * 10).toISOString(),
        categories: {
          nodes: [{ name: 'Malware Analysis' }]
        },
        featuredImage: {
          node: {
            sourceUrl: '/Kapak/kapaklar/data3.jpg',
            altText: 'Malware Analysis'
          }
        }
      },
      {
        title: 'Securing Remote Access for Third-Party Vendors',
        slug: 'securing-remote-access',
        excerpt: '<p>Best practices for implementing secure, audited, and isolated remote access for external contractors working on sensitive systems.</p>',
        date: new Date(Date.now() - 86400000 * 15).toISOString(),
        categories: {
          nodes: [{ name: 'Zero Trust' }]
        }
      }
    ];
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
      <Nav />
      <BlogClient posts={wpPosts} />
      <ContactMini />
    </main>
  );
}
