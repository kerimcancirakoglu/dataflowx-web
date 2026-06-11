'use client';

import React, { useState, useEffect } from 'react';
import styles from './PortXAnimation.module.css';

type AnimationState = 'idle' | 'auth-failed' | 'auth-success-pc' | 'auth-success-remote';

interface PortXAnimationProps {
  hideCards?: boolean;
}

export default function PortXAnimation({ hideCards = false }: PortXAnimationProps = {}) {
  const [state, setState] = useState<AnimationState>('idle');
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    let currentStep: 1 | 2 | 3 = 1;
    let timer: NodeJS.Timeout;

    const runSequence = () => {
      if (currentStep === 1) {
        setActiveStep(1);
        setState('auth-failed');
        timer = setTimeout(() => {
          setState('idle');
          currentStep = 2;
          timer = setTimeout(runSequence, 800);
        }, 4000);
      } else if (currentStep === 2) {
        setActiveStep(2);
        setState('auth-success-pc');
        timer = setTimeout(() => {
          setState('idle');
          currentStep = 3;
          timer = setTimeout(runSequence, 800);
        }, 4500);
      } else if (currentStep === 3) {
        setActiveStep(3);
        setState('auth-success-remote');
        timer = setTimeout(() => {
          setState('idle');
          currentStep = 1;
          timer = setTimeout(runSequence, 800);
        }, 4500);
      }
    };

    runSequence();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`${styles.container} ${hideCards ? styles.hideCardsContainer : ''}`}>
      {/* Left Column: Animation */}
      <div className={styles.wrapper}>
        <div className={`${styles.stage} ${state === 'auth-failed' ? styles.stateFailed : (state === 'auth-success-pc' || state === 'auth-success-remote') ? styles.stateSuccess : styles.stateIdle}`}>
          
          {/* Untrusted Zone */}
          <div className={`${styles.zone} ${styles.untrustedZone}`}>
            <div className={styles.zoneTitle}>IT Zone</div>
            
            <div className={styles.inputs}>
              {/* USB Input */}
              <div className={styles.inputPort} style={{ opacity: state === 'auth-failed' || state === 'idle' && activeStep === 1 ? 1 : 0.4 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.portIcon}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 8h8v11a2 2 0 01-2 2h-4a2 2 0 01-2-2V8z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 8V5a1 1 0 011-1h2a1 1 0 011 1v3" />
                </svg>
                <div className={styles.portLabel}>
                  USB Drive
                  <span className={styles.portSubLabel}>Type-C 1</span>
                </div>
              </div>
              {/* PC Input */}
              <div className={styles.inputPort} style={{ opacity: state === 'auth-success-pc' || state === 'idle' && activeStep === 2 ? 1 : 0.4 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.portIcon}>
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <path d="M8 21h8" />
                  <path d="M12 17v4" />
                </svg>
                <div className={styles.portLabel}>
                  PC / Laptop
                  <span className={styles.portSubLabel}>Type-C 2</span>
                </div>
              </div>
              {/* Remote Server */}
              <div className={styles.inputPort} style={{ opacity: state === 'auth-success-remote' || state === 'idle' && activeStep === 3 ? 1 : 0.4 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.portIcon}>
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                  <path d="M6 6h.01M6 18h.01" />
                </svg>
                <div className={styles.portLabel}>
                  Remote Server
                  <span className={styles.portSubLabel}>Network</span>
                </div>
              </div>
            </div>
          </div>

          {/* The Bridge (DFX Pass) */}
          <div className={styles.bridgeArea}>
            <div className={styles.bridgeDevice}>
              <div className={styles.deviceLabel}>DFX Pass</div>
              
              <div className={styles.nfcTarget}>
                <div className={styles.concentric}>
                  <div className={styles.concentricInner} />
                </div>
                <span className={styles.nfcLabelText}>NFC</span>
                <div className={styles.smallDot} />
              </div>
              
              <div className={styles.statusScreen}>
                {state === 'auth-failed' ? 'ACCESS DENIED' : 
                 (state === 'auth-success-pc' || state === 'auth-success-remote') ? 'ACCESS GRANTED' : 
                 'WAITING'}
              </div>
            </div>
            
            {/* Shield for fail state */}
            <div className={styles.shield} />

            {/* Transfer Paths */}
            <div className={styles.paths}>
              <div className={`${styles.path} ${styles.pathIn1}`} />
              <div className={`${styles.path} ${styles.pathIn2}`} />
              <div className={`${styles.path} ${styles.pathIn3}`} />
              <div className={`${styles.path} ${styles.pathOut}`} />
            </div>

            {/* Moving Objects */}
            {state === 'auth-failed' && (
              <div className={styles.packetFailed}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 11h-3v3c0 .55-.45 1-1 1s-1-.45-1-1v-3H8c-.55 0-1-.45-1-1s.45-1 1-1h3V8c0-.55.45-1 1-1s1 .45 1 1v3h3c.55 0 1 .45 1 1s-.45 1-1 1z" />
                </svg>
              </div>
            )}
            
            {state === 'auth-success-pc' && (
              <div className={styles.packetSuccess}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                </svg>
              </div>
            )}

            {state === 'auth-success-remote' && (
              <div className={styles.packetSuccessRemote}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                </svg>
              </div>
            )}
          </div>

          {/* Trusted Zone */}
          <div className={`${styles.zone} ${styles.trustedZone}`}>
            <div className={styles.zoneTitle}>OT Zone</div>
            <div className={styles.outputPort} style={{ opacity: (state === 'auth-success-pc' || state === 'auth-success-remote') ? 1 : 0.4 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.portIcon}>
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              <div className={styles.portLabel}>
                OT Network
                <span className={styles.portSubLabel}>LAN Cable</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Right Column: Scenario Cards */}
      {!hideCards && (
      <div className={styles.cardsColumn}>
        
        <div className={`${styles.scenarioCard} ${activeStep === 1 ? styles.scenarioCardActive : ''}`}>
          <span className={styles.cardNumber}>01</span>
          <h3 className={styles.cardTitle}>Unauthorized Access</h3>
          <p className={styles.cardDesc}>
            USB Drive inserted. NFC authentication fails due to incorrect credentials. The connection is physically denied, and data cannot pass the hardware barrier.
          </p>
        </div>

        <div className={`${styles.scenarioCard} ${activeStep === 2 ? styles.scenarioCardActive : ''}`}>
          <span className={styles.cardNumber}>02</span>
          <h3 className={styles.cardTitle}>Verified PC Transfer</h3>
          <p className={styles.cardDesc}>
            PC connected via Type-C. Valid NFC card is scanned. DFX Pass unlocks the hardware bridge, encrypts the payload via AES-256, and transmits to the OT Network.
          </p>
        </div>

        <div className={`${styles.scenarioCard} ${activeStep === 3 ? styles.scenarioCardActive : ''}`}>
          <span className={styles.cardNumber}>03</span>
          <h3 className={styles.cardTitle}>Remote Server Sync</h3>
          <p className={styles.cardDesc}>
            Remote Server attempts a transfer. After successful NFC validation at the endpoint, data flows securely through the DFX Pass straight to the isolated OT segment.
          </p>
        </div>

      </div>
      )}
    </div>
  );
}
