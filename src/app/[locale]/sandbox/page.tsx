import Nav from '@/components/Nav/Nav';
import ContactMini from '@/components/ContactMini/ContactMini';
import SandboxFamily from '@/components/SandboxFamily/SandboxFamily';
import SandboxAnimation from '@/components/SandboxAnimation/SandboxAnimation';
import SandboxFeaturesGrid from '@/components/SandboxFeaturesGrid/SandboxFeaturesGrid';
import SandboxHero from '@/components/SandboxHero/SandboxHero';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import styles from './page.module.css';

export const metadata = {
  title: 'DFX Sandbox | DataFlowX',
  description: 'Proactive, Intelligence-led Threat Intervention and Sandbox Solution.',
};

export default function SandboxPage() {
  return (
    <main className={styles.main}>
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
          <p className={styles.ugDetailsOverTitle}>PRODUCT OVERVIEW</p>
          <h2 className={styles.ugDetailsTitle}>Advanced Threat Mitigation</h2>
          <p className={styles.ugDetailsDesc}>
            DFX Sandbox is an AI-powered next-gen solution that monitors data traffic in a network to detect suspicious behavior and mitigate cyber threats by executing them in an isolated environment.
          </p>
        </div>
        <div className={styles.ugDetailsGrid}>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>ISOLATED DETONATION</div>
            <p className={styles.ugDetailText}>
              Analyzing files in a virtual sandbox is crucial for safely detonating and observing malware behavior without risking the actual system.
            </p>
          </div>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>INTEGRATED ECOSYSTEM</div>
            <p className={styles.ugDetailText}>
              Works in seamless integration via ICAP, Microsoft Exchange, and network shares for automated file routing, ensuring robust zero-trust validation.
            </p>
          </div>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>CONTENT-AWARE FILTERING</div>
            <p className={styles.ugDetailText}>
              Features advanced content-aware filtering that precisely identifies, extracts, and purifies hidden payloads from complex documents before delivery.
            </p>
          </div>
        </div>
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* Sandbox Features Grid */}
      <section style={{ padding: '4rem 2rem 0', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', margin: '3rem 0 4rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-text-muted)', letterSpacing: '0.1em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
            KEY CAPABILITIES
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: '#ffffff' }}>
            Stopping What Others Miss
          </h2>
        </div>
        <SandboxFeaturesGrid />
      </section>

      <div className="section-spacer" aria-hidden="true" />
      
      <ContactMini />
    </main>
  );
}


