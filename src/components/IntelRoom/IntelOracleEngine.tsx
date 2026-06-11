'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './IntelComponents.module.css';

const EVIDENCE = [
  { text: '94% similarity to APT-29 infrastructure — The Mesh relation', level: 'critical' },
  { text: 'Tor exit node; "Operation Ghostwriter" campaign match', level: 'critical' },
  { text: 'Active traffic anomaly across 5 countries in 24 hours', level: 'high' },
  { text: 'AS account age: 11 days — indicator of new infrastructure setup', level: 'medium' },
];

export default function IntelOracleEngine() {
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsAnimating(true);
        observer.disconnect();
      }
    }, { threshold: 0.3 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.oracleContainer} ref={containerRef}>
      
      {/* Left side: Input & Checklist */}
      <div className={styles.oracleLeft}>
        <div className={styles.bentoLabel} style={{ marginBottom: '2rem' }}>// QUERY IOC</div>
        
        <div className={styles.inputGroup}>
          <input className={styles.inputField} placeholder="Enter IP, Domain, Hash, or CVE..." />
          <input className={styles.inputField} readOnly value="185.220.101.47" />
        </div>
        
        <div className={styles.bentoLabel} style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>// ANALYSIS COMPONENTS</div>
        
        <div className={styles.checkList}>
          <div className={`${styles.checkRow} ${isAnimating ? styles.loaded : ''}`} style={{ animationDelay: '0.2s' }}>
            <div className={styles.checkIcon}>✓</div> 14 relations found in The Mesh
          </div>
          <div className={`${styles.checkRow} ${isAnimating ? styles.loaded : ''}`} style={{ animationDelay: '0.4s' }}>
            <div className={styles.checkIcon}>✓</div> Match with 3 active campaigns
          </div>
          <div className={`${styles.checkRow} ${isAnimating ? styles.loaded : ''}`} style={{ animationDelay: '0.6s' }}>
            <div className={styles.checkIcon}>✓</div> MITRE T1090.003 — Proxy connection
          </div>
          <div className={`${styles.checkRow} ${isAnimating ? styles.loaded : ''}`} style={{ animationDelay: '0.8s' }}>
            <div className={styles.checkIcon}>✓</div> Geographic anomaly detected
          </div>
          <div className={`${styles.checkRow} ${isAnimating ? styles.loaded : ''}`} style={{ animationDelay: '1.0s', borderBottom: 'none' }}>
            <div className={styles.checkIcon}>✓</div> Blacklisted in 5 external feeds
          </div>
        </div>
      </div>
      
      {/* Right side: Score & Evidence */}
      <div className={styles.oracleRight}>
        <div className={styles.bentoLabel} style={{ marginBottom: '2rem' }}>// ORACLE VERDICT</div>
        
        <div className={styles.scoreWrapper}>
          <div className={styles.scoreRingContainer}>
            <svg viewBox="0 0 160 160" width="100%" height="100%" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="80" cy="80" r="65" className={styles.scoreRingBg} />
              <circle 
                cx="80" cy="80" r="65" 
                className={styles.scoreRingProgress} 
                style={{ strokeDashoffset: isAnimating ? 41 : 408, stroke: '#EF4444' }} 
              />
            </svg>
            <div className={styles.scoreText}>
              {isAnimating ? '9.4' : '0.0'}
            </div>
          </div>
          <div className={styles.verdict}>
            {isAnimating ? 'CRITICAL THREAT — BLOCK RECOMMENDED' : 'AWAITING ANALYSIS...'}
          </div>
        </div>
        
        <div className={styles.bentoLabel} style={{ marginBottom: '1.5rem' }}>// EVIDENCE CHAIN</div>
        
        <div className={styles.evidenceChain}>
          {EVIDENCE.map((ev, i) => {
            const badgeLabel = ev.level === 'critical' ? 'CRITICAL' : 
                               ev.level === 'high' ? 'HIGH' : 
                               ev.level === 'medium' ? 'MEDIUM' : 'LOW';
            
            return (
              <div 
                key={i} 
                className={`${styles.evidenceItem} ${isAnimating ? styles.loaded : ''}`} 
                style={{ animationDelay: `${1.2 + (i * 0.2)}s` }}
              >
                <div className={`${styles.evBadge} ${styles[ev.level]}`}>{badgeLabel}</div>
                <div className={styles.evText}>{ev.text}</div>
              </div>
            );
          })}
        </div>
      </div>
      
    </div>
  );
}
