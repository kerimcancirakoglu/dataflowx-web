import React from 'react';
import styles from './AboutUs.module.css';

export default function AboutUs() {
  return (
    <section className={styles.section} id="about-us">
      <div className={styles.inner}>

        {/* Part 1: We Secure the Flow */}
        <div className={styles.topPart}>
          <div className={styles.textContent}>
            <h2 className={styles.mainTitle}>
              We Secure the <br />
              <span className={styles.highlight}>Flow</span> of Critical<br />
              World
            </h2>

            <p className={styles.description}>
              DataFlowX is a cybersecurity company focused on securing critical infrastructures and enabling safe, controlled data flow between IT and OT environments.
            </p>

            <ul className={styles.featureList}>
              <li>
                <div className={styles.checkIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div className={styles.featureText}>
                  <strong>Zero Trust By Design</strong>
                  <span>By Architecture Not Just Policy</span>
                </div>
              </li>
              <li>
                <div className={styles.checkIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div className={styles.featureText}>
                  <strong>Proactive Over Reactive</strong>
                  <span>Detect, Isolate, Neutralize</span>
                </div>
              </li>
              <li>
                <div className={styles.checkIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div className={styles.featureText}>
                  <strong>Security As An Enabler</strong>
                  <span>Making Security A Force Multiplier</span>
                </div>
              </li>
            </ul>
          </div>

          <div className={styles.imageContent}>
            <div className={styles.imageWrapper}>
              <img
                src="/images/aboutus.png"
                alt="DataFlowX - Zero Trust. Zero Tolerance."
                className={styles.aboutImage}
              />
              <div className={styles.xGlowOverlay}></div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider}></div>

        {/* Part 2: Who We Are & Stats */}
        <div className={styles.bottomPart}>
          
          {/* Glowing Animated X Background */}
          <div className={styles.xBackground}>
            <svg viewBox="0 0 368 378" xmlns="http://www.w3.org/2000/svg">
              {/* Static Dim Background Paths */}
              <g className={styles.xStaticPaths}>
                <polygon points="0 0 23.52 34 101 34 119 34 119 0 0 0"/>
                <polygon points="224.04 218 101 34 119 0 224.04 156 304.68 34 229.08 34 252 0 368 0 224.04 218"/>
                <rect x="-9.97" y="60.79" width="168.69" height="34" rx="17" ry="17" transform="translate(96.16 -27.61) rotate(55.39)"/>
                <rect x="183" y="36" width="108" height="34" rx="17" ry="17" transform="translate(412.51 -114.85) rotate(123.67)"/>
                <polygon points="368 378 344.48 344 267 344 249 344 249 378 368 378"/>
                <polygon points="143.96 160 267 344 249 378 143.96 222 63.32 344 138.92 344 116 378 0 378 143.96 160"/>
                <rect x="209.28" y="283.21" width="168.69" height="34" rx="17" ry="17" transform="translate(213.31 712.38) rotate(-124.61)"/>
                <rect x="77" y="308" width="108" height="34" rx="17" ry="17" transform="translate(-212.11 253.83) rotate(-56.33)"/>
              </g>

              {/* Glowing Moving Paths */}
              <g className={styles.xAnimatedPathsOrange}>
                <polygon points="0 0 23.52 34 101 34 119 34 119 0 0 0"/>
                <polygon points="224.04 218 101 34 119 0 224.04 156 304.68 34 229.08 34 252 0 368 0 224.04 218"/>
                <rect x="-9.97" y="60.79" width="168.69" height="34" rx="17" ry="17" transform="translate(96.16 -27.61) rotate(55.39)"/>
                <rect x="183" y="36" width="108" height="34" rx="17" ry="17" transform="translate(412.51 -114.85) rotate(123.67)"/>
              </g>
              <g className={styles.xAnimatedPathsWhite}>
                <polygon points="368 378 344.48 344 267 344 249 344 249 378 368 378"/>
                <polygon points="143.96 160 267 344 249 378 143.96 222 63.32 344 138.92 344 116 378 0 378 143.96 160"/>
                <rect x="209.28" y="283.21" width="168.69" height="34" rx="17" ry="17" transform="translate(213.31 712.38) rotate(-124.61)"/>
                <rect x="77" y="308" width="108" height="34" rx="17" ry="17" transform="translate(-212.11 253.83) rotate(-56.33)"/>
              </g>
            </svg>
          </div>

          <div className={styles.whoWeAreTitleContainer}>
            <h2 className={styles.whoWeAreTitle}>Who We Are?</h2>
          </div>

          <div className={styles.whoWeAreContent}>
            <p>
              We develop next-generation solutions built on Zero Trust architecture and AI-driven threat intelligence that designed for organizations where security is not optional.
            </p>
            <p>
              We serve sectors where operational continuity and data integrity are mission-critical: energy, finance, manufacturing, and defense. Our products are engineered to meet the highest security standards, including CC EAL4+ certification, and are trusted by institutions that cannot afford to compromise.
            </p>
            <p>
              We believe that security should not slow organizations down contrary it should make them stronger. That belief drives everything we build.
            </p>

            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>25+</span>
                <span className={styles.statLabel}>Customers</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>3+</span>
                <span className={styles.statLabel}>Countries</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>5+</span>
                <span className={styles.statLabel}>Partners</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>4+</span>
                <span className={styles.statLabel}>Certificate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider}></div>

        {/* Part 3: Our Story / Video Placeholder */}
        <div className={styles.storyPart}>
          <div className={styles.videoPlaceholder}>
            <div className={styles.playButton}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className={styles.videoText}>Video Coming Soon</span>
          </div>

          <div className={styles.storyContent}>
            <h2 className={styles.storyTitle}>Our Story</h2>
            <p className={styles.storyDescription}>
              Every great innovation begins with a critical need. We recognized that traditional security models were no longer sufficient for the complexities of modern critical infrastructure.
              <br /><br />
              That's why we built DataFlowX—to provide a Zero Trust framework that doesn't just block threats, but enables secure, uninterrupted operational flow.
            </p>
            <button className={styles.primaryButton}>
              Watch Our Video
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
