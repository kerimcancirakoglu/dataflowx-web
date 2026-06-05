'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './SandboxFamily.module.css';

const elementDetails: Record<string, { title: string; role: string; steps: { label: string; text: string }[] }> = {
  source: {
    title: 'Source Network (Ethernet)',
    role: 'External Traffic',
    steps: [
      { label: 'Ingestion Point', text: 'Files and emails arrive from external sources, carrying potential hidden threats and unknown executables.' },
      { label: 'The Risk', text: 'Zero-day exploits, advanced persistent threats (APTs), and sophisticated malware often bypass traditional antivirus filters.' },
      { label: 'Initial Defense', text: 'All incoming traffic is forcefully routed through the DFX inspection pipeline before touching the internal network.' }
    ]
  },
  esp: {
    title: 'DFX ESP',
    role: 'Email & File Gateway',
    steps: [
      { label: 'Content Disarming', text: 'Purifies suspicious files in isolation and strips out potentially malicious executable content via Zero Trust file handling.' },
      { label: 'Spam & Phishing Protection', text: 'Filters out noise and known threats using traditional AV engines and global threat intelligence feeds.' },
      { label: 'Seamless Delivery', text: 'Safe components of the files are reconstructed and seamlessly delivered, while suspicious ones are sent for deep analysis.' }
    ]
  },
  sandbox: {
    title: 'Isolated Virtual Execution',
    role: 'The Sandbox Chamber',
    steps: [
      { label: 'Deep Behavioral Analysis', text: 'Suspicious files are detonated in a fully isolated, heavily monitored virtual environment with custom VM profiles.' },
      { label: 'Threat Hunting', text: 'Identifies hidden threats early by mimicking human behavior to trigger evasive malware and tracking all file/process interactions.' },
      { label: 'Detailed Forensics', text: 'Generates comprehensive Activity Maps, Radar Graphs, and Process Trees to provide actionable IOCs for security teams.' }
    ]
  },
  target: {
    title: 'Protected Network',
    role: 'Exchange Server / Endpoints',
    steps: [
      { label: 'Clean Delivery', text: 'Only files that have been definitively proven safe or successfully sanitized are allowed into the internal environment.' },
      { label: 'Zero-Day Neutralized', text: 'The organization remains entirely protected from unknown and zero-day threats that would otherwise cause catastrophic breaches.' },
      { label: 'Operational Continuity', text: 'Employees continue to receive their emails and files without disruption, completely unaware of the complex analysis happening behind the scenes.' }
    ]
  }
};

type ElementId = keyof typeof elementDetails;

export default function SandboxFamily() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<HTMLDivElement>(null);
  const p2Ref = useRef<HTMLDivElement>(null);
  const p3Ref = useRef<HTMLDivElement>(null);

  const [activeElement, setActiveElement] = useState<ElementId | null>(null);

  useEffect(() => {
    // Determine screen orientation for animation axis
    const isDesktop = window.innerWidth > 1024;
    const prop = isDesktop ? 'left' : 'top';

    const ctx = gsap.context(() => {
      const createAnim = (ref: React.RefObject<HTMLDivElement | null>, delay: number) => {
        if (ref.current) {
          gsap.fromTo(
            ref.current,
            { [prop]: '0%', opacity: 0 },
            {
              [prop]: '100%',
              duration: 1.5,
              ease: 'none',
              repeat: -1,
              delay,
              keyframes: {
                '0%':   { opacity: 0, [prop]: '0%' },
                '15%':  { opacity: 1 },
                '85%':  { opacity: 1 },
                '100%': { opacity: 0, [prop]: '100%' }
              }
            }
          );
        }
      };

      createAnim(p1Ref, 0);   // Source -> ESP
      createAnim(p2Ref, 1.5); // ESP -> Sandbox
      createAnim(p3Ref, 3); // Sandbox -> Target
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleClick = (id: ElementId) => {
    setActiveElement(prev => prev === id ? null : id);
  };

  const detail = activeElement ? elementDetails[activeElement] : null;

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.inner}>

        <div className={styles.header}>
          <p className={styles.overTitle}>THREAT MITIGATION ARCHITECTURE</p>
          <h2 className={styles.title}>
            Detect, Disarm, <span className={styles.highlight}>Defend</span>
          </h2>
          <p className={styles.subtitle}>
            Click any element to understand how DFX Advanced Threat Mitigation purifies suspicious files 
            in isolation and stops zero-day threats before they cause damage.
          </p>
        </div>

        <div className={styles.flowContainer}>

          {/* 1. Source */}
          <button className={`${styles.nodeBox} ${activeElement === 'source' ? styles.activeNode : ''}`} onClick={() => handleClick('source')}>
            <div className={styles.nodeIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
              </svg>
            </div>
            <div className={styles.nodeName}>Ethernet</div>
            <div className={styles.nodeRole}>Source Network</div>
            <div className={styles.clickHint}>Click to explore</div>
          </button>

          <div className={styles.straightLine}>
            <div className={`${styles.packet} ${styles.packetDanger}`} ref={p1Ref}></div>
          </div>

          {/* 2. ESP */}
          <button className={`${styles.nodeBox} ${styles.espBox} ${activeElement === 'esp' ? styles.activeNode : ''}`} onClick={() => handleClick('esp')}>
            <div className={styles.nodeIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div className={styles.nodeName}>DFX ESP</div>
            <div className={styles.nodeRole}>Email / File Gateway</div>
            <div className={styles.clickHint}>Click to explore</div>
          </button>

          <div className={styles.straightLine}>
            <div className={`${styles.packet} ${styles.packetYellow}`} ref={p2Ref}></div>
          </div>



          {/* 4. Sandbox */}
          <button className={`${styles.sandboxChamber} ${activeElement === 'sandbox' ? styles.activeNode : ''}`} onClick={() => handleClick('sandbox')}>
            <div className={styles.scannerLine}></div>
            <div className={styles.nodeIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 12h3M18 12h3M12 3v3M12 18v3" />
                <path d="m5.6 5.6 2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
            <div className={styles.nodeName}>Sandbox Chamber</div>
            <div className={styles.nodeRole}>Isolated Execution</div>
            <div className={styles.clickHint}>Click to explore</div>
          </button>

          <div className={styles.straightLine}>
            <div className={`${styles.packet} ${styles.packetSafe}`} ref={p3Ref}></div>
          </div>

          {/* 5. Target */}
          <button className={`${styles.nodeBox} ${activeElement === 'target' ? styles.activeNode : ''}`} onClick={() => handleClick('target')}>
            <div className={styles.nodeIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className={styles.nodeName}>Exchange Server</div>
            <div className={styles.nodeRole}>Protected Network</div>
            <div className={styles.clickHint}>Click to explore</div>
          </button>

        </div>

        {/* ── Info Panel ── */}
        {detail && (
          <div className={styles.infoPanel}>
            <div className={styles.infoPanelHeader}>
              <div>
                <p className={styles.infoPanelRole}>{detail.role}</p>
                <h3 className={styles.infoPanelTitle}>{detail.title}</h3>
              </div>
              <button className={styles.closeBtn} onClick={() => setActiveElement(null)} aria-label="Close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className={styles.stepsGrid}>
              {detail.steps.map((step, i) => (
                <div key={i} className={styles.stepCard}>
                  <div className={styles.stepNumber}>{String(i + 1).padStart(2, '0')}</div>
                  <h4 className={styles.stepLabel}>{step.label}</h4>
                  <p className={styles.stepText}>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
