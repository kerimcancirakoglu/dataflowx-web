'use client';

import { useRef, useEffect } from 'react';
import styles from './Product.module.css';

const FEATURES = [
  'Built on the principle of "Never Trust, Always Verify."',
  'High-level network isolation and uncompromising data protection.',
  'Fully aligned with international critical infrastructure standards.',
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
            <span style={{ whiteSpace: 'nowrap' }}>Hardware-Enforced</span> Cyber-Physical Protection
          </h2>
          <p className={`body-text ${styles.desc}`} data-product-animate>
            Founded in 2014, DataFlowX is a pioneer in securing critical infrastructures across energy, defense, and manufacturing sectors. Our next-generation platforms go beyond traditional software firewalls by delivering EAL4+ certified, hardware-enforced isolation. By physically separating your operational technology (OT) from external IT networks, we safeguard your cyber-physical systems against sophisticated threats—ensuring resilient, uninterrupted operations with an architecture that is mathematically proven to be unbreachable and tamper-proof.
          </p>

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

          <a href="#contact" className={`btn-pill ${styles.cta}`} data-product-animate>
            Learn More About Us ➔
          </a>
        </div>
      </div>
    </section>
  );
}
