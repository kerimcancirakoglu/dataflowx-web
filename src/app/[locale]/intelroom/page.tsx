import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import IntelContact from '@/components/IntelRoom/IntelContact';
import styles from './page.module.css';
import { getTranslations } from 'next-intl/server';
import VideoBackground from '@/components/VideoBackground/VideoBackground';

import IntelStoryScroll from '@/components/IntelRoom/IntelStoryScroll';
import IntelMeshVisualizer from '@/components/IntelRoom/IntelMeshVisualizer';
import IntelGlobalMap from '@/components/IntelRoom/IntelGlobalMap';
import IntelHeroMap from '@/components/IntelRoom/IntelHeroMap';
import IntelHeroGlobe from '@/components/IntelRoom/IntelHeroGlobe';
import IntelOracleEngine from '@/components/IntelRoom/IntelOracleEngine';
import { HreflangLinks } from '@/components/SEO/HreflangLinks';
import ProductSchema from '@/components/SEO/ProductSchema';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import { buildAlternates, SITE_URL } from '@/lib/seo-config';
import { getClient } from '@/sanity/lib/client';
import { productPageQuery } from '@/sanity/lib/queries';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { isEnabled: preview } = await draftMode();
  const sanityData = locale === 'en'
    ? await getClient(preview).fetch(productPageQuery, { slug: 'intelroom' })
    : null;

  const defaultTitle = 'DFX IntelRoom — Live Threat Intelligence Organism';
  const defaultDesc = 'DFX IntelRoom: Analyzes billions of signals, establishes context, and generates actionable decisions. Advanced Threat Intelligence platform for SOC, CISO, and MSSP.';

  return {
    title: sanityData?.seoTitle ?? defaultTitle,
    description: sanityData?.seoDescription ?? defaultDesc,
    keywords: [
      'threat intelligence',
      'intelroom',
      'siber istihbarat',
      'SOC',
      'MSSP',
      'CISO',
      'dataflowx intelroom',
    ],
    alternates: buildAlternates(locale, '/intelroom'),
    openGraph: {
      title: 'DFX IntelRoom — Live Threat Intelligence Organism',
      description: sanityData?.seoDescription ?? defaultDesc,
      url: `${SITE_URL}/${locale}/intelroom`,
      images: [{ url: `${SITE_URL}/og/intelroom.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'DFX IntelRoom — Live Threat Intelligence Organism',
      description: sanityData?.seoDescription ?? defaultDesc,
      images: [`${SITE_URL}/og/intelroom.jpg`],
    },
  };
}



export default async function IntelRoomPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('IntelRoom.page');
  const { isEnabled: preview } = await draftMode();
  const sanityData = locale === 'en'
    ? await getClient(preview).fetch(productPageQuery, { slug: 'intelroom' })
    : null;
  const PERSONAS = [
    {
      num: '01',
      title: t('p1Title'),
      desc: t('p1Desc'),
      image: `/Kapak/pexels-rsantos1232-3888149-scaled.jpg`,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      num: '02',
      title: t('p2Title'),
      desc: t('p2Desc'),
      image: `/Kapak/New-Project-2025-08-02T043719.908.jpg`,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
          <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      num: '03',
      title: t('p3Title'),
      desc: t('p3Desc'),
      image: `/Kapak/networksecurity.png`,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6h16v10H4V6z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    },
  ];
  return (
    <main className={styles.main}>
      <HreflangLinks slug="intelroom" />
      <BreadcrumbSchema 
        items={[
          { name: 'DataFlowX', url: 'https://www.dataflowx.com' },
          { name: 'Solutions', url: 'https://www.dataflowx.com' },
          { name: 'DFX IntelRoom', url: 'https://www.dataflowx.com/en/intelroom' }
        ]} 
      />
      <ProductSchema 
        name="DFX IntelRoom"
        description="Analyzes billions of signals, establishes context, and generates actionable decisions. Advanced Threat Intelligence platform for SOC, CISO, and MSSP."
        url="https://www.dataflowx.com/en/intelroom"
        image="https://www.dataflowx.com/og/intelroom.jpg"
        category="Cybersecurity Software"
      />
      <VideoBackground videoSrc="/intelroom-bg.mp4" opacity={0.4} playMode="scrub" />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className={styles.heroSection}>
        <div className={styles.heroContentWrapper}>
          <div className={styles.heroLeftContainer}>
            <h1 className="display-lg" style={{ marginBottom: '1.5rem', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
              {t('heroTitle1')}<br />
              {t('heroTitle2')}<span style={{ color: '#DC2626' }}>{t('heroTitle3')}</span>
            </h1>
            <p className="body-text" style={{ marginBottom: '3rem', maxWidth: '650px', fontSize: 'clamp(1rem, 1.5vw, 1.1rem)' }}>
              {t('heroSubtitle')}
            </p>
            <div className={styles.buttonGroup}>
              <a href="#contact" className={styles.primaryButton}>
                {t('btn')}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '8px' }}>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
          <div className={styles.heroRightContainer}>
            <IntelHeroMap />
          </div>
        </div>
      </section>

      {/* ── Visualizers & Components ──────────────────────────────── */}

      {/* 1. Layer Story Scroll */}
      <section className={styles.featuresSection} style={{ paddingBottom: 0 }}>
        <div className={styles.problemHeader} style={{ marginBottom: '2rem' }}>
          <p className={styles.sectionLabel}>{t('compLabel')}</p>
          <h2 className={styles.sectionTitle}>{t('compTitle')}</h2>
          <p className={styles.sectionDesc}>
            {t('compDesc')}
          </p>
        </div>
        <IntelStoryScroll />
      </section>

      {/* 2. Global Threat Map */}
      <section className={styles.featuresSection}>
        <div className={styles.problemHeader} style={{ marginBottom: '2rem' }}>
          <p className={styles.sectionLabel}>{t('relLabel')}</p>
          <h2 className={styles.sectionTitle}>{t('relTitle')}</h2>
          <p className={styles.sectionDesc}>
            {t('relDesc')}
          </p>
        </div>
        <IntelGlobalMap />
      </section>

      {/* 4. Oracle Engine */}
      <section className={styles.featuresSection}>
        <div className={styles.problemHeader}>
          <p className={styles.sectionLabel}>{t('expLabel')}</p>
          <h2 className={styles.sectionTitle}>{t('expTitle')}</h2>
          <p className={styles.sectionDesc}>
            {t('expDesc')}
          </p>
        </div>
        <IntelOracleEngine />
      </section>

      {/* ── Personas / Use Cases ─────────────────────────────────── */}
      <section className={styles.useCasesSection}>
        <div className={styles.problemHeader} style={{ marginBottom: '2rem' }}>
          <p className={styles.sectionLabel}>{t('whoLabel')}</p>
          <h2 className={styles.sectionTitle}>{t('whoTitle')}</h2>
          <p className={styles.sectionDesc}>
            {t('whoDesc')}
          </p>
        </div>
        <div className={styles.useCasesGrid}>
          {PERSONAS.map((uc) => (
            <div key={uc.num} className={styles.card}>
              <div
                className={styles.cardBg}
                style={{ backgroundImage: `url('${uc.image}')` }}
              />
              <div
                className={styles.cardOverlay}

              />
              <div className={styles.cardContent}>
                <div className={styles.iconWrapper}>
                  {uc.icon}
                </div>
                <h3 className={styles.cardTitle}>{uc.title}</h3>
                <p className={styles.cardDesc}>
                  {uc.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <IntelContact />
    </main>
  );
}
