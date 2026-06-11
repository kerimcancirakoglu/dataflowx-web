'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './TrueCDRDiagram.module.css';

export default function TrueCDRDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background elements floating
      gsap.to('.floating-element', {
        y: '-=15',
        rotationX: '+=5',
        rotationY: '-=5',
        yoyo: true,
        repeat: -1,
        duration: 3,
        stagger: 0.2,
        ease: 'sine.inOut'
      });

      // Pulse rings for radar effect
      gsap.to('.pulse-ring', {
        scale: 2.5,
        opacity: 0,
        repeat: -1,
        duration: 1.2,
        ease: 'power1.out',
        stagger: 0.2
      });

      const tl = gsap.timeline({ repeat: -1 });

      // Reset state
      tl.set('.document-wrapper', { x: -180, opacity: 0, scale: 0.8 });
      tl.set('.malicious-particle', { opacity: 1, scale: 1 });
      tl.set('.pulse-ring', { opacity: 1 });
      tl.set('.threat-label', { opacity: 0, y: 0, x: 0, z: 5, scale: 0.5 });
      tl.set('.document', { borderColor: '#ff4d4d', boxShadow: '0 0 15px rgba(255, 77, 77, 0.4)' });
      tl.set('.cdr-laser', { scaleY: 0, opacity: 0 });
      tl.set('.cdr-core', { boxShadow: '0 0 20px rgba(245, 167, 6, 0.2)' });

      // 1. Enter the CDR Engine
      tl.to('.document-wrapper', {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out'
      });

      // 2. Scan & Disarm (Laser sweep)
      tl.to('.cdr-core', {
        boxShadow: '0 0 40px rgba(245, 167, 6, 0.8)',
        duration: 0.3
      });

      tl.to('.cdr-laser', {
        scaleY: 1,
        opacity: 1,
        duration: 0.2
      });

      tl.to('.cdr-laser', {
        x: 60, // Sweep across the document
        duration: 2.0,
        ease: 'linear'
      });

      // While sweeping, malicious particles dissolve sequentially
      tl.to(['.malicious-particle', '.pulse-ring'], {
        scale: 0,
        opacity: 0,
        stagger: 0.35,
        duration: 0.2,
        ease: 'power1.in'
      }, '-=1.8');

      // Pop labels for identified threats out of the box
      tl.to('.threat-label', {
        opacity: 1,
        y: -40,
        z: 60, // Move forward, out of the box
        x: -20,
        scale: 1.2,
        stagger: 0.35,
        duration: 0.5,
        ease: 'back.out(1.5)'
      }, '-=1.8');

      // Fade out labels while moving further
      tl.to('.threat-label', {
        opacity: 0,
        y: -60,
        z: 80,
        stagger: 0.35,
        duration: 0.4
      }, '-=1.3');

      // The document changes to clean state (Reconstruction)
      tl.to('.document', {
        borderColor: '#00ffff',
        boxShadow: '0 0 20px rgba(0, 255, 255, 0.6)',
        duration: 0.5
      }, '-=0.5');

      // Turn off laser
      tl.to('.cdr-laser', {
        opacity: 0,
        duration: 0.2
      });
      tl.set('.cdr-laser', { x: -20, scaleY: 0 });

      tl.to('.cdr-core', {
        boxShadow: '0 0 20px rgba(245, 167, 6, 0.2)',
        duration: 0.5
      });

      // 3. Exit the CDR Engine
      tl.to('.document-wrapper', {
        x: 180,
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        ease: 'power2.in'
      }, '+=0.5');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.scene}>
        {/* Background Grid */}
        <div className={styles.floor} />

        {/* CDR Engine Core */}
        <div className={`${styles.cdrEngine} cdr-core`}>
          <div className={styles.engineTop} />
          <div className={styles.engineBottom} />
          <div className={styles.engineLeft} />
          <div className={styles.engineRight} />
          
          <div className={styles.engineScanner}>
             <div className={`${styles.laserBeam} cdr-laser`} />
          </div>
        </div>

        {/* The Document */}
        <div className={`${styles.documentWrapper} document-wrapper`}>
          <div className={`${styles.document} document`}>
            {/* Lines representing text */}
            <div className={styles.docLine} style={{ width: '40%' }} />
            <div className={styles.docLine} />
            <div className={styles.docLine} />
            <div className={styles.docLine} style={{ width: '80%' }} />
            
            {/* Malicious Particles attached to document */}
            {[
              { label: 'MACRO', top: 30, left: 20 },
              { label: 'SCRIPT', top: 70, left: 35 },
              { label: 'OLE OBJ', top: 40, left: 50 },
              { label: 'ACTIVEX', top: 65, left: 65 },
              { label: 'PAYLOAD', top: 25, left: 80 }
            ].map((threat, i) => (
              <React.Fragment key={`threat-${i}`}>
                <div 
                  className={styles.threatPoint}
                  style={{ left: `${threat.left}%`, top: `${threat.top}%` }} 
                >
                  <div className={`${styles.maliciousParticle} malicious-particle`} />
                  <div className={`${styles.pulseRing} pulse-ring`} />
                </div>
                <div 
                  className={`${styles.threatLabel} threat-label`}
                  style={{ left: `${threat.left}%`, top: `${threat.top}%` }}
                >
                  {threat.label}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Labels */}
        <div className={`${styles.label} floating-element`} style={{ left: '-120px', top: '-60px' }}>
          <span>MALICIOUS FILE</span>
        </div>
        <div className={`${styles.label} floating-element`} style={{ right: '-120px', top: '60px' }}>
          <span>CLEAN RECONSTRUCTED</span>
        </div>

      </div>
    </div>
  );
}
