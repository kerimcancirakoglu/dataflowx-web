import Script from 'next/script';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { redirect } from 'next/navigation';
import Contact from '@/components/Contact/Contact';
import Image from 'next/image';
import TableOfContents from '@/components/BlogLayout/TableOfContents';
import SocialShare from '@/components/BlogLayout/SocialShare';
import { client } from '@/lib/sanity';
import { GET_POST_BY_SLUG_QUERY } from '@/lib/sanity-queries';
import { SITE_URL, ogLocale } from '@/lib/seo-config';
import styles from './post.module.css';
import contentStyles from '@/components/BlogLayout/BlogContentStyles.module.css';
import { PortableText } from '@portabletext/react';

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug, locale } = resolvedParams;
  
  const sanityLocale = locale.toUpperCase();
  const post = await client.fetch(GET_POST_BY_SLUG_QUERY, { slug, language: sanityLocale });

  if (!post) {
    return { title: 'Post Not Found | DataFlowX' };
  }

  const seo = post.seo || {};
  const title = seo.metaTitle || post.title || 'DataFlowX Blog';
  const description = seo.metaDescription || post.excerpt || 'Read the latest insights from DataFlowX.';
  const imageUrl = seo.openGraphImage?.asset?.url || post.featuredImage || '/og-image.jpg';
  
  const robots = seo.noIndex ? { index: false, follow: false } : { index: true, follow: true };

  const pageUrl = `${SITE_URL}/${locale}/resources/blog/${slug}`;

  const languages: Record<string, string> = {
    [locale]: pageUrl,
    'x-default': `${SITE_URL}/en/resources/blog/${slug}`,
  };
  if (post.translations?.length > 0) {
    post.translations.forEach((t: any) => {
      if (t.language && t.slug) {
        languages[t.language.toLowerCase()] = `${SITE_URL}/${t.language.toLowerCase()}/resources/blog/${t.slug}`;
      }
    });
  }

  return {
    title,
    description,
    robots,
    alternates: {
      canonical: pageUrl,
      languages,
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

export default async function BlogDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const { slug, locale } = resolvedParams;
  
  const sanityLocale = locale.toUpperCase();
  const post = await client.fetch(GET_POST_BY_SLUG_QUERY, { slug, language: sanityLocale });

  if (!post) redirect(`/${locale}/resources/blog`);

  const formattedDate = new Date(post.date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const imageUrl = post.featuredImage ?? null;
  const authorName = post.author?.name ?? 'DataFlowX Team';
  const authorAvatar = post.author?.image ?? null;
  const readingTime = '5 min read';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    image: imageUrl ?? '/og-image.jpg',
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'DataFlowX',
      logo: {
        '@type': 'ImageObject',
        url: 'https://dataflowx.com/logo.png',
      },
    },
    mainEntityOfPage: `https://dataflowx.com/${locale}/resources/blog/${slug}`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dataflowx.com' },
      { '@type': 'ListItem', position: 2, name: 'Resources', item: `https://dataflowx.com/${locale}/resources` },
      { '@type': 'ListItem', position: 3, name: 'Blog', item: `https://dataflowx.com/${locale}/resources/blog` },
      { '@type': 'ListItem', position: 4, name: post.title, item: `https://dataflowx.com/${locale}/resources/blog/${slug}` },
    ],
  };

  return (
    <main className={styles.main}>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} id="article-schema-blog" />
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} id="breadcrumb-schema-blog-slug" />
      
      <div className={styles.bgGlow} aria-hidden="true" />

      {/* Hero Header */}
      <header className={styles.hero}>
        <div className={styles.breadcrumbs}>
          <a href={`/${locale}`}>Home</a> <span>/</span> <a href={`/${locale}/resources/blog`}>Blog</a>
        </div>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.meta}>
          <div className={styles.metaItem}>
            {authorAvatar ? (
              <Image src={authorAvatar} alt={authorName} width={32} height={32} className={styles.authorAvatarImg} style={{ borderRadius: '50%' }} />
            ) : (
              <div className={styles.authorAvatar}>{authorName.charAt(0)}</div>
            )}
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
