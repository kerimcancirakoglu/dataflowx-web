'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './GatewayFamily.module.css';

/* ── Detail cards for each clickable element ── */
const elementDetails: Record<string, {
  title: string;
  role: string;
  steps: { label: string; text: string }[];
}> = {
  source: {
    title: 'Source Network',
    role: 'Trusted / OT / ICS Environment',
    steps: [
      { label: 'What it is', text: 'The origin of your critical data — an OT floor, SCADA control system, historian, or enterprise IT network that must share information securely without exposing itself.' },
      { label: 'The Risk', text: 'Any bidirectional connection between Source and destination networks creates an attack surface. A single compromised device on the destination side can pivot back to the source.' },
      { label: 'How DFX Protects It', text: 'The Source Network connects only to the TX Optical Diode. It never has a route to the destination — all communication is physically one-way. The Source remains completely isolated at the hardware level.' },
    ]
  },
  tx: {
    title: 'DFX Optical Diode — TX',
    role: 'Transmit (TX) Unit',
    steps: [
      { label: 'What it is', text: 'The TX unit is the sending side of the optical data diode. It converts data signals into light pulses and fires them through a fiber-optic cable in a single direction.' },
      { label: 'Hardware Enforcement', text: 'There is no receive circuitry in the TX unit. It is physically incapable of accepting incoming light signals. This is not a firewall rule — it is a law of optics enforced by hardware.' },
      { label: 'What it Guarantees', text: 'Any data that enters the TX unit will be transmitted forward — and nothing can ever travel backwards through it. Software exploits, zero-days, and misconfigurations cannot override this physical property.' },
    ]
  },
  airgap: {
    title: 'Air Gap Zone',
    role: 'Physical Isolation Boundary',
    steps: [
      { label: 'What it is', text: 'The Air Gap is the physical separation between the TX and RX units. The only connection across this boundary is a single-mode optical fiber that carries light — not electricity, not network packets.' },
      { label: 'Why it Matters', text: 'Traditional "air-gap" solutions are often software-emulated and can be bypassed. The DFX air gap is real and physical: there is no network cable, no electrical conductor, and no shared memory crossing this boundary.' },
      { label: 'Crossing the Gap', text: 'Light travels TX → RX only. No protocol crossing, no metadata leakage. The fiber does not support return-path communication — it is single-mode, single-direction by design.' },
    ]
  },
  rx: {
    title: 'DFX Optical Diode — RX',
    role: 'Receive (RX) Unit',
    steps: [
      { label: 'What it is', text: 'The RX unit receives the light pulses from the TX unit and converts them back into network data. It sits entirely on the destination/protected network side.' },
      { label: 'Zero Reverse Channel', text: 'The RX unit contains no transmit circuitry. It cannot emit light or send any signal back through the fiber. An attacker on the receiving network has zero physical capability to reach the source.' },
      { label: 'What it Guarantees', text: 'Even if the Protected Network is fully compromised, the attacker faces a mathematical impossibility: they cannot send data backwards through a receive-only optical component. The source remains untouchable.' },
    ]
  },
  dest: {
    title: 'Protected Network',
    role: 'Destination / Isolated Environment',
    steps: [
      { label: 'What it is', text: 'The Protected Network receives authorized, one-way data feeds from the source. This may be a DMZ, a cloud analytics platform, an IT network, or a completely air-gapped environment.' },
      { label: 'Isolation Guarantee', text: 'This network has no route back to the source. No connection — TCP, UDP, or otherwise — can be initiated from here to the originating network. Network segmentation is enforced at the physics layer.' },
      { label: 'Result', text: 'Operators on the Protected Network receive real-time telemetry, logs, video, and data streams from the source — without introducing any exposure to the trusted environment. True one-way bridge.' },
    ]
  }
};

type ElementId = keyof typeof elementDetails;

export default function GatewayFamily() {
  const containerRef = useRef<HTMLDivElement>(null);
  const packet1Ref = useRef<HTMLDivElement>(null);
  const packet2Ref = useRef<HTMLDivElement>(null);
  const packet3Ref = useRef<HTMLDivElement>(null);
  const [activeElement, setActiveElement] = useState<ElementId | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (packet1Ref.current) {
        gsap.fromTo(
          packet1Ref.current,
          { left: '0%', opacity: 0 },
          {
            left: '100%',
            duration: 2,
            ease: 'none',
            repeat: -1,
            delay: 0,
            keyframes: {
              '0%': { opacity: 0, left: '0%' },
              '15%': { opacity: 1 },
              '85%': { opacity: 1 },
              '100%': { opacity: 0, left: '100%' }
            }
          }
        );
      }
      // Packet 2: TX → Air Gap → RX (the long center section)
      if (packet2Ref.current) {
        gsap.fromTo(
          packet2Ref.current,
          { left: '0%', opacity: 0 },
          {
            left: '100%',
            duration: 3.5,
            ease: 'none',
            repeat: -1,
            delay: 1.2,
            keyframes: {
              '0%': { opacity: 0, left: '0%' },
              '10%': { opacity: 1 },
              '90%': { opacity: 1 },
              '100%': { opacity: 0, left: '100%' }
            }
          }
        );
      }
      // Packet 3: RX → Protected Network
      if (packet3Ref.current) {
        gsap.fromTo(
          packet3Ref.current,
          { left: '0%', opacity: 0 },
          {
            left: '100%',
            duration: 2,
            ease: 'none',
            repeat: -1,
            delay: 3.5,
            keyframes: {
              '0%': { opacity: 0, left: '0%' },
              '15%': { opacity: 1 },
              '85%': { opacity: 1 },
              '100%': { opacity: 0, left: '100%' }
            }
          }
        );
      }
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
            Hardware-Enforced <span className={styles.highlight}>Data Flow</span>
          </h2>
          <p className={styles.subtitle}>
            Click any element to understand exactly how DFX UDG enforces one-way data transfer
            and protects your critical networks at every step.
          </p>
        </div>

        {/* ── Diagram Row ── */}
        <div className={styles.flowContainer}>

          {/* Source Network */}
          <button
            className={`${styles.networkBlock} ${styles.sourceNetwork} ${activeElement === 'source' ? styles.activeNode : ''}`}
            onClick={() => handleClick('source')}
            aria-label="Source Network — click to learn more"
          >
            <div className={styles.networkIcons}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                <line x1="6" y1="6" x2="6.01" y2="6" />
                <line x1="6" y1="18" x2="6.01" y2="18" />
              </svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              </svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className={styles.networkLabel}>Source Network</div>
            <div className={styles.clickHint}>Click to explore</div>
          </button>

          {/* Line 1 */}
          <div className={styles.connectionLine} style={{ flex: 1 }}>
            <div className={styles.packet} ref={packet1Ref}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                <polyline points="13 2 13 9 20 9" />
              </svg>
              <div className={styles.packetCheck}>✓</div>
            </div>
          </div>

          {/* TX Diode */}
          <div className={styles.featureColumn}>
            <button
              className={`${styles.diodeBox} ${styles.txBox} ${activeElement === 'tx' ? styles.activeNode : ''}`}
              onClick={() => handleClick('tx')}
              aria-label="TX Diode — click to learn more"
            >
              <div className={styles.diodeIconWrapper}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M14 7l5 5-5 5" />
                </svg>
              </div>
              <div className={styles.diodeName}>DFX Optical Diode</div>
              <div className={styles.diodeRole}>TRANSMIT (TX)</div>
            </button>
            <div className={styles.featureInfo}>
              <h4>Hardware-Level Isolation</h4>
              <p>Physical diode ensures data travels only in one direction.</p>
            </div>
          </div>

          {/* Air Gap + line across */}
          <div className={styles.middleSection} style={{ flex: 2 }}>
            <div className={styles.connectionLine} style={{ width: '100%', position: 'relative' }}>
              <div className={styles.packet} ref={packet2Ref}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                  <polyline points="13 2 13 9 20 9" />
                </svg>
                <div className={styles.packetCheck}>✓</div>
              </div>
            </div>

            <button
              className={`${styles.airGapZone} ${activeElement === 'airgap' ? styles.activeNode : ''}`}
              onClick={() => handleClick('airgap')}
              aria-label="Air Gap — click to learn more"
            >
              <div className={styles.airGapPattern} />
              <div className={styles.airGapLabelBox}>
                <span className={styles.airGapLabelTop}>AIR</span>
                <span className={styles.airGapLabelBot}>GAP</span>
              </div>
            </button>

            <div className={styles.featureInfo} style={{ marginTop: '1rem' }}>
              <h4>Air-Gap Bridging</h4>
              <p>Transfer data without opening any network ports.</p>
            </div>
          </div>

          {/* RX Diode */}
          <div className={styles.featureColumn}>
            <button
              className={`${styles.diodeBox} ${styles.rxBox} ${activeElement === 'rx' ? styles.activeNode : ''}`}
              onClick={() => handleClick('rx')}
              aria-label="RX Diode — click to learn more"
            >
              <div className={styles.diodeIconWrapper}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M14 7l5 5-5 5" />
                </svg>
              </div>
              <div className={styles.diodeName}>DFX Optical Diode</div>
              <div className={styles.diodeRole}>RECEIVE (RX)</div>
            </button>
            <div className={styles.featureInfo}>
              <h4>Zero Reverse Channel</h4>
              <p>Mathematically impossible for attackers to reach back.</p>
            </div>
          </div>

          {/* Line 3: RX → Protected Network — now with packet animation */}
          <div className={styles.connectionLine} style={{ flex: 1 }}>
            <div className={styles.packet} ref={packet3Ref}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                <polyline points="13 2 13 9 20 9" />
              </svg>
              <div className={styles.packetCheck}>✓</div>
            </div>
          </div>

          {/* Destination Network */}
          <button
            className={`${styles.networkBlock} ${styles.destNetwork} ${activeElement === 'dest' ? styles.activeNode : ''}`}
            onClick={() => handleClick('dest')}
            aria-label="Protected Network — click to learn more"
          >
            <div className={styles.networkIcons}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                <line x1="6" y1="6" x2="6.01" y2="6" />
                <line x1="6" y1="18" x2="6.01" y2="18" />
              </svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              </svg>
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
