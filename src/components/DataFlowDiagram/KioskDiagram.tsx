'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './KioskDiagram.module.css';

function UsbIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 42, height: 42, color, transition: 'color 0.4s' }}>
      <rect x="20" y="8" width="24" height="36" rx="4" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <rect x="26" y="44" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <rect x="28" y="54" width="8" height="4" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="32" cy="20" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
      <line x1="32" y1="24" x2="32" y2="34" stroke="currentColor" strokeWidth="2"/>
      <line x1="26" y1="28" x2="38" y2="28" stroke="currentColor" strokeWidth="2"/>
      <line x1="26" y1="28" x2="26" y2="34" stroke="currentColor" strokeWidth="2"/>
      <line x1="38" y1="28" x2="38" y2="34" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

function CdIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 42, height: 42, color, transition: 'color 0.4s' }}>
      <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <circle cx="32" cy="32" r="14" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 3"/>
      <circle cx="32" cy="32" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <path d="M 32 8 A 24 24 0 0 1 52 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M 32 56 A 24 24 0 0 1 12 42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
    </svg>
  );
}

function InternetIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 42, height: 42, color, transition: 'color 0.4s' }}>
      <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <ellipse cx="32" cy="32" rx="10" ry="24" stroke="currentColor" strokeWidth="2" fill="none"/>
      <line x1="8" y1="22" x2="56" y2="22" stroke="currentColor" strokeWidth="2"/>
      <line x1="8" y1="42" x2="56" y2="42" stroke="currentColor" strokeWidth="2"/>
      <line x1="32" y1="8" x2="32" y2="56" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

const MEDIA_TYPES = [
  { id: 'usb',      label: 'USB Drive',         Icon: UsbIcon },
  { id: 'cd',       label: 'CD / DVD',           Icon: CdIcon },
  { id: 'internet', label: 'Network / Internet', Icon: InternetIcon },
];

type Phase = 'select' | 'scanning' | 'result';

export default function KioskDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMedia, setActiveMedia] = useState(0);
  const [phase, setPhase] = useState<Phase>('select');
  const [scanProgress, setScanProgress] = useState(0);
  const [threatCount, setThreatCount] = useState(0);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; tx: number; ty: number }[]>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    let loop = true;

    const runCycle = async () => {
      while (loop) {
        // 1. Select phase – show media icon
        setPhase('select');
        setScanProgress(0);
        setThreatCount(0);
        setParticles([]);

        await delay(2000);
        if (!loop) break;

        // 2. Scanning phase
        setPhase('scanning');
        setScanProgress(0);

        // Generate random particles (threats)
        const count = 3 + Math.floor(Math.random() * 5);
        setThreatCount(count);
        const pts = Array.from({ length: count }, (_, i) => ({
          id: i,
          x: 20 + Math.random() * 60,
          y: 20 + Math.random() * 60,
          tx: 40 + (Math.random() - 0.5) * 20,
          ty: 45 + (Math.random() - 0.5) * 10,
        }));
        setParticles(pts);

        // Animate progress bar
        await new Promise<void>((resolve) => {
          let progress = 0;
          interval = setInterval(() => {
            progress += 2;
            setScanProgress(progress);
            if (progress >= 100) {
              clearInterval(interval);
              resolve();
            }
          }, 40);
        });

        if (!loop) break;

        // 3. Result phase – clean!
        setPhase('result');
        await delay(2200);
        if (!loop) break;

        // Cycle to next media type
        setActiveMedia((prev) => (prev + 1) % MEDIA_TYPES.length);
      }
    };

    runCycle();

    return () => {
      loop = false;
      if (interval) clearInterval(interval);
    };
  }, []);

  const media = MEDIA_TYPES[activeMedia];

  return (
    <div className={styles.container} ref={containerRef}>
      {/* Device frame */}
      <div className={styles.deviceFrame}>
        {/* Top bar */}
        <div className={styles.deviceTopBar}>
          <div className={styles.deviceDots}>
            <span className={styles.dot} style={{ background: '#ff5f57' }} />
            <span className={styles.dot} style={{ background: '#febc2e' }} />
            <span className={styles.dot} style={{ background: '#28c840' }} />
          </div>
          <span className={styles.deviceTitle}>DFX Media Transfer Station</span>
        </div>

        {/* Screen content */}
        <div className={styles.screen}>
          {/* Media icon area */}
          <div className={styles.mediaArea}>
            <div className={`${styles.mediaIconWrap} ${phase === 'scanning' ? styles.mediaScanPulse : ''} ${phase === 'result' ? styles.mediaSuccess : ''}`}>
              <media.Icon color={phase === 'scanning' ? '#f59e0b' : phase === 'result' ? '#10b981' : 'rgba(0,180,255,0.8)'} />
            </div>
            <div className={`${styles.mediaLabel} ${phase === 'result' ? styles.mediaLabelGreen : ''}`}>
              {phase === 'select' && <><span className={styles.blinkDot} /> Awaiting media…</>}
              {phase === 'scanning' && <><span className={styles.blinkDotOrange} /> Scanning {media.label}…</>}
              {phase === 'result' && <><span className={styles.blinkDotGreen} /> Media Sanitized ✓</>}
            </div>
          </div>

          {/* Scan area */}
          <div className={styles.scanArea}>
            {/* Grid overlay */}
            <div className={styles.scanGrid} />

            {/* Threat particles */}
            {particles.map((p) => (
              <div
                key={p.id}
                className={`${styles.threatParticle} ${phase === 'result' ? styles.threatDestroyed : phase === 'scanning' ? styles.threatVisible : ''}`}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              />
            ))}

            {/* Laser scan line */}
            {phase === 'scanning' && (
              <div
                className={styles.laserLine}
                style={{ top: `${scanProgress}%` }}
              />
            )}

            {/* Progress bar */}
            <div className={styles.progressBar}>
              <div
                className={`${styles.progressFill} ${phase === 'result' ? styles.progressComplete : ''}`}
                style={{ width: `${scanProgress}%` }}
              />
            </div>

            {/* Status text */}
            <div className={styles.scanStatus}>
              {phase === 'select' && <span className={styles.statusIdle}>INSERT MEDIA TO BEGIN</span>}
              {phase === 'scanning' && (
                <span className={styles.statusScanning}>
                  SCANNING… {scanProgress}%
                  {threatCount > 0 && <span className={styles.threatBadge}>{threatCount} THREATS DETECTED</span>}
                </span>
              )}
              {phase === 'result' && (
                <span className={styles.statusOk}>
                  ✓ ALL THREATS NEUTRALIZED
                </span>
              )}
            </div>
          </div>

          {/* Bottom media tabs */}
          <div className={styles.mediaTabBar}>
            {MEDIA_TYPES.map((m, i) => (
              <div
                key={m.id}
                className={`${styles.mediaTab} ${i === activeMedia ? styles.mediaTabActive : ''}`}
              >
                <span className={styles.tabLabel}>{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function delay(ms: number) {
  return new Promise<void>((res) => setTimeout(res, ms));
}
