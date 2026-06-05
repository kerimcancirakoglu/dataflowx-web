'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './UnidirectionalGatewayDiagram.module.css';

export default function UnidirectionalGatewayDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const packetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Packet - Moves Left to Right across the diodes
      if (packetRef.current) {
        gsap.fromTo(
          packetRef.current,
          { left: '-10%', opacity: 0 },
          {
            left: '110%',
            opacity: 1,
            duration: 3,
            ease: 'power1.inOut',
            repeat: -1,
            keyframes: {
              '0%': { opacity: 0 },
              '15%': { opacity: 1 },
              '85%': { opacity: 1 },
              '100%': { opacity: 0 }
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>

      {/* Left Column: Visual Diagram + Title Info */}
      <div className={styles.leftColumn}>

        <div className={styles.visualArea}>
          <div className={styles.mainConnectionLine} />
          {/* Left Network Box (Source) */}
          <div className={styles.networkBox}>
            <svg className={styles.networkIcon} style={{ color: '#F5A706' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
              <line x1="6" y1="6" x2="6.01" y2="6" />
              <line x1="6" y1="18" x2="6.01" y2="18" />
            </svg>
            <div className={styles.networkLabel}>Source<br />Network</div>
          </div>

          <div className={styles.gatewayArea}>
            <div className={styles.airGap}>
              <span className={styles.airGapLabel}>Air Gap</span>
            </div>

            <div className={styles.diodeRow}>
              <div className={`${styles.packet} ${styles.packetYellow}`} ref={packetRef} />

              <div className={`${styles.diodeBox} ${styles.txBox}`}>
                <div className={styles.diodeLabelRow}>
                  <span className={`${styles.diodeLabel} ${styles.txLabel}`}>TX</span>
                  <span className={styles.diodeText}>DFX UG</span>
                </div>
                <div className={styles.diodeText}>Transmit</div>
              </div>

              <div className={`${styles.diodeBox} ${styles.rxBox}`}>
                <div className={styles.diodeLabelRow}>
                  <span className={`${styles.diodeLabel} ${styles.rxLabel}`}>RX</span>
                  <span className={styles.diodeText}>DFX UG</span>
                </div>
                <div className={styles.diodeText}>Receive</div>
              </div>
            </div>
          </div>

          {/* Right Network Box (Protected) */}
          <div className={styles.networkBox}>
            <svg className={styles.networkIcon} style={{ color: '#F5A706' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
            <div className={styles.networkLabel}>Protected<br />Network</div>
          </div>
        </div>

        <div className={styles.featuresGridLeft}>
          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <circle cx="12" cy="11" r="3" />
              </svg>
            </div>
            <div className={styles.featureCardText}>Security Management<br />Singularity</div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                <path d="M12 11v4" />
                <path d="M10 13h4" />
              </svg>
            </div>
            <div className={styles.featureCardText}>Business Use Case<br />& Executive Benefits</div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div className={styles.featureCardText}>OT<br />Visibility</div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div className={styles.featureCardText}>Integrated Compliance<br />Reporting</div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <polyline points="11 8 11 11 14 11" />
              </svg>
            </div>
            <div className={styles.featureCardText}>Advanced Monitoring<br />& Auditing</div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </div>
            <div className={styles.featureCardText}>Secure Data Sharing<br />with 3rd Parties</div>
          </div>
        </div>
      </div>

      {/* Right Column: Text & Accolades */}
      <div className={styles.rightColumn}>
        <div className={styles.infoPanel}>
          <h2 className={styles.title}>
            Unidirectional Gateway
          </h2>
          <p className={styles.description}>
            DFX UDG is a diode-based gateway operating on Zero Trust principles. It physically isolates critical networks, allowing only authorized one-way data transmission.
          </p>

          <div className={styles.protectBox} style={{ marginBottom: '1.5rem' }}>
            <div className={styles.protectLabel}>HOW IT PROTECTS YOUR CRITICAL INFRASTRUCTURE</div>
            <div className={styles.protectText}>
              Secures sensitive infrastructures by completely neutralizing threats and making reverse data flow physically impossible.
            </div>
          </div>

          <div className={styles.protectBox} style={{ marginBottom: '1.5rem' }}>
            <div className={styles.protectLabel}>GARTNER RECOGNITION</div>
            <div className={styles.protectText}>
              We are proud to be recognized as a Sample Vendor in the Gartner Hype Cycle for CPS Security, in the Unidirectional Gateways category, for the third consecutive year.
            </div>
          </div>

          <div className={styles.protectBox}>
            <div className={styles.protectLabel}>EAL4+ CERTIFICATION</div>
            <div className={styles.protectText}>
              Furthermore, DFX UDG holds the EAL4+ Common Criteria certification, ensuring the highest level of hardware-enforced, one-way data transfer technology in protecting critical infrastructure.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
