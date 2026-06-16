'use client';

import React from 'react';
import styles from './MTSFeaturesGrid.module.css';
import { useTranslations } from 'next-intl';

const FEATURE_IDS = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'] as const;

const FEATURE_ICONS = [
  (<svg key="f1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M12 8v4" /><circle cx="12" cy="16" r="0.5" fill="currentColor" /></svg>),
  (<svg key="f2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M12 8v4l3 3" /><circle cx="18" cy="18" r="4" fill="#F5A706" stroke="none" /></svg>),
  (<svg key="f3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><path d="M9 15l2 2 4-4" /></svg>),
  (<svg key="f4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>),
  (<svg key="f5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>),
  (<svg key="f6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /><rect x="9" y="8" width="6" height="8" rx="1" /></svg>),
];

export default function MTSFeaturesGrid() {
  const t = useTranslations('MTSFeaturesGrid');
  return (
    <div className={styles.grid}>
      {FEATURE_IDS.map((id, i) => (
        <div key={id} className={styles.card}>
          <div className={styles.iconWrapper}>
            {FEATURE_ICONS[i]}
          </div>
          <h4 className={styles.title}>{t(`${id}.title` as any)}</h4>
          <p className={styles.desc}>{t(`${id}.desc` as any)}</p>
        </div>
      ))}
    </div>
  );
}


