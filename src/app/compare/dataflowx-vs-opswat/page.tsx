import type { Metadata } from 'next';
import Nav from '@/components/Nav/Nav';
import ContactMini from '@/components/ContactMini/ContactMini';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'DataFlowX vs OPSWAT — Data Diode & Unidirectional Gateway Comparison',
  description:
    'Comparing DataFlowX DFX Unidirectional Gateway vs OPSWAT MetaDefender: EAL4+ certification, regional support, TCO, and deployment. OPSWAT alternative with local support in Turkey, Gulf, and Balkans.',
  keywords: [
    'OPSWAT alternative',
    'OPSWAT MetaDefender alternative',
    'DataFlowX vs OPSWAT',
    'data diode comparison',
    'unidirectional gateway comparison',
    'OPSWAT alternatifi Türkiye',
    'yerli data diode ürünü',
    'OT security vendor comparison',
    'EAL4+ data diode',
    'unidirectional gateway fiyat',
    'data diode çözüm karşılaştırma',
  ],
  alternates: {
    canonical: 'https://dataflowx.com/compare/dataflowx-vs-opswat',
  },
  openGraph: {
    title: 'DataFlowX vs OPSWAT MetaDefender — Full Comparison',
    description:
      'EAL4+ certification, regional support, TCO analysis. See why organizations in Turkey, Gulf, and Europe choose DataFlowX over OPSWAT.',
    url: 'https://dataflowx.com/compare/dataflowx-vs-opswat',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between DataFlowX and OPSWAT MetaDefender?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DataFlowX DFX Unidirectional Gateway is a hardware-enforced unidirectional gateway with EAL4+ Common Criteria certification, making reverse data flow physically impossible. OPSWAT MetaDefender is primarily a content inspection and CDR software platform. DataFlowX provides absolute network isolation at the hardware level, while OPSWAT focuses on file-based threat prevention.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does DataFlowX have local support in Turkey and the Gulf?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. DataFlowX is headquartered in Turkey and provides direct regional support across Turkey, Gulf countries (UAE, Saudi Arabia, Qatar), and Balkans. This includes local deployment teams, Turkish and Arabic language support, and compliance guidance for regional regulations like BDDK, EPDK, and Saudi NCA.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is DataFlowX EAL4+ certified?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. DataFlowX DFX Unidirectional Gateway holds the EAL4+ Common Criteria certification, the highest level of independently verified security assurance for cybersecurity hardware. It is also recognized by Gartner in the Hype Cycle for CPS Security.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the total cost of ownership (TCO) of DataFlowX vs OPSWAT?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DataFlowX provides transparent regional pricing with local deployment support, eliminating hidden costs associated with international vendor travel, remote-only support, and regional compliance consulting. For Turkey and Gulf deployments, DataFlowX typically results in lower TCO due to local presence and faster deployment cycles.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dataflowx.com' },
    { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://dataflowx.com/compare' },
    { '@type': 'ListItem', position: 3, name: 'DataFlowX vs OPSWAT', item: 'https://dataflowx.com/compare/dataflowx-vs-opswat' },
  ],
};

const comparisonData = [
  {
    feature: 'Technology Type',
    dfx: 'Hardware-enforced optical diode',
    opswat: 'Software-based content inspection',
    dfxWins: true,
  },
  {
    feature: 'Security Certification',
    dfx: 'EAL4+ Common Criteria',
    opswat: 'No equivalent hardware certification',
    dfxWins: true,
  },
  {
    feature: 'Reverse Data Flow',
    dfx: 'Physically impossible (hardware)',
    opswat: 'Software-controlled (bypassable)',
    dfxWins: true,
  },
  {
    feature: 'Gartner Recognition',
    dfx: 'Hype Cycle for CPS Security (3 years)',
    opswat: 'Listed in separate categories',
    dfxWins: true,
  },
  {
    feature: 'Regional Support — Turkey',
    dfx: 'Local team, Turkish language',
    opswat: 'Remote support only',
    dfxWins: true,
  },
  {
    feature: 'Regional Support — Gulf',
    dfx: 'Regional presence, Arabic support',
    opswat: 'Limited regional presence',
    dfxWins: true,
  },
  {
    feature: 'Turkey Regulatory Compliance',
    dfx: 'BDDK, EPDK, BTK, USOM guidance',
    opswat: 'No dedicated local compliance support',
    dfxWins: true,
  },
  {
    feature: 'NIS2 / IEC 62443 Compliance',
    dfx: 'Native compliance architecture',
    opswat: 'Partial — software layer only',
    dfxWins: true,
  },
  {
    feature: 'Content Inspection (CDR)',
    dfx: 'Via DFX Sandbox integration',
    opswat: 'Core capability (MetaDefender)',
    dfxWins: false,
  },
  {
    feature: 'Deployment Complexity',
    dfx: 'Hardware installation + local team',
    opswat: 'Software deployment — faster initial',
    dfxWins: false,
  },
];

export default function DataFlowXVsOpswatPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className={styles.main}>
        <VideoBackground />
        <Nav />

        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.overline}>VENDOR COMPARISON</p>
            <h1 className={styles.heroTitle}>
              DataFlowX vs OPSWAT MetaDefender:<br />
              <span className={styles.heroAccent}>Which is Right for Your Infrastructure?</span>
            </h1>
            <p className={styles.heroSubtitle}>
              An objective comparison of two different approaches to OT/ICS security.
              DataFlowX provides <strong>hardware-enforced absolute isolation</strong>;
              OPSWAT offers software-based content inspection. Understanding the difference
              is critical for critical infrastructure protection.
            </p>
            <div className={styles.heroMeta}>
              <span className={styles.metaTag}>🔍 Objective Analysis</span>
              <span className={styles.metaTag}>📊 TCO Comparison</span>
              <span className={styles.metaTag}>🌍 Regional Support</span>
            </div>
          </div>
        </section>

        <div className="section-spacer" aria-hidden="true" />

        {/* Summary Cards */}
        <section className={styles.section}>
          <div className={styles.summaryGrid}>
            <div className={styles.summaryCard}>
              <div className={styles.summaryLogo}>DataFlowX</div>
              <p className={styles.summaryTagline}>Hardware-Enforced Absolute Isolation</p>
              <ul className={styles.summaryList}>
                <li>EAL4+ Common Criteria certified</li>
                <li>Physically impossible reverse flow</li>
                <li>Gartner CPS Security recognition</li>
                <li>Local support: TR, Gulf, Balkans</li>
                <li>BDDK, EPDK, NCA compliance</li>
              </ul>
              <div className={styles.summaryBadge}>✓ Recommended for Critical OT Networks</div>
            </div>
            <div className={`${styles.summaryCard} ${styles.summaryCardAlt}`}>
              <div className={styles.summaryLogoAlt}>OPSWAT MetaDefender</div>
              <p className={styles.summaryTagline}>Software-Based Content Inspection</p>
              <ul className={styles.summaryList}>
                <li>Multi-engine AV + CDR (strong)</li>
                <li>Software-controlled filtering</li>
                <li>Broad file format support</li>
                <li>Remote support model</li>
                <li>US-based, limited regional presence</li>
              </ul>
              <div className={styles.summaryBadgeAlt}>Best for: File inspection workflows</div>
            </div>
          </div>
        </section>

        <div className="section-spacer" aria-hidden="true" />

        {/* Comparison Table */}
        <section className={styles.section} id="technical-comparison">
          <p className={styles.overline}>TECHNICAL COMPARISON</p>
          <h2 className={styles.sectionTitle}>Feature-by-Feature Analysis</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.compTable}>
              <thead>
                <tr>
                  <th className={styles.thFeature}>Feature</th>
                  <th className={styles.thDfx}>DataFlowX</th>
                  <th className={styles.thOpswat}>OPSWAT</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row) => (
                  <tr key={row.feature} className={styles.tr}>
                    <td className={styles.tdFeature}>{row.feature}</td>
                    <td className={`${styles.tdDfx} ${row.dfxWins ? styles.tdWin : ''}`}>
                      {row.dfxWins && <span className={styles.winIcon}>✓</span>}
                      {row.dfx}
                    </td>
                    <td className={styles.tdOpswat}>
                      {!row.dfxWins && <span className={styles.winIconAlt}>✓</span>}
                      {row.opswat}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="section-spacer" aria-hidden="true" />

        {/* Regional Support Section */}
        <section className={styles.section} id="regional-support">
          <div className={styles.regionalBlock}>
            <div className={styles.regionalLeft}>
              <p className={styles.overline}>REGIONAL ADVANTAGE</p>
              <h2 className={styles.sectionTitle}>Local Support Where It Matters</h2>
              <p className={styles.sectionDesc}>
                OPSWAT is a US-headquartered company with limited regional presence
                in Turkey, Gulf, and Balkans. DataFlowX provides on-the-ground support,
                local language assistance, and compliance expertise for regional regulations.
              </p>
              <div className={styles.regionList}>
                <div className={styles.regionItem}>
                  <span className={styles.regionFlag}>🇹🇷</span>
                  <div>
                    <strong>Turkey</strong>
                    <p>BDDK, EPDK, BTK, USOM compliance. Turkish language support.</p>
                  </div>
                </div>
                <div className={styles.regionItem}>
                  <span className={styles.regionFlag}>🇸🇦</span>
                  <div>
                    <strong>Gulf (UAE, Saudi, Qatar)</strong>
                    <p>NCA compliance (Saudi Arabia), NESA (UAE). Arabic support.</p>
                  </div>
                </div>
                <div className={styles.regionItem}>
                  <span className={styles.regionFlag}>🇷🇸</span>
                  <div>
                    <strong>Balkans (Serbia, Romania, Bulgaria)</strong>
                    <p>NIS2 directive compliance. EU critical infrastructure.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-spacer" aria-hidden="true" />

        {/* FAQ */}
        <section className={styles.section} id="faq">
          <p className={styles.overline}>FREQUENTLY ASKED QUESTIONS</p>
          <h2 className={styles.sectionTitle}>DataFlowX vs OPSWAT — Common Questions</h2>
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

        {/* CTA */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Ready to See DataFlowX in Action?</h2>
            <p className={styles.ctaDesc}>
              Request a free technical demo and speak with our regional team about
              your specific OT security requirements.
            </p>
            <a href="#contact" className={styles.ctaBtn}>Request Free Technical Demo ➔</a>
          </div>
        </section>

        <div className="section-spacer" aria-hidden="true" />

        <ContactMini />
      </main>
    </>
  );
}
