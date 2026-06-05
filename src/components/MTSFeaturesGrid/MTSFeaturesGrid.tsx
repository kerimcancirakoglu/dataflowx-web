'use client';

import React from 'react';
import styles from './MTSFeaturesGrid.module.css';

const FEATURES = [
  {
    title: 'Data Loss Prevention (DLP)',
    desc: 'Prevents sensitive data from leaving your secure network by strictly enforcing read/write policies on all connected media devices.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v4" />
        <circle cx="12" cy="16" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Zero-Day Malware Prevention',
    desc: 'Combines heuristic scanning, AI-powered behavioral analysis, and multiple AV engines to detect undiscovered and evasive malware.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M12 8v4l3 3" />
        <circle cx="18" cy="18" r="4" fill="#F5A706" stroke="none" />
      </svg>
    ),
  },
  {
    title: 'File Purification (CDR)',
    desc: 'Content Disarm and Reconstruction extracts hidden payloads from complex documents (PDF, Word) and rebuilds them safely before transfer.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M9 15l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Custom Security Policies',
    desc: 'Define granular permissions based on Active Directory/LDAP users, groups, or specific device serial numbers.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: 'Compliance & Auditing',
    desc: 'Generates immutable logs of all transferred files, scanning results, and user activities, ensuring full compliance with industry regulations.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    title: 'Zero USB Policy',
    desc: 'Physically enforces the rule that no external, untrusted media is ever connected directly to your core operational workstations.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
        <rect x="9" y="8" width="6" height="8" rx="1" />
      </svg>
    ),
  },
];

export default function MTSFeaturesGrid() {
  return (
    <div className={styles.grid}>
      {FEATURES.map((feature, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.iconWrapper}>
            {feature.icon}
          </div>
          <h4 className={styles.title}>{feature.title}</h4>
          <p className={styles.desc}>{feature.desc}</p>
        </div>
      ))}
    </div>
  );
}
