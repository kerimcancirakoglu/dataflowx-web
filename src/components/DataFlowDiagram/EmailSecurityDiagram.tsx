'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './EmailSecurityDiagram.module.css';

export default function EmailSecurityDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mails = gsap.utils.toArray<HTMLElement>('.mail-wrapper');
      const masterTl = gsap.timeline({ repeat: -1 });

      mails.forEach((mail, i) => {
        const isMalicious = mail.dataset.type === 'malicious';
        // Kırmızı mailler 20px, Mavi mailler -20px y ekseninden çıkıyor
        const startY = isMalicious ? 20 : -20;
        const mailTl = gsap.timeline();

        // Başlangıç noktası (Tam kaynak ikonlarının üstü)
        mailTl.set(mail, { x: -340, y: startY, opacity: 0, scale: 0.5 });

        // Belirme ve yola çıkış (Filtrelerin merkezine X=0'a gelip durur)
        mailTl
          .to(mail, { opacity: 1, scale: 1, duration: 0.5 })
          .to(
            mail,
            {
              x: 0, // Filtrelerin tam ortasında durur
              y: 0, 
              duration: 2.5,
              ease: 'power2.inOut',
            },
            '<'
          );

        // --- ANALİZ AŞAMASI (Lazer Taraması) ---
        const laser = mail.querySelector('.mail-laser');
        
        // Lazer belirir
        mailTl.to(laser, { opacity: 1, duration: 0.2 });
        
        // Lazer aşağı yukarı tarar (mailin boyutu boyunca, örn 60px)
        mailTl.to(laser, { 
          y: 60, 
          duration: 0.6, 
          ease: 'sine.inOut', 
          yoyo: true, 
          repeat: 1 
        });
        
        // Lazer kaybolur
        mailTl.to(laser, { opacity: 0, duration: 0.2 });

        // --- SONUÇ AŞAMASI ---
        if (isMalicious) {
          // Filtrelere çarpma efekti
          mailTl
            .to(mail, {
              x: -15, // Hafif geri seker
              y: `+=${Math.random() > 0.5 ? 15 : -15}`,
              z: `+=${Math.random() > 0.5 ? 10 : -10}`,
              rotationZ: Math.random() > 0.5 ? 25 : -25,
              duration: 0.4,
              ease: 'power1.out',
            })
            // Karantinaya sevk
            .to(mail, { y: 160, x: 0, rotationZ: 0, duration: 2.0, ease: 'power2.inOut' }, '+=0.2')
            // Karantinada bekleme ve silinme
            .to(mail, { opacity: 0, scale: 0, duration: 0.5 }, '+=2.0');
        } else {
          // Temiz mailler yolu tamamlayıp kaybolur
          mailTl.to(mail, { 
             x: 350, 
             duration: 2.5, 
             ease: 'power2.inOut' 
          })
          .to(mail, { opacity: 0, scale: 0, duration: 0.6, ease: 'power1.in' }, '-=0.6');
        }

        masterTl.add(mailTl, i * 4.0);
      });

      // Filtrelerin nefes alma animasyonu
      gsap.to('.filter-layer', {
        x: '+=6',
        yoyo: true,
        repeat: -1,
        duration: 2,
        stagger: 0.15,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const mailItems = [
    { id: 1, type: 'clean' },
    { id: 2, type: 'malicious' },
    { id: 3, type: 'clean' },
    { id: 4, type: 'malicious' },
  ];

  const filters = [
    { offset: -60, label: 'SPAM' },
    { offset: -30, label: 'PHISHING' },
    { offset: 0, label: 'MALWARE' },
    { offset: 30, label: 'YARA / CDR' },
    { offset: 60, label: 'BEHAVIOR' },
  ];

  // Statik Kaynak İkonu Bileşeni
  const SourceIcon = ({ color }: { color: string }) => (
    <svg width="40" height="30" viewBox="0 0 24 24" style={{ transform: 'rotateY(90deg)' }}>
      <path
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z"
        fill={color}
        opacity={0.2}
      />
      <rect x="3" y="5" width="18" height="14" rx="2" stroke={color} strokeWidth="1" fill="none" />
      <path d="M3 7l9 6 9-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.scene}>

        {/* Floor & Paths */}
        <div className={styles.floor} />
        <div className={styles.pathMain} />
        <div className={styles.pathQuarantine} />

        {/* Quarantine Zone */}
        <div className={styles.quarantineZone}>Quarantine</div>

        {/* ── Kaynak İkonları (Mails Start Here) ─────────────────────────── */}
        {/* Mavi Kaynak */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translateX(-340px) translateY(-20px) translateZ(40px)',
            transformStyle: 'preserve-3d',
            filter: 'drop-shadow(0 5px 10px rgba(0, 255, 255, 0.5))',
          }}
        >
          <SourceIcon color="#00ffff" />
        </div>

        {/* Kırmızı Kaynak */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translateX(-340px) translateY(20px) translateZ(40px)',
            transformStyle: 'preserve-3d',
            filter: 'drop-shadow(0 5px 10px rgba(255, 77, 77, 0.5))',
          }}
        >
          <SourceIcon color="#ff4d4d" />
        </div>

        {/* ── Katman Katman Cam Filtreler ───────────────────────────────────── */}
        {filters.map((filter, index) => (
          <div
            key={`filter-${index}`}
            className="filter-layer"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: `translateX(${filter.offset}px) translateZ(70px)`,
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className={styles.filterLayer}
              style={{
                transform: 'rotateY(-90deg)', // -90deg makes the text face the camera (left) so it's not backwards
                backdropFilter: 'none',
                WebkitBackdropFilter: 'none',
                background: 'linear-gradient(135deg, rgba(64, 156, 255, 0.05) 0%, rgba(13, 33, 90, 0.15) 100%)',
                border: '1px solid rgba(120, 210, 255, 0.3)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingTop: '12px' // Moved down a bit
              }}
            >
              {/* Cama kazınmış lazer yazı efekti */}
              <span style={{
                color: 'rgba(255, 255, 255, 0.95)', // Beyaz yaparak okunabilirliği artırdık
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textShadow: '0 0 8px rgba(0, 255, 255, 0.8), 0 0 15px rgba(0, 255, 255, 0.5)', // Daha güçlü parlama
                whiteSpace: 'nowrap',
              }}>
                {filter.label}
              </span>
            </div>
          </div>
        ))}

        {/* ── Uçan Mailler ─────────────────────────────────────────────────── */}
        {mailItems.map((mail) => (
          <div
            key={`mail-${mail.id}`}
            className="mail-wrapper"
            data-type={mail.type}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translateX(-340px) translateZ(40px)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className={styles.mail} style={{ transform: 'rotateY(90deg)' }}>
              {/* Lazer Tarama Efekti İçin Gizli Element */}
              <div className={`${styles.mailLaser} mail-laser`} />
              
              <svg viewBox="0 0 24 24" fill={mail.type === 'malicious' ? '#ff4d4d' : '#00ffff'}>
                <path
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z"
                  opacity={mail.type === 'malicious' ? 0.3 : 0.6}
                />
                <path
                  d="M3 7l9 6 9-6"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                  stroke={mail.type === 'malicious' ? '#ff4d4d' : '#ffffff'}
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
