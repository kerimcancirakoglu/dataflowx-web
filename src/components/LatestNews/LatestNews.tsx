import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './LatestNews.module.css';
import { getTranslations, getLocale } from 'next-intl/server';
import { client } from '@/lib/sanity';
import { GET_ALL_POSTS_QUERY } from '@/lib/sanity-queries';
import { decode } from 'html-entities';

interface Post {
  id: number | string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  featured: boolean;
  link: string;
}

const MOCK_POSTS: Post[] = [
  {
    id: 1,
    title: 'Beyond Network Visibility: Implementing Prevention-First Security for SCADA Environments',
    excerpt: 'Modern industrial efficiency depends entirely on deep data integration. The conceptual air gap, the idea that production networks can remain completely isolated from the outside world, and that network visibility is enough, is dead. To optimize supply chains, track predictive maintenance data, and feed enterprise analytics, corporate IT and operational technology (OT) have been permanently [...]',
    date: 'JUNE 2, 2026',
    category: 'CRITICAL INFRASTRUCTURE',
    image: `/og-image.jpg`,
    featured: true,
    link: '#'
  },
  {
    id: 2,
    title: 'OT Security Alert: How the "Broken Windows Theory" Predicts Your Next Breach',
    excerpt: '',
    date: 'MAY 18, 2026',
    category: 'SECURITY',
    image: `/og-image.jpg`,
    featured: false,
    link: '#'
  },
  {
    id: 3,
    title: 'How AI Models Like Claude are Targeting SCADA Infrastructure: Monterrey Water Utility Breach',
    excerpt: '',
    date: 'MAY 11, 2026',
    category: 'AI THREATS',
    image: `/og-image.jpg`,
    featured: false,
    link: '#'
  },
  {
    id: 4,
    title: 'Zero Trust Architecture in Critical Infrastructure: A Comprehensive Guide for 2026',
    excerpt: '',
    date: 'MAY 04, 2026',
    category: 'ZERO TRUST',
    image: `/og-image.jpg`,
    featured: false,
    link: '#'
  }
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
      return posts.slice(0, 4).map((post: any, index: number) => {
        const dateObj = new Date(post.date);
        const formattedDate = dateObj.toLocaleDateString(locale === 'ar' ? 'ar-SA' : locale === 'tr' ? 'tr-TR' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
        
        let category = 'INSIGHTS';
        if (post.categories && post.categories.length > 0) {
          category = post.categories[0].name.toUpperCase();
        }

        return {
          id: post._id || index,
          title: post.title,
          excerpt: post.excerpt ? stripHtml(post.excerpt) : '',
          date: formattedDate,
          category,
          image: post.featuredImage || '/og-image.jpg',
          featured: index === 0,
          link: `/${locale}/resources/blog/${post.slug}`
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
  // Take 3 posts for the 3-column grid
  const listItems = posts.slice(0, 3);
  const t = await getTranslations('Home.LatestNews');

  return (
    <section className={styles.section} id="news">
      <div className={styles.inner}>
        
        {/* Top Row: Navigation Buttons */}
        <div className={styles.topNavGrid}>
          <Link href={`/${locale}/resources`} className={styles.navButton}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            <span className={styles.navText}>Resource Center</span>
          </Link>
          <Link href={`/${locale}/news`} className={styles.navButton}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            <span className={styles.navText}>News</span>
          </Link>
          <Link href={`/${locale}/resources/blog`} className={styles.navButton}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            <span className={styles.navText}>Blog</span>
          </Link>
        </div>

        {/* Bottom Row: Featured Articles */}
        <div className={styles.bottomNewsSection}>
          <div className={styles.newsGrid}>
            {listItems.map((item) => (
              <Link href={item.link} key={item.id} className={styles.listCard}>
                <div className={styles.listImageWrapper}>
                  <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} className={styles.listImage} />
                </div>
                <div className={styles.listContent}>
                  <div className={styles.listReadMore}>
                    <span>{t('readArticle') || 'Read More'}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
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
