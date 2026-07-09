import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import ContactMini from '@/components/ContactMini/ContactMini';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import MTSHero from '@/components/MTSHero/MTSHero';
import MTSAnimation from '@/components/MTSAnimation/MTSAnimation';
import MTSModelViewerWrapper from '@/components/MTSModelViewer/MTSModelViewerWrapper';
import MTSModels from '@/components/MTSModels/MTSModels';
import MTSFeaturesGrid from '@/components/MTSFeaturesGrid/MTSFeaturesGrid';
import styles from './page.module.css';
import { getTranslations } from 'next-intl/server';
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
    ? await getClient(preview).fetch(productPageQuery, { slug: 'media-transfer-station' })
    : null;

  const defaultTitle = 'Media Transfer Station — Secure USB & Removable Media Sanitization';
  const defaultDesc = 'DFX Media Transfer Station: secure kiosk for USB and removable media sanitization using multi-engine AV and CDR. Prevents physical malware attacks on critical infrastructure.';

  return {
    title: sanityData?.seoTitle ?? defaultTitle,
    description: sanityData?.seoDescription ?? defaultDesc,
    keywords: [
      'media transfer station',
      'USB security kiosk',
      'removable media security',
      'CDR content disarm reconstruction',
      'USB sanitization',
      'physical attack vector',
      'malware prevention',
      'OT air gap USB',
      'USB güvenlik kiosk',
      'çıkarılabilir medya güvenliği',
    ],
    alternates: buildAlternates(locale, '/media-transfer-station'),
    openGraph: {
      title: 'DFX Media Transfer Station — USB & Removable Media Security',
      description: sanityData?.seoDescription ?? defaultDesc,
      url: `${SITE_URL}/${locale}/media-transfer-station`,
      images: [{ url: `${SITE_URL}/og/media-transfer-station.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'DFX Media Transfer Station — USB & Removable Media Security',
      description: sanityData?.seoDescription ?? defaultDesc,
      images: [`${SITE_URL}/og/media-transfer-station.jpg`],
    },
  };
}

export default async function MediaTransferStationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('MTS.page');
  const { isEnabled: preview } = await draftMode();
  const sanityData = locale === 'en'
    ? await getClient(preview).fetch(productPageQuery, { slug: 'media-transfer-station' })
    : null;
  return (
    <main className={styles.main}>
      <HreflangLinks slug="media-transfer-station" />
      <BreadcrumbSchema 
        items={[
          { name: 'DataFlowX', url: 'https://www.dataflowx.com' },
          { name: 'Solutions', url: 'https://www.dataflowx.com' },
          { name: 'DFX Media Transfer Station', url: 'https://www.dataflowx.com/en/media-transfer-station' }
        ]} 
      />
      <ProductSchema 
        name="DFX Media Transfer Station"
        description="Secure USB kiosk with multi-engine AV + CDR. Prevents physical malware attacks on critical OT networks."
        url="https://www.dataflowx.com/en/media-transfer-station"
        image="https://www.dataflowx.com/og/media-transfer-station.jpg"
        category="Cybersecurity Hardware"
      />
      <VideoBackground />
      
      {/* Hero Section */}
      <div style={{ paddingTop: '8rem' }}>
        <MTSHero />
      </div>

      <div className="section-spacer" aria-hidden="true" />

      {/* Animation Section */}
      <section style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <MTSAnimation />
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* Product Overview text block */}
      <section className={styles.ugDetails} style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div className={styles.ugDetailsHeader}>
          <p className={styles.ugDetailsOverTitle}>
            {sanityData?.overview?.overTitle ?? t('overviewOverTitle')}
          </p>
          <h2 className={styles.ugDetailsTitle}>
            {sanityData?.overview?.title ?? t('overviewTitle')}
          </h2>
          <p className={styles.ugDetailsDesc}>
            {sanityData?.overview?.description ?? t('overviewDesc')}
          </p>
        </div>

        <div className={styles.ugDetailsGrid}>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>
              {sanityData?.overview?.infoBlocks?.[0]?.label ?? t('protectsLabel')}
            </div>
            <p className={styles.ugDetailText}>
              {sanityData?.overview?.infoBlocks?.[0]?.text ?? t('protectsText')}
            </p>
          </div>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>
              {sanityData?.overview?.infoBlocks?.[1]?.label ?? t('industryLabel')}
            </div>
            <p className={styles.ugDetailText}>
              {sanityData?.overview?.infoBlocks?.[1]?.text ?? t('industryText')}
            </p>
          </div>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>
              {sanityData?.overview?.infoBlocks?.[2]?.label ?? t('advLabel')}
            </div>
            <p className={styles.ugDetailText}>
              {sanityData?.overview?.infoBlocks?.[2]?.text ?? t('advText')}
            </p>
          </div>
        </div>
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* 3D Model Viewer */}
      <section style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <MTSModelViewerWrapper
          datasheetUrl={locale === 'tr'
            ? 'https://cdn.sanity.io/files/15oto8dp/production/5bef34b392aeaafa7a63392e202498e642637aab.pdf'
            : 'https://cdn.sanity.io/files/15oto8dp/production/696accc5bea7ff5a4587c93640cae548fd0a3398.pdf'}
        />
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* Models Selection */}
      <section style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <MTSModels />
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* Features Grid */}
      <section style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-text-muted)', letterSpacing: '0.1em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
            {sanityData?.features?.overTitle ?? t('keyCapabilitiesLabel')}
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: '#ffffff' }}>
            {sanityData?.features?.title ?? t('keyCapabilitiesTitle')}
          </h2>
        </div>
        <MTSFeaturesGrid />
      </section>

      <div className="section-spacer" aria-hidden="true" />
      
      <ContactMini />
    </main>
  );
}
