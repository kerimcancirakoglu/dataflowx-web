'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './KioskDiagram.module.css';

export default function KioskDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !particlesRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

      // 1. USB bellek yuvaya girer (Sağdan sola)
      tl.to('.usb-drive', {
        x: -55, // Yuvaya tam oturacak kadar kaydır
        duration: 1.5,
        ease: 'power2.out',
      });

      // 2. Ekranda lazer taraması başlar
      tl.to('.laser', {
        opacity: 1,
        duration: 0.2,
      }).to('.laser', {
        top: '100%',
        duration: 1.5,
        yoyo: true,
        repeat: 1,
        ease: 'none',
      });

      // 3. Zararlı partiküller USB'den ekrana doğru uçuşur ve ekranda kaybolur
      // USB'nin tahmini koordinatları (imageWrapper'a göre):
      // USB port: right: ~0%, top: 48.5%
      // Ekran merkezi: left: 50%, top: 25%
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = styles.particle;
        particlesRef.current?.appendChild(particle);

        const delay = 1.5 + (i * 0.1); // Lazer başladığında başlasın

        gsap.fromTo(particle, 
          {
            // Başlangıç: USB portunun olduğu yer (Sağ orta)
            right: '10%',
            top: '48%',
            opacity: 0,
            scale: 0.5
          },
          {
            // Hedef: Ekranın merkezi
            right: '40%', // sağdan sola doğru uçacak
            top: '25%', // yukarı doğru uçacak
            opacity: 1,
            scale: 1.5,
            duration: 0.8,
            delay: delay,
            ease: 'power1.inOut',
            onComplete: () => {
              // Ekrana çarpınca parçalanıp yok olma efekti
              gsap.to(particle, {
                opacity: 0,
                scale: 0,
                duration: 0.2
              });
            }
          }
        );
      }

      // 4. Lazer bittikten ve zararlılar temizlendikten sonra
      tl.to('.usb-icon', {
        color: '#00B4FF', // Güvenli maviye döner
        duration: 0.5,
      }, '+=1.5'); // Partiküllerin bitmesini bekle

      tl.to('.usb-body', {
        backgroundColor: '#0a192f',
        borderColor: '#00B4FF',
        duration: 0.5,
      }, '<'); // İkonla aynı anda

      // 5. USB bellek temizlenmiş olarak geri çıkar
      tl.to('.usb-drive', {
        x: 0,
        opacity: 0, // Dışarı çıkınca yavaşça kaybolsun
        duration: 1.5,
        ease: 'power2.in',
      }, '+=1');

      // Reset for next loop
      tl.set('.usb-drive', { opacity: 1 });
      tl.set('.usb-icon', { color: '#ff3333' });
      tl.set('.usb-body', { backgroundColor: '#111', borderColor: 'transparent' });
      tl.set('.laser', { top: 0, opacity: 0 });
      
    }, containerRef);

    return () => {
      ctx.revert();
      if (particlesRef.current) {
        particlesRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.imageWrapper}>
        <img src="/kiosk.png" alt="DataFlowX Kiosk" className={styles.kioskImage} />
        
        {/* USB Bellek */}
        <div className={`${styles.usbDrive} usb-drive`}>
          <div className={styles.usbConnector}></div>
          <div className={`${styles.usbBody} usb-body`}>
            <svg className={`${styles.usbIcon} usb-icon`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20"></path>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
        </div>

        {/* Ekran Tarama Alanı */}
        <div className={styles.screenArea}>
          <div className={`${styles.laser} laser`}></div>
        </div>

        {/* Partiküller */}
        <div className={styles.particlesContainer} ref={particlesRef}></div>
      </div>
    </div>
  );
}
