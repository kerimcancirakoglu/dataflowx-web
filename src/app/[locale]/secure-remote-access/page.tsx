import type { Metadata } from 'next';
import Nav from '@/components/Nav/Nav';
import ContactMini from '@/components/ContactMini/ContactMini';
import DiodeModelViewerWrapper from '@/components/DiodeModelViewer/DiodeModelViewerWrapper';
import ProductSpecs from '@/components/ProductSpecs/ProductSpecs';
import FeaturesGrid from '@/components/FeaturesGrid/FeaturesGrid';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import BrokerFamily from '@/components/BrokerFamily/BrokerFamily';
import SecureRemoteAccessHero from '@/components/SecureRemoteAccessHero/SecureRemoteAccessHero';
import styles from './page.module.css';
import { getTranslations } from 'next-intl/server';
import { HreflangLinks } from '@/components/SEO/HreflangLinks';
import ProductSchema from '@/components/SEO/ProductSchema';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://www.dataflowx.com';
  return {
    title: 'Secure Remote Access — Zero Trust Cross-Domain Solution',
    description:
      'DFX Secure Remote Access: request-response based secure remote access across isolated OT/IT networks. Zero Trust architecture with Active Directory integration and ICAP sandbox support.',
    keywords: [
      'secure remote access',
      'cross-domain solution',
      'zero trust network access',
      'ZTNA OT security',
      'isolated network access',
      'ICS remote access',
      'SCADA remote access',
      'DataBrokerX',
      'güvenli uzak erişim',
    ],
    alternates: {
      canonical: `${baseUrl}/${locale}/secure-remote-access`,
    },
    openGraph: {
      title: 'DFX Secure Remote Access — Zero Trust OT Access',
      description:
        'Request-response based secure access across isolated networks. Active Directory integration. ICAP sandbox support.',
      url: `${baseUrl}/${locale}/secure-remote-access`,
      images: [{ url: `${baseUrl}/og/secure-remote-access.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'DFX Secure Remote Access — Zero Trust OT Access',
      description: 'Request-response based secure access across isolated networks. Active Directory integration. ICAP sandbox support.',
      images: [`${baseUrl}/og/secure-remote-access.jpg`],
    },
  };
}

export default async function SecureRemoteAccessPage() {
  const t = await getTranslations('SRA.page');
  return (
    <main>
      <HreflangLinks slug="secure-remote-access" />
      <BreadcrumbSchema 
        items={[
          { name: 'DataFlowX', url: 'https://www.dataflowx.com' },
          { name: 'Solutions', url: 'https://www.dataflowx.com' },
          { name: 'DFX Secure Remote Access', url: 'https://www.dataflowx.com/en/secure-remote-access' }
        ]} 
      />
      <ProductSchema 
        name="DFX Secure Remote Access"
        description="Request-response based secure access across isolated networks. Active Directory integration. ICAP sandbox support."
        url="https://www.dataflowx.com/en/secure-remote-access"
        image="https://www.dataflowx.com/og/secure-remote-access.jpg"
        category="Cybersecurity Software"
      />
      <VideoBackground />
      <Nav />

      {/* Opening hero statement */}
      <div style={{ paddingTop: '8rem' }}>
        <SecureRemoteAccessHero />
      </div>

      <div className="section-spacer" aria-hidden="true" />

      {/* Interactive hardware flow diagram */}
      <section style={{ padding: '0 2rem' }}>
        <BrokerFamily />
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* Text Details */}
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
            <div className={styles.ugDetailLabel}>{t('ztnaLabel')}</div>
            <p className={styles.ugDetailText}>
              {t('ztnaText')}
            </p>
          </div>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>{t('contentLabel')}</div>
            <p className={styles.ugDetailText}>
              {t('contentText')}
            </p>
          </div>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>{t('sandboxLabel')}</div>
            <p className={styles.ugDetailText}>
              {t('sandboxText')}
            </p>
          </div>
        </div>
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* Interactive 3D Model Viewer - keeping as Diode for now */}
      <section style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <DiodeModelViewerWrapper title="Secure Remote Access" modelPath="/models/Secure Remote Access.glb" />
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* Product Catalog / Specs */}
      <section style={{ padding: '0 2rem' }}>
        <ProductSpecs titleOverride="Secure Remote Access Models" modelNameOverride="Secure Remote Access" imagePath="/models/Secure Remote Access0001.png0001.png" />
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* Features Grid */}
      <section style={{ padding: '0 2rem' }}>
        <FeaturesGrid />
      </section>

      <div className="section-spacer" aria-hidden="true" />

      <ContactMini />
    </main>
  );
}
