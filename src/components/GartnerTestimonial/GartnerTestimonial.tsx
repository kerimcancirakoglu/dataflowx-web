import React from 'react';
import styles from './GartnerTestimonial.module.css';
import { getTranslations } from 'next-intl/server';

export default async function GartnerTestimonial() {
  const t = await getTranslations('UDG.gartner');
  return (
    <section className={styles.container}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.content}>
        <div className={styles.badgePlaceholder}>
          <div className={styles.badgeInner}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F5A706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1 3-6z" />
            </svg>
            <span className={styles.badgeText}><span dangerouslySetInnerHTML={{ __html: t('badgeText') }} /></span>
          </div>
        </div>
        <h2 className={styles.headline}>
          {t('headlinePrefix')} 
          <span className={styles.headlineHighlight}>{t('headlineHighlight')}</span>
        </h2>

        <p className={styles.quote}>
          {t('p1')}
          <br /><br />
          {t('p2')}
          <br /><br />
          {t('p3')}
        </p>

        <a href="#contact" className={styles.getInfoButton}>
          {t('btn')} <span className={styles.arrow}>→</span>
        </a>
      </div>
    </section>
  );
}
