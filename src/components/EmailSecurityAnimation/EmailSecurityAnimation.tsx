'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './EmailSecurityAnimation.module.css';

const elementDetails: Record<string, {
  title: string;
  role: string;
  steps: { label: string; text: string }[];
}> = {
  source: {
    title: 'Source / External Network',
    role: 'Untrusted Environment',
    steps: [
      { label: 'Origin', text: 'External emails containing potential phishing, spam, or malicious payloads arrive from the internet.' },
      { label: 'Threat Landscape', text: 'Attackers use sophisticated AI to craft BEC attacks and zero-day malware embedded in attachments.' },
    ]
  },
  esp: {
    title: 'DFX E-Mail Security Platform',
    role: 'Threat Detection & Mitigation',
    steps: [
      { label: 'Behavioral AI', text: 'Analyzes communication patterns and sender behavior rather than just static signatures.' },
      { label: 'Content Disarm (CDR)', text: 'Strips out all active, potentially malicious content from attachments and rebuilds them safely.' },
      { label: 'Retrospective Scan', text: 'Continuously monitors delivered mail against updated intelligence to catch delayed zero-days.' },
    ]
  },
  sandbox: {
    title: 'DFX Sandbox',
    role: 'Deep Isolation Sandbox',
    steps: [
      { label: 'Detonation', text: 'Suspicious files are safely executed in an isolated environment to observe true behavior.' },
      { label: 'Verdict Generation', text: 'Results are immediately fed back into the ESP to block similar future threats.' },
    ]
  },
  dest: {
    title: 'Exchange / Office 365',
    role: 'Protected Inbox',
    steps: [
      { label: 'Safe Delivery', text: 'Only fully sanitized, legitimate emails ever reach the end user.' },
      { label: 'Peace of Mind', text: 'Users can click links and open attachments without fear of ransomware or credential theft.' },
    ]
  }
};

type ElementId = keyof typeof elementDetails;

const C_NEUTRAL = '#00A3FF';
const C_DANGER  = '#FF3B30';
const C_SAFE    = '#34C759';

export default function EmailSecurityAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const packetRef    = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const scanLineRef  = useRef<HTMLDivElement>(null);

  const [activeElement, setActiveElement] = useState<ElementId | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl       = gsap.timeline({ repeat: -1 });
      const packet   = packetRef.current;
      const dash     = dashboardRef.current;
      const scanLine = scanLineRef.current;
      const counter  = containerRef.current?.querySelector('.counterTarget') as HTMLElement | null;

      if (!packet || !dash || !scanLine || !counter) return;

      // Set packet color via inline style — NO className swapping (avoids layout shift / shake)
      const setColor = (color: string) => {
        packet.style.borderColor = color;
        packet.style.color = color;
        packet.style.boxShadow = `0 0 18px ${color}88`;
      };

      // ─────────────────────────────────────────
      // SCENARIO A: MALICIOUS EMAIL
      // ─────────────────────────────────────────
      tl.call(() => setColor(C_NEUTRAL));
      tl.set(packet,   { x: -370, y: 0, opacity: 0, scale: 1 });
      tl.set(dash,     { opacity: 0.3 });
      tl.set(scanLine, { opacity: 0, top: '0%' });
      tl.set(counter,  { innerHTML: '0.000' });

      tl.to(packet, { opacity: 1, duration: 0.3 });
      tl.to(packet, { x: 0, duration: 1.5, ease: 'power1.inOut' });

      tl.to(dash,    { opacity: 1, duration: 0.3 });
      tl.to(scanLine,{ opacity: 0.8, duration: 0.2 });

      tl.to(counter,  { innerHTML: 231.4, duration: 1.5, snap: { innerHTML: 0.001 }, ease: 'power2.out' }, '<');
      
      const scanDist = dashboardRef.current?.clientHeight || 280;
      tl.set(scanLine, { y: 0 });
      tl.to(scanLine, { y: scanDist, duration: 0.5, ease: 'none' }, '<');
      tl.to(scanLine, { y: 0,   duration: 0.5, ease: 'none' });
      tl.to(scanLine, { y: scanDist, duration: 0.5, ease: 'none' });
      tl.to(scanLine, { opacity: 0,  duration: 0.2 });

      tl.call(() => setColor(C_DANGER));
      tl.to(dash, { opacity: 0.3, duration: 0.3 }, '+=0.3');

      tl.to(packet, { y: 230, duration: 1.2, ease: 'power1.inOut' });
      tl.to(packet, { opacity: 0, scale: 0, duration: 0.3 });

      tl.to({}, { duration: 1 });

      // ─────────────────────────────────────────
      // SCENARIO B: SAFE EMAIL
      // ─────────────────────────────────────────
      tl.call(() => setColor(C_NEUTRAL));
      tl.set(packet,   { x: -370, y: 0, opacity: 0, scale: 1 });
      tl.set(scanLine, { opacity: 0, top: '0%' });
      tl.set(counter,  { innerHTML: '0.000' });

      tl.to(packet, { opacity: 1, duration: 0.3 });
      tl.to(packet, { x: 0, duration: 1.5, ease: 'power1.inOut' });

      tl.to(dash,    { opacity: 1, duration: 0.3 });
      tl.to(scanLine,{ opacity: 0.8, duration: 0.2 });

      tl.to(counter,  { innerHTML: 5.324, duration: 1.2, snap: { innerHTML: 0.001 }, ease: 'power2.out' }, '<');
      
      const scanDistSafe = dashboardRef.current?.clientHeight || 280;
      tl.set(scanLine, { y: 0 });
      tl.to(scanLine, { y: scanDistSafe, duration: 0.5, ease: 'none' }, '<');
      tl.to(scanLine, { y: 0,   duration: 0.5, ease: 'none' });
      tl.to(scanLine, { y: scanDistSafe, duration: 0.5, ease: 'none' });
      tl.to(scanLine, { opacity: 0,  duration: 0.2 });

      tl.call(() => setColor(C_SAFE));
      tl.to(dash, { opacity: 0.3, duration: 0.3 }, '+=0.3');

      tl.to(packet, { x: 370, duration: 1.5, ease: 'power1.inOut' });
      tl.to(packet, { opacity: 0, scale: 0, duration: 0.3 });

      tl.to({}, { duration: 1 });

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
          <p className={styles.overTitle}>THREAT DETECTION FLOW</p>
          <h2 className={styles.title}>
            Detect, Disarm, <span className={styles.highlight}>Defend</span>
          </h2>
          <p className={styles.subtitle}>
            Watch how the platform processes incoming mail in real-time. Threats are analyzed, categorized, and safely quarantined, while clean emails are passed to the user.
          </p>
        </div>

        {/* ── Flow Diagram ── */}
        <div className={styles.swipeContainer}>
          <div className={styles.flowContainer}>

          {/* ── SVG Connector Paths (absolute overlay) ── */}
          <svg className={styles.pathSvg} viewBox="0 0 1050 360" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Horizontal gradient left→right */}
              <linearGradient id="hGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#00A3FF" stopOpacity="0"/>
                <stop offset="50%"  stopColor="#00A3FF" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#00A3FF" stopOpacity="0"/>
              </linearGradient>
              {/* Horizontal gradient right→left */}
              <linearGradient id="hGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#00A3FF" stopOpacity="0"/>
                <stop offset="50%"  stopColor="#00A3FF" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#00A3FF" stopOpacity="0"/>
              </linearGradient>
              {/* Vertical gradient top→bottom ESP→Sandbox */}
              <linearGradient id="vGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#00A3FF" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#F5A706" stopOpacity="0.8"/>
              </linearGradient>
              <filter id="ln-glow">
                <feGaussianBlur stdDeviation="2.5" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {/* Left line: External Internet ➜ ESP left edge  */}
            <line
              x1="185" y1="160"
              x2="325" y2="160"
              stroke="url(#hGrad)"
              strokeWidth="2"
              strokeDasharray="7 5"
              filter="url(#ln-glow)"
            />

            {/* Right line: ESP right edge ➜ Exchange Server */}
            <line
              x1="725" y1="160"
              x2="865" y2="160"
              stroke="url(#hGrad2)"
              strokeWidth="2"
              strokeDasharray="7 5"
              filter="url(#ln-glow)"
            />

            {/* Vertical line: ESP bottom ➜ Sandbox top */}
            <line
              x1="525" y1="252"
              x2="525" y2="300"
              stroke="url(#vGrad)"
              strokeWidth="2"
              strokeDasharray="5 4"
              filter="url(#ln-glow)"
            />
          </svg>

          {/* Source Network */}
          <button
            className={`${styles.nodeBlock} ${activeElement === 'source' ? styles.activeNode : ''}`}
            onClick={() => handleClick('source')}
          >
            <div className={styles.nodeIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.1332 20.176 10.2017 17.854 10.024C17.4338 6.61361 14.536 4 11 4C7.13401 4 4 7.13401 4 11C4 11.2374 4.01183 11.4722 4.03487 11.7032C2.28586 12.3392 1 14.0044 1 16C1 18.2091 2.79086 20 5 20H17.5V19Z"/>
              </svg>
            </div>
            <div className={styles.nodeLabel}>External Internet</div>
          </button>

          {/* Spacer (replaces old horizontalLine) */}
          <div className={styles.lineSpacer}></div>

          {/* ESP Node + animated packet */}
          <div className={styles.centerColumn}>

            {/* Animated email packet */}
            <div
              className={styles.emailPacket}
              ref={packetRef}
              style={{ borderColor: C_NEUTRAL, color: C_NEUTRAL, boxShadow: `0 0 18px ${C_NEUTRAL}88`, opacity: 0 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"/>
              </svg>
            </div>

            <button
              className={`${styles.hubNode} ${activeElement === 'esp' ? styles.activeNode : ''}`}
              onClick={() => handleClick('esp')}
            >
              <div className={styles.hubNodeLeft}>
                <div className={styles.nodeIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22S2 17 2 10V5L12 2L22 5V10C22 17 12 22 12 22Z"/>
                  </svg>
                </div>
                <div className={styles.nodeName}>DFX ESP</div>
                <div className={styles.nodeRole}>FILTER & DISARM</div>
              </div>

              {/* Internal Analysis Dashboard */}
              <div className={styles.hubNodeRight} ref={dashboardRef}>
                <div className={styles.dashHeader}>
                  <div className={styles.dashTitle}>Live Threat Analysis</div>
                  <div className={styles.dashNumbers} style={{ willChange: 'contents' }}>
                    <span className={`counterTarget ${styles.counterTarget}`}>0.000</span>
                    <span className={styles.dashSubNum}> / 231.4</span>
                  </div>
                </div>
                <div className={styles.dashGrid}>
                  {[
                    { color: '#FF3B30', path: 'M12 2L2 22h20L12 2z', label: 'Malware' },
                    { color: '#F5A706', path: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', label: 'Phishing' },
                    { color: '#00A3FF', path: 'M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.18a2 2 0 0 0 2.812 2.812L22 7', label: 'Spam' },
                    { color: '#34C759', path: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', label: 'Safe Links' },
                    { color: '#AF52DE', path: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', label: 'Spoofing' },
                    { color: '#FF9500', path: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z', label: 'BEC' }
                  ].map((item, idx) => (
                    <div key={idx} className={styles.dashItem}>
                      <div className={styles.dashItemIcon} style={{ background: `${item.color}20`, color: item.color, borderColor: `${item.color}40` }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d={item.path}/>
                        </svg>
                      </div>
                      <div className={styles.dashItemText}>
                        <div>{item.label}</div>
                        <div className={styles.riskLevel}>High Risk</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.scanLine} ref={scanLineRef}></div>
              </div>
            </button>

            {/* Vertical line ESP → Sandbox */}
            <div className={styles.verticalLine}></div>

            {/* Sandbox Node */}
            <button
              className={`${styles.sandboxNode} ${activeElement === 'sandbox' ? styles.activeNode : ''}`}
              onClick={() => handleClick('sandbox')}
            >
              <div className={styles.nodeIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.24 12.24A6 6 0 0 0 12 3.76M3.76 11.76A6 6 0 0 0 12 20.24M12 8v4l3 3"/>
                </svg>
              </div>
              <div className={styles.nodeName}>Sandbox</div>
              <div className={styles.nodeRole}>ISOLATED EXECUTION</div>
            </button>
          </div>

          {/* Spacer */}
          <div className={styles.lineSpacer}></div>

          {/* Destination Network */}
          <button
            className={`${styles.nodeBlock} ${styles.destNode} ${activeElement === 'dest' ? styles.activeNode : ''}`}
            onClick={() => handleClick('dest')}
          >
            <div className={styles.nodeIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2" ry="2"/>
                <path d="M8 10h8M8 14h4"/>
              </svg>
            </div>
            <div className={styles.nodeLabel}>Exchange Server</div>
          </button>
        </div>
      </div>

        {/* ── Info Panel ── */}
        {detail && (
          <div className={styles.infoPanel}>
            <div className={styles.infoPanelHeader}>
              <div>
                <p className={styles.infoPanelRole}>{detail.role}</p>
                <h3 className={styles.infoPanelTitle}>{detail.title}</h3>
              </div>
              <button className={styles.closeBtn} onClick={() => setActiveElement(null)}>
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
