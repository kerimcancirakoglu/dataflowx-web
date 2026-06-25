'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import styles from './SandboxFamily.module.css';

const elementDetails: Record<string, { title: string; role: string; steps: { label: string; text: string }[] }> = {
  source: {
    title: 'Source Network (Ethernet)',
    role: 'External Traffic',
    steps: [
      { label: 'Ingestion Point', text: 'Files and emails arrive from external sources, carrying potential hidden threats and unknown executables.' },
      { label: 'The Risk', text: 'Zero-day exploits, advanced persistent threats (APTs), and sophisticated malware often bypass traditional antivirus filters.' },
      { label: 'Initial Defense', text: 'All incoming traffic is forcefully routed through the DFX Malware Mitigation Sandbox inspection pipeline before touching the internal network.' }
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
    role: 'The Sandbox',
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

const NODES: { id: ElementId; label: string; icon: React.ReactNode }[] = [
  {
    id: 'source',
    label: 'Source',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
      </svg>
    )
  },
  {
    id: 'esp',
    label: 'ESP',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    )
  },
  {
    id: 'sandbox',
    label: 'Sandbox',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 12h3M18 12h3M12 3v3M12 18v3" />
        <path d="m5.6 5.6 2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    )
  },
  {
    id: 'target',
    label: 'Target',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )
  }
];

// Removed BrainIcon as it is replaced by GIF
export default function SandboxFamily() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeElement, setActiveElement] = useState<ElementId | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation for nodes
      gsap.to('.arc-node-wrap', {
        y: '-=10',
        yoyo: true,
        repeat: -1,
        duration: 2,
        stagger: 0.3,
        ease: 'sine.inOut'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleClick = (id: ElementId) => {
    setActiveElement(prev => prev === id ? null : id);
  };

  const detail = activeElement ? elementDetails[activeElement] : null;

  const getArcPosition = (index: number, total: number) => {
    const startAngle = -60;
    const endAngle = 60;
    const angleStep = (endAngle - startAngle) / (total - 1);
    const angle = startAngle + index * angleStep;
    const rad = (angle - 90) * (Math.PI / 180);
    const radius = 220;
    const x = Math.cos(rad) * radius;
    const y = Math.sin(rad) * radius;
    return `translate(${x}px, ${y}px) translateZ(100px) rotateZ(45deg) rotateX(-60deg)`;
  };

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.inner}>

        <div className={styles.header}>
          <p className={styles.overTitle}>THREAT MITIGATION ARCHITECTURE</p>
          <h2 className={styles.title}>
            Detect, Neutralize, <span className={styles.highlight}>Defend</span>
          </h2>
          <p className={styles.subtitle}>
            DFX Malware Mitigation Sandbox purifies suspicious files
            in isolation and stops zero-day threats before they cause damage.
          </p>
        </div>

        <div className={styles.sceneContainer}>
          <div className={styles.scene}>
            
            {/* Provided GIF Animation */}
            <div className={styles.gifWrapper}>
              <Image 
                src="/cb5d18_16a81facac944cf7941a2c43c55b4a8d~mv2.gif" 
                alt="DFX Sandbox Architecture" 
                width={800} height={600} style={{ width: '100%', height: 'auto' }}
                className={styles.gifImage}
                unoptimized
              />
            </div>

          </div>
        </div>

        {/* Info Panel */}
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
