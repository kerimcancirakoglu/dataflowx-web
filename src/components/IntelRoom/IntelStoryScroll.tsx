'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './IntelComponents.module.css';
import { SentinelsVisual, MeshVisual, OracleVisual, OperationsVisual, BriefsVisual, BureauVisual, ArsenalVisual, RelayVisual } from './IntelLayerVisuals';

const LAYERS = [
  { num: '01', name: 'Sentinels', role: 'SENSORS', desc: 'A sensor network spanning your entire digital footprint, including network, endpoint, cloud, and email. Millions of signals are collected and verified every second.' },
  { num: '02', name: 'The Mesh', role: 'KNOWLEDGE GRAPH', desc: 'A relational database where data is not simply stored, but interconnected. Billions of nodes between threat actors, IP addresses, and vulnerabilities are mapped in real-time.' },
  { num: '03', name: 'Oracle', role: 'SCORING ENGINE', desc: 'An explainable AI engine. It examines every alert, merges it with context, and assigns a precise risk score between 0 and 1000, explaining the reasoning with evidence.' },
  { num: '04', name: 'Operations', role: 'ANALYST LAYER', desc: 'An enriched command center for SOC teams. Noise-free, context-ready incidents with pivot points that let you take direct action.' },
  { num: '05', name: 'Briefs', role: 'EXECUTIVE LAYER', desc: 'A reporting engine that translates technical details into business language. Risk metrics, ROI, and cyber posture summaries for CISOs and the board.' },
  { num: '06', name: 'Bureau', role: 'MSSP LAYER', desc: 'A multi-tenant management architecture designed for MSSPs. Monitor dozens of clients from a single screen, distribute rules globally, and maximize operational efficiency.' },
  { num: '07', name: 'Arsenal', role: 'RULE ENGINE', desc: 'Continuously updated detection engineering rules. Instantly converts threat intelligence into actionable detection scenarios.' },
  { num: '08', name: 'Relay', role: 'API LAYER', desc: 'The integration point with your existing security infrastructure. Send automated responses to firewalls, EDRs, and SOAR platforms.' },
];

export default function IntelStoryScroll() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const items = containerRef.current.querySelectorAll(`.${styles.layerScrollItem}`);

      let newActiveIndex = 0;
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        // Trigger active state when item passes middle of viewport
        if (rect.top < window.innerHeight * 0.5) {
          newActiveIndex = index;
        }
      });
      setActiveIndex(newActiveIndex);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.storyContainer} ref={containerRef}>
      <div className={styles.storyLeft}>
        <div className={styles.layerList}>
          {LAYERS.map((layer, index) => (
            <div
              key={layer.num}
              className={`${styles.layerScrollItem} ${index === activeIndex ? styles.activeLayer : ''}`}
            >
              <div className={styles.layerHeader}>
                <div className={styles.layerIndex}>{layer.num}</div>
                <div className={styles.layerName}>{layer.name}</div>
              </div>
              <div className={styles.layerRole}>{layer.role}</div>
              <div className={styles.layerDescWrapper}>
                <p className={styles.layerDesc}>{layer.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.storyRight}>
        <div className={styles.stickyVisual}>
          <div className={styles.visualPane}>
            {/* Central connection lines can be added here */}
            <div className={styles.organismCore}></div>
            
            {LAYERS.map((layer, index) => {
              const angle = (index * 45 - 90) * (Math.PI / 180);
              const radius = 35;
              const left = 50 + radius * Math.cos(angle);
              const top = 50 + radius * Math.sin(angle);
              const isActive = index === activeIndex;
              
              return (
                <div 
                  key={layer.num}
                  className={`${styles.organismNode} ${isActive ? styles.organismNodeActive : ''}`}
                  style={{ 
                    left: `${left}%`, 
                    top: `${top}%`,
                    position: 'absolute',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className={styles.nodeIconWrapper}>
                    {index === 0 && <SentinelsVisual isActive={isActive} />}
                    {index === 1 && <MeshVisual isActive={isActive} />}
                    {index === 2 && <OracleVisual isActive={isActive} />}
                    {index === 3 && <OperationsVisual isActive={isActive} />}
                    {index === 4 && <BriefsVisual isActive={isActive} />}
                    {index === 5 && <BureauVisual isActive={isActive} />}
                    {index === 6 && <ArsenalVisual isActive={isActive} />}
                    {index === 7 && <RelayVisual isActive={isActive} />}
                  </div>
                  <div className={styles.nodeLabel}>
                    <div className={styles.nodeTitle}>{layer.name}</div>
                    {isActive && (
                      <div className={styles.nodeMiniDesc}>
                        {layer.role} — Aktif Veri Akışı İşleniyor...
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            

            {/* Animated Orbits to create depth */}
            <div className={`${styles.abstractOrbit} ${styles.orbitA}`}></div>
            <div className={`${styles.abstractOrbit} ${styles.orbitB}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
