'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import styles from './Solutions.module.css';

const DataFlowDiagram = dynamic(() => import('../DataFlowDiagram/DataFlowDiagram'), { ssr: false });
const SecureRemoteAccessDiagram = dynamic(() => import('../DataFlowDiagram/SecureRemoteAccessDiagram'), { ssr: false });
const EmailSecurityDiagram = dynamic(() => import('../DataFlowDiagram/EmailSecurityDiagram'), { ssr: false });
const SandboxDiagram = dynamic(() => import('../DataFlowDiagram/SandboxDiagram'), { ssr: false });
const KioskDiagram = dynamic(() => import('../DataFlowDiagram/KioskDiagram'), { ssr: false });
const IntelRoomDiagram = dynamic(() => import('../DataFlowDiagram/IntelRoomDiagram'), { ssr: false });
const DfxCdrDiagram = dynamic(() => import('../DataFlowDiagram/TrueCDRDiagram'), { ssr: false });
const PortXAnimation = dynamic(() => import('../PortXAnimation/PortXAnimation'), { ssr: false });

export interface SolutionType {
  id: string;
  category: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  protects: string;
  link?: string;
  image?: string;
  features: { text: string; icon: React.ReactNode }[];
}

export interface SolutionsClientProps {
  titlePrefix: string;
  titleHighlight: string;
  subtitle: string;
  protectsTitle: string;
  goToProductLabel: string;
  solutionsList: SolutionType[];
}

export default function SolutionsClient({
  titlePrefix,
  titleHighlight,
  subtitle,
  protectsTitle,
  goToProductLabel,
  solutionsList
}: SolutionsClientProps) {
  const [activeId, setActiveId] = useState<string | null>(solutionsList[0]?.id || null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activeSolution = solutionsList.find((s) => s.id === activeId) || solutionsList[0];

  if (!activeSolution) return null;

  const renderActiveDiagram = () => {
    if (activeSolution.id === 'Secure Remote' || activeSolution.id === 'cross-domain') return <SecureRemoteAccessDiagram />;
    if (activeSolution.id === 'unidirectional') return <DataFlowDiagram type="unidirectional" />;
    if (activeSolution.id === 'email-security') return <EmailSecurityDiagram />;
    if (activeSolution.id === 'sandbox') return <SandboxDiagram />;
    if (activeSolution.id === 'media-transfer') return <KioskDiagram />;
    if (activeSolution.id === 'intelroom') return <IntelRoomDiagram />;
    if (activeSolution.id === 'trucdr') return <DfxCdrDiagram />;
    if (activeSolution.id === 'portable-access') return <PortXAnimation hideCards={true} />;
    if (!activeSolution.image) return null;
    return <Image src={activeSolution.image} alt={activeSolution.titlePrefix} width={600} height={600} style={{ width: '100%', height: 'auto' }} className={styles.isometricImage} />;
  };

  return (
    <section className={styles.section} id="solutions">
      <div className={styles.inner}>
        <div className={styles.title}>
          <h2 className="display-lg">
            {titlePrefix} <br/><span style={{ color: '#F5A706' }}>{titleHighlight}</span>
          </h2>
          <p className="body-md" style={{ color: 'rgba(255,255,255,0.6)', marginTop: '16px' }}>
            {subtitle}
          </p>
        </div>

        <div className={styles.tabsContainer}>
          {solutionsList.map((solution) => (
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
              <span style={{ fontSize: '0.6em', opacity: 0.5, display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{activeSolution.category}</span>
              {activeSolution.titlePrefix} <span className={styles.highlight}>{activeSolution.titleHighlight}</span>
            </h3>

            <p className={styles.description}>
              {activeSolution.description}
            </p>

            <div className={styles.protectBox}>
              <div className={styles.protectTitle}>{protectsTitle}</div>
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
                  {goToProductLabel}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
