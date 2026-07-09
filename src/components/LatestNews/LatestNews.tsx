import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './LatestNews.module.css';
import { getLocale } from 'next-intl/server';
import { client } from '@/lib/sanity';
import { GET_ALL_POSTS_QUERY } from '@/lib/sanity-queries';
import { decode } from 'html-entities';

interface Post {
  id: number | string;
  title: string;
  date: string;
  category: string;
  image: string;
  link: string;
}

const MOCK_POSTS: Post[] = [
  {
    id: 1,
    title: 'Beyond Network Visibility: Implementing Prevention-First Security for SCADA Environments',
    date: 'JUNE 2, 2026',
    category: 'CRITICAL INFRASTRUCTURE',
    image: '/og-image.jpg',
    link: '#',
  },
  {
    id: 2,
    title: 'OT Security Alert: How the "Broken Windows Theory" Predicts Your Next Breach',
    date: 'MAY 18, 2026',
    category: 'OT SECURITY',
    image: '/og-image.jpg',
    link: '#',
  },
  {
    id: 3,
    title: 'How AI Models Like Claude are Targeting SCADA Infrastructure: Monterrey Water Utility Breach',
    date: 'MAY 11, 2026',
    category: 'AI THREATS',
    image: '/og-image.jpg',
    link: '#',
  },
];

function stripHtml(html: string) {
  if (!html) return '';
  return decode(html.replace(/<[^>]*>?/gm, '')).trim();
}

async function getLatestPosts(locale: string): Promise<Post[]> {
  try {
    const sanityLocale = locale.toUpperCase();
    const posts = await client.fetch(GET_ALL_POSTS_QUERY, { language: sanityLocale });

    if (posts && posts.length > 0) {
      return posts.slice(0, 3).map((post: any, index: number) => {
        const dateObj = new Date(post.date);
        const formattedDate = dateObj
          .toLocaleDateString(
            locale === 'ar' ? 'ar-SA' : locale === 'tr' ? 'tr-TR' : 'en-US',
            { month: 'short', day: 'numeric', year: 'numeric' }
          )
          .toUpperCase();

        let category = 'INSIGHTS';
        if (post.categories && post.categories.length > 0) {
          category = post.categories[0].name.toUpperCase();
        }

        return {
          id: post._id || index,
          title: post.title,
          date: formattedDate,
          category,
          image: post.featuredImage || '/og-image.jpg',
          link: `/${locale}/resources/blog/${post.slug}`,
        };
      });
    }
  } catch (error) {
    console.error('Sanity fetch error:', error);
  }

  return MOCK_POSTS;
}

export default async function LatestNews() {
  const locale = await getLocale();
  const posts = await getLatestPosts(locale);
  const [featured, ...rest] = posts;
  const sidePosts = rest.slice(0, 2);

  return (
    <section className={styles.section} id="news">
      <div className={styles.inner}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <p className={styles.overline}>KNOWLEDGE HUB</p>
            <h2 className={styles.sectionTitle}>
              Latest from<br />
              <span className={styles.titleHighlight}>DataFlowX</span>
            </h2>
          </div>

          {/* Tab links */}
          <div className={styles.tabLinks}>
            <Link href={`/${locale}/resources/blog`} className={`${styles.tabLink} ${styles.tabLinkActive}`}>
              Blog
            </Link>
            <Link href={`/${locale}/news`} className={styles.tabLink}>
              News
            </Link>
            <Link href={`/${locale}/resources`} className={styles.tabLink}>
              Resources
            </Link>
          </div>

          <Link href={`/${locale}/resources/blog`} className={styles.viewAllBtn}>
            View All
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Grid: 1 featured + 2 side */}
        <div className={styles.grid}>

          {/* Featured large card */}
          {featured && (
            <Link href={featured.link} className={styles.featuredCard}>
              <div className={styles.featuredImageWrapper}>
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className={styles.featuredImage}
                />
                <div className={styles.featuredOverlay} />
              </div>
              <div className={styles.featuredBody}>
                <span className={styles.cardCategory}>{featured.category}</span>
                <h3 className={styles.featuredTitle}>{featured.title}</h3>
                <div className={styles.cardMeta}>
                  <span className={styles.cardDate}>{featured.date}</span>
                  <span className={styles.readMore}>
                    Read Article
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Side cards column */}
          <div className={styles.sideColumn}>
            {sidePosts.map((post) => (
              <Link key={post.id} href={post.link} className={styles.sideCard}>
                <div className={styles.sideImageWrapper}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className={styles.sideImage}
                  />
                  <div className={styles.sideOverlay} />
                </div>
                <div className={styles.sideBody}>
                  <span className={styles.cardCategory}>{post.category}</span>
                  <p className={styles.sideTitle}>{post.title}</p>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardDate}>{post.date}</span>
                    <span className={styles.readMore}>
                      Read
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
