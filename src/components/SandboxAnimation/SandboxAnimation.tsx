'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './SandboxAnimation.module.css';

const SOURCES = [
  {
    id: 'email',
    label: 'Email Attachments',
    sublabel: 'PHISHING / MALWARE',
    color: '#ff6b35',
    detailTitle: 'EMAIL THREAT MITIGATION',
    detailText:
      'Incoming emails are routed through DFX ESP to extract and detonate attached files (like PDFs or Office docs with hidden macros) in a safe virtual environment before delivering the sanitized email to the user.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="14" width="56" height="40" rx="4" fill="#1a0a00" stroke="#ff6b35" strokeWidth="2" />
        <path d="M4 20l28 20L60 20" stroke="#ff6b35" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="48" cy="16" r="10" fill="#ff4757" />
        <path d="M48 11v7M48 21v1" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <rect x="44" y="14" width="8" height="2" rx="1" fill="white" opacity="0.4" />
      </svg>
    ),
    pos: { x: -80, y: -80 },
  },
  {
    id: 'files',
    label: 'Network Files',
    sublabel: 'EXECUTABLE / SCRIPTS',
    color: '#F5A706',
    detailTitle: 'NETWORK TRAFFIC ANALYSIS',
    detailText:
      'Any executable or script attempting to traverse the network boundary is intercepted. It is executed within our custom VM profiles to track API calls, registry modifications, and evasive behaviors.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="8" width="30" height="38" rx="3" fill="#1a1200" stroke="#F5A706" strokeWidth="2" />
        <path d="M30 8l10 10H30V8z" fill="#F5A706" opacity="0.5" />
        <rect x="14" y="24" width="18" height="2" rx="1" fill="#F5A706" opacity="0.7" />
        <rect x="14" y="30" width="14" height="2" rx="1" fill="#F5A706" opacity="0.5" />
        <rect x="14" y="36" width="10" height="2" rx="1" fill="#F5A706" opacity="0.3" />
        <circle cx="46" cy="44" r="10" fill="#1a1200" stroke="#F5A706" strokeWidth="2" />
        <path d="M42 44l3 3 5-6" stroke="#F5A706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    pos: { x: 540, y: -80 },
  },
  {
    id: 'usb',
    label: 'Hardware / USB',
    sublabel: 'FIRMWARE / MEDIA',
    color: '#00a3ff',
    detailTitle: 'HARDWARE & MEDIA SCAN',
    detailText:
      'Physical media introduced to secure endpoints are scanned and virtually mounted in the sandbox. This prevents zero-day autorun exploits and firmware-level malware from touching the actual OS layer.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="22" y="4" width="20" height="36" rx="4" fill="#001122" stroke="#00a3ff" strokeWidth="2" />
        <rect x="30" y="40" width="4" height="20" fill="#00a3ff" opacity="0.6" />
        <rect x="14" y="52" width="36" height="6" rx="3" fill="#001122" stroke="#00a3ff" strokeWidth="1.5" />
        <rect x="28" y="14" width="8" height="4" rx="1" fill="#00a3ff" opacity="0.6" />
        <rect x="28" y="22" width="8" height="4" rx="1" fill="#00a3ff" opacity="0.4" />
        <circle cx="32" cy="10" r="3" fill="#00a3ff" />
        <circle cx="49" cy="15" r="9" fill="#ff4757" />
        <path
          d="M49 10.5a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5v1.5h-4v-1.5c-1.2-.7-2-2-2-3.5a4 4 0 0 1 4-4z"
          fill="white"
          opacity="0.9"
        />
        <rect x="47" y="20" width="1.5" height="2" rx="0.5" fill="white" opacity="0.9" />
        <rect x="50" y="20" width="1.5" height="2" rx="0.5" fill="white" opacity="0.9" />
      </svg>
    ),
    pos: { x: -80, y: 540 },
  },
  {
    id: 'web',
    label: 'Web Documents',
    sublabel: 'PDF / OFFICE / LINKS',
    color: '#22d3ee',
    detailTitle: 'WEB & LINK ISOLATION',
    detailText:
      'Files downloaded from web gateways and malicious URLs are opened inside the Sandbox. Dynamic web isolation detects drive-by downloads and prevents them from executing on user endpoints.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="24" fill="#001a1a" stroke="#22d3ee" strokeWidth="2" />
        <path d="M32 8C24 20 24 44 32 56M32 8C40 20 40 44 32 56" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="3 2" />
        <path d="M8 32h48" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="3 2" />
        <path d="M12 20h40M12 44h40" stroke="#22d3ee" strokeWidth="1" opacity="0.4" />
        <circle cx="48" cy="16" r="9" fill="#ff4757" />
        <path d="M48 12l.8 5.6h-1.6L48 12zM48 19.5v1" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    pos: { x: 540, y: 540 },
  },
];

const SANDBOX_METRICS = [
  { label: 'API Calls', value: '2,847', color: '#F5A706', progress: 35 },
  { label: 'Network Req', value: '143', color: '#ff4757', progress: 45 },
  { label: 'Files Created', value: '37', color: '#a855f7', progress: 55 },
  { label: 'Reg. Modified', value: '12', color: '#22d3ee', progress: 65 },
];

// Feature label'lar — sandbox container'ının DIŞINDA, scene içinde 4 köşeye dağıtılmış
// Koordinatlar 600x600 scene'e göre
const FEATURE_LABELS = [
  { label: 'BEHAVIORAL ANALYSIS',  sceneX: -50, sceneY: 280, z: 80 },
  { label: 'ISOLATED EXECUTION',   sceneX: 200, sceneY: -20, z: 80 },
  { label: 'PATTERN DETECTION',    sceneX: 200, sceneY: 530, z: 80 },
  { label: 'THREAT INTELLIGENCE',  sceneX: 500, sceneY: 280, z: 80 },
];

// Status badge'leri — source node'lardan uzakta, aralarında boşluk olacak şekilde
const STATUS_BADGES = [
  { label: 'THREAT DETECTED', color: '#ff4757', sceneX: -40,  sceneY: -120, z: 60 },
  { label: 'ANALYZING...',    color: '#F5A706', sceneX: 560, sceneY: -120, z: 60 },
  { label: 'QUARANTINED',     color: '#22d3ee', sceneX: -40,  sceneY: 690, z: 60 },
  { label: 'SAFE — PASSED',   color: '#2ed573', sceneX: 560, sceneY: 690, z: 60 },
];

const getMalwareIcon = (type: string) => {
  switch (type) {
    case 'bug':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#ff4d4d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="8" y="6" width="8" height="14" rx="4" />
          <path d="M19 7l-3 2" /><path d="M5 7l3 2" /><path d="M19 19l-3-2" /><path d="M5 19l3-2" />
          <path d="M20 13h-4" /><path d="M4 13h4" /><path d="M10 4l1 2" /><path d="M14 4l-1 2" />
        </svg>
      );
    case 'trojan':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#ff4d4d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 20H5v-2l2-5V7c0-2.5 2-4 4-4h2l2 2h3v5l-1 2h2l-2 10z" />
        </svg>
      );
    case 'clean':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#00ffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <polyline points="13 2 13 9 20 9" />
          <path d="M9 15l2 2 4-4" />
        </svg>
      );
    case 'virus':
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#ff4d4d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="6" />
          <path d="M12 2v4" /><path d="M12 18v4" />
          <path d="M4.93 4.93l2.83 2.83" /><path d="M16.24 16.24l2.83 2.83" />
          <path d="M2 12h4" /><path d="M18 12h4" />
          <path d="M4.93 19.07l2.83-2.83" /><path d="M16.24 7.76l2.83-2.83" />
        </svg>
      );
  }
};

export default function SandboxAnimation() {
  const [activeSource, setActiveSource] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const filesInSandbox = [
    { id: 1, x: -70, y: -40, type: 'bug', isMalicious: true },
    { id: 2, x: 20,  y: -60, type: 'virus', isMalicious: true },
    { id: 3, x: 60,  y: 10,  type: 'trojan', isMalicious: true },
    { id: 4, x: -40, y: 50,  type: 'clean', isMalicious: false },
  ];

  useEffect(() => {
    let sourceInterval: NodeJS.Timeout | null = null;
    if (autoPlay) {
      sourceInterval = setInterval(() => {
        setActiveSource(prev => (prev + 1) % SOURCES.length);
      }, 5000);
    }
    return () => { if (sourceInterval) clearInterval(sourceInterval); };
  }, [autoPlay]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Feature label'lar için floating animasyon
      gsap.to('.feature-label-inner', {
        y: '-=8',
        yoyo: true,
        repeat: -1,
        duration: 2.5,
        stagger: 0.4,
        ease: 'sine.inOut',
      });

      // Malware icon titreşimi
      gsap.to('.malware-icon', {
        rotationY: '+=20',
        rotationX: '-=10',
        yoyo: true,
        repeat: -1,
        duration: 1.5,
        stagger: 0.3,
        ease: 'sine.inOut',
      });

      // Scan timeline
      const masterTl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

      masterTl.set('.malware-wrapper', { opacity: 1, scale: 1 });
      masterTl.set('.malware-icon', { opacity: 1, scale: 1, x: 0, y: 0, z: 0 });
      masterTl.set('.particle', { opacity: 0, x: 0, y: 0, z: 0 });
      masterTl.set('.laser-h', { y: 0, opacity: 0 });
      masterTl.set('.laser-v', { x: 0, opacity: 0 });

      const scanStartTime = 0.5;

      filesInSandbox.forEach((m, idx) => {
        const mwClass = `.malware-${m.id}`;
        const icon = `${mwClass} .malware-icon`;
        const laserH = `${mwClass} .laser-h`;
        const laserV = `${mwClass} .laser-v`;
        const particles = `${mwClass} .particle`;
        const localScanTime = scanStartTime + idx * 0.8;

        masterTl.to([laserH, laserV], { opacity: 1, duration: 0.2 }, localScanTime);
        masterTl.to(laserH, { y: 50, duration: 0.6, ease: 'sine.inOut', yoyo: true, repeat: 1 }, localScanTime);
        masterTl.to(laserV, { x: 40, duration: 0.6, ease: 'sine.inOut', yoyo: true, repeat: 1 }, localScanTime);
        masterTl.to([laserH, laserV], { opacity: 0, duration: 0.2 }, localScanTime + 1.2);

        const hitTime = localScanTime + 1.4;

        if (m.isMalicious) {
          masterTl.to(icon, { x: '+=4', y: '-=4', duration: 0.05, yoyo: true, repeat: 5 }, hitTime);
          masterTl.to(icon, { opacity: 0, scale: 0, duration: 0.1 }, hitTime + 0.3);
          masterTl.to(particles, {
            opacity: 1,
            x: () => gsap.utils.random(-80, 80),
            y: () => gsap.utils.random(-80, 80),
            z: () => gsap.utils.random(10, 80),
            rotationX: () => gsap.utils.random(0, 360),
            rotationY: () => gsap.utils.random(0, 360),
            duration: 0.7,
            ease: 'expo.out',
          }, hitTime + 0.3);
          masterTl.to(particles, { opacity: 0, duration: 0.4 }, hitTime + 0.9);
        } else {
          masterTl.to(icon, { boxShadow: '0 0 30px rgba(0,255,255,1)', borderColor: '#00ffff', duration: 0.3 }, hitTime);
          masterTl.to(icon, { z: '+=40', y: '-=20', duration: 0.5, ease: 'back.out(1.5)' }, hitTime + 0.2);
          masterTl.to(icon, { x: '+=100', opacity: 0, scale: 0.5, duration: 0.6, ease: 'power2.in' }, hitTime + 0.7);
        }
      });
    }, containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.overTitle}>MULTI-VECTOR THREAT ANALYSIS</p>
        <h2 className={styles.title}>
          Every Channel. <span className={styles.highlight}>One Sandbox.</span>
        </h2>
        <p className={styles.subtitle}>
          DFX Malware Mitigation Sandbox receives files from all attack vectors simultaneously, detonates them in
          isolated virtual environments, and delivers real-time verdicts.
        </p>
      </div>

      <div className={styles.swipeContainer}>
        <div className={styles.scene} ref={containerRef}>
          <div className={styles.sceneGrid} />

          {/* SVG Connecting Lines */}
          <svg className={styles.svgOverlay} viewBox="0 0 600 600">
            {SOURCES.map((src, i) => {
              const cx = 300, cy = 300;
              return (
                <g key={`path-${src.id}`}>
                  <line
                    x1={src.pos.x + 70} y1={src.pos.y + 70}
                    x2={cx} y2={cy}
                    stroke={src.color}
                    strokeWidth="2"
                    strokeOpacity={activeSource === i ? 0.8 : 0.2}
                    strokeDasharray="8 4"
                    style={{ transition: 'stroke-opacity 0.5s' }}
                  />
                  <circle r="6" fill={src.color} opacity={activeSource === i ? 1 : 0.3}>
                    <animateMotion dur={`${2 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.4}s`}>
                      <mpath href={`#line-${src.id}`} />
                    </animateMotion>
                  </circle>
                  <path id={`line-${src.id}`} d={`M ${src.pos.x + 70} ${src.pos.y + 70} L ${cx} ${cy}`} fill="none" />
                </g>
              );
            })}
          </svg>

          {/* Source Nodes */}
          {SOURCES.map((src, i) => (
            <div
              key={src.id}
              onClick={() => { setActiveSource(i); setAutoPlay(false); }}
              className={`${styles.sourceNode} ${activeSource === i ? styles.sourceActive : ''}`}
              style={{ left: src.pos.x, top: src.pos.y, '--node-color': src.color } as React.CSSProperties}
            >
              <div className={styles.sourceIcon}>{src.icon}</div>
              <div className={styles.sourceLabel}>{src.label}</div>
              <div className={styles.sourceSublabel}>{src.sublabel}</div>
            </div>
          ))}

          {/* Central Sandbox */}
          <div className={styles.sandboxContainer}>
            <div className={styles.sandboxFloor} />
            <div className={`${styles.wall} ${styles.wallTop}`} />
            <div className={`${styles.wall} ${styles.wallBottom}`} />
            <div className={`${styles.wall} ${styles.wallLeft}`} />
            <div className={`${styles.wall} ${styles.wallRight}`} />

            <div className={styles.sandboxText}>
              <h3>MALWARE MITIGATION</h3>
              <p>SANDBOX</p>
            </div>

            {/* Malware items */}
            {filesInSandbox.map(m => (
              <div
                key={`mw-${m.id}`}
                className={`${styles.fileWrapper} malware-wrapper malware-${m.id}`}
                style={{ transform: `translate(${130 + m.x}px, ${130 + m.y}px) translateZ(10px)` }}
              >
                <div className={`${styles.fileIcon} ${m.isMalicious ? styles.maliciousFile : styles.cleanFile} malware-icon`}>
                  {getMalwareIcon(m.type)}
                  <div className={`${styles.malwareLaserHorizontal} laser-h`} />
                  <div className={`${styles.malwareLaserVertical} laser-v`} />
                </div>
                {m.isMalicious && (
                  <div className={styles.particleContainer}>
                    {Array.from({ length: 25 }).map((_, pIdx) => (
                      <div key={`p-${pIdx}`} className={`${styles.particle} particle`} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ✅ FİX: Feature Labels — sandbox dışında, scene'in 4 köşesine dağıtılmış */}
          {FEATURE_LABELS.map((feature, idx) => (
            <div
              key={`feature-${idx}`}
              className={styles.featureLabel}
              style={{
                position: 'absolute',
                left: feature.sceneX,
                top: feature.sceneY,
                transform: `translateZ(${feature.z}px)`,
              }}
            >
              <div className={`feature-label-inner ${styles.featureLabelInner}`}>
                <span className={styles.featureLabelText}>{feature.label}</span>
              </div>
            </div>
          ))}

          {/* ✅ FİX: Status Badges — source node'lardan uzakta, çakışma yok */}
          {STATUS_BADGES.map((badge, idx) => (
            <div
              key={`badge-${idx}`}
              className={styles.metricBadge}
              style={{
                position: 'absolute',
                left: badge.sceneX,
                top: badge.sceneY,
                transform: `translateZ(${badge.z}px) rotateZ(45deg) rotateX(-60deg)`,
              }}
            >
              <span className={styles.badgeDot} style={{ background: badge.color }} />
              {badge.label}
            </div>
          ))}
        </div>
      </div>

      {/* Metrics Footer */}
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
