'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './SandboxDiagram.module.css';

export default function SandboxDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Kum havuzunda bekleyen dosyalar
  const filesInSandbox = [
    { id: 1, x: -60, y: 10, type: 'bug', isMalicious: true },
    { id: 2, x: 0, y: -20, type: 'virus', isMalicious: true },
    { id: 3, x: 50, y: 10, type: 'trojan', isMalicious: true },
    { id: 4, x: -20, y: 40, type: 'clean', isMalicious: false },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hologram ikonlarının hafifçe süzülmesi
      gsap.to('.hologram-icon', {
        y: '-=10',
        yoyo: true,
        repeat: -1,
        duration: 2,
        stagger: 0.2,
        ease: 'sine.inOut'
      });

      // Özellik etiketlerinin hafifçe süzülmesi
      gsap.to('.feature-label-inner', {
        y: '-=8',
        yoyo: true,
        repeat: -1,
        duration: 2.5,
        stagger: 0.3,
        ease: 'sine.inOut'
      });

      // Zararlı ikonların kendi etrafında yavaşça dönmesi/hareket etmesi (canlı hissi)
      gsap.to('.malware-icon', {
        rotationY: '+=20',
        rotationX: '-=10',
        yoyo: true,
        repeat: -1,
        duration: 1.5,
        stagger: 0.3,
        ease: 'sine.inOut'
      });

      const masterTl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
      
      // 1. Durumları Sıfırla
      masterTl.set('.malware-wrapper', { opacity: 1, scale: 1 });
      masterTl.set('.malware-icon', { opacity: 1, scale: 1, x: 0, y: 0, z: 0 });
      masterTl.set('.particle', { opacity: 0, x: 0, y: 0, z: 0 });
      masterTl.set('.laser-h', { y: 0, opacity: 0 });
      masterTl.set('.laser-v', { x: 0, opacity: 0 });
      
      // Toplu tarama başlangıcı
      const scanStartTime = 0.5;

      filesInSandbox.forEach((m, idx) => {
        const mwClass = `.malware-${m.id}`;
        const icon = `${mwClass} .malware-icon`;
        const laserH = `${mwClass} .laser-h`;
        const laserV = `${mwClass} .laser-v`;
        const particles = `${mwClass} .particle`;
        
        // Zararlılar hafif aralıklarla taranmaya başlar (sıralı efekt için)
        const localScanTime = scanStartTime + (idx * 0.8);

        // Lazerler Belirir
        masterTl.to([laserH, laserV], { opacity: 1, duration: 0.2 }, localScanTime);

        // Yatay Lazer (Yukarıdan aşağı) ve Dikey Lazer (Soldan sağa) tarar
        masterTl.to(laserH, { y: 50, duration: 0.6, ease: 'sine.inOut', yoyo: true, repeat: 1 }, localScanTime);
        masterTl.to(laserV, { x: 40, duration: 0.6, ease: 'sine.inOut', yoyo: true, repeat: 1 }, localScanTime);

        // Lazer Kaybolur
        masterTl.to([laserH, laserV], { opacity: 0, duration: 0.2 }, localScanTime + 1.2);

        // Tarama bitişinde titreme ve PATLAMA!
        const hitTime = localScanTime + 1.4;

        if (m.isMalicious) {
          // Zararlı Dosya: Titreme ve PATLAMA!
          masterTl.to(icon, {
            x: '+=4', y: '-=4', duration: 0.05, yoyo: true, repeat: 5
          }, hitTime);

          masterTl.to(icon, { 
            opacity: 0, scale: 0, duration: 0.1 
          }, hitTime + 0.3);
          
          // Partiküller etrafa saçılır
          masterTl.to(particles, {
            opacity: 1,
            x: () => gsap.utils.random(-80, 80),
            y: () => gsap.utils.random(-80, 80),
            z: () => gsap.utils.random(10, 80),
            rotationX: () => gsap.utils.random(0, 360),
            rotationY: () => gsap.utils.random(0, 360),
            duration: 0.7,
            ease: 'expo.out'
          }, hitTime + 0.3);

          // Partiküller yavaşça kaybolur
          masterTl.to(particles, { 
            opacity: 0, duration: 0.4 
          }, hitTime + 0.9);
        } else {
          // Temiz Dosya: Başarıyla geçer (Yeşilimsi mavi parlar, yukarı çıkar ve sistemden ayrılır)
          masterTl.to(icon, { 
            boxShadow: '0 0 30px rgba(0, 255, 255, 1)', 
            borderColor: '#00ffff',
            duration: 0.3 
          }, hitTime);
          
          masterTl.to(icon, { 
            z: '+=40', 
            y: '-=20',
            duration: 0.5, 
            ease: 'back.out(1.5)' 
          }, hitTime + 0.2);

          masterTl.to(icon, { 
            x: '+=100', 
            opacity: 0, 
            scale: 0.5,
            duration: 0.6, 
            ease: 'power2.in' 
          }, hitTime + 0.7);
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Hologram ikonları (AI, Kullanıcılar, Bulut vs.)
  const holograms = [
    { x: -100, y: -60, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg> },
    { x: 0, y: -80, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    { x: 100, y: -60, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> }
  ];

  // Sandbox Özellikleri (DSX Draft'tan)
  const features = [
    { label: 'BEHAVIORAL ANALYSIS', x: 0, y: 0, z: 160 },
    { label: 'ISOLATED EXECUTION', x: 0, y: 0, z: 130 },
    { label: 'PATTERN DETECTION', x: 0, y: 0, z: 100 },
    { label: 'THREAT INTELLIGENCE', x: 0, y: 0, z: 70 },
  ];

  const getMalwareIcon = (type: string) => {
    switch(type) {
      case 'bug':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ff4d4d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="8" y="6" width="8" height="14" rx="4"/><path d="M19 7l-3 2"/><path d="M5 7l3 2"/><path d="M19 19l-3-2"/><path d="M5 19l3-2"/><path d="M20 13h-4"/><path d="M4 13h4"/><path d="M10 4l1 2"/><path d="M14 4l-1 2"/>
          </svg>
        );
      case 'trojan':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ff4d4d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 20H5v-2l2-5V7c0-2.5 2-4 4-4h2l2 2h3v5l-1 2h2l-2 10z"/>
          </svg>
        );
      case 'clean':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="#00ffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
            <polyline points="13 2 13 9 20 9"></polyline>
            <path d="M9 15l2 2 4-4"></path>
          </svg>
        );
      case 'virus':
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ff4d4d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="6"/><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/>
          </svg>
        );
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.scene}>
        
        {/* Background Grid */}
        <div className={styles.floor} />

        {/* Kum Havuzu Kutusu */}
        <div className={styles.sandboxContainer}>
          {/* İç Zemin (Kırmızı Grid) */}
          <div className={styles.sandboxFloor} />
          
          {/* Duvarlar */}
          <div className={`${styles.wall} ${styles.wallTop}`} />
          <div className={`${styles.wall} ${styles.wallBottom}`} />
          <div className={`${styles.wall} ${styles.wallLeft}`} />
          <div className={`${styles.wall} ${styles.wallRight}`} />
          
          {/* İçerideki Zararlılar (Malwares) */}
          {filesInSandbox.map((m) => (
            <div 
              key={`mw-${m.id}`} 
              className={`${styles.fileWrapper} malware-wrapper malware-${m.id}`}
              style={{ transform: `translate(${m.x}px, ${m.y}px) translateZ(10px)` }}
            >
              {/* Zararlı İkonu */}
              <div 
                className={`${styles.fileIcon} ${m.isMalicious ? styles.maliciousFile : styles.cleanFile} malware-icon`} 
                style={{ background: m.isMalicious ? 'rgba(20, 5, 5, 0.9)' : 'rgba(5, 15, 20, 0.9)' }}
              >
                {getMalwareIcon(m.type)}
                {/* İkonlara Özel Dikey ve Yatay Lazerler */}
                <div 
                  className={`${styles.malwareLaserHorizontal} laser-h`} 
                  style={{ background: m.isMalicious ? '#ff4d4d' : '#00ffff', boxShadow: m.isMalicious ? '0 0 10px #ff4d4d' : '0 0 10px #00ffff' }}
                />
                <div 
                  className={`${styles.malwareLaserVertical} laser-v`} 
                  style={{ background: m.isMalicious ? '#ff4d4d' : '#00ffff', boxShadow: m.isMalicious ? '0 0 10px #ff4d4d' : '0 0 10px #00ffff' }}
                />
              </div>

              {/* Parçacıklar (Sadece zararlıysa oluşur) */}
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

        {/* ── Yüzen Özellik Etiketleri (DSX Draft) ── */}
        {features.map((feature, idx) => (
          <div
            key={`feature-${idx}`}
            className="feature-label"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: `translateX(${feature.x}px) translateY(${feature.y}px) translateZ(${feature.z}px)`,
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="feature-label-inner"
              style={{
                transform: 'rotateX(-90deg)', // Kameraya doğru dik durmasını sağlar
                background: 'linear-gradient(135deg, rgba(64, 156, 255, 0.05) 0%, rgba(13, 33, 90, 0.15) 100%)',
                border: '1px solid rgba(120, 210, 255, 0.3)',
                borderRadius: '6px',
                padding: '6px 14px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 0 10px rgba(46, 138, 255, 0.1) inset, 0 5px 15px rgba(0, 0, 0, 0.3)',
                transformStyle: 'preserve-3d',
              }}
            >
              <span style={{
                color: 'rgba(255, 255, 255, 0.95)',
                fontSize: '10px',
                fontWeight: 800,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textShadow: '0 0 8px rgba(0, 255, 255, 0.8), 0 0 15px rgba(0, 255, 255, 0.5)',
                whiteSpace: 'nowrap',
              }}>
                {feature.label}
              </span>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
