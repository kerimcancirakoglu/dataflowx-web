'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './CDRAnimation.module.css';

// File types that cycle through the animation
const FILE_TYPES = [
  { ext: 'DOCX', label: 'Word Document', threats: ['Macro', 'VBA Script', 'OLE Object'],
    details: 'Word Engine: Neutralizes weaponized VBA macros and malicious OLE objects. Text, fonts, and tables remain intact in a safe, reconstructed document.' },
  { ext: 'PDF', label: 'PDF File', threats: ['JS Payload', 'Embedded URI', 'Form Action'],
    details: 'PDF Engine: Disarms embedded JavaScript payloads, removes form actions, and strips malicious external URIs. Outputs a visually identical, perfectly safe PDF.' },
  { ext: 'XLSX', label: 'Excel Sheet', threats: ['Macro', 'External Link', 'DDE'],
    details: 'Excel Engine: Cleanses hidden DDE attacks, malicious formulas, and embedded macros. Reconstructs safe spreadsheets with intact legitimate calculations.' },
  { ext: 'ZIP', label: 'Archive', threats: ['Nested Payload', 'Path Traversal', 'Bomb'],
    details: 'Archive Engine: Deeply inspects compressed contents to prevent zip bombs and path traversal attacks. Recursively disarms nested files before repackaging.' },
  { ext: 'PPTX', label: 'Presentation', threats: ['ActiveX', 'Embedded OLE', 'Link Farm'],
    details: 'PowerPoint Engine: Strips active content like ActiveX controls, embedded media exploits, and link farms, outputting a safe presentation ready for display.' },
];

const STEPS = [
  { 
    id: 'receive', 
    label: 'File Received', 
    description: 'Unsafe file detected. Initiating Content Disarm and Reconstruction (CDR) protocol...',
    icon: '📥', color: 'rgba(255,255,255,0.6)' 
  },
  { 
    id: 'validate', 
    label: 'Structural Validation', 
    description: 'Scanning file structure to prevent file-based cyber attacks and malware...',
    icon: '🔍', color: '#00B4FF' 
  },
  { 
    id: 'disarm', 
    label: 'Active Content Removed', 
    description: 'Stripping potentially dangerous elements (e.g., malicious macros, active payloads)...',
    icon: '⚡', color: '#F5A706' 
  },
  { 
    id: 'reconstruct', 
    label: 'Safe File Reconstructed', 
    description: 'Reconstructing the file into a completely harmless, 100% usable format...',
    icon: '🛡️', color: '#22c55e' 
  },
  { 
    id: 'deliver', 
    label: 'Delivered Safely', 
    description: 'Safe file successfully delivered to the user.',
    icon: '✅', color: '#22c55e' 
  },
];

export default function CDRAnimation() {
  const [fileIndex, setFileIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [removedThreats, setRemovedThreats] = useState<string[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isoContainerRef = useRef<HTMLDivElement>(null);

  const currentFile = FILE_TYPES[fileIndex];

  const handleFileSelect = (index: number) => {
    setFileIndex(index);
    setStep(0);
    setRemovedThreats([]);
  };

  const advance = () => {
    setStep(prev => {
      const next = prev + 1;
      if (next === 3) {
        // Disarm step — reveal removed threats one by one
        currentFile.threats.forEach((_, i) => {
          setTimeout(() => {
            setRemovedThreats(t => [...t, currentFile.threats[i]]);
          }, i * 400);
        });
      }
      if (next >= STEPS.length) {
        // Reset: next file
        setTimeout(() => {
          setFileIndex(fi => (fi + 1) % FILE_TYPES.length);
          setStep(0);
          setRemovedThreats([]);
        }, 1800);
        return prev; // hold on last step
      }
      return next;
    });
  };

  useEffect(() => {
    intervalRef.current = setInterval(advance, 1600);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileIndex]);

  useEffect(() => {
    if (!isoContainerRef.current) return;
    const ctx = gsap.context(() => {
       gsap.to('.scan-plane', { opacity: 0, duration: 0.2 });
       gsap.to('.float-label-validate, .float-label-disarm, .float-label-reconstruct', { opacity: 0, y: 0, duration: 0.2 });
       
       if (step === 1) {
          gsap.fromTo('.scan-plane', 
             { top: '0%', opacity: 0 }, 
             { top: '70%', opacity: 1, duration: 1.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }
          );
          gsap.to('.float-label-validate', { opacity: 1, y: -15, duration: 0.5 });
       }
       else if (step === 2) {
          gsap.set('.particle', { opacity: 1, x: 0, y: 0, z: 0, scale: 1 });
          gsap.to('.particle', { 
               opacity: 0,
               x: () => gsap.utils.random(-80, 80),
               y: () => gsap.utils.random(-80, 80),
               z: () => gsap.utils.random(20, 80),
               duration: 0.8,
               stagger: 0.01,
               ease: 'expo.out'
          });
          gsap.to('.float-label-disarm', { opacity: 1, y: -15, duration: 0.5 });
       }
       else if (step === 3) {
          gsap.to('.float-label-reconstruct', { opacity: 1, y: -15, duration: 0.5 });
       }
    }, isoContainerRef);
    return () => ctx.revert();
  }, [step]);

  const currentStep = STEPS[step];

  return (
    <div className={styles.wrapper}>
      {/* Section header */}
      <div className={styles.header}>
        <p className={styles.overLabel}>HOW TrueCDR™ WORKS</p>
        <h2 className={styles.title}>A Reconstruction-First Model</h2>
        <p className={styles.subtitle}>
          Every file is treated as hostile input. TrueCDR™ validates, strips unsafe capabilities,
          and rebuilds a clean, usable version — in milliseconds.
        </p>
      </div>

      {/* File Selector */}
      <div className={styles.fileSelector}>
        {FILE_TYPES.map((ft, idx) => (
          <button
            key={ft.ext}
            className={`${styles.fileTab} ${fileIndex === idx ? styles.fileTabActive : ''}`}
            onClick={() => handleFileSelect(idx)}
            aria-label={`View ${ft.label} processing details`}
          >
            {ft.ext}
          </button>
        ))}
      </div>

      {/* Main animation stage */}
      <div className={styles.stage}>

        {/* Left: Hostile File */}
        <div className={styles.filePanel}>
          <div className={styles.panelLabel}>INCOMING FILE</div>
          <div className={`${styles.fileCard} ${styles.hostileCard} ${step >= 2 ? styles.fileCardProcessing : ''}`}>
            <div className={styles.fileExt}>{currentFile.ext}</div>
            <div className={styles.fileName}>{currentFile.label}</div>
            <div className={styles.threatBadge}>⚠️ Untrusted</div>
            <div className={styles.threatList}>
              {currentFile.threats.map(t => (
                <span
                  key={t}
                  className={`${styles.threatTag} ${removedThreats.includes(t) ? styles.threatRemoved : ''}`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Processing pipeline */}
        <div className={styles.pipeline}>
          {/* Flow arrow */}
          <div className={styles.flowArrow}>
            <div className={styles.flowLine} />
            <div className={`${styles.flowParticle} ${styles.p1}`} />
            <div className={`${styles.flowParticle} ${styles.p2}`} />
            <div className={`${styles.flowParticle} ${styles.p3}`} />
          </div>

          {/* Isometric Scanner Area */}
          <div className={styles.isoContainer} ref={isoContainerRef}>
            <div className={styles.isoScene}>
              {/* Document Base */}
              <div className={`${styles.isoDoc} ${step >= 3 ? styles.isoDocClean : styles.isoDocHostile}`}>
                 <div className={styles.isoDocIcon}>{currentFile.ext}</div>
                 
                 {/* Laser */}
                 <div className={`${styles.scanPlane} scan-plane`} />
                 
                 {/* Particles */}
                 <div className={styles.particlesContainer}>
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} className={`${styles.particle} particle`} />
                    ))}
                 </div>
              </div>

              {/* Floating Labels */}
              <div className={`${styles.floatLabel} float-label-validate`}>STRUCTURAL VALIDATION</div>
              <div className={`${styles.floatLabel} float-label-disarm`}>ACTIVE CONTENT REMOVAL</div>
              <div className={`${styles.floatLabel} float-label-reconstruct`}>SAFE RECONSTRUCTION</div>
            </div>
          </div>

          {/* Live Explanation Terminal */}
          <div className={styles.terminal}>
            <div className={styles.terminalHeader}>
              <span className={styles.terminalTitle}>CDR ENGINE: LIVE FEED</span>
              <span className={styles.terminalBlinker}></span>
            </div>
            <div className={styles.terminalBody} key={step}>
              <div className={styles.terminalPhase} style={{ color: currentStep.color }}>
                {currentStep.icon} {currentStep.label}
              </div>
              <div className={styles.terminalText}>
                {currentStep.description}
              </div>
            </div>
            
            {/* Progress indicators at bottom of terminal */}
            <div className={styles.terminalProgress}>
               {STEPS.map((s, i) => (
                 <div key={s.id} className={`${styles.progressDot} ${i <= step ? styles.progressDotActive : ''}`} style={i <= step ? { background: s.color, boxShadow: `0 0 8px ${s.color}` } : {}} />
               ))}
            </div>
          </div>
        </div>

        {/* Right: Clean File */}
        <div className={styles.filePanel}>
          <div className={styles.panelLabel}>SAFE OUTPUT</div>
          <div className={`${styles.fileCard} ${styles.cleanCard} ${step >= 4 ? styles.cleanCardReady : ''}`}>
            <div className={`${styles.fileExt} ${styles.fileExtClean}`}>{currentFile.ext}</div>
            <div className={styles.fileName}>{currentFile.label}</div>
            <div className={`${styles.threatBadge} ${step >= 4 ? styles.safeBadge : styles.safeBadgePending}`}>
              {step >= 4 ? '✅ Verified Safe' : '⏳ Reconstructing...'}
            </div>
            <div className={styles.cleanFeatures}>
              <span className={`${styles.cleanTag} ${step >= 3 ? styles.cleanTagVisible : ''}`}>Active Content Removed</span>
              <span className={`${styles.cleanTag} ${step >= 4 ? styles.cleanTagVisible : ''}`}>Structure Validated</span>
              <span className={`${styles.cleanTag} ${step >= 4 ? styles.cleanTagVisible : ''}`}>Audit Logged</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Explanation Panel */}
      <div className={styles.explanationPanel}>
        <div className={styles.explanationIcon}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
            <polyline points="13 2 13 9 20 9" />
          </svg>
        </div>
        <div className={styles.explanationContent}>
          <h4>{currentFile.label} Processing</h4>
          <p>{currentFile.details}</p>
        </div>
      </div>

    </div>
  );
}
