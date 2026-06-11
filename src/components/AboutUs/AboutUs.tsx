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
                <polyline points="120.45 1 119.95 .5 .95 .5 24.11 33.98"/>
                <polyline points="65.82 34.5 101.95 34.5 103.31 34.5"/>
                <polyline points="119.95 .5 224.99 156.5 305.63 34.5 270.95 34.5"/>
                <polyline points="230.03 34.5 252.95 .5 368.95 .5 224.99 218.5 101.95 34.5"/>
                <path d="M24.46,34.51l-1.37-1.99c-.13-.2-.26-.39-.39-.59"/>
                <path d="M65.95,34.5l61.62,89.57c5.33,7.73,3.39,18.31-4.34,23.65h0c-7.73,5.33-18.31,3.39-23.65-4.34L24.46,34.51"/>
                <path d="M267.89,8.56h0"/>
                <path d="M271.04,34.5l-39.45,59.22c-5.21,7.81-15.76,9.93-23.57,4.72h0c-7.81-5.21-9.93-15.76-4.72-23.57l41.03-61.59"/>
                <path d="M270.95,34.5h.08"/>

                <polyline points="249.45 382 249.95 382.5 368.95 382.5 345.79 349.02"/>
                <polyline points="304.09 348.5 267.95 348.5 266.6 348.5"/>
                <polyline points="249.95 382.5 144.91 226.5 64.27 348.5 98.95 348.5"/>
                <polyline points="139.87 348.5 116.95 382.5 .95 382.5 144.91 164.5 267.95 348.5"/>
                <path d="M345.45,348.49l1.37,1.99c.13.2.26.39.39.59"/>
                <path d="M303.95,348.5l-61.62-89.57c-5.33-7.73-3.39-18.31,4.34-23.65h0c7.73-5.33,18.31-3.39,23.65,4.34l75.13,108.87"/>
                <path d="M102.01,374.44h0"/>
                <path d="M98.87,348.5l39.45-59.22c5.21-7.81,15.76-9.93,23.57-4.72h0c7.81,5.21,9.93,15.76,4.72,23.57l-41.03,61.59"/>
                <path d="M98.95,348.5h-.08"/>
              </g>

              {/* Glowing Moving Paths */}
              <g className={styles.xAnimatedPathsOrange}>
                <polyline points="120.45 1 119.95 .5 .95 .5 24.11 33.98"/>
                <polyline points="65.82 34.5 101.95 34.5 103.31 34.5"/>
                <polyline points="119.95 .5 224.99 156.5 305.63 34.5 270.95 34.5"/>
                <polyline points="230.03 34.5 252.95 .5 368.95 .5 224.99 218.5 101.95 34.5"/>
                <path d="M24.46,34.51l-1.37-1.99c-.13-.2-.26-.39-.39-.59"/>
                <path d="M65.95,34.5l61.62,89.57c5.33,7.73,3.39,18.31-4.34,23.65h0c-7.73,5.33-18.31,3.39-23.65-4.34L24.46,34.51"/>
                <path d="M267.89,8.56h0"/>
                <path d="M271.04,34.5l-39.45,59.22c-5.21,7.81-15.76,9.93-23.57,4.72h0c-7.81-5.21-9.93-15.76-4.72-23.57l41.03-61.59"/>
                <path d="M270.95,34.5h.08"/>
              </g>
              <g className={styles.xAnimatedPathsWhite}>
                <polyline points="249.45 382 249.95 382.5 368.95 382.5 345.79 349.02"/>
                <polyline points="304.09 348.5 267.95 348.5 266.6 348.5"/>
                <polyline points="249.95 382.5 144.91 226.5 64.27 348.5 98.95 348.5"/>
                <polyline points="139.87 348.5 116.95 382.5 .95 382.5 144.91 164.5 267.95 348.5"/>
                <path d="M345.45,348.49l1.37,1.99c.13.2.26.39.39.59"/>
                <path d="M303.95,348.5l-61.62-89.57c-5.33-7.73-3.39-18.31,4.34-23.65h0c7.73-5.33,18.31-3.39,23.65,4.34l75.13,108.87"/>
                <path d="M102.01,374.44h0"/>
                <path d="M98.87,348.5l39.45-59.22c5.21-7.81,15.76-9.93,23.57-4.72h0c7.81,5.21,9.93,15.76,4.72,23.57l-41.03,61.59"/>
                <path d="M98.95,348.5h-.08"/>
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

        {/* Part 3: Join Our Team */}
        <div className={styles.storyPart}>
          <div className={styles.storyContent}>
            <h2 className={styles.storyTitle}>Join Our Team</h2>
            <p className={styles.storyDescription}>
              Are you passionate about building mathematically unbreachable systems? Do you want to work on cutting-edge zero-trust solutions that protect the world's most critical infrastructures?
              <br /><br />
              At DataFlowX, we are always looking for brilliant minds to join our mission. Be a part of the team that secures the flow of the critical world.
            </p>
            <a href="mailto:hr@dataflowx.com" className={styles.primaryButton} style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>
              View Open Positions
            </a>
          </div>

          <div className={styles.imageContent}>
            <div className={styles.imageWrapper}>
              <img
                src="/Kapak/kapaklar/data3.jpg"
                alt="DataFlowX Team"
                className={styles.aboutImage}
              />
              <div className={styles.xGlowOverlay} style={{ top: 'auto', bottom: '10%', right: '10%' }}></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
