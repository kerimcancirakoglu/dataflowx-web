'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './BrokerFamily.module.css';

/* ── Detail cards for each clickable element ── */
const elementDetails: Record<string, {
  title: string;
  role: string;
  steps: { label: string; text: string }[];
}> = {
  source: {
    title: 'Source Network',
    role: 'Remote Access / Client Environment',
    steps: [
      { label: 'What it is', text: 'The origin of the access request — this could be an external user, an enterprise IT network, or a remote operator needing secure access to critical systems.' },
      { label: 'The Risk', text: 'Direct connections to critical OT or internal networks invite devastating cyber threats. Standard firewalls are not enough to prevent sophisticated breaches or zero-days.' },
      { label: 'How DFX Protects It', text: 'Instead of a direct connection, all requests are terminated at the CM Module. The source never touches the destination network directly, ensuring absolute isolation.' },
    ]
  },
  cm: {
    title: 'Secure Remote Access — CM',
    role: 'Client Module (CM)',
    steps: [
      { label: 'What it is', text: 'The Client Module (CM) acts as a secure proxy, terminating connections from the source network and inspecting all requests before they proceed.' },
      { label: 'Granular Filtering', text: 'Performs protocol-specific, content-aware filtering. It integrates with Active Directory to enforce strict Zero Trust Network Access policies.' },
      { label: 'Sandbox Integration', text: 'Via ICAP integration, the CM can route payloads to sandbox solutions (like DFX Sandbox) for deep analysis and malware mitigation before transmission.' },
    ]
  },
  tx: {
    title: 'DFX UG — TX',
    role: 'Transmit (TX) Unit',
    steps: [
      { label: 'What it is', text: 'The TX unit takes the validated request from the CM module and converts it into light pulses to traverse the optical fiber.' },
      { label: 'Hardware Enforcement', text: 'Constructed without receive circuitry, the TX unit is physically incapable of accepting reverse signals, enforcing a one-way path.' },
      { label: 'What it Guarantees', text: 'It guarantees that the transmission channel itself cannot be compromised or used to pivot back into the external network under any circumstances.' },
    ]
  },
  airgap: {
    title: 'Air Gap Zone',
    role: 'Physical Isolation Boundary',
    steps: [
      { label: 'What it is', text: 'The physical separation bridged only by optical fiber. No electrical conductors or standard network cables cross this boundary.' },
      { label: 'Why it Matters', text: 'It provides a true physical break in the network, ensuring that software vulnerabilities cannot bridge the connection between the CM and SM modules.' },
      { label: 'Crossing the Gap', text: 'Data travels as light. By utilizing optical isolation within a request-response architecture, Broker ensures continuous yet impenetrable communication.' },
    ]
  },
  rx: {
    title: 'DFX UG — RX',
    role: 'Receive (RX) Unit',
    steps: [
      { label: 'What it is', text: 'The RX unit receives the light pulses from the TX unit across the air gap and converts them back into data for the SM module.' },
      { label: 'Zero Reverse Channel', text: 'Built entirely without transmit components. It is mathematically and physically impossible for the RX unit to send data back.' },
      { label: 'What it Guarantees', text: 'Even if the protected network faces an internal anomaly, the RX diode prevents any data or signal from leaking back to the outside world.' },
    ]
  },
  sm: {
    title: 'Secure Remote Access — SM',
    role: 'Server Module (SM)',
    steps: [
      { label: 'What it is', text: 'The Server Module (SM) receives the sanitized request from the RX diode and reconstructs it on the protected internal network.' },
      { label: 'Request Fulfillment', text: 'It acts as the secure gateway to your critical databases, apps, or OT environments, ensuring only pristine, authorized commands are executed.' },
      { label: 'Full Control', text: 'Provides centralized visibility and full control over data traffic, enabling secure cross-domain transmission with robust compliance auditing.' },
    ]
  },
  dest: {
    title: 'Protected Network',
    role: 'Critical / Internal Environment',
    steps: [
      { label: 'What it is', text: 'The highly sensitive destination network housing critical databases, OT sensors, SCADA systems, or corporate applications.' },
      { label: 'Isolation Guarantee', text: 'Hidden behind the Broker and Diode architecture, the network remains completely invisible and inaccessible to direct external routing.' },
      { label: 'Result', text: 'Safe, request-response based transmission allows operational continuity and secure remote access without exposing the network to cyber threats.' },
    ]
  }
};

type ElementId = keyof typeof elementDetails;

export default function BrokerFamily() {
  const containerRef = useRef<HTMLDivElement>(null);
  const req1Ref = useRef<HTMLDivElement>(null); // Source -> CM
  const req2Ref = useRef<HTMLDivElement>(null); // Air Gap Top
  const req3Ref = useRef<HTMLDivElement>(null); // SM -> Dest

  const res1Ref = useRef<HTMLDivElement>(null); // Air Gap Bottom (Right to Left)
  
  const [activeElement, setActiveElement] = useState<ElementId | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Request Packets (Left to Right)
      const animateLR = (ref: React.RefObject<HTMLDivElement | null>, delay: number) => {
        if (ref.current) {
          gsap.fromTo(
            ref.current,
            { left: '0%', opacity: 0 },
            {
              left: '100%',
              duration: 1.5,
              ease: 'none',
              repeat: -1,
              delay,
              keyframes: {
                '0%':   { opacity: 0, left: '0%' },
                '15%':  { opacity: 1 },
                '85%':  { opacity: 1 },
                '100%': { opacity: 0, left: '100%' }
              }
            }
          );
        }
      };

      // Response Packets (Right to Left)
      const animateRL = (ref: React.RefObject<HTMLDivElement | null>, delay: number) => {
        if (ref.current) {
          gsap.fromTo(
            ref.current,
            { left: '100%', opacity: 0 },
            {
              left: '0%',
              duration: 1.5,
              ease: 'none',
              repeat: -1,
              delay,
              keyframes: {
                '0%':   { opacity: 0, left: '100%' },
                '15%':  { opacity: 1 },
                '85%':  { opacity: 1 },
                '100%': { opacity: 0, left: '0%' }
              }
            }
          );
        }
      };

      animateLR(req1Ref, 0);
      animateLR(req2Ref, 1);
      animateLR(req3Ref, 2);
      
      animateRL(res1Ref, 0.5);

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
          <p className={styles.overTitle}>SECURITY ARCHITECTURE</p>
          <h2 className={styles.title}>
            Secure Cross-Domain <span className={styles.highlight}>Access</span>
          </h2>
          <p className={styles.subtitle}>
            Click any element to understand how Secure Remote Access enables request-response based 
            transmission between isolated networks via integrated CM/SM modules and DFX UG.
          </p>
        </div>

        {/* ── Diagram Row ── */}
        <div className={styles.flowContainer}>

          {/* 1. Source Network */}
          <button
            className={`${styles.networkBlock} ${activeElement === 'source' ? styles.activeNode : ''}`}
            onClick={() => handleClick('source')}
          >
            <div className={styles.networkIcons}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                <line x1="6" y1="6" x2="6.01" y2="6" />
                <line x1="6" y1="18" x2="6.01" y2="18" />
              </svg>
            </div>
            <div className={styles.networkLabel}>Source Network</div>
            <div className={styles.clickHint}>Click to explore</div>
          </button>

          {/* Line 1 */}
          <div className={styles.straightLine}>
            <div className={`${styles.packet} ${styles.packetReq}`} ref={req1Ref}></div>
          </div>

          {/* 2. CM Module */}
          <div className={styles.featureColumn}>
            <button
              className={`${styles.brokerBox} ${activeElement === 'cm' ? styles.activeNode : ''}`}
              onClick={() => handleClick('cm')}
            >
              <div className={styles.brokerIconWrapper}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
              </div>
              <div className={styles.brokerName}>Secure Remote Access</div>
              <div className={styles.brokerRole}>CM MODULE</div>
              <div className={styles.clickHint}>Click to explore</div>
            </button>
          </div>

          {/* 3. Fork Left */}
          <div className={styles.forkContainer}>
             <svg viewBox="0 0 40 210" className={styles.forkSvg}>
               <path d="M0,105 L20,105 L20,45 L40,45" className={styles.pathLine} />
               <path d="M0,105 L20,105 L20,165 L40,165" className={styles.pathLine} />
             </svg>
          </div>

          {/* 4. Diode Stack Left */}
          <div className={styles.diodeStack}>
            {/* Top: TX */}
            <button className={`${styles.diodeBox} ${styles.txBox} ${activeElement === 'tx' ? styles.activeNode : ''}`} onClick={() => handleClick('tx')}>
              <div className={styles.diodeRole}>
                <span className={styles.txText}>TX</span> <div className={`${styles.diodeDot} ${styles.txDot}`}></div>
              </div>
              <div className={styles.diodeName}>Diode</div>
              <div className={styles.clickHint}>Click to explore</div>
            </button>
            {/* Bottom: RX */}
            <button className={`${styles.diodeBox} ${styles.rxBox} ${activeElement === 'rx' ? styles.activeNode : ''}`} onClick={() => handleClick('rx')}>
              <div className={styles.diodeRole}>
                <span className={styles.rxText}>RX</span> <div className={`${styles.diodeDot} ${styles.rxDot}`}></div>
              </div>
              <div className={styles.diodeName}>Diode</div>
              <div className={styles.clickHint}>Click to explore</div>
            </button>
          </div>

          {/* 5. Air Gap Center */}
          <div className={styles.airGapCenter}>
             <div className={styles.horizontalLineTop}>
                <span className={styles.pathLabelReq}>Request</span>
                <div className={`${styles.packet} ${styles.packetReq}`} ref={req2Ref}></div>
             </div>
             
             <button className={`${styles.airGapVertical} ${activeElement === 'airgap' ? styles.activeNode : ''}`} onClick={() => handleClick('airgap')}>
                <div className={styles.airGapText}>AIR GAP</div>
             </button>
             
             <div className={styles.horizontalLineBottom}>
                <span className={styles.pathLabelRes}>Response</span>
                <div className={`${styles.packet} ${styles.packetRes}`} ref={res1Ref}></div>
             </div>
          </div>

          {/* 6. Diode Stack Right */}
          <div className={styles.diodeStack}>
            {/* Top: RX */}
            <button className={`${styles.diodeBox} ${styles.rxBox} ${activeElement === 'rx' ? styles.activeNode : ''}`} onClick={() => handleClick('rx')}>
              <div className={styles.diodeRole}>
                <span className={styles.rxText}>RX</span> <div className={`${styles.diodeDot} ${styles.rxDot}`}></div>
              </div>
              <div className={styles.diodeName}>Diode</div>
              <div className={styles.clickHint}>Click to explore</div>
            </button>
            {/* Bottom: TX */}
            <button className={`${styles.diodeBox} ${styles.txBox} ${activeElement === 'tx' ? styles.activeNode : ''}`} onClick={() => handleClick('tx')}>
              <div className={styles.diodeRole}>
                <span className={styles.txText}>TX</span> <div className={`${styles.diodeDot} ${styles.txDot}`}></div>
              </div>
              <div className={styles.diodeName}>Diode</div>
              <div className={styles.clickHint}>Click to explore</div>
            </button>
          </div>

          {/* 7. Fork Right */}
          <div className={styles.forkContainer}>
             <svg viewBox="0 0 40 210" className={styles.forkSvg}>
               <path d="M0,45 L20,45 L20,105 L40,105" className={styles.pathLine} />
               <path d="M0,165 L20,165 L20,105 L40,105" className={styles.pathLine} />
             </svg>
          </div>

          {/* 8. SM Module */}
          <div className={styles.featureColumn}>
            <button
              className={`${styles.brokerBox} ${activeElement === 'sm' ? styles.activeNode : ''}`}
              onClick={() => handleClick('sm')}
            >
              <div className={styles.brokerIconWrapper}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                </svg>
              </div>
              <div className={styles.brokerName}>Secure Remote Access</div>
              <div className={styles.brokerRole}>SM MODULE</div>
              <div className={styles.clickHint}>Click to explore</div>
            </button>
          </div>

          {/* Line 9 */}
          <div className={styles.straightLine}>
            <div className={`${styles.packet} ${styles.packetReq}`} ref={req3Ref}></div>
          </div>

          {/* 10. Destination Network */}
          <button
            className={`${styles.networkBlock} ${activeElement === 'dest' ? styles.activeNode : ''}`}
            onClick={() => handleClick('dest')}
          >
            <div className={styles.networkIcons}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div className={styles.networkLabel}>Protected Network</div>
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
