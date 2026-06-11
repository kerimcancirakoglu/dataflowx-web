'use client';

import { useRef, useEffect } from 'react';
import styles from './Product.module.css';

const FEATURES = [
  'Uncompromising Zero Trust architecture for Industry 4.0 and IoT integrations.',
  'Secure IT/OT data flow without halting critical operations.',
  '100% compliance with international critical infrastructure standards.',
];

export default function Product() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      gsap.from('[data-product-animate]', {
        opacity: 0,
        y: 40,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    };

    initGSAP();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="product">
      <div className={styles.inner}>
        {/* Left: text */}
        <div className={styles.left}>
          <h2 className={`display-lg ${styles.title}`} data-product-animate>
            Accelerate <span style={{ whiteSpace: 'nowrap', color: '#F5A706' }}>Digital Transformation</span><br /> with Hardware-Enforced Armor
          </h2>



          <div className={styles.features} data-product-animate>
            {FEATURES.map((feature, idx) => (
              <div key={idx} className={styles.featureRow}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.featureIcon}>
                  <circle cx="14" cy="14" r="14" fill="#F5A623" />
                  <path d="M8 14.5L12 18.5L20 10.5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className={styles.featureText}>{feature}</span>
              </div>
            ))}
          </div>

          <a href="#solutions" className={`btn-pill ${styles.cta}`} data-product-animate>
            EXPLORE TRANSFORMATION SOLUTIONS ➔
          </a>
        </div>

        {/* Right: visual/cards */}
        <div className={styles.right}>
          <div className={styles.cardsWrapper}>
            <div className={styles.infoCard} data-product-animate>
              <div className={styles.cardHeader}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F5A706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                </svg>
                <h3>IT/OT Convergence</h3>
              </div>
              <p>Bridge enterprise networks with industrial systems seamlessly without exposing critical assets to the internet.</p>
            </div>

            <div className={styles.infoCard} data-product-animate>
              <div className={styles.cardHeader}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F5A706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
                <h3>Smart Factory Enablement</h3>
              </div>
              <p>Safely extract big data from PLCs and SCADA for real-time analytics and predictive maintenance.</p>
            </div>

            <div className={styles.infoCard} data-product-animate>
              <div className={styles.cardHeader}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F5A706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <h3>Rapid Compliance</h3>
              </div>
              <p>Exceed NERC CIP, IEC 62443, and NIST standards out-of-the-box with hardware-enforced guarantees.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
