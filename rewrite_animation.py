with open('/Users/kerim/Desktop/DFX Zero Trust/dataflowx-web/src/components/PortXAnimation/PortXAnimation.tsx', 'w') as f:
    f.write('''\'use client\';

import React, { useState } from \'react\';
import styles from \'./PortXAnimation.module.css\';

type AnimationState = \'idle\' | \'blocked\' | \'secure\';

export default function PortXAnimation() {
  const [state, setState] = useState<AnimationState>(\'idle\');
  const [explanation, setExplanation] = useState(\'DFX Portable Access Security System eliminates physical USB risks while keeping operational workflows fast and secure.\');

  const simulateStandardUsb = () => {
    if (state !== \'idle\') return;
    setState(\'blocked\');
    setExplanation(\'Standard USB transfer detected. Zero USB Policy enforced. Connection physically blocked by DFX Portable Access Security System hardware.\');
    
    setTimeout(() => {
      setState(\'idle\');
      setExplanation(\\'DFX Portable Access Security System eliminates physical USB risks while keeping operational workflows fast and secure.\\');
    }, 4000);
  };

  const transferViaPortX = () => {
    if (state !== \'idle\') return;
    setState(\'secure\');
    setExplanation(\'Initiating secure transfer. File is AES-256 encrypted, logged, and sent securely via the DFX Portable Access Security System bridge.\');
    
    setTimeout(() => {
      setState(\'idle\');
      setExplanation(\'Transfer complete. Fully audited, hardware-enforced secure delivery to the OT network.\');
    }, 4500);
  };

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.stage} ${state === \'blocked\' ? styles.stateBlocked : state === \'secure\' ? styles.stateSecure : styles.stateIdle}`}>
        
        {/* Untrusted Zone */}
        <div className={`${styles.zone} ${styles.untrustedZone}`}>
          <div className={styles.zoneTitle}>Unsecured IT Zone</div>
          <div className={styles.zoneIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
            </svg>
          </div>
        </div>

        {/* The Bridge */}
        <div className={styles.bridgeArea}>
          <div className={styles.bridgeDevice}>
            <div className={styles.deviceLabel}>DFX Portable Access Security System</div>
            <div className={styles.deviceIndicator} />
          </div>
          
          {/* Transfer Paths */}
          <div className={styles.paths}>
            <div className={`${styles.path} ${styles.pathUsb}`} />
            <div className={`${styles.path} ${styles.pathSecure}`} />
          </div>

          {/* Moving Objects */}
          {state === \'blocked\' && (
            <div className={styles.packetUsb}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 11h-3v3c0 .55-.45 1-1 1s-1-.45-1-1v-3H8c-.55 0-1-.45-1-1s.45-1 1-1h3V8c0-.55.45-1 1-1s1 .45 1 1v3h3c.55 0 1 .45 1 1s-.45 1-1 1z" />
              </svg>
            </div>
          )}
          
          {state === \'secure\' && (
            <div className={styles.packetSecure}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
              </svg>
            </div>
          )}
        </div>

        {/* Trusted Zone */}
        <div className={`${styles.zone} ${styles.trustedZone}`}>
          <div className={styles.zoneTitle}>Secured OT Zone</div>
          <div className={styles.zoneIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>

      </div>

      <div className={styles.controls}>
        <p className={styles.explanation}>{explanation}</p>
        <div className={styles.buttons}>
          <button 
            className={styles.btnDanger} 
            onClick={simulateStandardUsb}
            disabled={state !== \'idle\'}
          >
            Simulate Standard USB
          </button>
          <button 
            className={styles.btnSecure} 
            onClick={transferViaPortX}
            disabled={state !== \'idle\'}
          >
            Transfer securely via DFX
          </button>
        </div>
      </div>
    </div>
  );
}
''')
