'use client';

import { useState, useEffect } from 'react';
import styles from './IntelComponents.module.css';

const NODES = [
  { id: 1, cx: '20%', cy: '30%', active: true, color: 'blue' },
  { id: 2, cx: '35%', cy: '45%', active: false, color: 'blue' },
  { id: 3, cx: '60%', cy: '25%', active: true, color: 'red' },
  { id: 4, cx: '75%', cy: '50%', active: false, color: 'blue' },
  { id: 5, cx: '50%', cy: '70%', active: true, color: 'amber' },
  { id: 6, cx: '85%', cy: '20%', active: false, color: 'red' },
  { id: 7, cx: '30%', cy: '80%', active: false, color: 'amber' },
];

const CONNECTIONS = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 2, to: 5 },
  { from: 5, to: 7 },
  { from: 4, to: 6 },
  { from: 1, to: 5 },
  { from: 3, to: 6 },
];

export default function IntelGlobalMap() {
  const [activeNode, setActiveNode] = useState<number | null>(3);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Cycle active nodes to simulate ThreatMon live map
    const interval = setInterval(() => {
      setActiveNode((prev) => {
        const next = (prev || 0) + 1;
        return next > NODES.length ? 1 : next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.globalMapContainer}>
      <div className={styles.mapGridOverlay}></div>
      <svg className={styles.mapSvg} preserveAspectRatio="xMidYMid slice" viewBox="0 0 1000 600">
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(220, 38, 38, 0.8)" />
            <stop offset="100%" stopColor="rgba(220, 38, 38, 0)" />
          </radialGradient>
          <radialGradient id="nodeGlowRed" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(239, 68, 68, 0.8)" />
            <stop offset="100%" stopColor="rgba(239, 68, 68, 0)" />
          </radialGradient>
        </defs>

        {/* Connections */}
        {mounted && CONNECTIONS.map((conn, i) => {
          const fromNode = NODES.find(n => n.id === conn.from);
          const toNode = NODES.find(n => n.id === conn.to);
          if (!fromNode || !toNode) return null;

          const isActive = activeNode === conn.from || activeNode === conn.to;
          
          // Convert % to SVG coordinates (1000x600 viewBox)
          const x1 = parseFloat(fromNode.cx) * 10;
          const y1 = parseFloat(fromNode.cy) * 6;
          const x2 = parseFloat(toNode.cx) * 10;
          const y2 = parseFloat(toNode.cy) * 6;

          return (
            <g key={i}>
              <line
                x1={fromNode.cx}
                y1={fromNode.cy}
                x2={toNode.cx}
                y2={toNode.cy}
                className={`${styles.mapLine} ${isActive ? styles.active : ''}`}
              />
              {isActive && (
                <circle r="3" fill="#fff" className={styles.pulseParticle}>
                  <animateMotion
                    dur="1.5s"
                    repeatCount="indefinite"
                    path={`M ${x1} ${y1} L ${x2} ${y2}`}
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {NODES.map((node) => {
          const isActive = activeNode === node.id;
          const isRed = node.color === 'red';
          const isAmber = node.color === 'amber';

          let circleClass = styles.mapCircle;
          if (isRed) circleClass += ` ${styles.red}`;
          if (isAmber) circleClass += ` ${styles.amber}`;
          if (isActive) circleClass += ` ${styles.active}`;

          return (
            <g key={node.id} onClick={() => setActiveNode(node.id)} style={{ cursor: 'crosshair' }}>
              {isActive && (
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="40"
                  fill={`url(#${isRed ? 'nodeGlowRed' : 'nodeGlow'})`}
                  className={styles.mapGlowPulse}
                />
              )}
              <circle
                cx={node.cx}
                cy={node.cy}
                r={isActive ? "8" : "5"}
                className={circleClass}
              />
              {isActive && (
                <text x={node.cx} y={node.cy} dx="15" dy="5" className={styles.mapLabel}>
                  Signal Detected_
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* HUD UI Overlay */}
      <div className={styles.mapHudOverlay}>
        <div className={styles.hudTopLeft}>
          <div className={styles.hudTitle}>/// CANLI METRİKLER</div>
          <div className={styles.hudStat}>
            <span className={styles.hudStatLabel}>SİNYAL HACMİ</span>
            <span className={styles.hudStatValue}>1.4M<small>/sn</small></span>
          </div>
          <div className={styles.hudStat}>
            <span className={styles.hudStatLabel}>İŞLENEN KORELASYON</span>
            <span className={styles.hudStatValue}>324,592</span>
          </div>
          <div className={styles.hudStat}>
            <span className={styles.hudStatLabel}>KRİTİK UYARI</span>
            <span className={styles.hudStatValue} style={{ color: '#EF4444' }}>{activeNode === 3 || activeNode === 6 ? '3' : '2'}</span>
          </div>
        </div>

        <div className={styles.hudBottomRight}>
          <div className={styles.hudTitle}>/// AKTİF OLAY AKIŞI</div>
          <div className={styles.logTerminal}>
            <div className={styles.logLine}>
              <span className={styles.logTime}>10:48:02</span> 
              <span className={styles.logCode}>[SYS]</span> Oracle Engine bağlamı analiz ediyor...
            </div>
            <div className={styles.logLine}>
              <span className={styles.logTime}>10:48:03</span> 
              <span className={styles.logCode} style={{color: '#F5A706'}}>[WARN]</span> Şüpheli lateral hareket tespit edildi (Node 5).
            </div>
            <div className={styles.logLine}>
              <span className={styles.logTime}>10:48:05</span> 
              <span className={styles.logCode} style={{color: '#EF4444'}}>[CRIT]</span> {activeNode === 3 || activeNode === 6 ? 'Node izolasyonu başlatıldı! Güvenlik skoru: 940' : 'Sistem normal, anomali tespiti devam ediyor.'}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mapOverlay}>
        <div className={styles.mapLegend}>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.blue}`}></span>
            THE MESH
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.amber}`}></span>
            ANOMALY
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.red}`}></span>
            ACTIVE THREAT
          </div>
        </div>
      </div>
    </div>
  );
}
