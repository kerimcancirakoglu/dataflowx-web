import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import Contact from '@/components/Contact/Contact';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import CDRAnimation from '@/components/CDRAnimation/CDRAnimation';
import styles from './page.module.css';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import { buildAlternates } from '@/lib/seo-config';
import { getClient } from '@/sanity/lib/client';
import { productPageQuery } from '@/sanity/lib/queries';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { isEnabled: preview } = await draftMode();
  const sanityData = locale === 'en'
    ? await getClient(preview).fetch(productPageQuery, { slug: 'dfx-cdr' })
    : null;
  return {
    title: sanityData?.seoTitle ?? 'DFX CDR — Content Disarm & Reconstruction Platform',
    description: sanityData?.seoDescription ??
      'DFX CDR neutralizes file-borne threats before they reach your users. A reconstruction-first security control that disarms weaponized content and delivers safe, usable files across email, M365, SharePoint, OneDrive, and removable media.',
    keywords: [
      'content disarm and reconstruction',
      'CDR platform',
      'file security',
      'DFX CDR',
      'malware file protection',
      'email attachment security',
      'M365 file disarm',
      'SharePoint security',
      'zero trust file transfer',
      'reconstruction-first security',
    ],
    alternates: buildAlternates(locale, '/dfx-cdr'),
    openGraph: {
      title: 'DFX CDR — Disarm Weaponized Content. Deliver Safe Files.',
      description:
        'Reconstruction-first security for hostile file workflows. DFX CDR removes risky content and rebuilds safe, usable files across your entire organization.',
      url: `https://dataflowx.com/${locale}/dfx-cdr`,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
  };
}

export default async function CDRPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('DFX CDR');
  const { isEnabled: preview } = await draftMode();
  const sanityData = locale === 'en'
    ? await getClient(preview).fetch(productPageQuery, { slug: 'dfx-cdr' })
    : null;
  const hero = sanityData?.hero;
  const featuresSection = sanityData?.features;

  const FEATURES: Array<{ label: string; text: string }> = featuresSection?.items?.length
    ? featuresSection.items.map((item: { title: string; description: string }) => ({
        label: item.title,
        text: item.description,
      }))
    : [
        { label: t('features.f1.label'), text: t('features.f1.text') },
        { label: t('features.f2.label'), text: t('features.f2.text') },
        { label: t('features.f3.label'), text: t('features.f3.text') },
        { label: t('features.f4.label'), text: t('features.f4.text') },
        { label: t('features.f5.label'), text: t('features.f5.text') },
        { label: t('features.f6.label'), text: t('features.f6.text') },
      ];

  const BENEFITS = [
    { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ), 
      title: t('benefits.b1.title'), 
      desc: t('benefits.b1.desc') 
    },
    { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      ), 
      title: t('benefits.b2.title'), 
      desc: t('benefits.b2.desc') 
    },
    { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
          <path d="M9 11l2 2 4-4"/>
        </svg>
      ), 
      title: t('benefits.b3.title'), 
      desc: t('benefits.b3.desc') 
    },
    { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
        </svg>
      ), 
      title: t('benefits.b4.title'), 
      desc: t('benefits.b4.desc') 
    },
    { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
        </svg>
      ), 
      title: t('benefits.b5.title'), 
      desc: t('benefits.b5.desc') 
    },
    { 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"/>
        </svg>
      ), 
      title: t('benefits.b6.title'), 
      desc: t('benefits.b6.desc') 
    },
  ];

  return (
    <main>
      <VideoBackground />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className={styles.heroSection}>
        <p className={styles.overTitle}>{hero?.overTitle ?? t('hero.overTitle')}</p>
        <h1 className={styles.heroTitle}>
          <span style={{ color: '#F5A706' }}>DFX</span> CDR
        </h1>
        <p className={styles.heroSubtitle}>
          {hero?.subtitle ?? t('hero.subtitle')}
        </p>
        <div className={styles.buttonGroup}>
          <a href={hero?.primaryButtonLink ?? '#contact'} className="btn-pill">
            {hero?.primaryButtonText ?? t('hero.reqDemo')}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '8px' }}>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href={hero?.secondaryButtonLink ?? '#use-cases'} className="btn-pill" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
            {hero?.secondaryButtonText ?? t('hero.reviewOpts')}
          </a>
        </div>
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* ── CDR Animation ─────────────────────────────── */}
      <section style={{ padding: '0 2rem' }}>
        <CDRAnimation />
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* ── Problem Statement ─────────────────────────── */}
      <section className={styles.problemSection}>
        <div className={styles.problemHeader}>
          <p className={styles.sectionLabel}>{t('problem.label')}</p>
          <h2 className={styles.sectionTitle}>{t('problem.title')}</h2>
        </div>
        <div className={styles.problemGrid}>
          <div className={styles.problemCard}>
            <div className={styles.problemIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <path d="M12 9v4"/>
                <path d="M12 17h.01"/>
              </svg>
            </div>
            <h3 className={styles.problemCardTitle}>{t('problem.c1.title')}</h3>
            <p className={styles.problemCardText}>
              {t('problem.c1.text')}
            </p>
          </div>
          <div className={styles.problemCard}>
            <div className={styles.problemIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M4.93 4.93l14.14 14.14"/>
              </svg>
            </div>
            <h3 className={styles.problemCardTitle}>{t('problem.c2.title')}</h3>
            <p className={styles.problemCardText}>
              {t('problem.c2.text')}
            </p>
          </div>
          <div className={styles.problemCard}>
            <div className={styles.problemIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 20V10"/>
                <path d="M12 20V4"/>
                <path d="M6 20v-6"/>
              </svg>
            </div>
            <h3 className={styles.problemCardTitle}>{t('problem.c3.title')}</h3>
            <p className={styles.problemCardText}>
              {t('problem.c3.text')}
            </p>
          </div>
        </div>
        <div className={styles.problemQuote}>
          <span className={styles.quoteAccent}>"</span>
          <span dangerouslySetInnerHTML={{ __html: t.raw('problem.quote') }} />
          <span className={styles.quoteAccent}>"</span>
        </div>
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* ── Key Features ──────────────────────────────── */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresHeader}>
          <p className={styles.sectionLabel}>{featuresSection?.overTitle ?? t('features.label')}</p>
          <h2 className={styles.sectionTitle}>{featuresSection?.title ?? t('features.title')}</h2>
          <p className={styles.sectionDesc}>
            {featuresSection?.description ?? t('features.desc')}
          </p>
        </div>
        <div className={styles.featuresGrid}>
          {FEATURES.map((f) => (
            <div key={f.label} className={styles.featureCard}>
              <div className={styles.featureLabel}>{f.label}</div>
              <p className={styles.featureText}>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* ── Benefits ──────────────────────────────────── */}
      <section className={styles.benefitsSection}>
        <div className={styles.benefitsHeader}>
          <p className={styles.sectionLabel}>{t('benefits.label')}</p>
          <h2 className={styles.sectionTitle}>{t('benefits.title')}</h2>
        </div>
        <div className={styles.benefitsGrid}>
          {BENEFITS.map((b) => (
            <div key={b.title} className={styles.benefitCard}>
              <div className={styles.benefitIconWrapper}>
                {b.icon}
              </div>
              <h3 className={styles.benefitTitle}>{b.title}</h3>
              <p className={styles.benefitDesc}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-spacer" aria-hidden="true" />



      {/* ── Competitive Positioning ───────────────────── */}
      <section className={styles.vsSection}>
        <p className={styles.sectionLabel}>{t('vs.label')}</p>
        <h2 className={styles.sectionTitle}>{t('vs.title')}</h2>
        <div className={styles.vsGrid}>
          {[
            { vs: t('vs.v1.vs'), text: t('vs.v1.text') },
            { vs: t('vs.v2.vs'), text: t('vs.v2.text') },
            { vs: t('vs.v3.vs'), text: t('vs.v3.text') },
            { vs: t('vs.v4.vs'), text: t('vs.v4.text') },
          ].map((item) => (
            <div key={item.vs} className={styles.vsCard}>
              <span className={styles.vsLabel}>{item.vs}</span>
              <p className={styles.vsText}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-spacer" aria-hidden="true" />

      <Contact />
    </main>
  );
}
