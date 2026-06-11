import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.topSection}>

          <div className={styles.brandColumn}>
            <Link href="/" className={styles.logo}>
              <img src="/DataFlowX_Logo_W.png" alt="DataFlowX Logo" className={styles.logoImage} />
            </Link>
            <p className={styles.brandDescription}>
              Hardware-enforced data isolation and Zero Trust architecture for critical infrastructure. Security that doesn't compromise on operational flow.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://www.linkedin.com/company/dataflowx/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>Network Security</h3>
            <ul className={styles.linkList}>
              <li><Link href="/unidirectional-gateway">DFX Unidirectional Gateway</Link></li>
              <li><Link href="/secure-remote-access">DFX Secure Remote Access</Link></li>
            </ul>
            <h3 className={styles.columnTitle} style={{ marginTop: '1.5rem' }}>File Security</h3>
            <ul className={styles.linkList}>
              <li><Link href="/sandbox">DFX Sandbox</Link></li>
              <li><Link href="/media-transfer-station">DFX Media Transfer Station</Link></li>
            </ul>
          </div>

          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>E-Mail Security</h3>
            <ul className={styles.linkList}>
              <li><Link href="/email-security-platform">DFX E-Mail Security Platform</Link></li>
              <li><Link href="/intelroom">DFX IntelRoom</Link></li>
              <li><Link href="/true-cdr">TrueCDR™</Link></li>
            </ul>
            <h3 className={styles.columnTitle} style={{ marginTop: '1.5rem' }}>OT Security</h3>
            <ul className={styles.linkList}>
              <li><Link href="/portx">DFX PortX</Link></li>
            </ul>
          </div>

          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>Company</h3>
            <ul className={styles.linkList}>
              <li><Link href="/about-us">About Us</Link></li>
              <li><Link href="/#partners">Partners</Link></li>
              <li><Link href="/resources">Use Cases</Link></li>
              <li><Link href="/#news">News</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>Legal</h3>
            <ul className={styles.linkList}>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/gdpr">GDPR</Link></li>
              <li><Link href="/cookie-policy">Cookie Policy</Link></li>
            </ul>
          </div>

        </div>

        <div className={styles.bottomSection}>
          <div className={styles.copyright}>
            &copy; {currentYear} DataFlowX. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
