'use client';

import React, { useEffect, useState } from 'react';
import styles from './IntelHeroMap.module.css';

const MAP_NODES = [
  { id: 1, top: '35%', left: '20%', type: 'critical', size: 'large' },
  { id: 2, top: '40%', left: '25%', type: 'medium', size: 'medium' },
  { id: 3, top: '45%', left: '22%', type: 'critical', size: 'large' },
  { id: 4, top: '30%', left: '48%', type: 'critical', size: 'large' },
  { id: 5, top: '25%', left: '52%', type: 'medium', size: 'small' },
  { id: 6, top: '35%', left: '55%', type: 'low', size: 'small' },
  { id: 7, top: '45%', left: '50%', type: 'critical', size: 'large' },
  { id: 8, top: '20%', left: '75%', type: 'medium', size: 'medium' },
  { id: 9, top: '55%', left: '80%', type: 'critical', size: 'large' },
  { id: 10, top: '65%', left: '85%', type: 'medium', size: 'medium' },
  { id: 11, top: '40%', left: '70%', type: 'low', size: 'small' },
  { id: 12, top: '75%', left: '30%', type: 'medium', size: 'small' },
];

const CONNECTIONS = [
  { id: 'c1', x1: '20%', y1: '35%', x2: '48%', y2: '30%' },
  { id: 'c2', x1: '25%', y1: '40%', x2: '50%', y2: '45%' },
  { id: 'c3', x1: '80%', y1: '55%', x2: '52%', y2: '25%' },
  { id: 'c4', x1: '30%', y1: '75%', x2: '22%', y2: '45%' },
  { id: 'c5', x1: '75%', y1: '20%', x2: '70%', y2: '40%' },
];

export default function IntelHeroMap() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapWrapper}>
        {/* Map Background */}
        <div className={styles.mapBackground}></div>
        
        {/* Animated Connections */}
        {mounted && (
          <svg className={styles.connectionsLayer}>
            {CONNECTIONS.map(conn => (
              <line 
                key={conn.id} 
                x1={conn.x1} y1={conn.y1} 
                x2={conn.x2} y2={conn.y2} 
                className={styles.attackLine} 
              />
            ))}
          </svg>
        )}

        {/* Nodes */}
        {mounted && MAP_NODES.map((node) => (
          <div 
            key={node.id} 
            className={`${styles.mapNode} ${styles[node.type]} ${styles[node.size]}`}
            style={{ top: node.top, left: node.left, animationDelay: `${Math.random() * 2}s` }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onClick={() => setSelectedNode(node.id === selectedNode ? null : node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className={styles.nodeCore}></div>
            <div className={styles.nodePulse}></div>
            
            {hoveredNode === node.id && (
              <div className={styles.tooltip}>
                <div className={styles.tooltipHeader}>Threat Detected</div>
                <div className={styles.tooltipBody}>Severity: {node.type.toUpperCase()}</div>
              </div>
            )}
          </div>
        ))}

        {/* Details Panel */}
        {selectedNode !== null && (
          <div className={styles.detailsPanel}>
            <div className={styles.panelHeader}>
              <span>THREAT PROFILE</span>
              <button className={styles.closeBtn} onClick={() => setSelectedNode(null)}>✕</button>
            </div>
            <div className={styles.panelBody}>
              <div className={styles.panelRow}>
                <span className={styles.panelLabel}>Target Node:</span>
                <span className={styles.panelValue}>IDX-{selectedNode}00</span>
              </div>
              <div className={styles.panelRow}>
                <span className={styles.panelLabel}>Vector:</span>
                <span className={styles.panelValue}>Advanced Persistent Threat</span>
              </div>
              <div className={styles.panelRow}>
                <span className={styles.panelLabel}>Status:</span>
                <span className={`${styles.panelValue} ${styles.statusActive}`}>Live Analysis</span>
              </div>
            </div>
            <div className={styles.panelFooter}>
              <button className={styles.actionBtn}>Isolate Node</button>
            </div>
          </div>
        )}


      </div>
    </div>
  );
}
