'use client';

import React, { useState } from 'react';
import styles from './EmailFeaturesTabs.module.css';

const TABS = [
  {
    id: 'phishing',
    label: 'Phishing & BEC',
    title: 'Phishing & BEC Protection',
    description: 'Stop smarter attacks with stronger defense. DFX ESP uses multi-layer detection, sentiment analysis, AD/LDAP integration, and threshold profiles to prevent Business Email Compromise and credential theft. Constantly updated YARA rules provide immediate defense.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    )
  },
  {
    id: 'malware',
    label: 'Malware Mitigation',
    title: 'Advanced AI Malware Mitigation',
    description: 'Detect the undetectable before execution begins. We employ heuristic scanning, dynamic Cyber Threat Intelligence (CTI), and fully isolated virtual sandbox detonation (Advanced Threat Mitigation) to stop zero-days and unknown variants.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242M12 12v9"/>
        <path d="m8 17 4 4 4-4"/>
      </svg>
    )
  },
  {
    id: 'url',
    label: 'URL Protection',
    title: 'Safe Browsing & Link Tracking',
    description: 'Every URL request returns a secured link. We perform domain, IP, and URL reputation checks instantly upon click. Malicious websites are blocked automatically via IntelRoom Secure Scan, preventing user compromise.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    )
  },
  {
    id: 'attachment',
    label: 'Attachment Defense',
    title: 'Content Disarm & Reconstruction (CDR)',
    description: 'Stay true to Zero Trust by assuming all files are malicious. The platform removes all executable content from attachments while retaining usability. Integrated OCR ensures text in images cannot be used to bypass filters.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
      </svg>
    )
  },
  {
    id: 'dlp',
    label: 'Data Leak Prevention',
    title: 'Integrated Encryption & DLP',
    description: 'Prevent sensitive data exfiltration before it happens. Native DLP enforcement ensures sensitive content never leaves the corporate perimeter unauthorized. Automated profiles enforce regulatory compliance effortlessly.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    )
  },
  {
    id: 'response',
    label: 'Rapid Response',
    title: 'Retrospective Scan & Analytics',
    description: 'Because yesterday’s emails can be today’s threats. Continuous retro-scanning of delivered mailboxes provides one-click remediation and SOC-friendly workflows when new threat signatures are discovered.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
        <path d="M3 3v5h5M12 7v5l4 2"/>
      </svg>
    )
  }
];

export default function EmailFeaturesTabs() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  const activeContent = TABS.find(t => t.id === activeTab);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.overTitle}>PLATFORM CAPABILITIES</p>
        <h2 className={styles.title}>Comprehensive <span className={styles.highlight}>Features</span></h2>
      </div>

      <div className={styles.tabsContainer}>
        {/* Sidebar Tabs */}
        <div className={styles.tabList}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tabBtn} ${activeTab === tab.id ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className={styles.tabIcon}>{tab.icon}</div>
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className={styles.contentArea}>
          {activeContent && (
            <div className={styles.contentCard} key={activeContent.id}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>{activeContent.icon}</div>
                <h3 className={styles.cardTitle}>{activeContent.title}</h3>
              </div>
              <p className={styles.cardDesc}>{activeContent.description}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
