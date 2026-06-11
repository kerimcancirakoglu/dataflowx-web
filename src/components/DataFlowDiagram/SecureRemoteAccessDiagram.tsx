'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './SecureRemoteAccessDiagram.module.css';

export default function SecureRemoteAccessDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestPacketRef = useRef<HTMLDivElement>(null);
  const responsePacketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Top Row (Request) - Moves Left to Right
      if (requestPacketRef.current) {
        gsap.fromTo(
          requestPacketRef.current,
          { left: '-5%', right: 'auto', opacity: 0 },
          {
            left: '105%',
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

      // Bottom Row (Response) - Moves Right to Left
      if (responsePacketRef.current) {
        gsap.fromTo(
          responsePacketRef.current,
          { right: '-5%', left: 'auto', opacity: 0 },
          {
            right: '105%',
            opacity: 1,
            duration: 3,
            delay: 1.5, // staggered
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

      {/* Left Network Box (Source) */}
      <div className={styles.networkBox}>
        <svg className={styles.networkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
        <div className={styles.networkLabel}>Source<br />Network</div>
      </div>

      {/* Gateway Area */}
      <div className={styles.gatewayArea}>

        {/* CM Module */}
        <div className={styles.brokerBox}>
          <div className={styles.brokerLabel}>CM</div>
          <div className={styles.brokerText}>
            Secure Remote Access
          </div>
        </div>

        {/* Diodes Area */}
        <div className={styles.diodesArea}>
          {/* Vertical Air Gap */}
          <div className={styles.airGap}>
            <span className={styles.airGapLabel}>Air Gap</span>
          </div>

          {/* Top Row: Request (Left to Right) */}
          <div className={styles.diodeRow}>
            <div className={styles.connectionLine} />
            <div className={`${styles.packet} ${styles.packetYellow}`} ref={requestPacketRef} />
            <div className={`${styles.flowLabel} ${styles.flowLabelYellow}`}>Request</div>

            {/* Left to right flow means TX is on the left, RX on the right */}
            <div className={`${styles.diodeBox} ${styles.txBox}`}>
              <div className={`${styles.diodeLabel} ${styles.txLabel}`}>TX</div>
              <div className={styles.diodeText}>Diode</div>
            </div>

            <div className={`${styles.diodeBox} ${styles.rxBox}`}>
              <div className={`${styles.diodeLabel} ${styles.rxLabel}`}>RX</div>
              <div className={styles.diodeText}>Diode</div>
            </div>
          </div>

          {/* Bottom Row: Response (Right to Left) */}
          <div className={styles.diodeRow}>
            <div className={styles.connectionLine} />
            <div className={`${styles.packet} ${styles.packetBlue}`} ref={responsePacketRef} />
            <div className={`${styles.flowLabelBottom} ${styles.flowLabelBlue}`}>Response</div>

            {/* Ensure it always reads TX -> RX */}
            <div className={`${styles.diodeBox} ${styles.txBox}`}>
              <div className={`${styles.diodeLabel} ${styles.txLabel}`}>TX</div>
              <div className={styles.diodeText}>Diode</div>
            </div>

            <div className={`${styles.diodeBox} ${styles.rxBox}`}>
              <div className={`${styles.diodeLabel} ${styles.rxLabel}`}>RX</div>
              <div className={styles.diodeText}>Diode</div>
            </div>
          </div>
        </div>

        {/* SM Module */}
        <div className={styles.brokerBox}>
          <div className={styles.brokerLabel}>SM</div>
          <div className={styles.brokerText}>
            DFX Secure Remote Access
          </div>
        </div>

      </div>

      {/* Right Network Box (Destination) */}
      <div className={styles.networkBox}>
        <svg className={styles.networkIcon} style={{ color: '#F5A706' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
        <div className={styles.networkLabel}>Protected<br />Network</div>
      </div>

    </div>
  );
}
