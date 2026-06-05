import React from 'react';
import styles from './SecureRemoteAccessHero.module.css';

export default function SecureRemoteAccessHero() {
  return (
    <section className={styles.container}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.content}>
        <h2 className={styles.headline}>
          DFX <span className={styles.headlineHighlight}>Secure Remote Access</span>
        </h2>

        <p className={styles.quote}>
          Secure Remote Access is a cross-domain solution that works in integration with DataDiodeX. It enables request-response based transmission between isolated networks while providing full control over data traffic.
          <br /><br />
          It extends Zero Trust principles to remote operations by verifying every request, user, and payload before allowing it to cross the physical optical boundary. This ensures that only authorized access is granted to critical infrastructure.
          <br /><br />
          By integrating seamlessly with Active Directory for granular access policies and ICAP for sandbox detonation, Secure Remote Access neutralizes threats before they ever reach the protected network.
        </p>

        <a href="#contact" className={styles.getInfoButton}>
          GET INFORMATION <span className={styles.arrow}>→</span>
        </a>
      </div>
    </section>
  );
}
