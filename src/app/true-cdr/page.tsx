import type { Metadata } from 'next';
import Nav from '@/components/Nav/Nav';
import Contact from '@/components/Contact/Contact';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import CDRAnimation from '@/components/CDRAnimation/CDRAnimation';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'TrueCDR™ — Content Disarm & Reconstruction Platform',
  description:
    'DFX CDR neutralizes file-borne threats before they reach your users. A reconstruction-first security control that disarms weaponized content and delivers safe, usable files across email, M365, SharePoint, OneDrive, and removable media.',
  keywords: [
    'content disarm and reconstruction',
    'CDR platform',
    'file security',
    'TrueCDR',
    'malware file protection',
    'email attachment security',
    'M365 file disarm',
    'SharePoint security',
    'zero trust file transfer',
    'reconstruction-first security',
  ],
  alternates: {
    canonical: 'https://dataflowx.com/true-cdr',
  },
  openGraph: {
    title: 'TrueCDR™ — Disarm Weaponized Content. Deliver Safe Files.',
    description:
      'Reconstruction-first security for hostile file workflows. DFX CDR removes risky content and rebuilds safe, usable files across your entire organization.',
    url: 'https://dataflowx.com/true-cdr',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

const FEATURES = [
  {
    label: 'MULTI-FORMAT PROCESSING',
    text: 'Handles real enterprise traffic: documents, attachments, uploads, shared files, and deeply nested archives across all common file types.',
  },
  {
    label: 'ACTIVE CONTENT NEUTRALIZATION',
    text: 'Removes or neutralizes risky active content — macros, scripts, embedded objects, automatic actions, and unsafe links.',
  },
  {
    label: 'STRUCTURAL VALIDATION',
    text: 'Inspects internal file structures, container relationships, embedded content, malformed components, and hidden internals.',
  },
  {
    label: 'RECONSTRUCTION ENGINE',
    text: 'Produces a clean, safer, fully functional version of the content — preserving usability while removing unsafe file capabilities.',
  },
  {
    label: 'MICROSOFT 365 INTEGRATION',
    text: 'Direct, API-driven monitoring and attachment disarming across Exchange Email, SharePoint, and OneDrive workflows.',
  },
  {
    label: 'POLICY-BASED CONTROL',
    text: 'Configure custom rules for risk outcomes: allow, sanitize, block, quarantine, retain original, or route — based on your security posture.',
  },
];

const USE_CASES = [
  {
    num: '01',
    title: 'M365 Email Attachment Disarming',
    desc: 'Integrates directly with Microsoft 365 to disarm email attachments before users interact with them. Removes malicious macros, active content, and embedded payloads with zero workflow disruption.',
    image: '/Kapak/pexels-rsantos1232-3888149-scaled.jpg',
    overlay: 'linear-gradient(to bottom, rgba(10, 20, 30, 0.4) 0%, rgba(0, 5, 15, 0.95) 100%)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 7l8 5 8-5M4 7v10h16V7H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    num: '02',
    title: 'SharePoint File Monitoring',
    desc: 'Monitors file activity across shared collaboration team sites, preventing internal workspaces from becoming an uncontrolled distribution zone for unsafe uploads.',
    image: '/Kapak/New-Project-2025-08-02T043719.908.jpg',
    overlay: 'linear-gradient(to bottom, rgba(40, 20, 10, 0.3) 0%, rgba(15, 5, 0, 0.95) 100%)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    num: '03',
    title: 'OneDrive File Disarming',
    desc: 'Applies automated sanitization workflows to personal corporate storage, mitigating the risk of threats syncing from unmanaged endpoints or compromised accounts.',
    image: '/Kapak/networksecurity.png',
    overlay: 'linear-gradient(to bottom, rgba(0, 15, 40, 0.4) 0%, rgba(0, 5, 20, 0.95) 100%)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    num: '04',
    title: 'Removable Media Kiosk',
    desc: 'Safeguards critical or air-gapped infrastructure. Files entering via USB drives are completely disarmed and reconstructed before transfer onto secure internal networks.',
    image: '/Kapak/New-Project-2025-08-02T043719.908.jpg',
    overlay: 'linear-gradient(to bottom, rgba(30, 30, 10, 0.3) 0%, rgba(10, 10, 0, 0.95) 100%)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2v17M10 2v17M14 2v17M18 2v17M22 19H2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    num: '05',
    title: 'Unidirectional Gateway Transfers',
    desc: 'Enforces content-level sanitization at network boundaries. DFX CDR ensures no weaponized structures bypass network limits across hardware paths.',
    image: '/Kapak/networksecurity.png',
    overlay: 'linear-gradient(to bottom, rgba(10, 20, 30, 0.4) 0%, rgba(0, 5, 15, 0.95) 100%)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6h16v10H4V6z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    num: '06',
    title: 'Secure Upload Portals',
    desc: 'Secures public-facing web portals handling incoming claims, invoices, and contracts. Files are fully disarmed before entering internal downstream applications.',
    image: '/Kapak/pexels-rsantos1232-3888149-scaled.jpg',
    overlay: 'linear-gradient(to bottom, rgba(0, 15, 40, 0.4) 0%, rgba(0, 5, 20, 0.95) 100%)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    )
  },
];

const BENEFITS = [
  { 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ), 
    title: 'No Prior Knowledge Required', 
    desc: 'Security that does not depend on the attacker being known first — effective against zero-days.' 
  },
  { 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ), 
    title: 'Business Continuity', 
    desc: 'Reconstructs safe, usable content rather than forcing files into dead-end quarantines.' 
  },
  { 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
        <path d="M9 11l2 2 4-4"/>
      </svg>
    ), 
    title: 'Deterministic Protection', 
    desc: 'A non-evadable companion to traditional antivirus, sandboxing, and EDR layers.' 
  },
  { 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
      </svg>
    ), 
    title: 'Flexible Deployment', 
    desc: 'On-premises, cloud, and hybrid deployments for enterprise IT, regulated networks, and industrial environments.' 
  },
  { 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
      </svg>
    ), 
    title: 'Full Auditability', 
    desc: 'Clear, file-level processing records and traceable transformation evidence for compliance.' 
  },
  { 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"/>
      </svg>
    ), 
    title: 'Reduced Analyst Load', 
    desc: 'Automates consistent file handling, eliminating manual attachment triage tickets.' 
  },
];

export default function CDRPage() {
  return (
    <main>
      <VideoBackground />
      <Nav />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className={styles.heroSection}>
        <p className={styles.overTitle}>Content Disarm &amp; Reconstruction</p>
        <h1 className={styles.heroTitle}>
          <span style={{ color: '#F5A706' }}>True</span>CDR™
        </h1>
        <p className={styles.heroTagline}>Disarm Weaponized Content. Deliver Safe Files.</p>
        <p className={styles.heroSubtitle}>
          TrueCDR™ neutralizes file-borne threats before they reach your users, inboxes, shared
          drives, removable media workflows, and sensitive networks. It removes malicious, active,
          malformed, and unnecessary risk — then reconstructs safe, usable content for seamless
          business operations.
        </p>
        <div className={styles.buttonGroup}>
          <a href="#contact" className="btn-pill">
            Request a Demo
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#use-cases" className="btn-pill" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
            Review Integration Options
          </a>
        </div>
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* ── CDR Animation ─────────────────────────────── */}
      <section style={{ padding: '0 2rem' }}>
        <CDRAnimation />
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* ── Problem Statement ─────────────────────────── */}
      <section className={styles.problemSection}>
        <div className={styles.problemHeader}>
          <p className={styles.sectionLabel}>THE CHALLENGE</p>
          <h2 className={styles.sectionTitle}>The File Is Still the Attack Vector</h2>
        </div>
        <div className={styles.problemGrid}>
          <div className={styles.problemCard}>
            <div className={styles.problemIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <path d="M12 9v4"/>
                <path d="M12 17h.01"/>
              </svg>
            </div>
            <h3 className={styles.problemCardTitle}>Detection Alone Leaves Gaps</h3>
            <p className={styles.problemCardText}>
              Antivirus, sandboxing, and threat intelligence depend heavily on known indicators,
              observed behavior, and detonation timing. Attackers rapidly deploy evasive documents,
              delayed execution, and malformed structures to bypass traditional layers.
            </p>
          </div>
          <div className={styles.problemCard}>
            <div className={styles.problemIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M4.93 4.93l14.14 14.14"/>
              </svg>
            </div>
            <h3 className={styles.problemCardTitle}>Blocking Everything Breaks Business</h3>
            <p className={styles.problemCardText}>
              Users need documents, invoices, contracts, and partner content. Blanket blocking
              creates operational friction, workarounds, and immense pressure on security teams
              to loosen perimeter controls.
            </p>
          </div>
          <div className={styles.problemCard}>
            <div className={styles.problemIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 20V10"/>
                <path d="M12 20V4"/>
                <path d="M6 20v-6"/>
              </svg>
            </div>
            <h3 className={styles.problemCardTitle}>Manual Review Doesn't Scale</h3>
            <p className={styles.problemCardText}>
              Security teams cannot manually inspect every attachment, upload, or shared file.
              High-volume environments need repeatable enforcement and audit-ready evidence
              without endless analyst tickets.
            </p>
          </div>
        </div>
        <div className={styles.problemQuote}>
          <span className={styles.quoteAccent}>"</span>
          The question is not simply: <em>'Is this file malicious?'</em><br />
          The better question is: <em>Can this file be made safe enough to use?</em>
          <span className={styles.quoteAccent}>"</span>
        </div>
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* ── Key Features ──────────────────────────────── */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresHeader}>
          <p className={styles.sectionLabel}>CAPABILITIES</p>
          <h2 className={styles.sectionTitle}>Enterprise-Grade CDR</h2>
          <p className={styles.sectionDesc}>
            Built for real-world enterprise file traffic. Every capability is engineered around
            a single principle: reconstruct safety, preserve usability.
          </p>
        </div>
        <div className={styles.featuresGrid}>
          {FEATURES.map((f) => (
            <div key={f.label} className={styles.featureCard}>
              <div className={styles.featureLabel}>{f.label}</div>
              <p className={styles.featureText}>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* ── Benefits ──────────────────────────────────── */}
      <section className={styles.benefitsSection}>
        <div className={styles.benefitsHeader}>
          <p className={styles.sectionLabel}>KEY BENEFITS</p>
          <h2 className={styles.sectionTitle}>Disarm the Risk. Preserve the Work.</h2>
        </div>
        <div className={styles.benefitsGrid}>
          {BENEFITS.map((b) => (
            <div key={b.title} className={styles.benefitCard}>
              <div className={styles.benefitIconWrapper}>
                {b.icon}
              </div>
              <h3 className={styles.benefitTitle}>{b.title}</h3>
              <p className={styles.benefitDesc}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-spacer" aria-hidden="true" />



      {/* ── Competitive Positioning ───────────────────── */}
      <section className={styles.vsSection}>
        <p className={styles.sectionLabel}>COMPETITIVE POSITIONING</p>
        <h2 className={styles.sectionTitle}>Beyond Detection, Blocking &amp; Extraction</h2>
        <div className={styles.vsGrid}>
          {[
            { vs: 'vs Antivirus', text: 'Antivirus looks for known signatures. DFX CDR removes dangerous capabilities even when a zero-day is completely unknown.' },
            { vs: 'vs Sandboxing', text: 'Sandboxing observes behavior in a delayed virtual environment — modern malware evades it. DFX CDR reconstructs the file immediately.' },
            { vs: 'vs Block-Only', text: 'Blocking protects but halts business. DFX CDR gives a middle path: remove risky parts, deliver safe reconstructed content.' },
            { vs: 'vs Extraction Tools', text: 'Extraction tools flag or pull metadata. DFX CDR fully transforms risky input into completely safe, usable output.' },
          ].map((item) => (
            <div key={item.vs} className={styles.vsCard}>
              <span className={styles.vsLabel}>{item.vs}</span>
              <p className={styles.vsText}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-spacer" aria-hidden="true" />

      <Contact />
    </main>
  );
}
