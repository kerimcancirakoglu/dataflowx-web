'use client';

import { useState, useMemo } from 'react';
import styles from './page.module.css';

type NewsCategory = 'All' | 'Press Release' | 'Company News' | 'In the Media';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: NewsCategory;
  date: string;
  year: string;
  link: string;
  image: string;
  featured?: boolean;
}

const mockNews: NewsItem[] = [
  {
    id: 'news-1',
    title: 'DataFlowX Awarded 2026 Cybersecurity Excellence Award',
    description: 'DataFlowX\'s DFX Unidirectional Gateway product won one of the industry\'s most prestigious awards in the "Critical Infrastructure Security" category.',
    category: 'Company News',
    date: 'May 15, 2026',
    year: '2026',
    link: '/news/news-1',
    image: '/Kapak/kapaklar/datamessage1.jpg',
    featured: true,
  },
  {
    id: 'news-2',
    title: 'New Partnership Announcement: DataFlowX and European Energy Consortium',
    description: 'We have signed a strategic partnership to secure critical energy infrastructures. The new agreement starts distribution in 5 major European countries.',
    category: 'Press Release',
    date: 'April 2, 2026',
    year: '2026',
    link: '/news/news-2',
    image: '/Kapak/kapaklar/databroker1.jpg',
  },
  {
    id: 'news-3',
    title: 'Global Tech Magazine: "DataFlowX, A Game Changer in OT Security"',
    description: 'Global Tech, one of the world\'s leading technology publications, reviewed the innovative approach of DataFlowX solutions in industrial security.',
    category: 'In the Media',
    date: 'March 18, 2026',
    year: '2026',
    link: '#',
    image: '/Kapak/kapaklar/datasecure1.jpg',
  },
  {
    id: 'news-4',
    title: 'Next-Generation DFX Secure Remote Access V2.0 Released',
    description: 'Setting new standards in secure remote access and Cross-Domain, DFX Secure Remote Access is now faster and more modular with its new version.',
    category: 'Press Release',
    date: 'January 5, 2026',
    year: '2026',
    link: '#',
    image: '/Kapak/kapaklar/datadiode1.jpg',
  },
  {
    id: 'news-5',
    title: 'The DFX Impact at CyberSec 2025 Conference',
    description: 'Our CEO\'s speech on "Zero Trust in OT Networks" drew great interest from attendees.',
    category: 'Company News',
    date: 'November 20, 2025',
    year: '2025',
    link: '#',
    image: '/Kapak/kapaklar/data3.jpg',
  },
  {
    id: 'news-6',
    title: 'The Wall Street Journal: The Rise of Local Technology in Critical Infrastructures',
    description: 'WSJ\'s special report analyzes how DataFlowX competes globally as a national company.',
    category: 'In the Media',
    date: 'October 10, 2025',
    year: '2025',
    link: '#',
    image: '/Kapak/kapaklar/datastation1.jpg',
  },
];

export default function NewsClient() {
  const featuredNews = mockNews.find(n => n.featured);
  
  const filteredNews = useMemo(() => {
    return mockNews.filter(n => !n.featured); // Exclude featured from grid
  }, []);

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
                <span className={styles.categoryBadge}>{featuredNews.category}</span>
                <span>{featuredNews.date}</span>
              </div>
              <h2 className={styles.heroTitle}>{featuredNews.title}</h2>
              <p className={styles.heroDesc}>{featuredNews.description}</p>
              <div className={styles.readMoreBtn} style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                Full Story Coming Soon
              </div>
            </div>
            <div className={styles.heroImageWrapper}>
              <img src={featuredNews.image} alt={featuredNews.title} className={styles.heroImage} />
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
                  <div className={styles.cardCategory}>{news.category}</div>
                  <img src={news.image} alt={news.title} className={styles.cardImage} />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardDate}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    {news.date}
                  </div>
                  <h3 className={styles.cardTitle}>{news.title}</h3>
                  <p className={styles.cardDesc}>{news.description}</p>
                  <div className={styles.cardLink} style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                    Coming Soon
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <h3>No News Found</h3>
              <p>There are currently no news items to display in this category.</p>
            </div>
          )}
        </div>

      </section>

    </div>
  );
}
