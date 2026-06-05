'use client';

import React, { useState, useEffect } from 'react';
import styles from './MTSAnimation.module.css';

const SCAN_STEPS = [
  'Verifying File Signatures...',
  'Extracting Archive Contents...',
  'Scanning for Known Malware (YARA)...',
  'Executing in Isolated Sandbox VM...',
  'Checking for Zero-Day Exploits...',
  'Purifying File (CDR)...',
  'Scan Complete. File is Safe.'
];

export default function MTSAnimation() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % SCAN_STEPS.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftPanel}>
        <div className={styles.usbContainer}>
          <svg className={styles.usbIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2M8 4v4M16 4v4M6 8h12v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8z" />
            <path d="M10 12v4M14 12v4" />
          </svg>
          <div className={styles.scannerLine} />
        </div>
        <h3 className={styles.leftTitle}>USB SCANNING</h3>
        <p className={styles.leftSubtitle}>Isolating and analyzing external media in real-time.</p>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.scanList}>
          {SCAN_STEPS.map((step, index) => {
            const isPast = index < activeStep;
            const isActive = index === activeStep;
            
            return (
              <div 
                key={index} 
                className={`${styles.scanItem} ${isPast ? styles.past : ''} ${isActive ? styles.active : ''}`}
              >
                <div className={styles.statusIcon}>
                  {isPast && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                  {isActive && <div className={styles.spinner} />}
                  {!isPast && !isActive && <div className={styles.pendingDot} />}
                </div>
                <div className={styles.scanText}>{step}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
