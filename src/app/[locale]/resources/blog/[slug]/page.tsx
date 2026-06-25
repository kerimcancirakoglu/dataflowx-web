// src/app/[locale]/resources/blog/[slug]/page.tsx
import type { Metadata } from 'next';

import { notFound } from 'next/navigation';
import Nav from '@/components/Nav/Nav';
import Contact from '@/components/Contact/Contact';
import Image from 'next/image';
import TableOfContents from '@/components/BlogLayout/TableOfContents';
import SocialShare from '@/components/BlogLayout/SocialShare';
import { getPostBySlug } from '@/lib/wp-api';
import styles from './post.module.css';
import contentStyles from '@/components/BlogLayout/BlogContentStyles.module.css';
import { localeToWPLanguage } from '@/lib/locale-map';
import { decode } from 'html-entities';

function getCoverImage(contentHtml: string, fallback: string = '/og-image.jpg') {
  if (!contentHtml) return fallback;
  const match = contentHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : fallback;
}

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

// Mock fallback logic
const MOCK_POSTS: Record<string, any> = {
  'content-disarm-reconstruction-cdr-8-best-vendors-in-2026': {
    title: 'M365 Email Attachment Disarming: Zero Trust in Practice',
    date: new Date().toISOString(),
    content: '<p>Integrates directly with Microsoft 365 to disarm email attachments before users interact with them. Removes malicious macros, active content, and embedded payloads with zero workflow disruption.</p><h2>The Threat Landscape</h2><p>As email remains the primary vector for malware distribution, organizations must rethink how they handle attachments. Traditional antivirus engines rely on signatures, which are largely ineffective against zero-day threats.</p><h2>Why DFX CDR?</h2><p>True Content Disarm and Reconstruction (CDR) doesn\'t just scan for known threats. It breaks down files to their fundamental components, removes anything that isn\'t strictly data, and rebuilds a clean, fully functional copy. This ensures 100% protection against hidden payloads.</p>',
    excerpt: 'Integrates directly with Microsoft 365 to disarm email attachments...',
    author: { name: 'DFX Security Team' },
    readingTime: '4 min read',
    featuredImage: { node: { sourceUrl: `${process.env.NEXT_PUBLIC_WP_URL}/wp-content/uploads/Kapak/kapaklar/datamessage1.jpg`, altText: 'M365 Security' } }
  },
  'network-segmentation-vs-isolation': {
    title: 'Network Segmentation vs. Isolation in OT Environments',
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    content: '<p>A deep dive into why traditional firewalls fail in OT security and how physical isolation with data diodes guarantees unidirectional protection.</p>',
    excerpt: 'A deep dive into why traditional firewalls fail in OT security...',
    author: { name: 'DFX Threat Intel' },
    readingTime: '5 min read',
    featuredImage: { node: { sourceUrl: `${process.env.NEXT_PUBLIC_WP_URL}/wp-content/uploads/Kapak/kapaklar/datadiode1.jpg`, altText: 'OT Security' } }
  },
  'defending-critical-infrastructure': {
    title: 'Defending Critical Infrastructure from Nation-State Actors',
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    content: '<p>How air-gapped systems and zero-trust principles prevent lateral movement during sophisticated cyber attacks on national grids.</p>',
    excerpt: 'How air-gapped systems and zero-trust principles prevent lateral movement...',
    author: { name: 'DFX Security Team' },
    readingTime: '6 min read',
    featuredImage: { node: { sourceUrl: `${process.env.NEXT_PUBLIC_WP_URL}/wp-content/uploads/Kapak/kapaklar/datasecure1.jpg`, altText: 'Critical Infrastructure' } }
  },
  'evolution-of-malware': {
    title: 'The Evolution of Malware: Why Antivirus is No Longer Enough',
    date: new Date(Date.now() - 86400000 * 10).toISOString(),
    content: '<p>With polymorphic viruses and fileless malware on the rise, organizations must adopt proactive measures like CDR to stay secure.</p>',
    excerpt: 'With polymorphic viruses and fileless malware on the rise...',
    author: { name: 'DFX Security Team' },
    readingTime: '3 min read',
    featuredImage: { node: { sourceUrl: `${process.env.NEXT_PUBLIC_WP_URL}/wp-content/uploads/Kapak/kapaklar/data3.jpg`, altText: 'Malware Analysis' } }
  },
  'securing-remote-access': {
    title: 'Securing Remote Access for Third-Party Vendors',
    date: new Date(Date.now() - 86400000 * 15).toISOString(),
    content: '<p>Best practices for implementing secure, audited, and isolated remote access for external contractors working on sensitive systems.</p>',
    excerpt: 'Best practices for implementing secure, audited, and isolated remote access...',
    author: { name: 'DFX Security Team' },
    readingTime: '7 min read',
    featuredImage: { node: { sourceUrl: `${process.env.NEXT_PUBLIC_WP_URL}/wp-content/uploads/Kapak/kapaklar/databroker1.jpg`, altText: 'Zero Trust Remote Access' } }
  }
};

// ── Dynamic SEO metadata per post ──────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug, locale } = resolvedParams;
  const wpLangCode = localeToWPLanguage(locale);
  
  let post: any = null;
  try {
    const wpPost = await getPostBySlug(slug, locale);
    if (wpPost) {
      let featuredImage = null;
      if (wpPost._embedded && wpPost._embedded['wp:featuredmedia'] && wpPost._embedded['wp:featuredmedia'][0]) {
        const media = wpPost._embedded['wp:featuredmedia'][0];
        featuredImage = {
          node: {
            sourceUrl: media.source_url,
            altText: media.alt_text || ''
          }
        };
      }
      post = {
        title: wpPost.title?.rendered || '',
        excerpt: wpPost.excerpt?.rendered || '',
        content: wpPost.content?.rendered || '',
        date: wpPost.date,
        featuredImage: featuredImage
      };
    }
  } catch (err) {
    console.warn('[Metadata] WP API error', err);
  }

  // Fallback to mock
  if (!post && MOCK_POSTS[slug]) {
    post = MOCK_POSTS[slug];
  }

  if (!post) {
    return {
      title: 'Post Not Found | DataFlowX',
    };
  }

  const cleanExcerpt = post.excerpt
    ? decode(post.excerpt).replace(/<[^>]*>/g, '').trim().slice(0, 160)
    : 'Read the latest cybersecurity insights from DataFlowX.';

  const imageUrl = post.featuredImage?.node?.sourceUrl ?? post.featuredImage ?? getCoverImage(post.content);

  const languages: Record<string, string> = {};
  if (post.translations) {
    post.translations.forEach((t: any) => {
      const langCode = t.language?.code?.toLowerCase();
      if (langCode) {
        languages[langCode] = `https://dataflowx.com/${langCode}/resources/blog/${t.slug}`;
      }
    });
  }
  // Include self reference
  languages[locale] = `https://dataflowx.com/${locale}/resources/blog/${slug}`;

  return {
    title: `${decode(post.title)} | DataFlowX Blog`,
    description: cleanExcerpt,
    alternates: {
      canonical: `https://dataflowx.com/${locale}/resources/blog/${slug}`,
      languages,
    },
    openGraph: {
      title: decode(post.title),
      description: cleanExcerpt,
      url: `https://dataflowx.com/${locale}/resources/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: decode(post.title) }],
    },
    twitter: {
      card: 'summary_large_image',
      title: decode(post.title),
      description: cleanExcerpt,
      images: [imageUrl],
    },
  };
}

// ── Static path generation at build time ───────────
export async function generateStaticParams() {
  const locales = ['tr', 'en', 'ar'];
  const allParams: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    try {
      const wpUrl = process.env.NEXT_PUBLIC_WP_URL || 'https://dataflowx1.wpenginepowered.com';
      const endpoint = `${wpUrl}/wp-json/wp/v2/posts?per_page=100&lang=${locale}`;
      const res = await fetch(endpoint, { next: { revalidate: 3600 } });
      if (res.ok) {
        const posts = await res.json();
        posts.forEach((p: any) => {
          allParams.push({ locale, slug: p.slug });
        });
      }
    } catch {
      // ignore
    }
  }

  // Fallback to mock slugs if API fails completely
  if (allParams.length === 0) {
    for (const locale of locales) {
      Object.keys(MOCK_POSTS).forEach((slug) => {
        allParams.push({ locale, slug });
      });
    }
  }

  return allParams;
}

// ── Page ───────────────────────────────────────────
export const revalidate = 3600;
export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const { slug, locale } = resolvedParams;
  const wpLangCode = localeToWPLanguage(locale);

  let post: any = null;
  try {
    const wpPost = await getPostBySlug(slug, locale);
    if (wpPost) {
      let featuredImage = null;
      if (wpPost._embedded && wpPost._embedded['wp:featuredmedia'] && wpPost._embedded['wp:featuredmedia'][0]) {
        const media = wpPost._embedded['wp:featuredmedia'][0];
        featuredImage = {
          node: {
            sourceUrl: media.source_url,
            altText: media.alt_text || ''
          }
        };
      }
      
      let authorName = 'DataFlowX Team';
      if (wpPost._embedded && wpPost._embedded.author && wpPost._embedded.author[0]) {
        authorName = wpPost._embedded.author[0].name || authorName;
      }

      post = {
        title: wpPost.title?.rendered || '',
        content: wpPost.content?.rendered || '',
        date: wpPost.date,
        featuredImage: featuredImage,
        author: { name: authorName }
      };
    }
  } catch (err) {
    console.warn('[BlogPostPage] WP API error, falling back to mock data if available.', err);
  }

  if (!post && MOCK_POSTS[slug]) {
    post = MOCK_POSTS[slug];
  }

  console.log('[DEBUG] param.slug:', slug, 'post:', post?.title);
  if (!post) {
    // If no translation found, or post doesn't exist
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : locale === 'tr' ? 'tr-TR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const imageUrl = post.featuredImage?.node?.sourceUrl ?? post.featuredImage ?? getCoverImage(post.content);
  const authorName = post.author?.name ?? post.author?.node?.name ?? 'DataFlowX Team';
  const readingTime = post.seo?.readingTime ? `${post.seo.readingTime} min read` : (post.readingTime ?? '5 min read');

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: decode(post.title),
    datePublished: post.date,
    image: imageUrl ?? '/og-image.jpg',
    publisher: {
      '@type': 'Organization',
      name: 'DataFlowX',
      url: 'https://dataflowx.com',
    },
    mainEntityOfPage: `https://dataflowx.com/${locale}/resources/blog/${slug}`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://dataflowx.com/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Resources', item: `https://dataflowx.com/${locale}/resources` },
      { '@type': 'ListItem', position: 3, name: 'Blog', item: `https://dataflowx.com/${locale}/resources/blog` },
      { '@type': 'ListItem', position: 4, name: decode(post.title), item: `https://dataflowx.com/${locale}/resources/blog/${slug}` },
    ],
  };

  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className={styles.bgGlow} aria-hidden="true" />
      <Nav />

        {/* Hero Header */}
        <header className={styles.hero}>
          <div className={styles.breadcrumbs}>
            <a href={`/${locale}`}>Home</a> <span>/</span> <a href={`/${locale}/resources`}>Resources</a> <span>/</span> <a href={`/${locale}/resources/blog`}>Blog</a>
          </div>
          <h1 className={styles.title}>{decode(post.title)}</h1>
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <div className={styles.authorAvatar}>
                {authorName.charAt(0)}
              </div>
              <span>{authorName}</span>
            </div>
            <div className={styles.metaItem}>
              <span>{formattedDate}</span>
            </div>
            <div className={styles.metaItem}>
              <span>{readingTime}</span>
            </div>
          </div>
        </header>

        {/* Full Width Featured Image */}
        {imageUrl && (
          <div className={styles.featuredImageContainer}>
            <Image 
              src={imageUrl} 
              alt={post.featuredImage?.node?.altText ?? decode(post.title)} 
              width={1200} height={600} style={{ width: '100%', height: 'auto' }}
              className={styles.featuredImageHero} 
            />
          </div>
        )}

        {/* Two-Column Layout */}
        <div className={styles.layoutGrid}>
          
          {/* Main Content Column (Left) */}
          <article className={styles.contentColumn}>
            {/* WP Engine HTML injected here */}
            <div 
              className={contentStyles.prose} 
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Right Sidebar (Sticky) */}
          <aside className={styles.sidebar}>
            <TableOfContents />
            <SocialShare />
          </aside>

        </div>

        <Contact />
    </main>
  );
}
