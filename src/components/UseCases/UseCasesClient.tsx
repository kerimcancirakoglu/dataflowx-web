'use client';
import React from 'react';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import styles from './UseCases.module.css';


export default function UseCasesClient({ t }: { t: any }) {
  const locale = useLocale();
  const CASES = [
    {
      id: '01',
      headline: t.c1.headline,
      description: t.c1.description,
      image: '/svgler/server.svg',
      glowColor: '#00B4FF',
      url: '/resources?type=Use+Case',
    },
    {
      id: '02',
      headline: t.c2.headline,
      description: t.c2.description,
      image: '/svgler/trafoyeni.svg',
      glowColor: '#FFFFFF',
      url: '/resources?type=Use+Case',
    },
    {
      id: '03',
      headline: t.c3.headline,
      description: t.c3.description,
      image: '/svgler/walletcrypto.svg',
      glowColor: '#FFD700',
      url: '/resources?type=Use+Case',
    },
    {
      id: '04',
      headline: t.c4.headline,
      description: t.c4.description,
      image: '/svgler/robot.svg',
      glowColor: '#F5A706',
      url: '/resources?type=Use+Case',
    },
  ];

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
            {t.title.split('\n').map((line: string, i: number) => <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>)}
          </h2>
          <p className="body-text" style={{ marginTop: '20px', fontSize: '1.5rem', fontWeight: 500, color: '#F5A706' }}>
            {t.subtitle}
          </p>
        </div>

        <div className={styles.flow}>
          {/* Background Connecting Path */}
          <div className={styles.pathContainer}>
            <div className={styles.dataPacket} />
          </div>

          {CASES.map((c, i) => (
            <div key={c.id} className={styles.stepWrapper} data-step>

              <Link
                href={`/${locale}${c.url}`}
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
                    <Image src={c.image} alt={c.headline} width={120} height={120} style={{ width: '100%', height: 'auto' }} />
                  </div>
                </div>

                {/* Text Area */}
                <div className={styles.textContent}>
                  <span className={styles.stepId}>{c.id}</span>
                  <h3 className={styles.stepHeadline}>{c.headline}</h3>
                  <p className={styles.stepDesc}>{c.description}</p>
                </div>
              </Link>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
