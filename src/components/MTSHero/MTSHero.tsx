import React from 'react';
import styles from './MTSHero.module.css';

export default function MTSHero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>
          <span style={{ color: '#F5A706' }}>DFX</span> Media Transfer Station
        </h1>
        <p className={styles.subtitle}>
          Secure media transfer kiosk designed to securely manage the use of removable media within sensitive network environments. It actively scans, cleans, and sanitizes USB drives using advanced anti-malware and CDR engines before allowing data to enter your critical infrastructure.
        </p>
      </div>
    </section>
  );
}
