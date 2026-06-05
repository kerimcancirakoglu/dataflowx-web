import React from 'react';
import styles from './SandboxFeaturesGrid.module.css';

const features = [
  {
    title: 'Content Disarm & Reconstruction',
    desc: 'Purifies suspicious files in isolation by removing executable content via Zero Trust file handling, ensuring safe & seamless delivery.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="15" x2="15" y2="15" />
        <line x1="9" y1="11" x2="11" y2="11" />
      </svg>
    )
  },
  {
    title: 'Advanced AI Scan',
    desc: 'Detects the undetectable before execution begins using AI behavioral categorization, YARA, and MITRE ATT&CK integration.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
        <path d="M21.18 8.02c-1-2.3-2.85-4.17-5.16-5.18" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  },
  {
    title: 'Isolated Virtual Execution',
    desc: 'Suspicious files are detonated in custom VM profiles mapping your network to mimic human behavior and trigger evasive malware.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="9" y1="3" x2="9" y2="21" />
        <path d="M14 9h4" />
        <path d="M14 13h4" />
        <path d="M14 17h4" />
      </svg>
    )
  },
  {
    title: 'Malware Prevention',
    desc: 'Precise threat mitigation with proactive malware blocking and global intelligence updates protecting against zero-day threats.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    )
  },
  {
    title: 'Threat Intelligence',
    desc: 'Correlates billions of IoCs and Hashes with real-world threat contexts to provide enhanced detection accuracy.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    )
  },
  {
    title: 'Detailed Reports & Audit',
    desc: 'Full activity monitoring, file & process tracking, and network behavior insight with comprehensive radar and attack maps.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <polyline points="6 10 10 14 14 10 18 14" />
      </svg>
    )
  }
];

export default function SandboxFeaturesGrid() {
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
