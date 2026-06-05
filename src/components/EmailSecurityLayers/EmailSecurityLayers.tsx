'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './EmailSecurityLayers.module.css';

gsap.registerPlugin(ScrollTrigger);

const LAYER_IMAGES = [
  {
    src: '/emailassets/newemail/10001.png',
    label: 'Hardware & Infrastructure',
    desc: 'Built on high-performance infrastructure ensuring continuous availability and true physical isolation for sensitive data flows.'
  },
  {
    src: '/emailassets/newemail/20001.png',
    label: 'Network Isolation',
    desc: 'Hardened OS and dedicated network layer architecture preventing unauthorized lateral movement and reducing the attack surface.'
  },
  {
    src: '/emailassets/newemail/30001.png',
    label: 'Advanced Threat Engine',
    desc: 'Detects and blocks sophisticated spam, phishing attempts, and BEC attacks using behavioral AI and deterministic rules.'
  },
  {
    src: '/emailassets/newemail/40001.png',
    label: 'Deep Content Disarm (CDR)',
    desc: 'Detonates suspicious attachments in an isolated environment and strips active malicious content securely before final delivery.'
  },
];

const COMBINED_IMAGE = '/emailassets/newemail/50001.png';

export default function EmailSecurityLayers() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteractive, setIsInteractive] = useState(false);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const texts = gsap.utils.toArray('.textBox');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 50%',
        },
        onComplete: () => {
          setIsInteractive(true);
          // Dim all texts uniformly when timeline finishes to match default combined state
          gsap.to(texts, { opacity: 0.4, duration: 0.8 });
        }
      });

      // Initially hide texts and combined layer
      gsap.set(texts, { opacity: 0, x: -50 });
      gsap.set('.combinedLayer', { opacity: 0, y: -50 });

      // Animate combined layer fading in
      tl.to('.combinedLayer', { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }, 0);

      // Animate texts sliding in all at once with a small stagger
      tl.to(texts,
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
        0.5
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Handle active layer updates
  useEffect(() => {
    if (!isInteractive) return;

    const layers = gsap.utils.toArray('.stackedLayer');
    const texts = gsap.utils.toArray('.textBox');

    if (activeLayer === null) {
      // Default State: Combined image
      gsap.to(texts, { opacity: 0.4, duration: 0.3, overwrite: 'auto' });
      gsap.to(layers, { opacity: 0, duration: 0.3, overwrite: 'auto' });
      gsap.to('.combinedLayer', { opacity: 1, duration: 0.3, overwrite: 'auto' });
    } else {
      // Highlight specific layer
      texts.forEach((txt, i) => {
        gsap.to(txt as Element, { opacity: i === activeLayer ? 1 : 0.2, duration: 0.3, overwrite: 'auto' });
      });
      // Keep the base combined image faintly visible so floating pieces have a platform
      gsap.to('.combinedLayer', { opacity: 0.2, duration: 0.3, overwrite: 'auto' });

      layers.forEach((layer, i) => {
        if (i === activeLayer) {
          // DO NOT scale the image. Scaling breaks isometric alignment!
          gsap.to(layer as Element, { opacity: 1, duration: 0.4, zIndex: 10, overwrite: 'auto' });
        } else {
          gsap.to(layer as Element, { opacity: 0, duration: 0.4, zIndex: 1, overwrite: 'auto' });
        }
      });
    }
  }, [activeLayer, isInteractive]);

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.overTitle}>DEFENSE IN DEPTH</p>
          <h2 className={styles.title}>
            Multi-Layered <span className={styles.highlight}>Architecture</span>
          </h2>
          <p className={styles.subtitle}>
            A comprehensive, stacked defense approach to ensure no threat is left vulnerable to multiple threat vectors. Each layer builds upon the security of the one below it.
          </p>
        </div>

        <div className={styles.contentSplit}>

          {/* Left: Dynamic Text Area */}
          <div
            className={styles.textContainer}
          >
            {LAYER_IMAGES.map((layer, index) => (
              <div
                key={`text-${index}`}
                className={`${styles.textBox} textBox ${activeLayer === index ? styles.textBoxActive : ''}`}
                onClick={() => setActiveLayer(prev => prev === index ? null : index)}
              >
                <span className={styles.layerIndex}>Layer 0{index + 1}</span>
                <h3 className={styles.layerTitle}>{layer.label}</h3>
                <p className={styles.layerDesc}>{layer.desc}</p>
              </div>
            ))}

            {/* CTA Buttons below Layer 04 */}
            <div className={styles.ctaRow}>
              <a href="#" className={styles.ctaDownload}>
                Download Datasheet
              </a>
              <a href="#" className={styles.ctaDocs}>
                View Documentation
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Stacked Visuals */}
          <div className={styles.stackVisualContainer}>
            <div className={styles.stackWrapper}>

              {/* The Combined Default Layer */}
              <div className={`${styles.combinedLayer} combinedLayer`} style={{ zIndex: 0 }}>
                <img src={COMBINED_IMAGE} alt="Combined Infrastructure" className={styles.layerImage} />
              </div>

              {/* Individual Layers (Hidden until hovered) */}
              {LAYER_IMAGES.map((layer, index) => (
                <div
                  key={`layer-${index}`}
                  className={`${styles.stackedLayer} stackedLayer`}
                  style={{ zIndex: index + 1, opacity: 0 }}
                >
                  <img src={layer.src} alt={layer.label} className={styles.layerImage} />
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

