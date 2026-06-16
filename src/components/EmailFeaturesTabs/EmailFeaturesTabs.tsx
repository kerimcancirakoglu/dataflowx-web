'use client';

import React, { useState } from 'react';
import styles from './EmailFeaturesTabs.module.css';
import { useTranslations } from 'next-intl';

const TAB_IDS = ['phishing', 'malware', 'url', 'attachment', 'dlp', 'response'] as const;
type TabId = typeof TAB_IDS[number];

const TAB_ICONS: Record<TabId, React.ReactNode> = {
  phishing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  malware: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242M12 12v9"/>
      <path d="m8 17 4 4 4-4"/>
    </svg>
  ),
  url: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  attachment: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
    </svg>
  ),
  dlp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  response: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5M12 7v5l4 2"/>
    </svg>
  ),
};

export default function EmailFeaturesTabs() {
  const t = useTranslations('EmailFeaturesTabs');
  const [activeTab, setActiveTab] = useState<TabId>('phishing');

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.overTitle}>{t('overTitle')}</p>
        <h2 className={styles.title}>
          {t('title')} <span className={styles.highlight}>{t('titleHighlight')}</span>
        </h2>
      </div>

      <div className={styles.tabsContainer}>
        {/* Sidebar Tabs */}
        <div className={styles.tabList}>
          {TAB_IDS.map((id) => (
            <button
              key={id}
              className={`${styles.tabBtn} ${activeTab === id ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(id)}
            >
              <div className={styles.tabIcon}>{TAB_ICONS[id]}</div>
              <span className={styles.tabLabel}>{t(`${id}.label` as any)}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className={styles.contentArea}>
          <div className={styles.contentCard} key={activeTab}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>{TAB_ICONS[activeTab]}</div>
              <h3 className={styles.cardTitle}>{t(`${activeTab}.title` as any)}</h3>
            </div>
            <p className={styles.cardDesc}>{t(`${activeTab}.desc` as any)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
