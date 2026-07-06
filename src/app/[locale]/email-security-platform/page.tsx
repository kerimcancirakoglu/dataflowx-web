import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import dynamic from 'next/dynamic';
import ContactMini from '@/components/ContactMini/ContactMini';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import EmailSecurityAnimation from '@/components/EmailSecurityAnimation/EmailSecurityAnimation';
const EmailSecurityLayers = dynamic(() => import('@/components/EmailSecurityLayers/EmailSecurityLayers'), { ssr: false });
import EmailFeaturesTabs from '@/components/EmailFeaturesTabs/EmailFeaturesTabs';
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
    ? await getClient(preview).fetch(productPageQuery, { slug: 'email-security-platform' })
    : null;

  const defaultTitle = 'Email Security Platform — AI-Powered Threat Detection & CDR';
  const defaultDesc = 'DFX Email Security Platform: AI behavioral detection, deep CDR, and retrospective scanning. Zero Trust email gateway protecting critical infrastructure from phishing, BEC, and zero-day malware.';

  return {
    title: sanityData?.seoTitle ?? defaultTitle,
    description: sanityData?.seoDescription ?? defaultDesc,
    keywords: [
      'email security platform',
      'AI threat detection',
      'content disarm reconstruction',
      'CDR email',
      'anti-phishing',
      'BEC protection',
      'zero-day malware email',
      'email gateway security',
      'e-posta güvenlik platformu',
      'siber tehdit tespiti',
    ],
    alternates: buildAlternates(locale, '/email-security-platform'),
    openGraph: {
      title: 'DFX Email Security Platform — AI + CDR Protection',
      description: sanityData?.seoDescription ?? defaultDesc,
      url: `${SITE_URL}/${locale}/email-security-platform`,
      images: [{ url: `${SITE_URL}/og/email-security.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'DFX Email Security Platform — AI + CDR Protection',
      description: sanityData?.seoDescription ?? defaultDesc,
      images: [`${SITE_URL}/og/email-security.jpg`],
    },
  };
}

export default async function EmailSecurityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('EmailSecurity.page');
  const { isEnabled: preview } = await draftMode();
  const sanityData = locale === 'en'
    ? await getClient(preview).fetch(productPageQuery, { slug: 'email-security-platform' })
    : null;
  return (
    <main>
      <HreflangLinks slug="email-security-platform" />
      <BreadcrumbSchema 
        items={[
          { name: 'DataFlowX', url: 'https://www.dataflowx.com' },
          { name: 'Solutions', url: 'https://www.dataflowx.com' },
          { name: 'DFX Email Security Platform', url: 'https://www.dataflowx.com/en/email-security-platform' }
        ]} 
      />
      <ProductSchema 
        name="DFX Email Security Platform"
        description="Self-learning AI + Deep CDR + Retrospective scanning. Zero Trust email protection against advanced persistent threats."
        url="https://www.dataflowx.com/en/email-security-platform"
        image="https://www.dataflowx.com/og/email-security.jpg"
        category="Cybersecurity Software"
      />
      <VideoBackground />

      {/* Opening hero statement */}
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>
          <span style={{ color: '#F5A706' }}>DFX</span>{' '}
          {sanityData?.hero?.title ?? t('heroTitle')}
        </h1>
        <p className={styles.heroSubtitle}>
          {sanityData?.hero?.subtitle ?? t('heroSubtitle')}
        </p>
        <div className={styles.buttonGroup}>
          <a
            href={sanityData?.hero?.primaryButtonLink ?? '#contact'}
            className={styles.primaryButton}
          >
            {sanityData?.hero?.primaryButtonText ?? t('btn').replace(' ➔', '')}
          </a>
        </div>
      </div>

      <div className="section-spacer" aria-hidden="true" />

      {/* Interactive GSAP Diagram (Image 3 reference) */}
      <section style={{ padding: '0 2rem' }}>
        <EmailSecurityAnimation />
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* Vertical Isometric Layers (Image 5 reference) */}
      <section style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <EmailSecurityLayers />
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* Text Details (Product Overview) */}
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
              {sanityData?.overview?.infoBlocks?.[0]?.label ?? t('aiLabel')}
            </div>
            <p className={styles.ugDetailText}>
              {sanityData?.overview?.infoBlocks?.[0]?.text ?? t('aiText')}
            </p>
          </div>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>
              {sanityData?.overview?.infoBlocks?.[1]?.label ?? t('cdrLabel')}
            </div>
            <p className={styles.ugDetailText}>
              {sanityData?.overview?.infoBlocks?.[1]?.text ?? t('cdrText')}
            </p>
          </div>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>
              {sanityData?.overview?.infoBlocks?.[2]?.label ?? t('retroLabel')}
            </div>
            <p className={styles.ugDetailText}>
              {sanityData?.overview?.infoBlocks?.[2]?.text ?? t('retroText')}
            </p>
          </div>
        </div>
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* 6 Tabs Features Section */}
      <section style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <EmailFeaturesTabs />
      </section>

      <div className="section-spacer" aria-hidden="true" />

      <ContactMini />
    </main>
  );
}
