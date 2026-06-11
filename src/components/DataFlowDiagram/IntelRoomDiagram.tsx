'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './IntelRoomDiagram.module.css';

export default function IntelRoomDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Rotate the radar dish/circle
      gsap.to('.radar-sweep', {
        rotation: 360,
        transformOrigin: 'center center',
        repeat: -1,
        duration: 4,
        ease: 'linear'
      });

      // Sonar pulse expanding
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

      tl.set('.sonar-pulse', { scale: 0, opacity: 0.8 });
      tl.set('.threat-ping', { opacity: 0, scale: 0 });
      tl.set('.threat-label', { opacity: 0, y: 0, scale: 0.5 });
      tl.set('.data-line', { opacity: 0, scaleX: 0 });

      // Pulse grows
      tl.to('.sonar-pulse', {
        scale: 5,
        opacity: 0,
        duration: 3.5,
        ease: 'power2.out'
      }, 0);

      // Threat 1 hit at 0.8s
      tl.to('.threat-1', { opacity: 1, scale: 1.5, duration: 0.3, yoyo: true, repeat: 5 }, 0.8);
      tl.to('.label-1', { opacity: 1, y: -25, scale: 1, duration: 0.4, ease: 'back.out' }, 0.8);
      tl.to('.line-1', { opacity: 0.8, scaleX: 1, duration: 0.5 }, 1.0);
      tl.to(['.threat-1', '.label-1', '.line-1'], { opacity: 0, duration: 0.5 }, 2.5);

      // Threat 2 hit at 1.5s
      tl.to('.threat-2', { opacity: 1, scale: 1.5, duration: 0.3, yoyo: true, repeat: 5 }, 1.5);
      tl.to('.label-2', { opacity: 1, y: -25, scale: 1, duration: 0.4, ease: 'back.out' }, 1.5);
      tl.to('.line-2', { opacity: 0.8, scaleX: 1, duration: 0.5 }, 1.7);
      tl.to(['.threat-2', '.label-2', '.line-2'], { opacity: 0, duration: 0.5 }, 3.2);

      // Threat 3 hit at 2.2s
      tl.to('.threat-3', { opacity: 1, scale: 1.5, duration: 0.3, yoyo: true, repeat: 5 }, 2.2);
      tl.to('.label-3', { opacity: 1, y: -25, scale: 1, duration: 0.4, ease: 'back.out' }, 2.2);
      tl.to('.line-3', { opacity: 0.8, scaleX: 1, duration: 0.5 }, 2.4);
      tl.to(['.threat-3', '.label-3', '.line-3'], { opacity: 0, duration: 0.5 }, 3.9);

      // Background floating elements
      gsap.to('.floating-box', {
        y: '-=10',
        rotationX: '+=5',
        yoyo: true,
        repeat: -1,
        duration: 4,
        stagger: 0.5,
        ease: 'sine.inOut'
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.scene}>
        {/* Background Grid */}
        <div className={styles.floor} />

        {/* Central Intel Core */}
        <div className={styles.intelCoreWrapper}>
          <div className={`${styles.sonarPulse} sonar-pulse`} />
          <div className={`${styles.coreShield} core-shield`} />
          <div className={styles.coreNode}>
             <div className={`${styles.radarSweep} radar-sweep`} />
             <div className={styles.coreCenter} />
          </div>
        </div>

        {/* Threats and Labels */}
        {/* We use absolutely positioned groups for each threat to group the dot, line and label */}
        
        {/* Threat 1 */}
        <div className={styles.threatGroup} style={{ top: '20%', left: '15%' }}>
          <div className={`${styles.threatPing} threat-ping threat-1`} />
          <div className={`${styles.intelLabel} threat-label label-1`}>APT-29 DETECTED</div>
          <div className={`${styles.dataLine} data-line line-1`} style={{ transform: 'rotate(25deg)', width: '120px' }} />
        </div>

        {/* Threat 2 */}
        <div className={styles.threatGroup} style={{ top: '30%', right: '10%' }}>
          <div className={`${styles.threatPing} threat-ping threat-2`} />
          <div className={`${styles.intelLabel} threat-label label-2`}>NEW PHISHING IOC</div>
          <div className={`${styles.dataLine} data-line line-2`} style={{ transform: 'rotate(150deg)', width: '130px' }} />
        </div>

        {/* Threat 3 */}
        <div className={styles.threatGroup} style={{ bottom: '20%', left: '30%' }}>
          <div className={`${styles.threatPing} threat-ping threat-3`} />
          <div className={`${styles.intelLabel} threat-label label-3`}>ZERO-DAY SIGNATURE</div>
          <div className={`${styles.dataLine} data-line line-3`} style={{ transform: 'rotate(-45deg)', width: '90px' }} />
        </div>

        {/* Informational Floating Boxes */}
        <div className={`${styles.floatingBox} floating-box`} style={{ top: '5%', left: '-30%' }}>
          <div className={styles.boxTitle}>GLOBAL THREAT FEEDS</div>
          <div className={styles.boxContent}>Ingesting 50M+ IOCs daily from global sensors</div>
        </div>
        
        <div className={`${styles.floatingBox} floating-box`} style={{ bottom: '15%', right: '-35%' }}>
          <div className={styles.boxTitle}>REAL-TIME ANALYSIS</div>
          <div className={styles.boxContent}>AI-driven correlation & active sharing</div>
        </div>

      </div>
    </div>
  );
}
