import React from 'react';
import styles from './SandboxHero.module.css';

export default function SandboxHero() {
  return (
    <section className={styles.container}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.content}>
        <h2 className={styles.headline}>
          DFX <span className={styles.headlineHighlight}>Sandbox</span>
        </h2>

        <p className={styles.quote}>
          DFX Sandbox is an AI-powered next-gen solution that monitors data traffic in a network to detect suspicious behavior and mitigate cyber threats.
          <br /><br />
          It executes suspicious files in an isolated environment, ensuring security. Analyzing files in a virtual sandbox is crucial for safely detonating and observing malware behavior without risking the actual system.
          <br /><br />
          With seamless integration via ICAP, Microsoft Exchange, and network shares, DataSecureX provides content-aware filtering and advanced threat mitigation.
        </p>

        <a href="#contact" className={styles.getInfoButton}>
          GET INFORMATION <span className={styles.arrow}>→</span>
        </a>
      </div>
    </section>
  );
}
