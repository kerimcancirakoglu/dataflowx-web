import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { draftMode } from 'next/headers';
import styles from './page.module.css';
import PortXAnimation from '@/components/PortXAnimation/PortXAnimation';
import PortXModelViewerWrapper from '@/components/PortXModelViewer/PortXModelViewerWrapper';
import PortXFeaturesGrid from '@/components/PortXFeaturesGrid/PortXFeaturesGrid';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import Contact from '@/components/Contact/Contact';
import { getTranslations } from 'next-intl/server';
import { buildAlternates } from '@/lib/seo-config';
import { getClient } from '@/sanity/lib/client';
import { productPageQuery } from '@/sanity/lib/queries';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { isEnabled: preview } = await draftMode();
  const sanityData = locale === 'en'
    ? await getClient(preview).fetch(productPageQuery, { slug: 'portx' })
    : null;
  return {
    title: sanityData?.seoTitle ?? 'DFX Portable Access Security System | Hardware-Based Zero Trust Data Bridge | DFX',
    description: sanityData?.seoDescription ?? 'Eliminate the USB Risk. Keep the Workflow. DFX Portable Access Security System is a hardware-based Zero Trust secure data bridge purpose-built for industrial and operational environments.',
    alternates: buildAlternates(locale, '/portx'),
  };
}

export default async function PortXPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('PortX');
  const { isEnabled: preview } = await draftMode();
  const sanityData = locale === 'en'
    ? await getClient(preview).fetch(productPageQuery, { slug: 'portx' })
    : null;
  const hero = sanityData?.hero;
  const overview = sanityData?.overview;

  return (
    <>

      <main className={styles.pageWrapper}>
        <VideoBackground />

        {/* HERO SECTION */}
        <section className={styles.heroSection}>
          <div className={styles.overTitle}>{hero?.overTitle ?? t('hero.overTitle')}</div>
          <h1 className={styles.heroTitle}>
            {hero?.title ?? <>Hardware-Based Zero Trust <br /> Data Bridge</>}
          </h1>
          <p className={styles.heroSubtitle}>
            {hero?.subtitle ?? t('hero.subtitle')}
          </p>
          <div className={styles.buttonGroup}>
            <Link href={hero?.primaryButtonLink ?? '/contact'} className={styles.primaryButton}>
              {hero?.primaryButtonText ?? t('hero.reqDemo')}
            </Link>
            <Link href={hero?.secondaryButtonLink ?? '#animation'} className={styles.secondaryButton}>
              {hero?.secondaryButtonText ?? t('hero.howItWorks')}
            </Link>
          </div>
        </section>

        <div className="section-spacer" aria-hidden="true" />

        {/* OVERVIEW SECTION (DIODE STYLE) */}
        <section className={styles.ugDetails} style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
          <div className={styles.ugDetailsHeader}>
            <p className={styles.ugDetailsOverTitle}>{overview?.overTitle ?? t('overview.overTitle')}</p>
            <h2 className={styles.ugDetailsTitle}>{overview?.title ?? t('overview.title')}</h2>
            <p className={styles.ugDetailsDesc}>
              {overview?.description ?? t('overview.desc')}
            </p>
          </div>
          <div className={styles.ugDetailsGrid}>
            <div className={styles.ugDetailCard}>
              <div className={styles.ugDetailLabel}>{overview?.infoBlocks?.[0]?.label ?? t('overview.c1.label')}</div>
              <p className={styles.ugDetailText}>
                {overview?.infoBlocks?.[0]?.text ?? t('overview.c1.text')}
              </p>
            </div>
            <div className={styles.ugDetailCard}>
              <div className={styles.ugDetailLabel}>{overview?.infoBlocks?.[1]?.label ?? t('overview.c2.label')}</div>
              <p className={styles.ugDetailText}>
                {overview?.infoBlocks?.[1]?.text ?? t('overview.c2.text')}
              </p>
            </div>
            <div className={styles.ugDetailCard}>
              <div className={styles.ugDetailLabel}>{overview?.infoBlocks?.[2]?.label ?? t('overview.c3.label')}</div>
              <p className={styles.ugDetailText}>
                {overview?.infoBlocks?.[2]?.text ?? t('overview.c3.text')}
              </p>
            </div>
          </div>
        </section>

        <div className="section-spacer" aria-hidden="true" />

        {/* 3D MODEL VIEWER */}
        <section style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
          <PortXModelViewerWrapper />
        </section>

        <div className="section-spacer" aria-hidden="true" />

        {/* WHAT IS IT + ANIMATION */}
        <section id="animation" className={styles.overviewSection}>
          <div className={styles.overviewHeader}>
            <div className={styles.sectionLabel}>{t('animation.label')}</div>
            <h2 className={styles.sectionTitle}>{t('animation.title')}</h2>
            <p className={styles.sectionDesc} style={{ maxWidth: '800px' }}>
              {t('animation.desc')}
            </p>
          </div>
          
          <PortXAnimation />
        </section>

        <div className="section-spacer" aria-hidden="true" />

        {/* KEY BENEFITS (FEATURES GRID) */}
        <section style={{ padding: '0 2rem' }}>
          <div className={styles.overviewHeader} style={{ marginBottom: '3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className={styles.sectionLabel}>{t('benefits.label')}</div>
            <h2 className={styles.sectionTitle}>{t('benefits.title')}</h2>
          </div>
          <PortXFeaturesGrid />
        </section>

        <div className="section-spacer" aria-hidden="true" />

        {/* THE PROBLEM */}
        <section className={styles.problemSection}>
          <div className={styles.problemHeader}>
            <div className={styles.sectionLabel}>{t('problem.label')}</div>
            <h2 className={styles.sectionTitle}>{t('problem.title')}</h2>
            <p className={styles.sectionDesc}>
              {t('problem.desc')}
            </p>
          </div>

          <div className={styles.problemGrid}>
            <div className={styles.problemCard}>
              <div className={styles.problemIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className={styles.problemCardTitle}>{t('problem.c1.title')}</h3>
              <p className={styles.problemCardText}>
                {t('problem.c1.text')}
              </p>
            </div>

            <div className={styles.problemCard}>
              <div className={styles.problemIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className={styles.problemCardTitle}>{t('problem.c2.title')}</h3>
              <p className={styles.problemCardText}>
                {t('problem.c2.text')}
              </p>
            </div>

            <div className={styles.problemCard}>
              <div className={styles.problemIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className={styles.problemCardTitle}>{t('problem.c3.title')}</h3>
              <p className={styles.problemCardText}>
                {t('problem.c3.text')}
              </p>
            </div>
          </div>
        </section>

        <div className="section-spacer" aria-hidden="true" />

        {/* USE CASES */}
        <section className={styles.useCasesSection}>
          <div className={styles.useCasesHeader}>
            <div className={styles.sectionLabel}>{t('useCases.label')}</div>
            <h2 className={styles.sectionTitle}>{t('useCases.title')}</h2>
          </div>

          <div className={styles.useCasesGrid}>
            <div className={styles.useCaseCard}>
              <h3 className={styles.useCaseTitle}>{t('useCases.c1.title')}</h3>
              <p className={styles.useCaseText}>
                {t('useCases.c1.text')}
              </p>
            </div>

            <div className={styles.useCaseCard}>
              <h3 className={styles.useCaseTitle}>{t('useCases.c2.title')}</h3>
              <p className={styles.useCaseText}>
                {t('useCases.c2.text')}
              </p>
            </div>

            <div className={styles.useCaseCard}>
              <h3 className={styles.useCaseTitle}>{t('useCases.c3.title')}</h3>
              <p className={styles.useCaseText}>
                {t('useCases.c3.text')}
              </p>
            </div>
          </div>
        </section>

        <div className="section-spacer" aria-hidden="true" />

        <Contact />

      </main>
    </>
  );
}
