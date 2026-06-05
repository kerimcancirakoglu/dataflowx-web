'use client';

import React, { useState, useEffect } from 'react';
import styles from './Solutions.module.css';
import DataFlowDiagram from '../DataFlowDiagram/DataFlowDiagram';
import SecureRemoteAccessDiagram from '../DataFlowDiagram/SecureRemoteAccessDiagram';
import EmailSecurityDiagram from '../DataFlowDiagram/EmailSecurityDiagram';
import SandboxDiagram from '../DataFlowDiagram/SandboxDiagram';
import KioskDiagram from '../DataFlowDiagram/KioskDiagram';

const SOLUTIONS = [
  {
    id: 'unidirectional',
    titlePrefix: 'Unidirectional',
    titleHighlight: 'Gateway',
    description: 'DFX UDG is a diode-based gateway operating on Zero Trust principles. It physically isolates critical networks, allowing only authorized one-way data transmission.',
    protects: 'Secures sensitive infrastructures by completely neutralizing threats and making reverse data flow physically impossible.',
    link: '/unidirectional-gateway',
    features: [
      { text: 'Security Management Singularity', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> },
      { text: 'OT Visibility', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> },
      { text: 'Compliance Reporting', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> },
      { text: 'Monitoring & Auditing', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> },
      { text: 'Secure Data Sharing', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg> }
    ],
    image: '/svgler/server.svg'
  },
  {
    id: 'Secure Remote',
    titlePrefix: 'Secure Remote',
    titleHighlight: 'Access',
    description: 'Built directly upon and seamlessly integrated with DFX UDG hardware, DFX CDS enables request-response based data transmission between isolated networks.',
    protects: 'Provides complete and uncompromising control over inter-network data traffic, blocking unauthorized lateral movement.',
    link: '/secure-remote-access',
    features: [
      { text: 'Zero Trust Access', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> },
      { text: 'Granular Filtering', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg> },
      { text: 'ICAP Sandbox Integration', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg> },
      { text: 'Content-Aware', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> },
      { text: 'Active Directory', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> }
    ],
    image: '/svgler/trafoyeni.svg'
  },
  {
    id: 'email-security',
    titlePrefix: 'E-Mail Security',
    titleHighlight: 'Platform',
    description: 'DFX ESP holistically addresses enterprise security needs, combining high precision, flexibility, and control. Built for modern messaging threats.',
    protects: 'Establishes active defense against SPAM, Phishing, BEC (Business Email Compromise), Malware, and Exploit attacks.',
    link: '/email-security',
    features: [
      { text: 'YARA Engine', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> },
      { text: 'LDAP Integration', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> },
      { text: 'Content Disarming (CDR)', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg> },
      { text: 'Antivirus Control', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg> },
      { text: 'Phishing Protection', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> }
    ],
    image: '/svgler/walletcrypto.svg'
  },
  {
    id: 'sandbox',
    titlePrefix: 'Sandbox',
    description: 'DFX Sandbox proactively detects suspicious behavior by continuously monitoring network traffic. It isolates and analyzes suspicious files within a virtual sandbox environment.',
    protects: 'Safely observes malware behavior and neutralizes cyber threats without risking the actual production environment.',
    features: [
      { text: 'AI-Powered Detection', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg> },
      { text: 'Human Behavior Mimicking', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> },
      { text: 'Virtual Machine Auto Scaling', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg> },
      { text: 'MS Exchange Integration', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> },
      { text: 'Network Share Transfers', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg> }
    ],
    image: '/svgler/robot.svg'
  },
  {
    id: 'media-transfer',
    titlePrefix: 'Media Transfer',
    titleHighlight: 'Station',
    description: 'A physical kiosk guaranteeing the secure use of portable media in sensitive network environments. It deeply inspects and sanitizes portable media before network connection.',
    protects: 'Physically enforces a "Zero-USB" policy by detecting and neutralizing malicious payloads before they penetrate the network.',
    features: [
      { text: 'Data Loss Prevention (DLP)', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> },
      { text: 'Zero-Day Prevention', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg> },
      { text: 'File Purification (CDR)', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> },
      { text: 'Zero USB Policy', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="6" y1="19" x2="6" y2="2"></line><line x1="10" y1="19" x2="10" y2="2"></line><line x1="14" y1="19" x2="14" y2="2"></line><line x1="18" y1="19" x2="18" y2="2"></line><path d="M22 22H2V19h20z"></path></svg> }
    ],
    image: '/svgler/server.svg'
  },
  {
    id: 'portable-access',
    titlePrefix: 'Portable Access Security',
    titleHighlight: 'System',
    description: 'Ensures secure access and data exchange for remote or temporary operators without compromising the core air-gapped network. Built on a strict "nothing trusted, everything verified" architecture.',
    protects: 'Provides continuous authentication and isolation for remote sessions, completely eliminating lateral movement from external or untrusted devices.',
    features: [
      { text: 'Zero Trust Network Access', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> },
      { text: 'Encrypted Tunneling', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path></svg> },
      { text: 'Strict Authentication', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> }
    ],
    image: '/svgler/trafoyeni.svg'
  }
];

export default function Solutions() {
  const [activeId, setActiveId] = useState<string | null>(SOLUTIONS[0].id);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activeSolution = SOLUTIONS.find((s) => s.id === activeId) || SOLUTIONS[0];

  const renderActiveDiagram = () => {
    if (activeSolution.id === 'Secure Remote' || activeSolution.id === 'cross-domain') return <SecureRemoteAccessDiagram />;
    if (activeSolution.id === 'unidirectional') return <DataFlowDiagram type="unidirectional" />;
    if (activeSolution.id === 'email-security') return <EmailSecurityDiagram />;
    if (activeSolution.id === 'sandbox') return <SandboxDiagram />;
    if (activeSolution.id === 'media-transfer') return <KioskDiagram />;
    return <img src={activeSolution.image} alt={activeSolution.titlePrefix} className={styles.isometricImage} />;
  };

  return (
    <section className={styles.section} id="solutions">
      <div className={styles.inner}>
        <div className={styles.title}>
          <h2 className="display-lg">
            Cyber-Physical <span style={{ color: '#F5A706' }}>Solutions</span>
          </h2>
          <p className="body-md" style={{ color: 'rgba(255,255,255,0.6)', marginTop: '16px' }}>
            DataFlowX delivers next-generation cybersecurity solutions that protect digital infrastructures across complex IT, OT, and hybrid environments.
          </p>
        </div>

        <div className={styles.tabsContainer}>
          {SOLUTIONS.map((solution) => (
            <button
              key={solution.id}
              className={`${styles.tab} ${activeId === solution.id ? styles.activeTab : ''}`}
              onClick={() => setActiveId(solution.id)}
            >
              {solution.titlePrefix} {solution.titleHighlight}
            </button>
          ))}
        </div>

        <div className={styles.unifiedCard}>
          {/* Sol Kısım - Animasyon/Diyagram */}
          <div className={styles.cardLeft}>
            {renderActiveDiagram()}
          </div>

          {/* Sağ Kısım - İçerik */}
          <div className={styles.cardRight}>
            <h3 className={styles.cardTitle}>
              {activeSolution.titlePrefix} <span className={styles.highlight}>{activeSolution.titleHighlight}</span>
            </h3>

            <p className={styles.description}>
              {activeSolution.description}
            </p>

            <div className={styles.protectBox}>
              <div className={styles.protectTitle}>How It Protects Your Critical Infrastructure</div>
              <div className={styles.protectText}>{activeSolution.protects}</div>
            </div>

            <div className={styles.featuresList}>
              {activeSolution.features.map((feature, index) => (
                <div key={index} className={styles.featureBadge}>
                  {feature.icon}
                  {feature.text}
                </div>
              ))}
            </div>

            {/* Using activeSolution.link explicitly if it exists */}
            {activeSolution.link && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: 'auto', paddingTop: '2rem' }}>
                <a href={activeSolution.link} className={styles.productLink} style={{ marginTop: 0 }}>
                  Go to Product Page ➔
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
