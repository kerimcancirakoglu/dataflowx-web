'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import styles from './HowItWorks.module.css';


export default function HowItWorksClient({ t }: { t: any }) {
  const locale = useLocale();
  const CARDS = [
    {
      id: 'network',
      title: t.network.title,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6h16v10H4V6z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
      image: '/Kapak/networksecurity.png',
      overlay: 'linear-gradient(to bottom, rgba(0, 15, 40, 0.2) 0%, rgba(0, 5, 20, 0.92) 100%)',
      description: t.network.description,
      links: [
        { text: t.network.l1, url: '/unidirectional-gateway' },
        { text: t.network.l2, url: '/secure-remote-access' }
      ]
    },
    {
      id: 'file',
      title: t.file.title,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <polyline points="13 2 13 9 20 9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      ),
      image: '/cyber-security-concept-digital-art.jpg',
      overlay: 'linear-gradient(to bottom, rgba(20, 10, 5, 0.6) 0%, rgba(10, 5, 0, 0.95) 100%)',
      description: t.file.description,
      links: [
        { text: t.file.l1, url: '/sandbox' },
        { text: t.file.l2, url: '/media-transfer-station' }
      ]
    },
    {
      id: 'email',
      title: t.email.title,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 7l8 5 8-5M4 7v10h16V7H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      ),
      image: '/Kapak/pexels-rsantos1232-3888149-scaled.jpg',
      overlay: 'linear-gradient(to bottom, rgba(10, 20, 30, 0.2) 0%, rgba(0, 5, 15, 0.92) 100%)',
      description: t.email.description,
      links: [
        { text: t.email.l1, url: '/email-security-platform' },
        { text: t.email.l2, url: '/intelroom' },
        { text: t.email.l3, url: '/dfx-cdr' }
      ]
    },
    {
      id: 'ot',
      title: t.ot.title,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      ),
      image: '/Kapak/forex-trading-setup.jpg',
      overlay: 'linear-gradient(to bottom, rgba(5, 10, 20, 0.35) 0%, rgba(0, 5, 15, 0.94) 100%)',
      description: t.ot.description,
      links: [
        { text: t.ot.l1, url: '/portx' }
      ]
    }
  ];

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const cards = sectionRef.current?.querySelectorAll('[data-animate]');
      if (!cards) return;

      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 1,
          delay: i * 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        });
      });
    };

    initGSAP();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="how-it-works">
      <div className={styles.inner}>
        <h2 className={`display-lg ${styles.title}`} data-animate>
          {t.titlePrefix}<br />
          <span style={{ color: '#F5A706', fontSize: '1.15em', fontWeight: 800 }}>{t.titleHighlight}</span>
        </h2>
        <p className="body-text" data-animate style={{ marginTop: '24px', marginBottom: '48px', fontSize: '1.25rem', opacity: 0.8, maxWidth: '600px' }}>
          {t.subtitle}
        </p>

        <div className={styles.grid}>
          {CARDS.map((card) => (
            <div key={card.id} className={styles.card} data-animate>
              <div
                className={styles.cardBg}
                style={{ backgroundImage: `url('${card.image}')` }}
              />
              <div
                className={styles.cardOverlay}
                style={{ background: card.overlay }}
              />

              <div className={styles.cardContent}>
                <div className={styles.iconWrapper}>
                  {card.icon}
                </div>

                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={`body-text ${styles.cardDesc}`}>
                  {card.description}
                </p>

                <div className={styles.links}>
                  {card.links.map((link, idx) => (
                    <Link 
                      key={idx} 
                      href={`/${locale}${link.url}`} 
                      className={styles.linkItem}
                      onClick={(e) => {
                        if (link.url !== '#') {
                          window.location.href = `/${locale}${link.url}`;
                        }
                      }}
                    >
                      <span>{link.text}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '6px' }}>
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
