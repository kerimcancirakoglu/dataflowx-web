import React from 'react';
import styles from './LatestNews.module.css';

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
    image: '/images/blog/blog-1.avif',
    featured: true,
    link: '#'
  },
  {
    id: 2,
    title: 'OT Security Alert: How the "Broken Windows Theory" Predicts Your Next Breach',
    date: 'May 18',
    image: '/images/blog/blog-2.avif',
    featured: false,
    link: '#'
  },
  {
    id: 3,
    title: 'How AI Models Like Claude are Targeting SCADA Infrastructure: Monterrey Water Utility Breach',
    date: 'May 11',
    image: '/images/blog/blog-3.avif',
    featured: false,
    link: '#'
  },
  {
    id: 4,
    title: 'Zero Trust Architecture in Critical Infrastructure: A Comprehensive Guide for 2026',
    date: 'May 04',
    image: '/images/blog/blog-1.avif',
    featured: false,
    link: '#'
  }
];

async function getLatestPosts(): Promise<Post[]> {
  const wpUrl = process.env.WORDPRESS_API_URL;
  if (!wpUrl) {
    return MOCK_POSTS;
  }
  
  try {
    const res = await fetch(`${wpUrl}/wp-json/wp/v2/posts?_embed&per_page=4`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch posts');
    const posts = await res.json();
    
    return posts.map((post: any, index: number) => {
      const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/blog/blog-1.avif';
      const dateObj = new Date(post.date);
      const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      // Decode HTML entities in title
      const title = post.title.rendered.replace(/&#(\d+);/g, (match: string, dec: string) => String.fromCharCode(dec as any)).replace(/&[#A-Za-z0-9]+;/g, '');

      return {
        id: post.id,
        title: title,
        date: formattedDate,
        image: imageUrl,
        featured: index === 0,
        link: post.link
      };
    });
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    return MOCK_POSTS;
  }
}

export default async function LatestNews() {
  const posts = await getLatestPosts();
  const featuredItem = posts.find(item => item.featured) || posts[0];
  const listItems = posts.filter(item => item.id !== featuredItem.id).slice(0, 3);

  return (
    <section className={styles.section} id="news">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h2 className="display-lg">
              Read the <span style={{ color: '#F5A706' }}>latest news</span>
            </h2>
            <button className={styles.viewAllBtn}>
              View All
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
                  Read Article
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
