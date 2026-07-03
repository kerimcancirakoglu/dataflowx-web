'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

// Sabit SVG ikonları — Sanity şemasında ikon alanı yok, index'e göre atanır.
// Schema'da features max(3) kısıtı var; bu ikonlar 1:shield, 2:monitor, 3:globe sırasını takip eder.
const SLIDE_ICONS = [
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F5A706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F5A706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F5A706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
];

interface HeroSlide {
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  buttonText: string;
  buttonLink?: string;
  features?: { text: string }[];
}

interface HeroClientProps {
  slides: HeroSlide[];
  sanityDocumentId?: string;
}

export default function HeroClient({ slides, sanityDocumentId }: HeroClientProps) {
  const SLIDES = slides;

  const [currentSlide, setCurrentSlide] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  // Visual Editing overlay — sanityDocumentId yoksa (TR/AR) attribute basılmaz
  const sanityAttr = (path: string): Record<string, string> =>
    sanityDocumentId
      ? { 'data-sanity': JSON.stringify({ id: sanityDocumentId, type: 'homePage', path }) }
      : {};

  useEffect(() => {
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
    const timer = setInterval(() => {
      if (!isAnimating.current) {
        handleSlideChange((currentSlide + 1) % SLIDES.length);
      }
    }, 6000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleSlideChange = async (index: number) => {
    if (index === currentSlide || isAnimating.current) return;
    isAnimating.current = true;

    const { gsap } = await import('gsap');

    if (contentRef.current) {
      await gsap.to(contentRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.inOut',
      });

      setCurrentSlide(index);

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
      <div className={styles.contentWrapper}>
        <div ref={contentRef} className={styles.content}>
          <h1
            className={`display-xl ${styles.headline}`}
            dir="ltr"
            {...sanityAttr(`hero.slides[${currentSlide}].titlePrefix`)}
          >
            {slide.titlePrefix}<br />
            <span
              className={styles.highlightText}
              {...sanityAttr(`hero.slides[${currentSlide}].titleHighlight`)}
            >
              {slide.titleHighlight}
            </span>
          </h1>

          <div className={styles.subheadlineWrapper}>
            <p
              className={`body-text ${styles.subheadline}`}
              style={{ whiteSpace: 'pre-line' }}
              {...sanityAttr(`hero.slides[${currentSlide}].description`)}
            >
              {slide.description}
            </p>
            {slide.features && (
              <div className={styles.featuresCards}>
                {slide.features.map((feature, idx) => (
                  <div key={idx} className={styles.infoCard}>
                    <div className={styles.cardHeader}>
                      <div className={styles.iconWrapper}>
                        {SLIDE_ICONS[idx % SLIDE_ICONS.length]}
                      </div>
                      <p
                        className={styles.cardText}
                        {...sanityAttr(`hero.slides[${currentSlide}].features[${idx}].text`)}
                      >
                        {feature.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.cta}>
            <a
              href={slide.buttonLink || '#'}
              className="btn-pill"
              {...sanityAttr(`hero.slides[${currentSlide}].buttonText`)}
            >
              {slide.buttonText}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>

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

      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
