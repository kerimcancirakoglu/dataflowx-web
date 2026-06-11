'use client';

import { useState } from 'react';
import styles from './IntelComponents.module.css';

const LAYERS = [
  { num: '01', name: 'Sentinels', role: 'SENSORS' },
  { num: '02', name: 'The Mesh', role: 'KNOWLEDGE GRAPH' },
  { num: '03', name: 'Oracle', role: 'SCORING ENGINE' },
  { num: '04', name: 'Operations', role: 'ANALYST LAYER' },
  { num: '05', name: 'Briefs', role: 'EXECUTIVE LAYER' },
  { num: '06', name: 'Bureau', role: 'MSSP LAYER' },
  { num: '07', name: 'Arsenal', role: 'RULE ENGINE' },
  { num: '08', name: 'Relay', role: 'API LAYER' },
];

export default function IntelMeshVisualizer() {
  const [activeIndex, setActiveIndex] = useState(1); // Default to The Mesh

  return (
    <div className={styles.meshContainer}>
      <div className={styles.meshSidebar}>
        {LAYERS.map((layer, index) => (
          <div 
            key={layer.num} 
            className={`${styles.meshItem} ${index === activeIndex ? styles.active : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            <div className={styles.meshNum}>{layer.num}</div>
            <div className={styles.meshName}>{layer.name}</div>
            <div className={styles.meshRole}>{layer.role}</div>
          </div>
        ))}
      </div>
      
      <div className={styles.meshViewport}>
        {/* Animated Rings */}
        <div className={`${styles.orbitRing} ${styles.ring1}`}></div>
        <div className={`${styles.orbitRing} ${styles.ring2}`}></div>
        <div className={`${styles.orbitRing} ${styles.ring3}`}></div>
        
        {/* Central Core Icon */}
        <div className={styles.brainCore}>
          {activeIndex === 0 && ( // Sentinels
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 10px rgba(220, 38, 38, 0.5))' }}>
              <path d="M12 2v20M2 12h20M12 12m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            </svg>
          )}
          {activeIndex === 1 && ( // The Mesh
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 10px rgba(220, 38, 38, 0.5))' }}>
              <path d="M9 12a3 3 0 1 0 6 0 3 3 0 1 0 -6 0M3 12a3 3 0 1 0 6 0 3 3 0 1 0 -6 0M15 12a3 3 0 1 0 6 0 3 3 0 1 0 -6 0M12 3a3 3 0 1 0 0 6 3 3 0 1 0 0 -6M12 15a3 3 0 1 0 0 6 3 3 0 1 0 0 -6M12 9v3M6 12h3M15 12h3M9.8 9.8l1.4 1.4M14.2 9.8l-1.4 1.4M9.8 14.2l1.4 -1.4M14.2 14.2l-1.4 -1.4" />
            </svg>
          )}
          {activeIndex === 2 && ( // Oracle
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.5))' }}>
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          )}
          {activeIndex === 3 && ( // Operations
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 10px rgba(220, 38, 38, 0.5))' }}>
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M6 8l4 4-4 4M14 16h4" />
            </svg>
          )}
          {activeIndex === 4 && ( // Briefs
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 10px rgba(220, 38, 38, 0.5))' }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          )}
          {activeIndex === 5 && ( // Bureau
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 10px rgba(220, 38, 38, 0.5))' }}>
              <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
              <line x1="9" y1="7" x2="9" y2="7.01" />
              <line x1="15" y1="7" x2="15" y2="7.01" />
              <line x1="9" y1="11" x2="9" y2="11.01" />
              <line x1="15" y1="11" x2="15" y2="11.01" />
            </svg>
          )}
          {activeIndex === 6 && ( // Arsenal
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 10px rgba(220, 38, 38, 0.5))' }}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          )}
          {activeIndex === 7 && ( // Relay
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 10px rgba(220, 38, 38, 0.5))' }}>
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          )}
        </div>
        
        <div className={styles.viewportTitle}>
          <div className={styles.vpName}>{LAYERS[activeIndex].name}</div>
          <div className={styles.vpDesc}>{LAYERS[activeIndex].role}</div>
        </div>
      </div>
    </div>
  );
}
