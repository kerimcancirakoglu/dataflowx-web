'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './GatewayFamily.module.css';
import { useTranslations } from 'next-intl';

type ElementId = 'source' | 'tx' | 'airgap' | 'rx' | 'dest';

export default function GatewayFamily() {
  const t = useTranslations('GatewayFamily');
  const containerRef = useRef<HTMLDivElement>(null);
  const packet1Ref = useRef<HTMLDivElement>(null);
  const packet1ReverseRef = useRef<HTMLDivElement>(null);
  const packet2Ref = useRef<HTMLDivElement>(null);
  const packet3Ref = useRef<HTMLDivElement>(null);
  const packet3ReverseRef = useRef<HTMLDivElement>(null);
  const [activeElement, setActiveElement] = useState<ElementId | null>(null);

  const elementDetails = {
    source: {
      title: t('source.title'), role: t('source.role'),
      steps: [
        { label: t('source.s1l'), text: t('source.s1t') },
        { label: t('source.s2l'), text: t('source.s2t') },
        { label: t('source.s3l'), text: t('source.s3t') },
      ]
    },
    tx: {
      title: t('tx.title'), role: t('tx.role'),
      steps: [
        { label: t('tx.s1l'), text: t('tx.s1t') },
        { label: t('tx.s2l'), text: t('tx.s2t') },
        { label: t('tx.s3l'), text: t('tx.s3t') },
      ]
    },
    airgap: {
      title: t('airgap.title'), role: t('airgap.role'),
      steps: [
        { label: t('airgap.s1l'), text: t('airgap.s1t') },
        { label: t('airgap.s2l'), text: t('airgap.s2t') },
        { label: t('airgap.s3l'), text: t('airgap.s3t') },
      ]
    },
    rx: {
      title: t('rx.title'), role: t('rx.role'),
      steps: [
        { label: t('rx.s1l'), text: t('rx.s1t') },
        { label: t('rx.s2l'), text: t('rx.s2t') },
        { label: t('rx.s3l'), text: t('rx.s3t') },
      ]
    },
    dest: {
      title: t('dest.title'), role: t('dest.role'),
      steps: [
        { label: t('dest.s1l'), text: t('dest.s1t') },
        { label: t('dest.s2l'), text: t('dest.s2t') },
        { label: t('dest.s3l'), text: t('dest.s3t') },
      ]
    },
  };

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
      if (packet1ReverseRef.current) {
        gsap.fromTo(
          packet1ReverseRef.current,
          { left: '0%', opacity: 0 },
          {
            left: '100%',
            duration: 2,
            ease: 'none',
            repeat: -1,
            delay: 0.5,
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
      // Packet 3 File: RX → Protected Network
      if (packet3ReverseRef.current) {
        gsap.fromTo(
          packet3ReverseRef.current,
          { left: '0%', opacity: 0 },
          {
            left: '100%',
            duration: 2,
            ease: 'none',
            repeat: -1,
            delay: 4.0,
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
          <p className={styles.overTitle}>{t('overTitle')}</p>
          <h2 className={styles.title}>
            {t('title')} <span className={styles.highlight}>{t('titleHighlight')}</span>
          </h2>
          <p className={styles.subtitle}>{t('subtitle')}</p>
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
            <div className={styles.networkLabel}>{t('source.label')}</div>
            <div className={styles.clickHint}>{t('source.hint')}</div>
          </button>

          {/* Line 1 (Source -> TX) */}
          <div className={`${styles.channelContainer} ${styles.twoWayLine}`} style={{ flex: 1 }}>
            <div className={styles.channelRow}>
              <div className={styles.channelLine} />
              <div className={`${styles.channelPacket} ${styles.packetData}`} ref={packet1Ref}>
                <span className={styles.packetText}>DATA</span>
              </div>
            </div>
            <div className={styles.channelRow}>
              <div className={styles.channelLine} />
              <div className={`${styles.channelPacket} ${styles.packetFile}`} ref={packet1ReverseRef}>
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
              <div className={styles.diodeName}>DFX UDG</div>
              <div className={styles.diodeRole}>TRANSMIT (TX)</div>
            </button>
            <div className={styles.featureInfo}>
              <h4>{t('hwIsolation')}</h4>
              <p>{t('hwIsolationDesc')}</p>
            </div>
          </div>

          {/* Air Gap + line across */}
          <div className={styles.middleSection} style={{ flex: 2 }}>
            <div className={styles.channelContainer} style={{ width: '100%', position: 'relative' }}>
              <div className={styles.channelRow}>
                <div className={styles.channelLine} />
                <div className={`${styles.channelPacket} ${styles.packetData}`} ref={packet2Ref}>
                  <span className={styles.packetText}>DATA</span>
                </div>
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
              <h4>{t('airGapBridging')}</h4>
              <p>{t('airGapBridgingDesc')}</p>
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
              <div className={styles.diodeName}>DFX UDG</div>
              <div className={styles.diodeRole}>RECEIVE (RX)</div>
            </button>
            <div className={styles.featureInfo}>
              <h4>{t('zeroReverse')}</h4>
              <p>{t('zeroReverseDesc')}</p>
            </div>
          </div>

          {/* Line 3: RX → Protected Network */}
          <div className={`${styles.channelContainer} ${styles.twoWayLine}`} style={{ flex: 1 }}>
            <div className={styles.channelRow}>
              <div className={styles.channelLine} />
              <div className={`${styles.channelPacket} ${styles.packetData}`} ref={packet3Ref}>
                <span className={styles.packetText}>DATA</span>
              </div>
            </div>
            <div className={styles.channelRow}>
              <div className={styles.channelLine} />
              <div className={`${styles.channelPacket} ${styles.packetFile}`} ref={packet3ReverseRef}>
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
            <div className={styles.networkLabel}>{t('dest.label')}</div>
            <div className={styles.clickHint}>{t('dest.hint')}</div>
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
