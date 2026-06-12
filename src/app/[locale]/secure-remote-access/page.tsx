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

export const metadata: Metadata = {
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
    canonical: 'https://dataflowx.com/secure-remote-access',
  },
  openGraph: {
    title: 'DFX Secure Remote Access — Zero Trust OT Access',
    description:
      'Request-response based secure access across isolated networks. Active Directory integration. ICAP sandbox support.',
    url: 'https://dataflowx.com/secure-remote-access',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function SecureRemoteAccessPage() {
  return (
    <main>
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
          <p className={styles.ugDetailsOverTitle}>PRODUCT OVERVIEW</p>
          <h2 className={styles.ugDetailsTitle}>Secure Cross-Domain Access</h2>
          <p className={styles.ugDetailsDesc}>
            DFX Secure Remote Access is a comprehensive Zero Trust cross-domain solution. It provides request-response based transmission between isolated networks with full visibility and control over data traffic, operating either independently or in seamless integration with DFX Unidirectional Gateway.
          </p>
        </div>
        <div className={styles.ugDetailsGrid}>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>ZERO TRUST NETWORK ACCESS</div>
            <p className={styles.ugDetailText}>
              Extends Zero Trust principles to remote operations by verifying every request, user, and payload 
              before allowing it to cross the physical optical boundary.
            </p>
          </div>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>CONTENT-AWARE FILTERING</div>
            <p className={styles.ugDetailText}>
              Performs protocol-specific granular filtering and can seamlessly integrate with Active Directory 
              to enforce access policies at the individual user or group level.
            </p>
          </div>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>SANDBOX INTEGRATION</div>
            <p className={styles.ugDetailText}>
              Integrates with ICAP to route suspicious files to sandbox solutions (like DFX Sandbox) for 
              detonation and analysis before they ever reach the protected network.
            </p>
          </div>
        </div>
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* Interactive 3D Model Viewer - keeping as Diode for now */}
      <section style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <DiodeModelViewerWrapper />
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* Product Catalog / Specs */}
      <section style={{ padding: '0 2rem' }}>
        <ProductSpecs />
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
