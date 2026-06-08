import type { Metadata } from 'next';
import Nav from '@/components/Nav/Nav';
import Contact from '@/components/Contact/Contact';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import EmailSecurityAnimation from '@/components/EmailSecurityAnimation/EmailSecurityAnimation';
import EmailSecurityLayers from '@/components/EmailSecurityLayers/EmailSecurityLayers';
import EmailFeaturesTabs from '@/components/EmailFeaturesTabs/EmailFeaturesTabs';
import styles from './page.module.css';

export const metadata: Metadata = {
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
    canonical: 'https://dataflowx.com/email-security-platform',
  },
  openGraph: {
    title: 'DFX Email Security Platform — AI + CDR Protection',
    description:
      'Self-learning AI + Deep CDR + Retrospective scanning. Zero Trust email protection against advanced persistent threats.',
    url: 'https://dataflowx.com/email-security-platform',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function EmailSecurityPage() {
  return (
    <main>
      <VideoBackground />
      <Nav />

      {/* Opening hero statement (Image 4 reference) */}
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>
          <span style={{ color: '#F5A706' }}>DFX</span> E-Mail Security Platform
        </h1>
        <p className={styles.heroSubtitle}>
          AI-powered ecosystem designed to trap, analyze, and neutralize sophisticated malware.
          Secure your inbound and outbound communications against advanced threats.
        </p>
        <div className={styles.buttonGroup}>
          <a href="#contact" className={styles.primaryButton}>Get Information ➔</a>
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
          <p className={styles.ugDetailsOverTitle}>PRODUCT OVERVIEW</p>
          <h2 className={styles.ugDetailsTitle}>Multi-Layered Protection</h2>
          <p className={styles.ugDetailsDesc}>
            DFX E-Mail Security Platform operates on Zero Trust principles to filter, disarm, and sanitize incoming and outgoing emails.
            It integrates advanced AI-driven engines to detect phishing, BEC, and zero-day malware before they reach the inbox.
          </p>
        </div>
        <div className={styles.ugDetailsGrid}>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>AI BEHAVIORAL DETECTION</div>
            <p className={styles.ugDetailText}>
              Enhances native email security with Self-Learning AI that understands your business to stop known and unknown threats without relying solely on threat intelligence feeds.
            </p>
          </div>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>DEEP CONTENT DISARM (CDR)</div>
            <p className={styles.ugDetailText}>
              Removes all executable content from files while keeping functionality intact. Stays true to Zero Trust by assuming all files are malicious.
            </p>
          </div>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>RETROSPECTIVE SCANNING</div>
            <p className={styles.ugDetailText}>
              Instant action and one-click remediation. The platform continuously re-evaluates delivered emails against newly discovered threat intelligence.
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

      <Contact />
    </main>
  );
}
