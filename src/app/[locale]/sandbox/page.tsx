import { draftMode } from 'next/headers';
import Nav from '@/components/Nav/Nav';
import ContactMini from '@/components/ContactMini/ContactMini';
import SandboxFamily from '@/components/SandboxFamily/SandboxFamily';
import SandboxAnimation from '@/components/SandboxAnimation/SandboxAnimation';
import SandboxFeaturesGrid from '@/components/SandboxFeaturesGrid/SandboxFeaturesGrid';
import SandboxHero from '@/components/SandboxHero/SandboxHero';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import styles from './page.module.css';
import { getTranslations } from 'next-intl/server';
import { HreflangLinks } from '@/components/SEO/HreflangLinks';
import ProductSchema from '@/components/SEO/ProductSchema';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import { getClient } from '@/sanity/lib/client';
import { productPageQuery } from '@/sanity/lib/queries';

import type { Metadata } from 'next';
import { buildAlternates, SITE_URL } from '@/lib/seo-config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { isEnabled: preview } = await draftMode();
  const sanityData = locale === 'en'
    ? await getClient(preview).fetch(productPageQuery, { slug: 'sandbox' })
    : null;

  return {
    title: sanityData?.seoTitle
      ? { absolute: sanityData.seoTitle }
      : { absolute: 'DFX Malware Mitigation Sandbox — AI-Powered Threat Detection' },
    description: sanityData?.seoDescription ?? 'AI-powered sandbox detonating suspicious files in isolated VMs. YARA, MITRE ATT&CK integration. Zero-day threat prevention for OT/ICS networks.',
    keywords: ['malware sandbox', 'OT sandbox security', 'zero-day detection ICS', 'YARA sandbox', 'MITRE ATT&CK OT'],
    alternates: buildAlternates(locale, '/sandbox'),
    openGraph: {
      title: 'DFX Malware Mitigation Sandbox | DataFlowX',
      description: 'AI-powered sandbox for OT/ICS threat detection and zero-day prevention.',
      url: `${SITE_URL}/${locale}/sandbox`,
      images: [{
        url: `${SITE_URL}/og/sandbox.jpg`,
        width: 1200,
        height: 630,
        alt: 'DFX Sandbox Architecture — Isolated Threat Detonation',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'DFX Malware Mitigation Sandbox | DataFlowX',
      description: 'AI-powered sandbox detonating threats in isolated VMs. YARA + MITRE ATT&CK.',
      images: [`${SITE_URL}/og/sandbox.jpg`],
    },
  };
}

export default async function SandboxPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('Sandbox.page');
  const { isEnabled: preview } = await draftMode();
  const sanityData = locale === 'en'
    ? await getClient(preview).fetch(productPageQuery, { slug: 'sandbox' })
    : null;
  const overview = sanityData?.overview;
  const features = sanityData?.features;
  return (
    <main className={styles.main}>
      <HreflangLinks slug="sandbox" />
      <BreadcrumbSchema 
        items={[
          { name: 'DataFlowX', url: 'https://www.dataflowx.com' },
          { name: 'Solutions', url: 'https://www.dataflowx.com' },
          { name: 'DFX Malware Mitigation Sandbox', url: 'https://www.dataflowx.com/en/sandbox' }
        ]} 
      />
      <ProductSchema 
        name="DFX Malware Mitigation Sandbox"
        description="AI-powered sandbox detonating suspicious files in isolated VMs. YARA, MITRE ATT&CK integration. Zero-day threat prevention for OT/ICS networks."
        url="https://www.dataflowx.com/en/sandbox"
        image="https://www.dataflowx.com/og/sandbox.jpg"
        category="Cybersecurity Software"
      />
      <VideoBackground />
      <Nav />
      
      {/* Opening hero statement */}
      <div style={{ paddingTop: '8rem' }}>
        <SandboxHero />
      </div>

      <div className="section-spacer" aria-hidden="true" />

      {/* NEW: Multi-Channel Animation */}
      <section style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <SandboxAnimation />
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* Interactive Sandbox Animation Diagram */}
      <section style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <SandboxFamily />
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* Text Details */}
      <section className={styles.ugDetails} style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div className={styles.ugDetailsHeader}>
          <p className={styles.ugDetailsOverTitle}>{overview?.overTitle ?? t('overviewOverTitle')}</p>
          <h2 className={styles.ugDetailsTitle}>{overview?.title ?? t('overviewTitle')}</h2>
          <p className={styles.ugDetailsDesc}>
            {overview?.description ?? t('overviewDesc')}
          </p>
        </div>
        <div className={styles.ugDetailsGrid}>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>{overview?.infoBlocks?.[0]?.label ?? t('isoLabel')}</div>
            <p className={styles.ugDetailText}>
              {overview?.infoBlocks?.[0]?.text ?? t('isoText')}
            </p>
          </div>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>{overview?.infoBlocks?.[1]?.label ?? t('intLabel')}</div>
            <p className={styles.ugDetailText}>
              {overview?.infoBlocks?.[1]?.text ?? t('intText')}
            </p>
          </div>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>{overview?.infoBlocks?.[2]?.label ?? t('contentLabel')}</div>
            <p className={styles.ugDetailText}>
              {overview?.infoBlocks?.[2]?.text ?? t('contentText')}
            </p>
          </div>
        </div>
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* Sandbox Features Grid */}
      <section style={{ padding: '4rem 2rem 0', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', margin: '3rem 0 4rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-text-muted)', letterSpacing: '0.1em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
            {features?.overTitle ?? t('keyCapabilitiesLabel')}
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: '#ffffff' }}>
            {features?.title ?? t('keyCapabilitiesTitle')}
          </h2>
        </div>
        <SandboxFeaturesGrid />
      </section>

      <div className="section-spacer" aria-hidden="true" />
      
      <ContactMini />
    </main>
  );
}


