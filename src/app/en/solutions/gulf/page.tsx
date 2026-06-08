import type { Metadata } from 'next';
import Nav from '@/components/Nav/Nav';
import Contact from '@/components/Contact/Contact';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Data Diode Solutions for Gulf Critical Infrastructure — UAE, Saudi, Qatar',
  description:
    'DataFlowX unidirectional gateway solutions for Gulf critical infrastructure. NCA (Saudi Arabia), NESA (UAE) compliant. Supporting energy, oil & gas, and government sectors across UAE, Saudi Arabia, and Qatar.',
  keywords: [
    'data diode UAE critical infrastructure',
    'unidirectional gateway Saudi Arabia',
    'NCA compliance unidirectional gateway',
    'NEOM cybersecurity OT solution',
    'Saudi Aramco industrial security',
    'ADNOC OT network security',
    'Qatar energy sector data diode',
    'Gulf OT security vendor',
    'NESA UAE cybersecurity',
    'critical infrastructure protection Gulf',
  ],
  alternates: {
    canonical: 'https://dataflowx.com/en/solutions/gulf',
  },
  openGraph: {
    title: 'DataFlowX — Data Diode Solutions for Gulf Critical Infrastructure',
    description:
      'NCA (Saudi Arabia) and NESA (UAE) compliant unidirectional gateway solutions. EAL4+ certified. Regional support across UAE, Saudi Arabia, and Qatar.',
    url: 'https://dataflowx.com/en/solutions/gulf',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'DataFlowX Unidirectional Gateway — Gulf Region',
  description:
    'EAL4+ certified hardware data diode and unidirectional gateway solutions for Gulf critical infrastructure. NCA and NESA compliant.',
  brand: { '@type': 'Brand', name: 'DataFlowX' },
  areaServed: ['AE', 'SA', 'QA', 'KW', 'BH', 'OM'],
  url: 'https://dataflowx.com/en/solutions/gulf',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does DataFlowX comply with Saudi Arabia NCA cybersecurity requirements?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. DataFlowX DataDiodeX supports compliance with Saudi Arabia\'s National Cybersecurity Authority (NCA) Essential Cybersecurity Controls (ECC) for critical infrastructure operators, particularly in the OT network isolation requirements.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is DataFlowX suitable for UAE NESA (IA Standards) compliance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DataFlowX provides hardware-enforced network isolation that aligns with UAE Information Assurance Standards (NESA) requirements for critical infrastructure operators, including energy, water, and government sectors.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does DataFlowX have regional support in the Gulf?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. DataFlowX maintains regional presence and partner network across the Gulf, providing Arabic language support, local deployment teams, and compliance guidance for Saudi NCA, UAE NESA, and Qatar NCSA requirements.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dataflowx.com' },
    { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://dataflowx.com/en/solutions' },
    { '@type': 'ListItem', position: 3, name: 'Gulf Region', item: 'https://dataflowx.com/en/solutions/gulf' },
  ],
};

export default function GulfSolutionsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className={styles.main}>
        <VideoBackground />
        <Nav />

        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.overline}>GULF REGION — UAE · SAUDI ARABIA · QATAR</p>
            <h1 className={styles.heroTitle}>
              Data Diode & Unidirectional Gateway Solutions for Gulf Critical Infrastructure
            </h1>
            <p className={styles.heroSubtitle}>
              DataFlowX provides <strong>EAL4+ certified</strong> hardware-enforced network isolation
              for energy, oil & gas, and government sectors across the Gulf. Compliant with
              Saudi Arabia <strong>NCA</strong> and UAE <strong>NESA</strong> cybersecurity requirements.
              Regional presence. Arabic language support.
            </p>
            <div className={styles.heroActions}>
              <a href="#contact" className={styles.primaryBtn}>Contact Gulf Team ➔</a>
              <a href="/unidirectional-gateway" className={styles.secondaryBtn}>Product Overview</a>
            </div>
          </div>
        </section>

        <div className="section-spacer" aria-hidden="true" />

        {/* Compliance Badges */}
        <section className={styles.section}>
          <p className={styles.overline}>REGULATORY COMPLIANCE</p>
          <h2 className={styles.sectionTitle}>Meeting Gulf Cybersecurity Standards</h2>
          <div className={styles.complianceGrid}>
            <div className={styles.compCard}>
              <div className={styles.compFlag}>🇸🇦</div>
              <h3 className={styles.compTitle}>Saudi Arabia NCA</h3>
              <p className={styles.compDesc}>
                National Cybersecurity Authority Essential Cybersecurity Controls (ECC).
                OT network isolation requirements for critical infrastructure operators.
              </p>
            </div>
            <div className={styles.compCard}>
              <div className={styles.compFlag}>🇦🇪</div>
              <h3 className={styles.compTitle}>UAE NESA</h3>
              <p className={styles.compDesc}>
                UAE Information Assurance Standards. Network segmentation and access control
                for energy, water, and government critical infrastructure.
              </p>
            </div>
            <div className={styles.compCard}>
              <div className={styles.compFlag}>🇶🇦</div>
              <h3 className={styles.compTitle}>Qatar NCSA</h3>
              <p className={styles.compDesc}>
                National Cybersecurity Agency requirements. Secure data transfer for
                Qatar's energy and LNG infrastructure.
              </p>
            </div>
            <div className={styles.compCard}>
              <div className={styles.compFlag}>🏆</div>
              <h3 className={styles.compTitle}>Global: IEC 62443 + EAL4+</h3>
              <p className={styles.compDesc}>
                IEC 62443 industrial cybersecurity standard + Common Criteria EAL4+
                hardware certification. Recognized by Gartner.
              </p>
            </div>
          </div>
        </section>

        <div className="section-spacer" aria-hidden="true" />

        {/* Key Sectors */}
        <section className={styles.section}>
          <div className={styles.sectorBlock}>
            <p className={styles.overline}>TARGET SECTORS</p>
            <h2 className={styles.sectionTitle}>Gulf Industries We Protect</h2>
            <div className={styles.sectorGrid}>
              <div className={styles.sectorItem}>
                <span className={styles.sectorIcon}>⛽</span>
                <strong>Oil & Gas</strong>
                <p>SCADA and DCS network isolation for upstream and downstream operations. Saudi Aramco, ADNOC supply chain security.</p>
              </div>
              <div className={styles.sectorItem}>
                <span className={styles.sectorIcon}>⚡</span>
                <strong>Energy & Utilities</strong>
                <p>Power generation and water desalination OT network protection. NEOM smart city infrastructure security.</p>
              </div>
              <div className={styles.sectorItem}>
                <span className={styles.sectorIcon}>🏛️</span>
                <strong>Government & Defense</strong>
                <p>Classified network isolation. Cross-domain data transfer for defense and intelligence networks.</p>
              </div>
              <div className={styles.sectorItem}>
                <span className={styles.sectorIcon}>🏦</span>
                <strong>Finance</strong>
                <p>OT security for banking infrastructure. Secure data transfer between core banking systems and monitoring networks.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="section-spacer" aria-hidden="true" />

        {/* FAQ */}
        <section className={styles.section} id="faq">
          <p className={styles.overline}>FREQUENTLY ASKED QUESTIONS</p>
          <h2 className={styles.sectionTitle}>Gulf Region — Common Questions</h2>
          <div className={styles.faqList}>
            {faqSchema.mainEntity.map((item) => (
              <details key={item.name} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>{item.name}</summary>
                <p className={styles.faqAnswer}>{item.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="section-spacer" aria-hidden="true" />

        <Contact />
      </main>
    </>
  );
}
