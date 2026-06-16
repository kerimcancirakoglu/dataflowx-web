import type { Metadata } from 'next';
import Nav from '@/components/Nav/Nav';
import ContactMini from '@/components/ContactMini/ContactMini';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import MTSHero from '@/components/MTSHero/MTSHero';
import MTSAnimation from '@/components/MTSAnimation/MTSAnimation';
import MTSModelViewer from '@/components/MTSModelViewer/MTSModelViewer';
import MTSModels from '@/components/MTSModels/MTSModels';
import MTSFeaturesGrid from '@/components/MTSFeaturesGrid/MTSFeaturesGrid';
import styles from './page.module.css';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Media Transfer Station — Secure USB & Removable Media Sanitization',
  description:
    'DFX Media Transfer Station: secure kiosk for USB and removable media sanitization using multi-engine AV and CDR. Prevents physical malware attacks on critical infrastructure.',
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
  alternates: {
    canonical: 'https://dataflowx.com/media-transfer-station',
  },
  openGraph: {
    title: 'DFX Media Transfer Station — USB & Removable Media Security',
    description:
      'Secure USB kiosk with multi-engine AV + CDR. Prevents physical malware attacks on critical OT networks.',
    url: 'https://dataflowx.com/media-transfer-station',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default async function MediaTransferStationPage() {
  const t = await getTranslations('MTS.page');
  return (
    <main className={styles.main}>
      <VideoBackground />
      <Nav />
      
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
          <p className={styles.ugDetailsOverTitle}>{t('overviewOverTitle')}</p>
          <h2 className={styles.ugDetailsTitle}>{t('overviewTitle')}</h2>
          <p className={styles.ugDetailsDesc}>
            {t('overviewDesc')}
          </p>
        </div>

        <div className={styles.ugDetailsGrid}>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>{t('protectsLabel')}</div>
            <p className={styles.ugDetailText}>
              {t('protectsText')}
            </p>
          </div>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>{t('industryLabel')}</div>
            <p className={styles.ugDetailText}>
              {t('industryText')}
            </p>
          </div>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>{t('advLabel')}</div>
            <p className={styles.ugDetailText}>
              {t('advText')}
            </p>
          </div>
        </div>
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* 3D Model Viewer */}
      <section style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <MTSModelViewer />
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
            {t('keyCapabilitiesLabel')}
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: '#ffffff' }}>
            {t('keyCapabilitiesTitle')}
          </h2>
        </div>
        <MTSFeaturesGrid />
      </section>

      <div className="section-spacer" aria-hidden="true" />
      
      <ContactMini />
    </main>
  );
}
