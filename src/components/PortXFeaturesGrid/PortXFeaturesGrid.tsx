import React from 'react';
import styles from '../FeaturesGrid/FeaturesGrid.module.css';

const features = [
  {
    title: 'Zero USB Policy',
    desc: 'Eliminates physical USB usage on the production floor entirely, closing one of industrial security\'s most persistent attack vectors while giving operational teams a fast alternative.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    )
  },
  {
    title: 'Military-Grade Encryption',
    desc: 'Every file is secured with AES-256 encryption and RSA-2048 digital signature verification, ensuring data cannot be intercepted, tampered with, or replayed in transit.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  },
  {
    title: 'Full Traceability',
    desc: 'Real-time visibility into who transferred which file, when, and to which machine. Audit-ready logs support compliance with NIS2, IEC 62443, and internal security policies.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Hardware-Level Protection',
    desc: 'Built on a FIPS-compliant TPM module and a hardened operating system, it is engineered to resist advanced persistent threats, tampering, and physical attack.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    )
  },
  {
    title: 'Seamless Integration with DFX Unidirectional Gateway',
    desc: 'Transfers files via a built-in data diode path, ensuring data moves only in the authorized direction combining the operational convenience of a portable device with the hardware-enforced security of a unidirectional gateway.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
];

export default function PortXFeaturesGrid() {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {features.map((feature, idx) => (
          <div key={idx} className={styles.card}>
            <div className={styles.iconWrapper}>
              {feature.icon}
            </div>
            <h3 className={styles.cardTitle}>{feature.title}</h3>
            <p className={styles.cardDesc}>{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
