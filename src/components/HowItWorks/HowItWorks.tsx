'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './HowItWorks.module.css';

const CARDS = [
  {
    id: 'network',
    title: 'Network Security',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6h16v10H4V6z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    image: '/Kapak/networksecurity.png',
    overlay: 'linear-gradient(to bottom, rgba(0, 15, 40, 0.4) 0%, rgba(0, 5, 20, 0.95) 100%)',
    description: 'Hardware-based unidirectional gateways provide physical isolation for critical SCADA and ICS networks.',
    links: [
      { text: 'DFX Unidirectional Gateway', url: '/unidirectional-gateway' },
      { text: 'DFX Secure Remote Access', url: '/secure-remote-access' }
    ]
  },
  {
    id: 'file',
    title: 'File Security',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    image: '/Kapak/New-Project-2025-08-02T043719.908.jpg',
    overlay: 'linear-gradient(to bottom, rgba(40, 20, 10, 0.3) 0%, rgba(15, 5, 0, 0.95) 100%)',
    description: 'AI-powered ecosystem designed to trap, analyze, and neutralize sophisticated malware.',
    links: [
      { text: 'DFX NDR', url: '#' },
      { text: 'DFX Sandbox', url: '#' },
      { text: 'DFX Media Transfer Station', url: '#' }
    ]
  },
  {
    id: 'email',
    title: 'Email Security',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 7l8 5 8-5M4 7v10h16V7H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    image: '/Kapak/pexels-rsantos1232-3888149-scaled.jpg',
    overlay: 'linear-gradient(to bottom, rgba(10, 20, 30, 0.4) 0%, rgba(0, 5, 15, 0.95) 100%)',
    description: 'Advanced email gateway with AI-driven threat detection and deep content disarm & reconstruction (CDR).',
    links: [
      { text: 'DFX Email Security Platform', url: '/email-security' },
      { text: 'DFX IntelRoom', url: '#' },
      { text: 'DFX CDR', url: '#' }
    ]
  },
  {
    id: 'ot',
    title: 'OT Security',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    image: '/Kapak/New-Project-2025-08-02T043719.908.jpg',
    overlay: 'linear-gradient(to bottom, rgba(30, 30, 10, 0.3) 0%, rgba(10, 10, 0, 0.95) 100%)',
    description: 'Secure, controlled data exchange between networks of differing security levels without compromising isolation.',
    links: [
      { text: 'DFX PortX', url: '#' }
    ]
  }
];

export default function HowItWorks() {
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
          No Lateral Movement.<br />
          <span style={{ color: '#F5A706', fontSize: '1.15em', fontWeight: 800 }}>No Return Path.</span><br />
          <span style={{ whiteSpace: 'nowrap' }}>No Way In.</span>
        </h2>

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
                      href={link.url} 
                      className={styles.linkItem}
                      onClick={(e) => {
                        if (link.url !== '#') {
                          window.location.href = link.url;
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
