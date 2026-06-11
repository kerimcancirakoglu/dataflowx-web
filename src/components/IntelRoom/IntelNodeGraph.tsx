'use client';

import { useState, useEffect } from 'react';
import styles from './IntelComponents.module.css';

interface Node {
  id: string;
  label: string;
  type: 'actor' | 'ioc' | 'campaign' | 'report' | 'device';
  x: number;
  y: number;
  score?: number;
  details?: Record<string, string>;
}

// Expanded node list for a more complex, Relational.ai-like feel
const NODES: Node[] = [
  { id: '1', label: 'APT-29', type: 'actor', x: 20, y: 40, score: 95, details: { Target: 'Gov', Origin: 'Unknown' } },
  { id: '2', label: '185.220.x.x', type: 'ioc', x: 35, y: 30, score: 72, details: { Protocol: 'HTTPS', Status: 'Active' } },
  { id: '3', label: 'cobalt.dll', type: 'ioc', x: 45, y: 55, score: 88, details: { Hash: 'MD5...a1b2', Sign: 'Invalid' } },
  { id: '4', label: 'CISA AA25-001', type: 'report', x: 25, y: 70 },
  { id: '5', label: 'Op. Ghostwriter', type: 'campaign', x: 38, y: 75, score: 90, details: { Vector: 'Phishing' } },
  { id: '6', label: 'APT-28', type: 'actor', x: 50, y: 80, score: 92 },
  { id: '7', label: 'SolarSpy', type: 'campaign', x: 60, y: 45, score: 85 },
  { id: '8', label: 'CVE-2025-4891', type: 'ioc', x: 65, y: 65, score: 98, details: { CVSS: '9.8', Exploit: 'Public' } },
  { id: '9', label: '172.67.x.x', type: 'ioc', x: 75, y: 75, score: 45 },
  { id: '10', label: 'APT-41', type: 'actor', x: 80, y: 35, score: 89 },
  { id: '11', label: 'Mandiant M-Report', type: 'report', x: 85, y: 60 },
  { id: '12', label: 'Payload.exe', type: 'ioc', x: 55, y: 25, score: 78 },
  { id: '13', label: 'C2 Server', type: 'device', x: 68, y: 20, score: 99 },
  { id: '14', label: 'Victim DB', type: 'device', x: 48, y: 38, score: 10 },
  { id: '15', label: 'Exploit Kit', type: 'ioc', x: 30, y: 50, score: 84 },
  { id: '16', label: 'Lateral Movement', type: 'campaign', x: 75, y: 50, score: 70 },
];

const LINKS = [
  { source: '1', target: '2' },
  { source: '2', target: '3' },
  { source: '3', target: '5' },
  { source: '4', target: '5' },
  { source: '5', target: '6' },
  { source: '3', target: '7' },
  { source: '7', target: '8' },
  { source: '8', target: '9' },
  { source: '6', target: '9' },
  { source: '7', target: '10' },
  { source: '10', target: '11' },
  { source: '8', target: '10' },
  { source: '12', target: '3' },
  { source: '12', target: '13' },
  { source: '2', target: '14' },
  { source: '15', target: '1' },
  { source: '15', target: '5' },
  { source: '16', target: '7' },
  { source: '16', target: '8' },
  { source: '16', target: '11' },
];

export default function IntelNodeGraph() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);

  const handleNodeClick = (id: string) => {
    setActiveNode(activeNode === id ? null : id);
  };

  return (
    <div className={styles.nodeGraphContainer} style={{ position: 'relative' }}>
      <svg className={styles.nodeSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Draw Links */}
        {LINKS.map((link, i) => {
          const source = NODES.find(n => n.id === link.source);
          const target = NODES.find(n => n.id === link.target);
          if (!source || !target) return null;
          
          const isActive = activeNode === source.id || activeNode === target.id;
          const isHovered = hoveredNode && (hoveredNode.id === source.id || hoveredNode.id === target.id);
          const isHighlighted = isActive || isHovered;
          
          return (
            <line
              key={`link-${i}`}
              x1={source.x} y1={source.y}
              x2={target.x} y2={target.y}
              className={`${styles.nodeLine} ${isHighlighted ? styles.active : ''}`}
              style={{ strokeOpacity: isHighlighted ? 1 : 0.3, strokeWidth: isHighlighted ? 0.8 : 0.3 }}
            />
          );
        })}
        
        {/* Draw Nodes */}
        {NODES.map((node) => {
          const isActive = activeNode === node.id;
          const isHovered = hoveredNode?.id === node.id;
          
          // Map type to styles
          let typeClass = '';
          if (node.type === 'actor') typeClass = styles.red;
          if (node.type === 'campaign' || node.type === 'device') typeClass = styles.amber;
          
          const radius = node.type === 'actor' ? 2 : node.type === 'campaign' ? 1.5 : 1;

          return (
            <g 
              key={node.id} 
              className={styles.floatingGroup}
              style={{ transformOrigin: `${node.x}% ${node.y}%` }}
              onClick={() => handleNodeClick(node.id)}
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Pulse effect for high risk nodes */}
              {node.score && node.score > 85 && (
                 <circle cx={node.x} cy={node.y} r={radius * 1.5} className={`${styles.nodeCircle} ${typeClass} ${styles.nodePulse}`} fill="none" strokeWidth="0.2" />
              )}
              <circle
                cx={node.x}
                cy={node.y}
                r={radius}
                className={`${styles.nodeCircle} ${typeClass} ${(isActive || isHovered) ? styles.active : ''}`}
              />
              <text
                x={node.x}
                y={node.y + 4}
                fontSize="1.5"
                textAnchor="middle"
                className={`${styles.nodeLabel} ${(isActive || isHovered) ? styles.active : ''}`}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* HTML Popover for active or hovered node */}
      {(activeNode || hoveredNode) && (
        <div 
          className={`${styles.nodePopover} ${styles.visible}`}
          style={{
             left: `${(hoveredNode || NODES.find(n => n.id === activeNode))?.x}%`,
             top: `${(hoveredNode || NODES.find(n => n.id === activeNode))?.y}%`
          }}
        >
          {(() => {
            const node = hoveredNode || NODES.find(n => n.id === activeNode);
            if (!node) return null;
            
            return (
              <>
                <div className={styles.popoverHeader}>
                  <span className={styles.popoverTitle}>{node.type.toUpperCase()}</span>
                  {node.score && (
                    <span className={`${styles.riskScore} ${node.score > 85 ? styles.high : node.score > 50 ? styles.medium : styles.low}`}>
                      Risk: {node.score}
                    </span>
                  )}
                </div>
                <div className={styles.popoverBody}>
                  <div className={styles.popoverRow}>
                    <span className={styles.popoverLabel}>ID</span>
                    <span className={styles.popoverValue}>{node.label}</span>
                  </div>
                  {node.details && Object.entries(node.details).map(([key, val]) => (
                    <div className={styles.popoverRow} key={key}>
                      <span className={styles.popoverLabel}>{key}</span>
                      <span className={styles.popoverValue}>{val}</span>
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      )}
      
      {/* Legend */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', display: 'flex', gap: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', background: 'var(--color-bg)', padding: '10px 15px', borderRadius: '8px', backdropFilter: 'blur(8px)', border: '1px solid var(--color-border)', opacity: 0.95 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-rx)' }}></div> APT / High Risk</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-tx)' }}></div> IOC</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F5A706' }}></div> Campaign</div>
      </div>
    </div>
  );
}
