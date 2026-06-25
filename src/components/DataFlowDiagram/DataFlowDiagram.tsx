'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './DataFlowDiagram.module.css';

interface DataFlowDiagramProps {
  type: 'unidirectional' | 'cross-domain';
}

export default function DataFlowDiagram({ type }: DataFlowDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Cross-domain refs
  const forwardPacketRef = useRef<HTMLDivElement>(null);
  const reversePacketRef = useRef<HTMLDivElement>(null);

  // Unidirectional refs
  const packetTop1Ref = useRef<HTMLDivElement>(null);
  const packetBot1Ref = useRef<HTMLDivElement>(null);
  const packetCenterRef = useRef<HTMLDivElement>(null);
  const packetTop2Ref = useRef<HTMLDivElement>(null);
  const packetBot2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (type === 'unidirectional') {
        if (!packetTop1Ref.current) return;
        const tl = gsap.timeline({ repeat: -1 });

        // Phase 1: Source to TX (Top and Bottom channels, left to right)
        tl.fromTo(
          [packetTop1Ref.current, packetBot1Ref.current],
          { left: '10%', opacity: 0 },
          { left: '32%', opacity: 1, duration: 1.2, ease: 'power1.inOut' }
        ).to(
          [packetTop1Ref.current, packetBot1Ref.current],
          { opacity: 0, duration: 0.1 }
        );

        // Phase 2: TX to RX (Center channel, left to right, single packet)
        tl.fromTo(
          packetCenterRef.current,
          { left: '38%', opacity: 0 },
          { left: '62%', opacity: 1, duration: 1.2, ease: 'none' }
        ).to(
          packetCenterRef.current,
          { opacity: 0, duration: 0.1 }
        );

        // Phase 3: RX to Protected (Top and Bottom channels, left to right)
        tl.fromTo(
          [packetTop2Ref.current, packetBot2Ref.current],
          { left: '68%', opacity: 0 },
          { left: '90%', opacity: 1, duration: 1.2, ease: 'power1.inOut' }
        ).to(
          [packetTop2Ref.current, packetBot2Ref.current],
          { opacity: 0, duration: 0.1 },
          "+=0.2"
        );
      } else {
        // Cross-domain logic
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
        if (reversePacketRef.current) {
          gsap.fromTo(
            reversePacketRef.current,
            { left: '90%', opacity: 0 },
            {
              left: '10%',
              opacity: 1,
              duration: 2.5,
              delay: 1.25,
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
      }
    }, containerRef);

    return () => ctx.revert();
  }, [type]);

  return (
    <div className={styles.container} ref={containerRef}>
      
      {type === 'unidirectional' ? (
        <>
          <div className={styles.centerLineOnly} />
          <div className={styles.dualLineContainerSource}>
            <div className={styles.lineTop} />
            <div className={styles.lineBot} />
          </div>
          <div className={styles.dualLineContainerDest}>
            <div className={styles.lineTop} />
            <div className={styles.lineBot} />
          </div>

          {/* Phase 1 Packets */}
          <div className={styles.packetTop} ref={packetTop1Ref}>
            <div className={styles.packetIcons}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                <polyline points="13 2 13 9 20 9" />
              </svg>
            </div>
          </div>
          <div className={styles.packetBot} ref={packetBot1Ref}>
            <div className={styles.packetIcons}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#F5A706" strokeWidth="1.5">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              </svg>
            </div>
          </div>

          {/* Phase 2 Packet */}
          <div className={styles.packetCenter} ref={packetCenterRef}>
            <div className={styles.packetIcons}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                <polyline points="13 2 13 9 20 9" />
              </svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="#F5A706" strokeWidth="1.5">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              </svg>
            </div>
          </div>

          {/* Phase 3 Packets */}
          <div className={styles.packetTop} ref={packetTop2Ref}>
            <div className={styles.packetIcons}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                <polyline points="13 2 13 9 20 9" />
              </svg>
            </div>
          </div>
          <div className={styles.packetBot} ref={packetBot2Ref}>
            <div className={styles.packetIcons}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#F5A706" strokeWidth="1.5">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              </svg>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.connectionLine} />
          {/* Animated Packets */}
          <div className={styles.packet} ref={forwardPacketRef}>
            <div className={styles.packetIcons}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                <polyline points="13 2 13 9 20 9" />
              </svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="#F5A706" strokeWidth="1.5">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              </svg>
            </div>
          </div>
          
          <div className={`${styles.packet} ${styles.packetReverse}`} ref={reversePacketRef}>
            <div className={styles.packetIcons}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#F5A706" strokeWidth="1.5">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              </svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                <polyline points="13 2 13 9 20 9" />
              </svg>
            </div>
          </div>
        </>
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
            DFX UDG
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
            DFX UDG
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
