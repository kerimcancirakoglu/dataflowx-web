'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

const SLIDES = [
  {
    titlePrefix: "The Infrastructure Runs.",
    titleHighlight: "The Threats Don't.",
    description: "DataFlowX delivers an integrated cybersecurity ecosystem purpose-built for organizations where downtime, data loss, and breaches are simply not options.\n\nFrom network boundaries to endpoints, from email to removable media. Every attack surface, covered.",
    buttonText: "Get Information",
    buttonLink: "#product"
  },
  {
    titlePrefix: "Built for the Sectors",
    titleHighlight: "That Cannot Afford to Fail.",
    description: "Energy grids. Defense networks. Financial systems. Public infrastructure. The organizations that keep the world running face threats that generic security tools were never designed to stop. DataFlowX was.",
    features: [
      {
        text: "Zero Trust architecture, built in.",
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F5A706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        )
      },
      {
        text: "Hardware and software solutions, working as one ecosystem.",
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F5A706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        )
      },
      {
        text: "Proven in the most demanding environments on earth.",
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F5A706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        )
      }
    ],
    buttonText: "Learn More",
    buttonLink: "#solutions"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    // Initial GSAP fade-in for the whole hero section
    const initGSAP = async () => {
      const { gsap } = await import('gsap');
      if (contentRef.current) {
        gsap.fromTo(contentRef.current, 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 0.2 }
        );
      }
    };
    initGSAP();
  }, []);

  useEffect(() => {
    // Auto-advance slides
    const timer = setInterval(() => {
      if (!isAnimating.current) {
        handleSlideChange((currentSlide + 1) % SLIDES.length);
      }
    }, 6000); // 6 seconds per slide

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleSlideChange = async (index: number) => {
    if (index === currentSlide || isAnimating.current) return;
    isAnimating.current = true;
    
    const { gsap } = await import('gsap');
    
    if (contentRef.current) {
      // Fade out current content
      await gsap.to(contentRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.inOut'
      });
      
      setCurrentSlide(index);
      
      // Fade in new content
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', onComplete: () => { isAnimating.current = false; } }
      );
    } else {
      setCurrentSlide(index);
      isAnimating.current = false;
    }
  };

  const slide = SLIDES[currentSlide];

  return (
    <section className={styles.hero} id="hero">
      {/* Hero content */}
      <div className={styles.contentWrapper}>
        <div ref={contentRef} className={styles.content}>
          <h1 className={`display-xl ${styles.headline}`} dir="ltr">
            {slide.titlePrefix}<br />
            <span className={styles.highlightText}>{slide.titleHighlight}</span>
          </h1>

          <div className={styles.subheadlineWrapper}>
            <p className={`body-text ${styles.subheadline}`} style={{ whiteSpace: 'pre-line' }}>
              {slide.description}
            </p>
            {slide.features && (
              <div className={styles.featuresCards}>
                {slide.features.map((feature, idx) => (
                  <div key={idx} className={styles.infoCard}>
                    <div className={styles.cardHeader}>
                      <div className={styles.iconWrapper}>{feature.icon}</div>
                      <p className={styles.cardText}>{feature.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.cta}>
            <a href={slide.buttonLink} className="btn-pill">
              {slide.buttonText}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        className={`${styles.navArrow} ${styles.prevArrow}`}
        onClick={() => handleSlideChange((currentSlide - 1 + SLIDES.length) % SLIDES.length)}
        aria-label="Previous slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button 
        className={`${styles.navArrow} ${styles.nextArrow}`}
        onClick={() => handleSlideChange((currentSlide + 1) % SLIDES.length)}
        aria-label="Next slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Slider Controls */}
      <div className={styles.sliderControls}>
        {SLIDES.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => handleSlideChange(idx)}
            className={`${styles.dot} ${idx === currentSlide ? styles.activeDot : ''}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
