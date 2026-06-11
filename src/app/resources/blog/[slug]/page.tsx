// src/app/resources/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav/Nav';
import Contact from '@/components/Contact/Contact';
import TableOfContents from '@/components/BlogLayout/TableOfContents';
import SocialShare from '@/components/BlogLayout/SocialShare';
import { getAntigravityPostBySlug, getAntigravityPosts } from '@/lib/antigravity';
import styles from './post.module.css';
import contentStyles from '@/components/BlogLayout/BlogContentStyles.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

// Mock fallback logic
const MOCK_POSTS: Record<string, any> = {
  'content-disarm-reconstruction-cdr-8-best-vendors-in-2026': {
    title: 'M365 Email Attachment Disarming: Zero Trust in Practice',
    date: new Date().toISOString(),
    content: '<p>Integrates directly with Microsoft 365 to disarm email attachments before users interact with them. Removes malicious macros, active content, and embedded payloads with zero workflow disruption.</p><h2>The Threat Landscape</h2><p>As email remains the primary vector for malware distribution, organizations must rethink how they handle attachments. Traditional antivirus engines rely on signatures, which are largely ineffective against zero-day threats.</p><h2>Why TrueCDR?</h2><p>True Content Disarm and Reconstruction (CDR) doesn\'t just scan for known threats. It breaks down files to their fundamental components, removes anything that isn\'t strictly data, and rebuilds a clean, fully functional copy. This ensures 100% protection against hidden payloads.</p>',
    excerpt: 'Integrates directly with Microsoft 365 to disarm email attachments...',
    author: { name: 'DFX Security Team' },
    readingTime: '4 min read',
    featuredImage: { node: { sourceUrl: '/Kapak/kapaklar/datamessage1.jpg', altText: 'M365 Security' } }
  },
  'network-segmentation-vs-isolation': {
    title: 'Network Segmentation vs. Isolation in OT Environments',
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    content: '<p>A deep dive into why traditional firewalls fail in OT security and how physical isolation with data diodes guarantees unidirectional protection.</p>',
    excerpt: 'A deep dive into why traditional firewalls fail in OT security...',
    author: { name: 'DFX Threat Intel' },
    readingTime: '5 min read',
    featuredImage: { node: { sourceUrl: '/Kapak/kapaklar/datadiode1.jpg', altText: 'OT Security' } }
  },
  'defending-critical-infrastructure': {
    title: 'Defending Critical Infrastructure from Nation-State Actors',
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    content: '<p>How air-gapped systems and zero-trust principles prevent lateral movement during sophisticated cyber attacks on national grids.</p>',
    excerpt: 'How air-gapped systems and zero-trust principles prevent lateral movement...',
    author: { name: 'DFX Security Team' },
    readingTime: '6 min read',
    featuredImage: { node: { sourceUrl: '/Kapak/kapaklar/datasecure1.jpg', altText: 'Critical Infrastructure' } }
  },
  'evolution-of-malware': {
    title: 'The Evolution of Malware: Why Antivirus is No Longer Enough',
    date: new Date(Date.now() - 86400000 * 10).toISOString(),
    content: '<p>With polymorphic viruses and fileless malware on the rise, organizations must adopt proactive measures like CDR to stay secure.</p>',
    excerpt: 'With polymorphic viruses and fileless malware on the rise...',
    author: { name: 'DFX Security Team' },
    readingTime: '3 min read',
    featuredImage: { node: { sourceUrl: '/Kapak/kapaklar/data3.jpg', altText: 'Malware Analysis' } }
  },
  'securing-remote-access': {
    title: 'Securing Remote Access for Third-Party Vendors',
    date: new Date(Date.now() - 86400000 * 15).toISOString(),
    content: '<p>Best practices for implementing secure, audited, and isolated remote access for external contractors working on sensitive systems.</p>',
    excerpt: 'Best practices for implementing secure, audited, and isolated remote access...',
    author: { name: 'DFX Security Team' },
    readingTime: '7 min read',
    featuredImage: { node: { sourceUrl: '/Kapak/kapaklar/databroker1.jpg', altText: 'Zero Trust Remote Access' } }
  }
};

// ── Dynamic SEO metadata per post ──────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  let post: any = null;
  try {
    post = await getAntigravityPostBySlug(slug);
  } catch {
    // handled below
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
    ? post.excerpt.replace(/<[^>]*>/g, '').trim().slice(0, 160)
    : 'Read the latest cybersecurity insights from DataFlowX.';

  const imageUrl = post.featuredImage?.node?.sourceUrl ?? post.featuredImage ?? '/og-image.jpg';

  return {
    title: `${post.title} | DataFlowX Blog`,
    description: cleanExcerpt,
    alternates: {
      canonical: `https://dataflowx.com/resources/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: cleanExcerpt,
      url: `https://dataflowx.com/resources/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: cleanExcerpt,
      images: [imageUrl],
    },
  };
}

// ── Static path generation at build time ───────────
export async function generateStaticParams() {
  try {
    const posts = await getAntigravityPosts();
    if (posts && posts.length > 0) {
      return posts.map((p: any) => ({ slug: p.slug }));
    }
  } catch {
    // ignore
  }
  // Return mock slugs if API fails
  return Object.keys(MOCK_POSTS).map(slug => ({ slug }));
}

// ── Page ───────────────────────────────────────────
export const dynamic = 'force-dynamic';
export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  let post: any = null;
  try {
    post = await getAntigravityPostBySlug(slug);
  } catch (err) {
    console.warn('[BlogPostPage] WP API error, falling back to mock data if available.', err);
  }

  if (!post && MOCK_POSTS[slug]) {
    post = MOCK_POSTS[slug];
  }

  console.log('[DEBUG] param.slug:', slug, 'post:', post?.title);
  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const imageUrl = post.featuredImage?.node?.sourceUrl ?? post.featuredImage ?? null;
  const authorName = post.author?.name ?? post.author?.node?.name ?? 'DataFlowX Team';
  const readingTime = post.readingTime ?? '5 min read';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.date,
    image: imageUrl ?? '/og-image.jpg',
    publisher: {
      '@type': 'Organization',
      name: 'DataFlowX',
      url: 'https://dataflowx.com',
    },
    mainEntityOfPage: `https://dataflowx.com/resources/blog/${slug}`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dataflowx.com' },
      { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://dataflowx.com/resources' },
      { '@type': 'ListItem', position: 3, name: 'Blog', item: 'https://dataflowx.com/resources/blog' },
      { '@type': 'ListItem', position: 4, name: post.title, item: `https://dataflowx.com/resources/blog/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      
      <main className={styles.main}>
        <div className={styles.bgGlow} aria-hidden="true" />
        <Nav />

        {/* Hero Header */}
        <header className={styles.hero}>
          <div className={styles.breadcrumbs}>
            <a href="/">Home</a> <span>/</span> <a href="/resources">Resources</a> <span>/</span> <a href="/resources/blog">Blog</a>
          </div>
          <h1 className={styles.title}>{post.title}</h1>
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
            <img 
              src={imageUrl} 
              alt={post.featuredImage?.node?.altText ?? post.title} 
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
    </>
  );
}
