'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './DataFlowDiagram.module.css';

interface DataFlowDiagramProps {
  type: 'unidirectional' | 'cross-domain';
}

export default function DataFlowDiagram({ type }: DataFlowDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const forwardPacketRef = useRef<HTMLDivElement>(null);
  const reversePacketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Forward animation (Left to Right)
      if (forwardPacketRef.current) {
        gsap.fromTo(
          forwardPacketRef.current,
          { left: '10%', opacity: 0 },
          {
            left: '90%',
            opacity: 1,
            duration: 2.5,
            ease: 'power1.inOut',
            repeat: -1,
            keyframes: {
              '0%': { opacity: 0 },
              '20%': { opacity: 1 },
              '80%': { opacity: 1 },
              '100%': { opacity: 0 }
            }
          }
        );
      }

      // Reverse animation for cross-domain (Right to Left)
      if (type === 'cross-domain' && reversePacketRef.current) {
        gsap.fromTo(
          reversePacketRef.current,
          { left: '90%', opacity: 0 },
          {
            left: '10%',
            opacity: 1,
            duration: 2.5,
            delay: 1.25, // offset from forward packet
            ease: 'power1.inOut',
            repeat: -1,
            keyframes: {
              '0%': { opacity: 0 },
              '20%': { opacity: 1 },
              '80%': { opacity: 1 },
              '100%': { opacity: 0 }
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [type]);

  return (
    <div className={styles.container} ref={containerRef}>
      {/* Background Line */}
      <div className={styles.connectionLine} />

      {/* Animated Packets */}
      <div className={styles.packet} ref={forwardPacketRef} />
      {type === 'cross-domain' && (
        <div className={`${styles.packet} ${styles.packetReverse}`} ref={reversePacketRef} />
      )}

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

      {/* Center Gateway Area */}
      <div className={styles.centerGateway}>

        {/* TX Module */}
        <div className={`${styles.diodeBox} ${styles.txBox}`}>
          <div className={`${styles.diodeLabel} ${styles.txLabel}`}>TX</div>
          <div className={styles.diodeText}>
            DFX UG
            <span>Transmit</span>
          </div>
        </div>

        {/* Air Gap Visual */}
        <div className={styles.airGap}>
          <span className={styles.airGapLabel}>Air Gap</span>
        </div>

        {/* RX Module */}
        <div className={`${styles.diodeBox} ${styles.rxBox}`}>
          <div className={`${styles.diodeLabel} ${styles.rxLabel}`}>RX</div>
          <div className={styles.diodeText}>
            DFX UG
            <span>Receive</span>
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
