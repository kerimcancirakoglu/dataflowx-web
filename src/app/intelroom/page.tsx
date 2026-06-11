import type { Metadata } from 'next';
import Nav from '@/components/Nav/Nav';
import IntelContact from '@/components/IntelRoom/IntelContact';
import styles from './page.module.css';
import VideoBackground from '@/components/VideoBackground/VideoBackground';

import IntelStoryScroll from '@/components/IntelRoom/IntelStoryScroll';
import IntelMeshVisualizer from '@/components/IntelRoom/IntelMeshVisualizer';
import IntelGlobalMap from '@/components/IntelRoom/IntelGlobalMap';
import IntelHeroMap from '@/components/IntelRoom/IntelHeroMap';
import IntelHeroGlobe from '@/components/IntelRoom/IntelHeroGlobe';
import IntelOracleEngine from '@/components/IntelRoom/IntelOracleEngine';

export const metadata: Metadata = {
  title: 'DFX IntelRoom — Live Threat Intelligence Organism',
  description:
    'DFX IntelRoom: Analyzes billions of signals, establishes context, and generates actionable decisions. Advanced Threat Intelligence platform for SOC, CISO, and MSSP.',
  keywords: [
    'threat intelligence',
    'intelroom',
    'siber istihbarat',
    'SOC',
    'MSSP',
    'CISO',
    'dataflowx intelroom',
  ],
};

const PERSONAS = [
  {
    num: '01',
    title: 'CISO / Security Leaders',
    desc: 'See the Big Picture. Break away from raw technical data to manage business risk and ROI. Clearly communicate your organization\'s cyber posture with board-ready Briefs reports.',
    image: '/Kapak/pexels-rsantos1232-3888149-scaled.jpg',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    num: '02',
    title: 'SOC Analysts',
    desc: 'Save Time. Reduce incident response times from minutes to seconds with verified IOCs, context enriched by The Mesh graph, and ready-to-use Arsenal rules.',
    image: '/Kapak/New-Project-2025-08-02T043719.908.jpg',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    num: '03',
    title: 'MSSP Operators',
    desc: 'Scalable Security. Manage the threat landscape of dozens of clients from a single screen with multi-tenant architecture (Bureau), increasing the profitability of your MSSP operations.',
    image: '/Kapak/networksecurity.png',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6h16v10H4V6z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    )
  },
];

export default function IntelRoomPage() {
  return (
    <div className={styles.pageWrapper}>
      <VideoBackground videoSrc="/intelroom-bg.mp4" opacity={0.2} playMode="scrub" />
      <Nav logoSrc="/Intelroombeyaz.png" />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className={styles.heroSection}>
        <div className={styles.heroContentWrapper}>
        <div className={styles.heroLeftContainer}>
          <h1 className="display-lg" style={{ marginBottom: '1.5rem', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            World's First Live<br/>
            Threat Intelligence <span style={{ color: '#DC2626' }}>Organism</span>
          </h1>
          <p className="body-text" style={{ marginBottom: '3rem', maxWidth: '650px', fontSize: 'clamp(1rem, 1.5vw, 1.1rem)' }}>
            Analyzes billions of signals, establishes context, and generates actionable decisions. More than just an analysis tool; it transforms threat intelligence into a completely autonomous and intelligent process.
          </p>
          <div className={styles.buttonGroup}>
            <a href="#contact" className={styles.primaryButton}>
              GET INFORMATION
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '8px' }}>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
        <div className={styles.heroRightContainer}>
          <IntelHeroMap />
        </div>
        </div>
      </section>

      {/* ── Visualizers & Components ──────────────────────────────── */}
      
      {/* 1. Layer Story Scroll */}
      <section className={styles.featuresSection} style={{ paddingBottom: 0 }}>
        <div className={styles.problemHeader} style={{ marginBottom: '2rem' }}>
          <p className={styles.sectionLabel}>COMPONENTS & LAYERS</p>
          <h2 className={styles.sectionTitle}>Not Just a Tool, an Organism</h2>
          <p className={styles.sectionDesc}>
            IntelRoom is not a static tool; it is a living ecosystem comprised of 8 interconnected core modules.
          </p>
        </div>
        <IntelStoryScroll />
      </section>

      {/* 2. Global Threat Map */}
      <section className={styles.featuresSection}>
        <div className={styles.problemHeader} style={{ marginBottom: '2rem' }}>
          <p className={styles.sectionLabel}>RELATIONAL MEMORY</p>
          <h2 className={styles.sectionTitle}>See Relationships, Understand Threats</h2>
          <p className={styles.sectionDesc}>
            Examine the hidden network between threat actors, IOCs, and campaigns in real-time.
          </p>
        </div>
        <IntelGlobalMap />
      </section>

      {/* 4. Oracle Engine */}
      <section className={styles.featuresSection}>
        <div className={styles.problemHeader}>
          <p className={styles.sectionLabel}>EXPLAINABLE AI</p>
          <h2 className={styles.sectionTitle}>A Justification Behind Every Decision</h2>
          <p className={styles.sectionDesc}>
            Not a black box, but a tool for transparency. Oracle explains every score with an evidence chain.
          </p>
        </div>
        <IntelOracleEngine />
      </section>

      {/* ── Personas / Use Cases ─────────────────────────────────── */}
      <section className={styles.useCasesSection}>
        <div className={styles.problemHeader} style={{ marginBottom: '2rem' }}>
          <p className={styles.sectionLabel}>WHO IS IT FOR?</p>
          <h2 className={styles.sectionTitle}>Customized Focus for Every Role</h2>
          <p className={styles.sectionDesc}>
            Different security roles have different needs. IntelRoom delivers the right data
            to the right person in the right format.
          </p>
        </div>
        <div className={styles.useCasesGrid}>
          {PERSONAS.map((uc) => (
            <div key={uc.num} className={styles.card}>
              <div
                className={styles.cardBg}
                style={{ backgroundImage: `url('${uc.image}')` }}
              />
              <div
                className={styles.cardOverlay}
                
              />
              <div className={styles.cardContent}>
                <div className={styles.iconWrapper}>
                  {uc.icon}
                </div>
                <h3 className={styles.cardTitle}>{uc.title}</h3>
                <p className={styles.cardDesc}>
                  {uc.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <IntelContact />
    </div>
  );
}
