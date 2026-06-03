'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // GSAP fade-in from darkness
    const initGSAP = async () => {
      const { gsap } = await import('gsap');

      const elements = [
        headlineRef.current,
        subRef.current,
        ctaRef.current,
        labelsRef.current,
      ].filter(Boolean);

      gsap.set(elements, { opacity: 0 });

      gsap.to(elements, {
        opacity: 1,
        duration: 1.6,
        stagger: 0.25,
        ease: 'power2.out',
        delay: 0.5,
      });
    };

    initGSAP();
  }, []);

  return (
    <section className={styles.hero} id="hero">
      {/* TX / RX channel labels */}
      <div ref={labelsRef} className={styles.channelLabels}>
      </div>

      {/* Hero content */}
      <div className={styles.content}>

        <h1 ref={headlineRef} className={`display-xl ${styles.headline}`}>
          Precision Defense for<br />
          <span className={styles.highlightText}>Critical IT/OT Networks</span>
        </h1>

        <p ref={subRef} className={`body-text ${styles.subheadline}`}>
          Harden the perimeter of mission-critical IT and OT environments with an integrated suite of hardware-enforced cybersecurity solutions. Eliminate the attack surface while maintaining seamless operational flow.
        </p>

        <div ref={ctaRef} className={styles.cta}>
          <a href="#product" className="btn-pill">
            Get Information
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
