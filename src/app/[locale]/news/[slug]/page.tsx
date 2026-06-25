// src/app/[locale]/news/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav/Nav';
import Contact from '@/components/Contact/Contact';
import Image from 'next/image';
import TableOfContents from '@/components/BlogLayout/TableOfContents';
import SocialShare from '@/components/BlogLayout/SocialShare';
import client from '@/lib/apollo-client';
import { getPostBySlug, getPosts, WPRestPost } from '@/lib/wp-api';
import styles from './page.module.css';
import contentStyles from '@/components/BlogLayout/BlogContentStyles.module.css';

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

import { GET_POST_BY_SLUG } from '@/lib/graphql-queries';
import { localeToWPLanguage } from '@/lib/locale-map';

function rewriteWixUrls(content: string, locale: string): string {
  if (!content) return content;
  
  const slugMap: Record<string, string> = {
    '/datadiodex': '/unidirectional-gateway',
    '/databrokerx': '/secure-remote-access',
    '/dataportx': '/portx',
    '/datastationx': '/media-transfer-station',
    '/datasecurex': '/sandbox',
    '/datamessagex': '/email-security-platform',
    '/truecdr': locale === 'tr' ? '/dfx-cdr' : '/true-cdr',
  };

  let newContent = content;

  Object.keys(slugMap).forEach(oldSlug => {
    const newSlug = slugMap[oldSlug];
    // Absolute URL
    const absRegex = new RegExp(`href=["']https?:\\/\\/(www\\.)?dataflowx\\.com${oldSlug}\\/?["']`, 'gi');
    newContent = newContent.replace(absRegex, `href="/${locale}${newSlug}"`);
    
    // Relative URL
    const relRegex = new RegExp(`href=["']${oldSlug}\\/?["']`, 'gi');
    newContent = newContent.replace(relRegex, `href="/${locale}${newSlug}"`);
  });

  // Convert generic homepage links
  newContent = newContent.replace(/href=["']https?:\/\/(www\.)?dataflowx\.com\/?["']/gi, `href="/${locale}"`);

  return newContent;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug, locale } = resolvedParams;
  const wpLangCode = localeToWPLanguage(locale);
  
  let graphPost: any = null;
  try {
    const { data } = await client.query<any>({
      query: GET_POST_BY_SLUG,
      variables: { id: slug, language: wpLangCode },
    });
    graphPost = data?.post?.translation;
  } catch {
    // handled below
  }

  // Fallback to REST API if GraphQL fails
  let post: WPRestPost | null = null;
  if (!graphPost) {
    try {
      post = await getPostBySlug(slug, locale);
    } catch {
      // ignore
    }
  }

  if (!graphPost && !post) {
    return {
      title: 'News Not Found | DataFlowX',
    };
  }

  // Use graphPost if available, else fallback to REST post
  const cleanExcerpt = graphPost?.excerpt
    ? graphPost.excerpt.replace(/<[^>]*>/g, '').trim().slice(0, 160)
    : post?.excerpt?.rendered
    ? post.excerpt.rendered.replace(/<[^>]*>/g, '').trim().slice(0, 160)
    : 'Read the latest company news and press releases from DataFlowX.';

  const imageUrl = graphPost?.featuredImage?.node?.sourceUrl 
    ?? post?._embedded?.['wp:featuredmedia']?.[0]?.source_url 
    ?? '/og-image.jpg';

  const title = graphPost?.title ?? post?.title?.rendered ?? 'DataFlowX News';
  const publishedTime = graphPost?.date ?? post?.date;

  const languages: Record<string, string> = {};
  if (graphPost?.translations) {
    graphPost.translations.forEach((t: any) => {
      const langCode = t.language?.code?.toLowerCase();
      if (langCode) {
        languages[langCode] = `https://dataflowx.com/${langCode}/news/${t.slug}`;
      }
    });
  }
  languages[locale] = `https://dataflowx.com/${locale}/news/${slug}`;

  return {
    title: `${title} | DataFlowX Newsroom`,
    description: cleanExcerpt,
    alternates: {
      canonical: `https://dataflowx.com/${locale}/news/${slug}`,
      languages,
    },
    openGraph: {
      title: title,
      description: cleanExcerpt,
      url: `https://dataflowx.com/${locale}/news/${slug}`,
      type: 'article',
      publishedTime: publishedTime,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
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
      const posts = await getPosts('news-dfx', locale);
      if (posts.length > 0) {
        posts.forEach((p) => {
          allParams.push({ locale, slug: p.slug });
        });
      }
    } catch {
      // ignore
    }
  }

  return allParams;
}

// ── Page ───────────────────────────────────────────
export const revalidate = 3600;
export default async function NewsDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const { slug, locale } = resolvedParams;
  
  let post: WPRestPost | null = null;
  try {
    post = await getPostBySlug(slug, locale);
  } catch (err) {
    console.warn('[NewsDetailPage] WP API error', err);
  }

  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null;
  const authorName = post._embedded?.author?.[0]?.name ?? 'DataFlowX Team';
  const readingTime = '3 min read'; // Could be calculated dynamically

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title.rendered,
    datePublished: post.date,
    image: imageUrl ?? '/og-image.jpg',
    publisher: {
      '@type': 'Organization',
      name: 'DataFlowX',
      url: 'https://dataflowx.com',
    },
    mainEntityOfPage: `https://dataflowx.com/${locale}/news/${slug}`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dataflowx.com' },
      { '@type': 'ListItem', position: 2, name: 'Newsroom', item: `https://dataflowx.com/${locale}/news` },
      { '@type': 'ListItem', position: 3, name: post.title.rendered, item: `https://dataflowx.com/${locale}/news/${slug}` },
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
          <a href={`/${locale}`}>Home</a> <span>/</span> <a href={`/${locale}/news`}>Newsroom</a>
        </div>
        <h1 className={styles.title}>{post.title.rendered}</h1>
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
            alt={post._embedded?.['wp:featuredmedia']?.[0]?.alt_text ?? post.title.rendered} 
            width={1200} height={600} style={{ width: '100%', height: 'auto' }}
            className={styles.featuredImageHero} 
          />
        </div>
      )}

      {/* Two-Column Layout */}
      <div className={styles.layoutGrid}>
        
        {/* Main Content Column (Left) */}
        <article className={styles.contentColumn} id="article-content">
          {/* WP Engine HTML injected here */}
          <div 
            className={contentStyles.prose} 
            dangerouslySetInnerHTML={{ __html: rewriteWixUrls(post.content.rendered, locale) }}
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
