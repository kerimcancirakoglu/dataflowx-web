'use client';

import React, { useEffect, useRef } from 'react';
import styles from './SecureRemoteAccessDiagram.module.css';

export default function SecureRemoteAccessDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestPacketRef = useRef<HTMLDivElement>(null);
  const responsePacketRef = useRef<HTMLDivElement>(null);
  const dataPacketRef = useRef<HTMLDivElement>(null);
  const filePacketRef = useRef<HTMLDivElement>(null);
  const dataRevPacketRef = useRef<HTMLDivElement>(null);
  const fileRevPacketRef = useRef<HTMLDivElement>(null);
  const smDataPacketRef = useRef<HTMLDivElement>(null);
  const smFilePacketRef = useRef<HTMLDivElement>(null);
  const smDataRevPacketRef = useRef<HTMLDivElement>(null);
  const smFileRevPacketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;
    import('gsap').then(({ gsap }) => {
      ctx = gsap.context(() => {
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

      // Source to CM Data Packet
      if (dataPacketRef.current) {
        gsap.fromTo(
          dataPacketRef.current,
          { left: '-10%', opacity: 0 },
          {
            left: '110%',
            opacity: 1,
            duration: 2,
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

      // Source to CM File (PDF) Packet
      if (filePacketRef.current) {
        gsap.fromTo(
          filePacketRef.current,
          { left: '-10%', opacity: 0 },
          {
            left: '110%',
            opacity: 1,
            duration: 2.5,
            delay: 1,
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
      // CM → Source reverse Data Packet
      if (dataRevPacketRef.current) {
        gsap.fromTo(dataRevPacketRef.current,
          { left: '110%', opacity: 0 },
          { left: '-10%', opacity: 1, duration: 2, delay: 1.2, ease: 'power1.inOut', repeat: -1,
            keyframes: { '0%': { opacity: 0 }, '20%': { opacity: 1 }, '80%': { opacity: 1 }, '100%': { opacity: 0 } }
          }
        );
      }
      // CM → Source reverse File (PDF) Packet
      if (fileRevPacketRef.current) {
        gsap.fromTo(fileRevPacketRef.current,
          { left: '110%', opacity: 0 },
          { left: '-10%', opacity: 1, duration: 2.5, delay: 2.2, ease: 'power1.inOut', repeat: -1,
            keyframes: { '0%': { opacity: 0 }, '20%': { opacity: 1 }, '80%': { opacity: 1 }, '100%': { opacity: 0 } }
          }
        );
      }

      // SM to Protected Network Data Packet
      if (smDataPacketRef.current) {
        gsap.fromTo(
          smDataPacketRef.current,
          { left: '-10%', opacity: 0 },
          {
            left: '110%',
            opacity: 1,
            duration: 2,
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

      // SM to Protected Network File (PDF) Packet
      if (smFilePacketRef.current) {
        gsap.fromTo(
          smFilePacketRef.current,
          { left: '-10%', opacity: 0 },
          {
            left: '110%',
            opacity: 1,
            duration: 2.5,
            delay: 1,
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

      // Protected → SM reverse Data Packet
      if (smDataRevPacketRef.current) {
        gsap.fromTo(smDataRevPacketRef.current,
          { left: '110%', opacity: 0 },
          { left: '-10%', opacity: 1, duration: 2, delay: 1.2, ease: 'power1.inOut', repeat: -1,
            keyframes: { '0%': { opacity: 0 }, '20%': { opacity: 1 }, '80%': { opacity: 1 }, '100%': { opacity: 0 } }
          }
        );
      }
      // Protected → SM reverse File (PDF) Packet
      if (smFileRevPacketRef.current) {
        gsap.fromTo(smFileRevPacketRef.current,
          { left: '110%', opacity: 0 },
          { left: '-10%', opacity: 1, duration: 2.5, delay: 2.2, ease: 'power1.inOut', repeat: -1,
            keyframes: { '0%': { opacity: 0 }, '20%': { opacity: 1 }, '80%': { opacity: 1 }, '100%': { opacity: 0 } }
          }
        );
      }
      }, containerRef);
    });
    return () => ctx?.revert();
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

      {/* Source ↔ CM Connection */}
      <div className={styles.sourceToCmConnection}>
        <div className={styles.channelRow}>
          <div className={styles.channelLine} />
          <div className={`${styles.channelPacket} ${styles.packetData}`} ref={dataPacketRef}>
            <span className={styles.packetText}>DATA</span>
          </div>
          <div className={`${styles.channelPacket} ${styles.packetData}`} ref={dataRevPacketRef}>
            <span className={styles.packetText}>DATA</span>
          </div>
        </div>
        <div className={styles.channelRow}>
          <div className={styles.channelLine} />
          <div className={`${styles.channelPacket} ${styles.packetFile}`} ref={filePacketRef}>
            <svg className={styles.packetIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span className={styles.packetText}>PDF</span>
          </div>
          <div className={`${styles.channelPacket} ${styles.packetFile}`} ref={fileRevPacketRef}>
            <svg className={styles.packetIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span className={styles.packetText}>PDF</span>
          </div>
        </div>
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

            {/* Swapped RX and TX because data flows Right to Left (Response) */}
            <div className={`${styles.diodeBox} ${styles.rxBox}`}>
              <div className={`${styles.diodeLabel} ${styles.rxLabel}`}>RX</div>
              <div className={styles.diodeText}>Diode</div>
            </div>

            <div className={`${styles.diodeBox} ${styles.txBox}`}>
              <div className={`${styles.diodeLabel} ${styles.txLabel}`}>TX</div>
              <div className={styles.diodeText}>Diode</div>
            </div>
          </div>
        </div>

        {/* SM Module */}
        <div className={styles.brokerBox}>
          <div className={styles.brokerLabel}>SM</div>
          <div className={styles.brokerText}>
            Secure Remote Access
          </div>
        </div>

      </div>

      {/* SM ↔ Protected Network Connection */}
      <div className={styles.sourceToCmConnection}>
        <div className={styles.channelRow}>
          <div className={styles.channelLine} />
          <div className={`${styles.channelPacket} ${styles.packetData}`} ref={smDataPacketRef}>
            <span className={styles.packetText}>DATA</span>
          </div>
          <div className={`${styles.channelPacket} ${styles.packetData}`} ref={smDataRevPacketRef}>
            <span className={styles.packetText}>DATA</span>
          </div>
        </div>
        <div className={styles.channelRow}>
          <div className={styles.channelLine} />
          <div className={`${styles.channelPacket} ${styles.packetFile}`} ref={smFilePacketRef}>
            <svg className={styles.packetIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span className={styles.packetText}>PDF</span>
          </div>
          <div className={`${styles.channelPacket} ${styles.packetFile}`} ref={smFileRevPacketRef}>
            <svg className={styles.packetIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span className={styles.packetText}>PDF</span>
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
