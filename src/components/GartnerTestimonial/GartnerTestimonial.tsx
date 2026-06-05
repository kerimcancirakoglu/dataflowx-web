import React from 'react';
import styles from './GartnerTestimonial.module.css';

export default function GartnerTestimonial() {
  return (
    <section className={styles.container}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.content}>
        <h2 className={styles.headline}>
          Three years.{' '}
          <span className={styles.headlineHighlight}>One consistent recognition.</span>
        </h2>

        <p className={styles.quote}>
          We are proud to be recognized as a Sample Vendor in the Gartner Hype Cycle for CPS Security, in the Unidirectional Gateways category, for the third consecutive year.
          <br /><br />
          Being acknowledged in this report year after year reflects the growing importance of hardware-enforced, one-way data transfer technologies in protecting critical infrastructure and cyber-physical systems.
          As organizations continue to strengthen the security of operational environments, unidirectional gateways are becoming an essential component of resilient cybersecurity architectures.
          <br /><br />
          We are grateful to our customers, partners, and the entire DataFlowX team for their trust, support, and dedication.
          The threat landscape continues to evolve. So does our commitment to securing the world’s most critical environments.
        </p>

        <a href="#contact" className={styles.getInfoButton}>
          GET INFORMATION <span className={styles.arrow}>→</span>
        </a>
      </div>
    </section>
  );
}
