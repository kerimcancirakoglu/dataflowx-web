import Nav from '@/components/Nav/Nav';
import Contact from '@/components/Contact/Contact';
import GartnerTestimonial from '@/components/GartnerTestimonial/GartnerTestimonial';
import DiodeModelViewerWrapper from '@/components/DiodeModelViewer/DiodeModelViewerWrapper';
import ProductSpecs from '@/components/ProductSpecs/ProductSpecs';
import FeaturesGrid from '@/components/FeaturesGrid/FeaturesGrid';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import GatewayFamily from '@/components/GatewayFamily/GatewayFamily';
import styles from './page.module.css';

export const metadata = {
  title: 'DFX Unidirectional Gateway | DataFlowX',
  description: 'Hardware-enforced one-way data transfer securing critical infrastructure against cyber threats with Zero Trust principles.',
};

export default function UnidirectionalGatewayPage() {
  return (
    <main>
      <VideoBackground />
      <Nav />

      {/* Opening hero statement */}
      <div style={{ paddingTop: '8rem' }}>
        <GartnerTestimonial />
      </div>

      <div className="section-spacer" aria-hidden="true" />

      {/* Interactive hardware flow diagram — replaces the old static diagram */}
      <section style={{ padding: '0 2rem' }}>
        <GatewayFamily />
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* UG Text Details — the content from the old diagram's right column, now as full-width text */}
      <section className={styles.ugDetails} style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div className={styles.ugDetailsHeader}>
          <p className={styles.ugDetailsOverTitle}>PRODUCT OVERVIEW</p>
          <h2 className={styles.ugDetailsTitle}>Unidirectional Gateway</h2>
          <p className={styles.ugDetailsDesc}>
            DFX UDG is a diode-based gateway operating on Zero Trust principles. It physically isolates
            critical networks, allowing only authorized one-way data transmission.
          </p>
        </div>
        <div className={styles.ugDetailsGrid}>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>HOW IT PROTECTS YOUR CRITICAL INFRASTRUCTURE</div>
            <p className={styles.ugDetailText}>
              Secures sensitive infrastructures by completely neutralizing threats and making reverse data
              flow physically impossible.
            </p>
          </div>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>GARTNER RECOGNITION</div>
            <p className={styles.ugDetailText}>
              We are proud to be recognized as a Sample Vendor in the Gartner Hype Cycle for CPS Security,
              in the Unidirectional Gateways category, for the third consecutive year.
            </p>
          </div>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>EAL4+ CERTIFICATION</div>
            <p className={styles.ugDetailText}>
              Furthermore, DFX UDG holds the EAL4+ Common Criteria certification, ensuring the highest
              level of hardware-enforced, one-way data transfer technology in protecting critical infrastructure.
            </p>
          </div>
        </div>
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* Interactive 3D Model Viewer */}
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
