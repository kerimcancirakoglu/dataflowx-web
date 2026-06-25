'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, Html, Bounds, Center } from '@react-three/drei';
import { Model as PortXModel } from '../PortXAnimation/PortxModel';
import styles from './PortXModelViewer.module.css';

import { useTranslations } from 'next-intl';

// Fallback loader
function Loader() {
  return (
    <Html center>
      <div className={styles.loader}>
        Loading Model...
      </div>
    </Html>
  );
}

export default function PortXModelViewer() {
  const t = useTranslations('PortXModelViewer');
  const features = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'] as const;

  return (
    <div className={styles.container}>

      {/* Left Panel: Content matching the requested layout */}
      <div className={styles.infoPanel}>
        <h2 className={styles.mainTitle}>{t('title')}</h2>

        <div className={styles.subtitle}>
          {t('subtitle')} <a href="#" className={styles.subtitleLink}>{t('subtitleLink')}</a> {t('subtitleSuffix')}
        </div>

        <ul className={styles.featuresList}>
          {features.map((key) => (
            <li key={key} className={styles.featureListItem}>
              {t(key)}
            </li>
          ))}
        </ul>

        <div className={styles.buttonGroup}>
          <a href="#" className={styles.primaryButton}>{t('downloadBtn')}</a>
          <a href="#" className={styles.secondaryLink}>{t('docsLink')} ➔</a>
        </div>
      </div>

      {/* Right Panel: 3D Model Canvas */}
      <div className={styles.canvasWrapper}>
        <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
          <ambientLight intensity={0.2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#FFFFFF" />
          <spotLight position={[-10, 10, -10]} angle={0.15} penumbra={1} intensity={1} color="#F5A706" />
          <directionalLight position={[0, 5, 5]} intensity={0.5} />

          <Suspense fallback={<Loader />}>
            <Bounds fit clip observe margin={1.1}>
              <Center>
                <Float
                  speed={1.5}
                  rotationIntensity={0.2}
                  floatIntensity={0.5}
                  floatingRange={[-0.1, 0.1]}
                >
                  <PortXModel />
                </Float>
              </Center>
            </Bounds>
            <Environment preset="city" />
            <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={10} blur={2} far={4} />
          </Suspense>

          <OrbitControls
            makeDefault
            enablePan={false}
            enableZoom={false}
            minDistance={4}
            maxDistance={20}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

    </div>
  );
}
