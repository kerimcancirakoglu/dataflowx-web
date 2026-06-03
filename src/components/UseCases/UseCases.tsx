'use client';

import { useRef, useEffect } from 'react';
import styles from './UseCases.module.css';

const CASES = [
  {
    id: '01',
    headline: 'Defense & Classified',
    description: 'Physically irreversible, leak-proof data movement across classified network boundaries.',
    image: '/svgler/server.svg',
    glowColor: '#00B4FF',
  },
  {
    id: '02',
    headline: 'Energy & Infrastructure',
    description: 'A secure pipeline guaranteeing 100% isolation for OT networks and critical energy flows.',
    image: '/svgler/trafoyeni.svg',
    glowColor: '#FFFFFF',
  },
  {
    id: '03',
    headline: 'Crypto & Finance',
    description: 'Zero-risk data signing and secure asset transfer within an isolated air-gapped core.',
    image: '/svgler/walletcrypto.svg',
    glowColor: '#FFD700',
  },
  {
    id: '04',
    headline: 'Industry & Manufacturing',
    description: 'Uninterrupted production data securely bridging the physical air-gap between OT and IT layers.',
    image: '/svgler/robot.svg',
    glowColor: '#F5A706',
  },
];

export default function UseCases() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const steps = sectionRef.current?.querySelectorAll('[data-step]');
      if (!steps || steps.length === 0) return;

      gsap.from(steps, {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.2, // Faster initial reveal
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
    <section ref={sectionRef} className={styles.section} id="use-cases">
      <div className={styles.inner}>
        <div className={styles.title}>
          <h2 className="display-lg" style={{ margin: 0 }}>
            Tailored Protection for High<br />Stakes Industries
          </h2>
          <p className="body-text" style={{ marginTop: '20px', fontSize: '1.5rem', fontWeight: 500, color: '#F5A706' }}>
            Use Cases
          </p>
        </div>

        <div className={styles.flow}>
          {/* Background Connecting Path */}
          <div className={styles.pathContainer}>
            <div className={styles.dataPacket} />
          </div>

          {CASES.map((c, i) => (
            <div key={c.id} className={styles.stepWrapper} data-step>

              <div
                className={styles.card}
                style={{
                  '--glow-color': c.glowColor,
                  '--glow-delay': `${-0.056 + i * 0.937}s`
                } as React.CSSProperties}
              >
                {/* Isometric Area */}
                <div className={styles.pedestalArea}>
                  <div className={styles.pedestal} />
                  <div className={styles.iconFloat}>
                    <img src={c.image} alt={c.headline} />
                  </div>
                </div>

                {/* Text Area */}
                <div className={styles.textContent}>
                  <span className={styles.stepId}>{c.id}</span>
                  <h3 className={styles.stepHeadline}>{c.headline}</h3>
                  <p className={styles.stepDesc}>{c.description}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
