import React from 'react';
import styles from './IntelComponents.module.css';

interface VisualProps {
  isActive: boolean;
}

export const SentinelsVisual: React.FC<VisualProps> = ({ isActive }) => (
  <svg width="200" height="200" viewBox="0 0 200 200" className={`${styles.layerSvg} ${isActive ? styles.active : ''}`}>
    <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(220, 38, 38, 0.2)" strokeWidth="2" />
    <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(220, 38, 38, 0.4)" strokeWidth="1" strokeDasharray="4 4" className={styles.spinSlow} />
    <circle cx="100" cy="100" r="10" fill="#DC2626" className={styles.pulseSlow} />
    <path d="M100 100 L180 100 A80 80 0 0 1 100 180 Z" fill="rgba(220, 38, 38, 0.1)" className={styles.radarScan} />
    {/* Sensor nodes */}
    <circle cx="40" cy="60" r="4" fill="#fff" className={styles.blink1} />
    <circle cx="160" cy="50" r="4" fill="#fff" className={styles.blink2} />
    <circle cx="60" cy="150" r="4" fill="#fff" className={styles.blink3} />
  </svg>
);

export const MeshVisual: React.FC<VisualProps> = ({ isActive }) => (
  <svg width="200" height="200" viewBox="0 0 200 200" className={`${styles.layerSvg} ${isActive ? styles.active : ''}`}>
    <g className={styles.floatGroup}>
      <line x1="50" y1="100" x2="100" y2="50" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
      <line x1="100" y1="50" x2="150" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
      <line x1="150" y1="100" x2="100" y2="150" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
      <line x1="100" y1="150" x2="50" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
      <line x1="50" y1="100" x2="150" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
      <circle cx="50" cy="100" r="8" fill="#DC2626" />
      <circle cx="100" cy="50" r="10" fill="#EF4444" className={styles.pulseSlow} />
      <circle cx="150" cy="100" r="8" fill="#DC2626" />
      <circle cx="100" cy="150" r="8" fill="#F5A706" />
      <circle cx="100" cy="100" r="12" fill="#fff" className={styles.pulseSlow} />
    </g>
  </svg>
);

export const OracleVisual: React.FC<VisualProps> = ({ isActive }) => (
  <svg width="200" height="200" viewBox="0 0 200 200" className={`${styles.layerSvg} ${isActive ? styles.active : ''}`}>
    <circle cx="100" cy="100" r="60" fill="none" stroke="#DC2626" strokeWidth="4" strokeDasharray="300" strokeDashoffset="0" className={styles.drawCircle} />
    <path d="M70 100 L95 125 L140 70" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className={styles.drawCheck} />
    <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    <text x="100" y="180" fill="#EF4444" fontSize="14" fontFamily="monospace" textAnchor="middle" className={styles.blink1}>RISK SCORE: 940</text>
  </svg>
);

export const OperationsVisual: React.FC<VisualProps> = ({ isActive }) => (
  <svg width="200" height="200" viewBox="0 0 200 200" className={`${styles.layerSvg} ${isActive ? styles.active : ''}`}>
    <rect x="40" y="50" width="120" height="100" rx="8" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
    <line x1="40" y1="80" x2="160" y2="80" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
    <circle cx="60" cy="65" r="4" fill="#EF4444" className={styles.blink1} />
    <circle cx="80" cy="65" r="4" fill="#F5A706" />
    <circle cx="100" cy="65" r="4" fill="#DC2626" />
    
    <rect x="55" y="100" width="8" height="30" fill="#DC2626" className={styles.barGrow1} />
    <rect x="75" y="110" width="8" height="20" fill="#DC2626" className={styles.barGrow2} />
    <rect x="95" y="90" width="8" height="40" fill="#EF4444" className={styles.barGrow3} />
    <rect x="115" y="115" width="8" height="15" fill="#DC2626" className={styles.barGrow4} />
    <rect x="135" y="95" width="8" height="35" fill="#DC2626" className={styles.barGrow5} />
  </svg>
);

export const BriefsVisual: React.FC<VisualProps> = ({ isActive }) => (
  <svg width="200" height="200" viewBox="0 0 200 200" className={`${styles.layerSvg} ${isActive ? styles.active : ''}`}>
    <g className={styles.slideUpGroup}>
      <rect x="60" y="40" width="80" height="110" rx="4" fill="var(--color-bg)" stroke="#DC2626" strokeWidth="2" />
      <line x1="75" y1="60" x2="125" y2="60" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <line x1="75" y1="80" x2="110" y2="80" stroke="rgba(255,255,255,0.4)" strokeWidth="4" strokeLinecap="round" />
      <line x1="75" y1="100" x2="120" y2="100" stroke="rgba(255,255,255,0.4)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="100" cy="130" r="15" fill="none" stroke="#EF4444" strokeWidth="4" strokeDasharray="70 100" />
    </g>
    <rect x="50" y="50" width="80" height="110" rx="4" fill="var(--color-bg)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" transform="rotate(-10 50 50)" className={styles.paperBg} />
  </svg>
);

export const BureauVisual: React.FC<VisualProps> = ({ isActive }) => (
  <svg width="200" height="200" viewBox="0 0 200 200" className={`${styles.layerSvg} ${isActive ? styles.active : ''}`}>
    <circle cx="100" cy="100" r="30" fill="#DC2626" className={styles.pulseSlow} />
    <g className={styles.spinSlow}>
      <circle cx="100" cy="20" r="12" fill="var(--color-bg)" stroke="#fff" strokeWidth="2" />
      <circle cx="100" cy="180" r="12" fill="var(--color-bg)" stroke="#fff" strokeWidth="2" />
      <circle cx="20" cy="100" r="12" fill="var(--color-bg)" stroke="#fff" strokeWidth="2" />
      <circle cx="180" cy="100" r="12" fill="var(--color-bg)" stroke="#fff" strokeWidth="2" />
      <path d="M100 50 L100 32 M100 150 L100 168 M50 100 L32 100 M150 100 L168 100" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4" />
    </g>
  </svg>
);

export const ArsenalVisual: React.FC<VisualProps> = ({ isActive }) => (
  <svg width="200" height="200" viewBox="0 0 200 200" className={`${styles.layerSvg} ${isActive ? styles.active : ''}`}>
    <path d="M100 30 L160 50 L160 110 C160 150 100 180 100 180 C100 180 40 150 40 110 L40 50 Z" fill="none" stroke="#DC2626" strokeWidth="4" className={styles.drawShield} />
    <path d="M70 100 L130 100" stroke="#fff" strokeWidth="4" strokeLinecap="round" className={styles.laserScan} />
    <path d="M100 70 L100 130" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const RelayVisual: React.FC<VisualProps> = ({ isActive }) => (
  <svg width="200" height="200" viewBox="0 0 200 200" className={`${styles.layerSvg} ${isActive ? styles.active : ''}`}>
    <path d="M40 100 Q 100 40 160 100 T 40 100" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
    <path d="M40 100 Q 100 160 160 100 T 40 100" fill="none" stroke="rgba(220, 38, 38, 0.4)" strokeWidth="2" />
    
    <circle cx="40" cy="100" r="15" fill="var(--color-bg)" stroke="#DC2626" strokeWidth="3" />
    <circle cx="160" cy="100" r="15" fill="var(--color-bg)" stroke="#fff" strokeWidth="3" />
    
    <circle cx="40" cy="100" r="4" fill="#DC2626">
      <animateMotion dur="2s" repeatCount="indefinite" path="M0 0 Q 60 -60 120 0" />
    </circle>
    <circle cx="160" cy="100" r="4" fill="#fff">
      <animateMotion dur="2s" repeatCount="indefinite" path="M0 0 Q -60 60 -120 0" />
    </circle>
  </svg>
);
