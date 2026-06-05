import Nav from '@/components/Nav/Nav';
import Contact from '@/components/Contact/Contact';
import DiodeModelViewerWrapper from '@/components/DiodeModelViewer/DiodeModelViewerWrapper';
import ProductSpecs from '@/components/ProductSpecs/ProductSpecs';
import FeaturesGrid from '@/components/FeaturesGrid/FeaturesGrid';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import BrokerFamily from '@/components/BrokerFamily/BrokerFamily';
import SecureRemoteAccessHero from '@/components/SecureRemoteAccessHero/SecureRemoteAccessHero';
import styles from './page.module.css';

export const metadata = {
  title: 'DFX Secure Remote Access | DataFlowX',
  description: 'Secure cross-domain solution enabling request-response based transmission between isolated networks via integrated DataBrokerX modules.',
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
            Secure Remote Access is a cross-domain solution that works in integration with DataDiodeX. It enables 
            request-response based transmission between isolated networks while providing full control over data traffic.
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
              Integrates with ICAP to route suspicious files to sandbox solutions (like DataSecureX) for 
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

      <Contact />
    </main>
  );
}
