'use client';

import React, { useEffect, useState } from 'react';
import styles from './BlogLayout.module.css';

export default function TableOfContents() {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Dynamically find all h2 and h3 inside the article content
    const article = document.getElementById('article-content');
    if (!article) return;

    const headingElements = Array.from(article.querySelectorAll('h2, h3'));
    const dynamicHeadings = headingElements.map((el, index) => {
      // Ensure each heading has an ID so anchor links work
      if (!el.id) {
        el.id = `heading-${index}`;
      }
      return {
        id: el.id,
        text: el.textContent || '',
        level: el.tagName === 'H2' ? 2 : 3,
      };
    });

    setHeadings(dynamicHeadings);
    
    if (dynamicHeadings.length > 0) {
      setActiveId(dynamicHeadings[0].id);
    }
  }, []);

  return (
    <div className={styles.toc}>
      <h4 className={styles.sidebarTitle}>Table of Contents</h4>
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
