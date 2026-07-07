import React from 'react';
import styles from './GartnerTestimonial.module.css';
import { getTranslations } from 'next-intl/server';

export default async function GartnerTestimonial() {
  const t = await getTranslations('UDG.gartner');
  return (
    <section className={styles.container}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.content}>
        <h2 className={styles.headline}>
          {t('headlinePrefix')}{' '}
          <span className={styles.headlineHighlight}>{t('headlineHighlight')}</span>
        </h2>

        <p className={styles.quote}>
          {t('p1')}
          <br /><br />
          {t('p2')}
          <br /><br />
          {t('p3')}
        </p>

        <a href="#contact" className="btn-pill" style={{ marginTop: '3rem' }}>
          {t('btn')} 
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
