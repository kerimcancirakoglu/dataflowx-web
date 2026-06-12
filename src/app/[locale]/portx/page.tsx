'use client';

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from './page.module.css';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import PortXAnimation from '@/components/PortXAnimation/PortXAnimation';
import PortXModelViewerWrapper from '@/components/PortXModelViewer/PortXModelViewerWrapper';
import PortXFeaturesGrid from '@/components/PortXFeaturesGrid/PortXFeaturesGrid';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import Contact from '@/components/Contact/Contact';

export default function PortXPage() {
  return (
    <>
      <Head>
        <title>DFX Portable Access Security System | Hardware-Based Zero Trust Data Bridge | DFX</title>
        <meta name="description" content="Eliminate the USB Risk. Keep the Workflow. DFX Portable Access Security System is a hardware-based Zero Trust secure data bridge purpose-built for industrial and operational environments." />
      </Head>

      <Nav />

      <main className={styles.pageWrapper}>
        <VideoBackground />

        {/* HERO SECTION */}
        <section className={styles.heroSection}>
          <div className={styles.overTitle}>DFX Portable Access Security System</div>
          <h1 className={styles.heroTitle}>
            Hardware-Based Zero Trust <br /> Data Bridge
          </h1>
          <div className={styles.heroTagline}>
            Eliminate the USB Risk. Keep the Workflow.
          </div>
          <p className={styles.heroSubtitle}>
            In industrial environments, the USB drive is one of the most dangerous and most unavoidable tools on the production floor. DFX Portable Access Security System replaces it entirely: a hardened, policy-driven data bridge that enables secure, encrypted, and fully auditable file transfers across your most sensitive networks without a single uncontrolled USB connection.
          </p>
          <div className={styles.buttonGroup}>
            <Link href="/contact" className={styles.primaryButton}>
              Request a Demo
            </Link>
            <Link href="#animation" className={styles.secondaryButton}>
              See How It Works
            </Link>
          </div>
        </section>

        <div className="section-spacer" aria-hidden="true" />

        {/* OVERVIEW SECTION (DIODE STYLE) */}
        <section className={styles.ugDetails} style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
          <div className={styles.ugDetailsHeader}>
            <p className={styles.ugDetailsOverTitle}>PRODUCT OVERVIEW</p>
            <h2 className={styles.ugDetailsTitle}>DFX Portable Access Security System</h2>
            <p className={styles.ugDetailsDesc}>
              A hardware-based Zero Trust secure data bridge purpose-built for industrial and operational environments where uncontrolled USB usage represents an unacceptable risk.
            </p>
          </div>
          <div className={styles.ugDetailsGrid}>
            <div className={styles.ugDetailCard}>
              <div className={styles.ugDetailLabel}>ELIMINATES USB RISK</div>
              <p className={styles.ugDetailText}>
                Replaces traditional USB transfers with a centrally governed, AES-256 encrypted, and NFC-enabled data bridge, removing the physical attack vector.
              </p>
            </div>
            <div className={styles.ugDetailCard}>
              <div className={styles.ugDetailLabel}>HARDWARE SECURITY</div>
              <p className={styles.ugDetailText}>
                Built on a FIPS-compliant TPM module and a hardened operating system designed to resist even the most advanced adversarial techniques.
              </p>
            </div>
            <div className={styles.ugDetailCard}>
              <div className={styles.ugDetailLabel}>SEAMLESS INTEGRATION</div>
              <p className={styles.ugDetailText}>
                Operates seamlessly with DFX Unidirectional Gateway, ensuring data moves only in the authorized direction, combining portability with unidirectional security.
              </p>
            </div>
          </div>
        </section>

        <div className="section-spacer" aria-hidden="true" />

        {/* 3D MODEL VIEWER */}
        <section style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
          <PortXModelViewerWrapper />
        </section>

        <div className="section-spacer" aria-hidden="true" />

        {/* WHAT IS IT + ANIMATION */}
        <section id="animation" className={styles.overviewSection}>
          <div className={styles.overviewHeader}>
            <div className={styles.sectionLabel}>Workflow</div>
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionDesc} style={{ maxWidth: '800px' }}>
              Unlike traditional removable media controls that restrict behavior through software policies, it eliminates the physical attack vector entirely.
            </p>
          </div>
          
          <PortXAnimation />
        </section>

        <div className="section-spacer" aria-hidden="true" />

        {/* KEY BENEFITS (FEATURES GRID) */}
        <section style={{ padding: '0 2rem' }}>
          <div className={styles.overviewHeader} style={{ marginBottom: '3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className={styles.sectionLabel}>Key Benefits</div>
            <h2 className={styles.sectionTitle}>Why Choose It</h2>
          </div>
          <PortXFeaturesGrid />
        </section>

        <div className="section-spacer" aria-hidden="true" />

        {/* THE PROBLEM */}
        <section className={styles.problemSection}>
          <div className={styles.problemHeader}>
            <div className={styles.sectionLabel}>The Problem</div>
            <h2 className={styles.sectionTitle}>Why USB is an Unacceptable Risk</h2>
            <p className={styles.sectionDesc}>
              In critical industrial environments, the USB drive remains one of the most persistent and underestimated attack vectors. It bypasses perimeter defenses entirely.
            </p>
          </div>

          <div className={styles.problemGrid}>
            {/* Card 1 */}
            <div className={styles.problemCard}>
              <div className={styles.problemIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className={styles.problemCardTitle}>Physical Malware Transmission</h3>
              <p className={styles.problemCardText}>
                A single infected USB drive can introduce ransomware, destructive malware, or espionage tools directly into air-gapped OT networks, leading to production shutdowns, equipment damage, and severe threats to operational safety.
              </p>
            </div>

            {/* Card 2 */}
            <div className={styles.problemCard}>
              <div className={styles.problemIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className={styles.problemCardTitle}>Unauthorized Data Leakage</h3>
              <p className={styles.problemCardText}>
                Removable media bypasses network perimeters and data loss prevention (DLP) systems, making it dangerously easy for sensitive intellectual property, operational data, or credentials to be extracted from secure environments without detection.
              </p>
            </div>

            {/* Card 3 */}
            <div className={styles.problemCard}>
              <div className={styles.problemIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className={styles.problemCardTitle}>Inefficiency of Traditional AV</h3>
              <p className={styles.problemCardText}>
                Traditional Antivirus depends heavily on known signatures and takes time to detect new threats. It often fails to block zero-day malware or targeted attacks hidden on USB drives before they execute and compromise the system.
              </p>
            </div>
          </div>
        </section>

        <div className="section-spacer" aria-hidden="true" />

        {/* USE CASES */}
        <section className={styles.useCasesSection}>
          <div className={styles.useCasesHeader}>
            <div className={styles.sectionLabel}>Use Cases</div>
            <h2 className={styles.sectionTitle}>Where It is Deployed</h2>
          </div>

          <div className={styles.useCasesGrid}>
            {/* 1 */}
            <div className={styles.useCaseCard}>
              <h3 className={styles.useCaseTitle}>Secure Firmware Updates</h3>
              <p className={styles.useCaseText}>
                When vendors need to patch critical ICS/SCADA equipment, it ensures that only verified, malware-free firmware enters the OT environment, with a permanent cryptographic record of the transaction.
              </p>
            </div>

            {/* 2 */}
            <div className={styles.useCaseCard}>
              <h3 className={styles.useCaseTitle}>Log & Telemetry Extraction</h3>
              <p className={styles.useCaseText}>
                Operators can securely extract operational data, system logs, or compliance reports from highly isolated zones for analysis in the IT network, without creating a two-way connection.
              </p>
            </div>

            {/* 3 */}
            <div className={styles.useCaseCard}>
              <h3 className={styles.useCaseTitle}>Air-Gapped Workstations</h3>
              <p className={styles.useCaseText}>
                In defense and intelligence applications, it provides the only approved method for moving mission-critical intelligence across physically separated classification domains.
              </p>
            </div>
          </div>
        </section>

        <div className="section-spacer" aria-hidden="true" />

        <Contact />

      </main>
    </>
  );
}
