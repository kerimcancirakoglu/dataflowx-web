import Nav from '@/components/Nav/Nav';
import ContactMini from '@/components/ContactMini/ContactMini';
import SandboxFamily from '@/components/SandboxFamily/SandboxFamily';
import SandboxAnimation from '@/components/SandboxAnimation/SandboxAnimation';
import SandboxFeaturesGrid from '@/components/SandboxFeaturesGrid/SandboxFeaturesGrid';
import SandboxHero from '@/components/SandboxHero/SandboxHero';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import styles from './page.module.css';
import { getTranslations } from 'next-intl/server';

export const metadata = {
  title: 'DFX Sandbox | DataFlowX',
  description: 'Proactive, Intelligence-led Threat Intervention and Sandbox Solution.',
};

export default async function SandboxPage() {
  const t = await getTranslations('Sandbox.page');
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
          <p className={styles.ugDetailsOverTitle}>{t('overviewOverTitle')}</p>
          <h2 className={styles.ugDetailsTitle}>{t('overviewTitle')}</h2>
          <p className={styles.ugDetailsDesc}>
            {t('overviewDesc')}
          </p>
        </div>
        <div className={styles.ugDetailsGrid}>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>{t('isoLabel')}</div>
            <p className={styles.ugDetailText}>
              {t('isoText')}
            </p>
          </div>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>{t('intLabel')}</div>
            <p className={styles.ugDetailText}>
              {t('intText')}
            </p>
          </div>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>{t('contentLabel')}</div>
            <p className={styles.ugDetailText}>
              {t('contentText')}
            </p>
          </div>
        </div>
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* Sandbox Features Grid */}
      <section style={{ padding: '4rem 2rem 0', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', margin: '3rem 0 4rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-text-muted)', letterSpacing: '0.1em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
            {t('keyCapabilitiesLabel')}
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: '#ffffff' }}>
            {t('keyCapabilitiesTitle')}
          </h2>
        </div>
        <SandboxFeaturesGrid />
      </section>

      <div className="section-spacer" aria-hidden="true" />
      
      <ContactMini />
    </main>
  );
}


