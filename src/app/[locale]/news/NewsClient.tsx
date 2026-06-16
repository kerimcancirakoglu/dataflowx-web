'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import styles from './page.module.css';

import { WPRestPost } from '@/lib/wp-api';

interface NewsClientProps {
  posts: WPRestPost[];
}

export default function NewsClient({ posts }: NewsClientProps) {
  const locale = useLocale();

  // If we have WP posts, the first one is featured, the rest are grid
  const featuredNews = posts.length > 0 ? posts[0] : null;
  const filteredNews = posts.length > 1 ? posts.slice(1) : [];

  const formatDate = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(locale, options);
    } catch {
      return dateString;
    }
  };

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>?/gm, '');
  };

  return (
    <div className={styles.pageWrapper}>

      {/* Header */}
      <section className={styles.headerSection}>
        <h1 className={styles.mainTitle}>Newsroom</h1>
        <p className={styles.subtitle}>The latest company announcements, press releases, and media coverage.</p>
      </section>

      {/* Featured News Hero */}
      {featuredNews && (
        <section className={styles.featuredArea}>
          <div className={styles.heroCard}>
            <div className={styles.heroContent}>
              <div className={styles.metaData}>
                <span className={styles.categoryBadge}>Featured</span>
                <span>{formatDate(featuredNews.date)}</span>
              </div>
              <h2 className={styles.heroTitle}>{featuredNews.title.rendered}</h2>
              <p className={styles.heroDesc}>{stripHtml(featuredNews.excerpt.rendered)}</p>
              <Link href={`/${locale}/news/${encodeURIComponent(featuredNews.slug)}`} className={styles.readMoreBtn}>
                Read Full Story
              </Link>
            </div>
            <div className={styles.heroImageWrapper}>
              <img
                src={featuredNews._embedded?.['wp:featuredmedia']?.[0]?.source_url || `${process.env.NEXT_PUBLIC_WP_URL}/wp-content/uploads/Kapak/kapaklar/datamessage1.jpg`}
                alt={featuredNews._embedded?.['wp:featuredmedia']?.[0]?.alt_text || featuredNews.title.rendered}
                className={styles.heroImage}
              />
            </div>
          </div>
        </section>
      )}

      {/* Main Content Layout */}
      <section className={styles.mainLayout}>

        {/* Grid */}
        <div className={styles.gridContainer}>
          {filteredNews.length > 0 ? (
            filteredNews.map(news => (
              <div key={news.id} className={styles.card}>
                <div className={styles.cardImageWrapper}>
                  <img
                    src={news._embedded?.['wp:featuredmedia']?.[0]?.source_url || `${process.env.NEXT_PUBLIC_WP_URL}/wp-content/uploads/Kapak/kapaklar/data3.jpg`}
                    alt={news._embedded?.['wp:featuredmedia']?.[0]?.alt_text || news.title.rendered}
                    className={styles.cardImage}
                  />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardDate}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    {formatDate(news.date)}
                  </div>
                  <h3 className={styles.cardTitle}>{news.title.rendered}</h3>
                  <p className={styles.cardDesc}>{stripHtml(news.excerpt.rendered || news.content.rendered).substring(0, 150)}...</p>
                  <Link href={`/${locale}/news/${encodeURIComponent(news.slug)}`} className={styles.cardLink}>
                    Read More
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              {posts.length === 0 ? (
                <>
                  <h3>No News Found</h3>
                  <p>There are currently no news items to display. Add posts in WP Engine to see them here.</p>
                </>
              ) : null}
            </div>
          )}
        </div>

      </section>

    </div>
  );
}
