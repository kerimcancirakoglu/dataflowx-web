'use client';

import React, { useEffect, useState } from 'react';
import styles from './BlogLayout.module.css';

export default function TableOfContents() {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // In a real app with dynamic HTML, we'd querySelectorAll('h2, h3') inside the article
    // For this mock, we'll hardcode based on our mock data, but structure it dynamically.
    const mockHeadings = [
      { id: 'need-for-deep', text: 'The Need for Deep File Inspection', level: 2 },
      { id: 'what-is-cdr', text: 'What is CDR?', level: 3 },
      { id: 'top-8-vendors', text: 'Top 8 CDR Vendors in 2026', level: 2 },
      { id: 'conclusion', text: 'Conclusion', level: 2 },
    ];
    setHeadings(mockHeadings);
    setActiveId('need-for-deep');
  }, []);

  return (
    <div className={styles.toc}>
      <h4 className={styles.sidebarTitle}>İçindekiler</h4>
      <ul className={styles.tocList}>
        {headings.map((heading) => (
          <li 
            key={heading.id} 
            className={`${styles.tocItem} ${heading.level === 3 ? styles.tocItemSub : ''} ${activeId === heading.id ? styles.tocItemActive : ''}`}
          >
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
