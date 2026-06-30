import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav/Nav';
import Contact from '@/components/Contact/Contact';
import Image from 'next/image';
import TableOfContents from '@/components/BlogLayout/TableOfContents';
import SocialShare from '@/components/BlogLayout/SocialShare';
import { client } from '@/lib/sanity';
import { GET_NEWS_BY_SLUG_QUERY } from '@/lib/sanity-queries';
import { SITE_URL, ogLocale } from '@/lib/seo-config';
import styles from './page.module.css';
import contentStyles from '@/components/BlogLayout/BlogContentStyles.module.css';
import { PortableText } from '@portabletext/react';

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug, locale } = resolvedParams;
  
  const sanityLocale = locale.toUpperCase();
  const post = await client.fetch(GET_NEWS_BY_SLUG_QUERY, { slug, language: sanityLocale });

  if (!post) {
    return { title: 'News Not Found | DataFlowX' };
  }

  // Sanity'deki yeni SEO objesini kullan (varsa)
  const seo = post.seo || {};
  const title = seo.metaTitle || post.title || 'DataFlowX News';
  const description = seo.metaDescription || post.excerpt || 'Read the latest company news from DataFlowX.';
  const imageUrl = seo.openGraphImage?.asset?.url || post.featuredImage || '/og-image.jpg';
  
  // Eger noIndex isaretliyse indexlemeyi kapat
  const robots = seo.noIndex ? { index: false, follow: false } : { index: true, follow: true };

  const pageUrl = `${SITE_URL}/${locale}/news/${slug}`;

  return {
    title,
    description,
    robots,
    alternates: {
      canonical: pageUrl,
      languages: {
        [locale]: pageUrl,
        'x-default': `${SITE_URL}/en/news/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'DataFlowX',
      locale: ogLocale(locale),
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post._updatedAt ?? post.date,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export const dynamicParams = true;
export const revalidate = 3600;

export default async function NewsDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const { slug, locale } = resolvedParams;
  
  const sanityLocale = locale.toUpperCase();
  const post = await client.fetch(GET_NEWS_BY_SLUG_QUERY, { slug, language: sanityLocale });

  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const imageUrl = post.featuredImage ?? null;
  const authorName = 'DataFlowX Team'; // Haberlerde genelde kurumsal yazar olur
  const readingTime = '3 min read'; // Dinamik hesaplanabilir

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
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
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://dataflowx.com/${locale}/news/${slug}` },
    ],
  };

  return (
    <main className={styles.main}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.bgGlow} aria-hidden="true" />
      <Nav />

      {/* Hero Header */}
      <header className={styles.hero}>
        <div className={styles.breadcrumbs}>
          <a href={`/${locale}`}>Home</a> <span>/</span> <a href={`/${locale}/news`}>Newsroom</a>
        </div>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <div className={styles.authorAvatar}>{authorName.charAt(0)}</div>
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
            alt={post.title} 
            width={1200} height={600} style={{ width: '100%', height: 'auto' }}
            className={styles.featuredImageHero} 
          />
        </div>
      )}

      {/* Two-Column Layout */}
      <div className={styles.layoutGrid}>
        <article className={styles.contentColumn} id="article-content">
          <div className={contentStyles.prose}>
            {post.content ? (
              <PortableText value={post.content} />
            ) : (
              <p>{post.excerpt}</p>
            )}
            
            {post.sourceUrl && (
              <p style={{ marginTop: '2rem' }}>
                <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer">
                  Orijinal Kaynağı Oku &rarr;
                </a>
              </p>
            )}
          </div>
        </article>

        <aside className={styles.sidebar}>
          <TableOfContents />
          <SocialShare />
        </aside>
      </div>

      <Contact />
    </main>
  );
}
