import React from 'react';
import styles from './LatestNews.module.css';
import { getTranslations, getLocale } from 'next-intl/server';
import client from '@/lib/apollo-client';
import { GET_ALL_POSTS } from '@/lib/graphql-queries';
import { getGraphQLLocaleFilter } from '@/lib/locale-map';

interface Post {
  id: number;
  title: string;
  date: string;
  image: string;
  featured: boolean;
  link: string;
}

const MOCK_POSTS: Post[] = [
  {
    id: 1,
    title: 'Beyond Network Visibility: Implementing Prevention-First Security for SCADA Environments',
    date: '23 hours ago',
    image: `${process.env.NEXT_PUBLIC_WP_URL}/wp-content/uploads/Kapak/kapaklar/datamessage1.jpg`,
    featured: true,
    link: '#'
  },
  {
    id: 2,
    title: 'OT Security Alert: How the "Broken Windows Theory" Predicts Your Next Breach',
    date: 'May 18',
    image: `${process.env.NEXT_PUBLIC_WP_URL}/wp-content/uploads/Kapak/kapaklar/databroker1.jpg`,
    featured: false,
    link: '#'
  },
  {
    id: 3,
    title: 'How AI Models Like Claude are Targeting SCADA Infrastructure: Monterrey Water Utility Breach',
    date: 'May 11',
    image: `${process.env.NEXT_PUBLIC_WP_URL}/wp-content/uploads/Kapak/kapaklar/datasecure1.jpg`,
    featured: false,
    link: '#'
  },
  {
    id: 4,
    title: 'Zero Trust Architecture in Critical Infrastructure: A Comprehensive Guide for 2026',
    date: 'May 04',
    image: `${process.env.NEXT_PUBLIC_WP_URL}/wp-content/uploads/Kapak/kapaklar/datadiode1.jpg`,
    featured: false,
    link: '#'
  }
];

async function getLatestPosts(locale: string): Promise<Post[]> {
  try {
    const { data } = await client.query({
      query: GET_ALL_POSTS,
      variables: { language: getGraphQLLocaleFilter(locale) },
      fetchPolicy: 'no-cache'
    });

    if (!data?.posts?.nodes) {
      return MOCK_POSTS;
    }

    return data.posts.nodes.slice(0, 4).map((post: any, index: number) => {
      const dateObj = new Date(post.date);
      const formattedDate = dateObj.toLocaleDateString(locale === 'ar' ? 'ar-SA' : locale === 'tr' ? 'tr-TR' : 'en-US', { month: 'short', day: 'numeric' });
      
      return {
        id: post.id || index,
        title: post.title,
        date: formattedDate,
        image: post.featuredImage?.node?.sourceUrl || '/images/blog/blog-1.avif',
        featured: index === 0,
        link: `/${locale}/resources/blog/${post.slug}`
      };
    });
  } catch (error) {
    console.error('Error fetching WordPress posts via GraphQL:', error);
    return MOCK_POSTS;
  }
}

export default async function LatestNews() {
  const locale = await getLocale();
  const posts = await getLatestPosts(locale);
  const featuredItem = posts.find(item => item.featured) || posts[0];
  const listItems = posts.filter(item => item.id !== featuredItem.id).slice(0, 3);
  const t = await getTranslations('Home.LatestNews');

  return (
    <section className={styles.section} id="news">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h2 className="display-lg">
              {t('title')} <span style={{ color: '#F5A706' }}>{t('titleHighlight')}</span>
            </h2>
            <button className={styles.viewAllBtn}>
              {t('viewAll')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.grid}>
          {/* Featured (Large) Item */}
          {featuredItem && (
            <a href={featuredItem.link} className={styles.featuredCard}>
              <div className={styles.featuredImageWrapper}>
                <img src={featuredItem.image} alt={featuredItem.title} className={styles.featuredImage} />
                <div className={styles.overlay}></div>
              </div>
              <div className={styles.featuredContent}>
                <div className={styles.date}>{featuredItem.date}</div>
                <h3 className={styles.featuredTitle}>{featuredItem.title}</h3>
                <div className={styles.readMore}>
                  {t('readArticle')}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#f5a706" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            </a>
          )}

          {/* List Items */}
          <div className={styles.listContainer}>
            {listItems.map((item) => (
              <a href={item.link} key={item.id} className={styles.listCard}>
                <div className={styles.listImageWrapper}>
                  <img src={item.image} alt={item.title} className={styles.listImage} />
                </div>
                <div className={styles.listContent}>
                  <div className={styles.date}>{item.date}</div>
                  <h3 className={styles.listTitle}>{item.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
