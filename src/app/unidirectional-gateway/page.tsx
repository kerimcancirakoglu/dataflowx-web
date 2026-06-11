import type { Metadata } from 'next';
import Nav from '@/components/Nav/Nav';
import ContactMini from '@/components/ContactMini/ContactMini';
import GartnerTestimonial from '@/components/GartnerTestimonial/GartnerTestimonial';
import DiodeModelViewerWrapper from '@/components/DiodeModelViewer/DiodeModelViewerWrapper';
import ProductSpecs from '@/components/ProductSpecs/ProductSpecs';
import FeaturesGrid from '@/components/FeaturesGrid/FeaturesGrid';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import GatewayFamily from '@/components/GatewayFamily/GatewayFamily';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Unidirectional Gateway & Data Diode — OT/SCADA Security',
  description:
    'DFX Unidirectional Gateway: EAL4+ certified hardware-enforced unidirectional gateway for OT/SCADA security. Physically isolates critical networks — recognized by Gartner for 3 consecutive years.',
  keywords: [
    'unidirectional gateway',
    'data diode',
    'OT security',
    'SCADA security',
    'ICS cybersecurity',
    'EAL4+ certified',
    'critical infrastructure protection',
    'hardware enforced security',
    'data diyodu',
    'tek yönlü ağ geçidi',
  ],
  alternates: {
    canonical: 'https://dataflowx.com/unidirectional-gateway',
  },
  openGraph: {
    title: 'DFX Unidirectional Gateway — EAL4+ Certified',
    description:
      'Hardware-enforced one-way data transfer. Gartner-recognized. EAL4+ certified. Securing energy, defense, and critical infrastructure.',
    url: 'https://dataflowx.com/unidirectional-gateway',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

// Product structured data
const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'DFX Unidirectional Gateway',
  description:
    'EAL4+ certified hardware-enforced unidirectional gateway for OT/SCADA security. Physically prevents reverse data flow, securing critical infrastructure against cyber threats.',
  brand: { '@type': 'Brand', name: 'DataFlowX' },
  manufacturer: { '@type': 'Organization', name: 'DataFlowX', url: 'https://dataflowx.com' },
  category: 'Cybersecurity Hardware',
  url: 'https://dataflowx.com/unidirectional-gateway',
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'Certification', value: 'Common Criteria EAL4+' },
    { '@type': 'PropertyValue', name: 'Technology', value: 'Hardware-enforced optical diode' },
    { '@type': 'PropertyValue', name: 'Compliance', value: 'IEC 62443, NERC CIP, NIS2, IEC 62443' },
    { '@type': 'PropertyValue', name: 'Recognition', value: 'Gartner Hype Cycle for CPS Security' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a unidirectional gateway?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A unidirectional gateway (also called a data diode) is a hardware device that physically enforces one-way data flow between networks. It makes reverse data transfer physically impossible, providing absolute protection for critical OT/SCADA networks.',
      },
    },
    {
      '@type': 'Question',
      name: 'What certifications does DFX Unidirectional Gateway hold?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DFX Unidirectional Gateway holds the EAL4+ Common Criteria certification and is recognized by Gartner in the Hype Cycle for CPS Security in the Unidirectional Gateways category for three consecutive years.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which industries use unidirectional gateways?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Unidirectional gateways are used in energy (power plants, oil & gas, SCADA), defense, nuclear facilities, water treatment, finance, and any critical infrastructure requiring absolute network isolation.',
      },
    },
  ],
};

export default function UnidirectionalGatewayPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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

      <ContactMini />
    </main>
    </>
  );
}
