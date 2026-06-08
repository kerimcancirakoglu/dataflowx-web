'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './SandboxAnimation.module.css';

const METRICS = [
  'Scanning PE headers...',
  'Extracting macro content...',
  'Behavioral analysis: 847 ops',
  'Network calls intercepted: 12',
  'Registry modifications: 3',
  'YARA match: Trojan.GenericKD',
  'MITRE T1059 detected',
  'Detonating in VM layer 2...',
  'Memory injection attempt blocked',
  'C2 beacon signature found',
];

const SOURCES = [
  {
    id: 'email',
    label: 'Email Attachments',
    sublabel: 'PHISHING / MALWARE',
    color: '#ff6b35',
    detailTitle: 'EMAIL THREAT MITIGATION',
    detailText: 'Incoming emails are routed through DFX ESP to extract and detonate attached files (like PDFs or Office docs with hidden macros) in a safe virtual environment before delivering the sanitized email to the user.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="14" width="56" height="40" rx="4" fill="#1a0a00" stroke="#ff6b35" strokeWidth="2"/>
        <path d="M4 20l28 20L60 20" stroke="#ff6b35" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="48" cy="16" r="10" fill="#ff4757"/>
        <path d="M48 11v7M48 21v1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <rect x="44" y="14" width="8" height="2" rx="1" fill="white" opacity="0.4"/>
      </svg>
    ),
  },
  {
    id: 'files',
    label: 'Network Files',
    sublabel: 'EXECUTABLE / SCRIPTS',
    color: '#F5A706',
    detailTitle: 'NETWORK TRAFFIC ANALYSIS',
    detailText: 'Any executable or script attempting to traverse the network boundary is intercepted. It is executed within our custom VM profiles to track API calls, registry modifications, and evasive behaviors.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="8" width="30" height="38" rx="3" fill="#1a1200" stroke="#F5A706" strokeWidth="2"/>
        <path d="M30 8l10 10H30V8z" fill="#F5A706" opacity="0.5"/>
        <rect x="14" y="24" width="18" height="2" rx="1" fill="#F5A706" opacity="0.7"/>
        <rect x="14" y="30" width="14" height="2" rx="1" fill="#F5A706" opacity="0.5"/>
        <rect x="14" y="36" width="10" height="2" rx="1" fill="#F5A706" opacity="0.3"/>
        <circle cx="46" cy="44" r="10" fill="#1a1200" stroke="#F5A706" strokeWidth="2"/>
        <path d="M42 44l3 3 5-6" stroke="#F5A706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'usb',
    label: 'Hardware / USB',
    sublabel: 'FIRMWARE / MEDIA',
    color: '#00a3ff',
    detailTitle: 'HARDWARE & MEDIA SCAN',
    detailText: 'Physical media introduced to secure endpoints are scanned and virtually mounted in the sandbox. This prevents zero-day autorun exploits and firmware-level malware from touching the actual OS layer.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="22" y="4" width="20" height="36" rx="4" fill="#001122" stroke="#00a3ff" strokeWidth="2"/>
        <rect x="30" y="40" width="4" height="20" fill="#00a3ff" opacity="0.6"/>
        <rect x="14" y="52" width="36" height="6" rx="3" fill="#001122" stroke="#00a3ff" strokeWidth="1.5"/>
        <rect x="28" y="14" width="8" height="4" rx="1" fill="#00a3ff" opacity="0.6"/>
        <rect x="28" y="22" width="8" height="4" rx="1" fill="#00a3ff" opacity="0.4"/>
        <circle cx="32" cy="10" r="3" fill="#00a3ff"/>
        {/* Skull warning */}
        <circle cx="49" cy="15" r="9" fill="#ff4757"/>
        <path d="M49 10.5a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5v1.5h-4v-1.5c-1.2-.7-2-2-2-3.5a4 4 0 0 1 4-4z" fill="white" opacity="0.9"/>
        <rect x="47" y="20" width="1.5" height="2" rx="0.5" fill="white" opacity="0.9"/>
        <rect x="50" y="20" width="1.5" height="2" rx="0.5" fill="white" opacity="0.9"/>
      </svg>
    ),
  },
  {
    id: 'web',
    label: 'Web Documents',
    sublabel: 'PDF / OFFICE / LINKS',
    color: '#22d3ee',
    detailTitle: 'WEB & LINK ISOLATION',
    detailText: 'Files downloaded from web gateways and malicious URLs are opened inside the Sandbox. Dynamic web isolation detects drive-by downloads and prevents them from executing on user endpoints.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="24" fill="#001a1a" stroke="#22d3ee" strokeWidth="2"/>
        <path d="M32 8C24 20 24 44 32 56M32 8C40 20 40 44 32 56" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="3 2"/>
        <path d="M8 32h48" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="3 2"/>
        <path d="M12 20h40M12 44h40" stroke="#22d3ee" strokeWidth="1" opacity="0.4"/>
        {/* warning badge */}
        <circle cx="48" cy="16" r="9" fill="#ff4757"/>
        <path d="M48 12l.8 5.6h-1.6L48 12zM48 19.5v1" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const SANDBOX_METRICS = [
  { label: 'API Calls', value: '2,847', color: '#F5A706', progress: 35 },
  { label: 'Network Req', value: '143', color: '#ff4757', progress: 45 },
  { label: 'Files Created', value: '37', color: '#a855f7', progress: 55 },
  { label: 'Reg. Modified', value: '12', color: '#22d3ee', progress: 65 },
];

export default function SandboxAnimation() {
  const [metricIndex, setMetricIndex] = useState(0);
  const [activeSource, setActiveSource] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const metricInterval = setInterval(() => {
      setMetricIndex(prev => (prev + 1) % METRICS.length);
    }, 1800);

    let sourceInterval: NodeJS.Timeout | null = null;
    if (autoPlay) {
      sourceInterval = setInterval(() => {
        setActiveSource(prev => (prev + 1) % SOURCES.length);
      }, 2400);
    }

    return () => {
      clearInterval(metricInterval);
      if (sourceInterval) clearInterval(sourceInterval);
    };
  }, [autoPlay]);

  // Node positions (percentage of wrapper) — TL, TR, BL, BR
  const nodes = [
    { x: 15, y: 18 },  // TL — email
    { x: 85, y: 18 },  // TR — files
    { x: 15, y: 82 },  // BL — usb
    { x: 85, y: 82 },  // BR — web
  ];
  const center = { x: 50, y: 50 };

  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <p className={styles.overTitle}>MULTI-VECTOR THREAT ANALYSIS</p>
        <h2 className={styles.title}>
          Every Channel. <span className={styles.highlight}>One Sandbox.</span>
        </h2>
        <p className={styles.subtitle}>
          DFX Sandbox receives files from all attack vectors simultaneously, detonates them in isolated virtual environments, and delivers real-time verdicts.
        </p>
      </div>

      <div className={styles.swipeContainer}>
        <div className={styles.wrapper} ref={containerRef}>
          {/* SVG Lines + Packets */}
          <svg className={styles.svgOverlay} viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              {SOURCES.map((src, i) => (
                <linearGradient key={src.id} id={`grad-${src.id}`} x1={nodes[i].x > 50 ? '100%' : '0%'} y1={nodes[i].y > 50 ? '100%' : '0%'} x2={nodes[i].x > 50 ? '0%' : '100%'} y2={nodes[i].y > 50 ? '0%' : '100%'}>
                  <stop offset="0%" stopColor={src.color} stopOpacity="0"/>
                  <stop offset="50%" stopColor={src.color} stopOpacity="0.8"/>
                  <stop offset="100%" stopColor={src.color} stopOpacity="0.2"/>
                </linearGradient>
              ))}
            </defs>

          {SOURCES.map((src, i) => (
            <g key={src.id}>
              {/* Static path */}
              <line
                x1={`${nodes[i].x}%`} y1={`${nodes[i].y}%`}
                x2={`${center.x}%`}  y2={`${center.y}%`}
                stroke={src.color}
                strokeWidth="0.4"
                strokeOpacity={activeSource === i ? 0.7 : 0.2}
                strokeDasharray="2 1.5"
                style={{ transition: 'stroke-opacity 0.5s' }}
              />
              {/* Animated packet */}
              <circle r="0.8" fill={src.color} opacity={activeSource === i ? 1 : 0.3}>
                <animateMotion
                  dur={`${1.8 + i * 0.6}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.6}s`}
                >
                  <mpath href={`#path-${src.id}`}/>
                </animateMotion>
              </circle>
              <path
                id={`path-${src.id}`}
                d={`M ${nodes[i].x} ${nodes[i].y} L ${center.x} ${center.y}`}
                fill="none"
              />
            </g>
          ))}
        </svg>

        {/* Corner Source Nodes */}
        {SOURCES.map((src, i) => (
          <div
            key={src.id}
            onClick={() => { setActiveSource(i); setAutoPlay(false); }}
            className={`${styles.sourceNode} ${activeSource === i ? styles.sourceActive : ''}`}
            style={{
              position: 'absolute',
              left: `${nodes[i].x}%`,
              top: `${nodes[i].y}%`,
              transform: 'translate(-50%, -50%)',
              '--node-color': src.color,
            } as React.CSSProperties}
          >
            <div className={styles.sourceIcon}>{src.icon}</div>
            <div className={styles.sourceLabel}>{src.label}</div>
            <div className={styles.sourceSublabel}>{src.sublabel}</div>
            {activeSource === i && (
              <div className={styles.sourcePulse} style={{ borderColor: src.color, boxShadow: `0 0 20px ${src.color}40` }}/>
            )}
          </div>
        ))}

        {/* Center Sandbox Node */}
        <div className={styles.sandboxCenter}>
          {/* Rotating orbit ring */}
          <div className={styles.orbitRing}/>
          <div className={styles.orbitRing2}/>

          {/* Scanner line */}
          <div className={styles.scannerLine}/>

          {/* Icon */}
          <div className={styles.sandboxIcon}>
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4L44 14V34L24 44L4 34V14L24 4Z" fill="rgba(245,167,6,0.08)" stroke="#F5A706" strokeWidth="2"/>
              <path d="M24 4V44M4 14l20 10M44 14L24 24M4 34l20-10M44 34L24 24" stroke="#F5A706" strokeWidth="1" strokeOpacity="0.5"/>
              <circle cx="24" cy="24" r="6" fill="rgba(245,167,6,0.15)" stroke="#F5A706" strokeWidth="1.5"/>
              <circle cx="24" cy="24" r="2" fill="#F5A706"/>
            </svg>
          </div>

          <div className={styles.sandboxLabel}>SANDBOX</div>
          <div className={styles.sandboxSublabel}>ISOLATED EXECUTION</div>

          {/* Live metric ticker */}
          <div className={styles.liveTicker}>
            <span className={styles.liveIndicator}/>
            <span className={styles.liveText}>{METRICS[metricIndex]}</span>
          </div>
        </div>

        {/* Floating metric badges on the lines */}
        <div className={`${styles.metricBadge} ${styles.metricBadgeTL}`}>
          <span className={styles.badgeDot} style={{ background: '#ff4757' }}/>
          THREAT DETECTED
        </div>
        <div className={`${styles.metricBadge} ${styles.metricBadgeTR}`}>
          <span className={styles.badgeDot} style={{ background: '#F5A706' }}/>
          ANALYZING...
        </div>
        <div className={`${styles.metricBadge} ${styles.metricBadgeBL}`}>
          <span className={styles.badgeDot} style={{ background: '#22d3ee' }}/>
          QUARANTINED
        </div>
        <div className={`${styles.metricBadge} ${styles.metricBadgeBR}`}>
          <span className={styles.badgeDot} style={{ background: '#2ed573' }}/>
          SAFE — PASSED
        </div>
      </div>
      </div>

      {/* Bottom Metrics Bar */}
      <div className={styles.metricsContainer}>
        <div className={styles.metricsRow}>
          {SANDBOX_METRICS.map(m => (
            <div key={m.label} className={styles.metricItem}>
              <div className={styles.metricValue} style={{ color: m.color }}>{m.value}</div>
              <div className={styles.metricLabel}>{m.label}</div>
              <div className={styles.metricBarTrack}>
                <div
                  className={styles.metricBarFill}
                  style={{ background: m.color, width: `${m.progress}%`, boxShadow: `0 0 8px ${m.color}` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.metricStatus}>
          <div>
            <div className={styles.metricStatusTitle} style={{ color: SOURCES[activeSource].color }}>
              {SOURCES[activeSource].detailTitle}
            </div>
            <div className={styles.metricStatusSub}>
              {SOURCES[activeSource].detailText}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
