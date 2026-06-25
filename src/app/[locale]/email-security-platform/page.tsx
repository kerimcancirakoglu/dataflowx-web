import type { Metadata } from 'next';
import Nav from '@/components/Nav/Nav';
import ContactMini from '@/components/ContactMini/ContactMini';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import EmailSecurityAnimation from '@/components/EmailSecurityAnimation/EmailSecurityAnimation';
import EmailSecurityLayers from '@/components/EmailSecurityLayers/EmailSecurityLayers';
import EmailFeaturesTabs from '@/components/EmailFeaturesTabs/EmailFeaturesTabs';
import styles from './page.module.css';
import { getTranslations } from 'next-intl/server';
import { HreflangLinks } from '@/components/SEO/HreflangLinks';
import ProductSchema from '@/components/SEO/ProductSchema';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://www.dataflowx.com';

  return {
    title: 'Email Security Platform — AI-Powered Threat Detection & CDR',
    description:
      'DFX Email Security Platform: AI behavioral detection, deep CDR, and retrospective scanning. Zero Trust email gateway protecting critical infrastructure from phishing, BEC, and zero-day malware.',
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
    alternates: {
      canonical: `${baseUrl}/${locale}/email-security-platform`,
    },
    openGraph: {
      title: 'DFX Email Security Platform — AI + CDR Protection',
      description:
        'Self-learning AI + Deep CDR + Retrospective scanning. Zero Trust email protection against advanced persistent threats.',
      url: `${baseUrl}/${locale}/email-security-platform`,
      images: [{ url: `${baseUrl}/og/email-security.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'DFX Email Security Platform — AI + CDR Protection',
      description: 'Self-learning AI + Deep CDR + Retrospective scanning. Zero Trust email protection against advanced persistent threats.',
      images: [`${baseUrl}/og/email-security.jpg`],
    },
  };
}

export default async function EmailSecurityPage() {
  const t = await getTranslations('EmailSecurity.page');
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
      <Nav />

      {/* Opening hero statement (Image 4 reference) */}
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>
          <span style={{ color: '#F5A706' }}>DFX</span> {t('heroTitle')}
        </h1>
        <p className={styles.heroSubtitle}>
          {t('heroSubtitle')}
        </p>
        <div className={styles.buttonGroup}>
          <a href="#contact" className={styles.primaryButton}>{t('btn')}</a>
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
          <p className={styles.ugDetailsOverTitle}>{t('overviewOverTitle')}</p>
          <h2 className={styles.ugDetailsTitle}>{t('overviewTitle')}</h2>
          <p className={styles.ugDetailsDesc}>
            {t('overviewDesc')}
          </p>
        </div>
        <div className={styles.ugDetailsGrid}>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>{t('aiLabel')}</div>
            <p className={styles.ugDetailText}>
              {t('aiText')}
            </p>
          </div>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>{t('cdrLabel')}</div>
            <p className={styles.ugDetailText}>
              {t('cdrText')}
            </p>
          </div>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>{t('retroLabel')}</div>
            <p className={styles.ugDetailText}>
              {t('retroText')}
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
