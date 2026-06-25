'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Float, Html, Bounds, Center } from '@react-three/drei';
import styles from './DiodeModelViewer.module.css';
import { useTranslations } from 'next-intl';

// A sub-component to load the model
function DiodeModel({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
      <primitive object={scene} position={[0, -0.5, 0]} rotation={[0, -Math.PI / 6, 0]} />
    </Float>
  );
}

function Loader() {
  return (
    <Html center>
      <div className={styles.loader}>Loading Model...</div>
    </Html>
  );
}

export default function DiodeModelViewer({ title = "DFX UDG", modelPath = '/models/diode.glb?v=5' }: { title?: string, modelPath?: string }) {
  const t = useTranslations('DiodeModelViewer');
  const features = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'] as const;

  return (
    <div className={styles.container}>
      <div className={styles.infoPanel}>
        <h2 className={styles.mainTitle}>{title}</h2>
        <div className={styles.subtitle}>
          {t('subtitle')} <a href="#" className={styles.subtitleLink}>{t('subtitleLink')}</a>.
        </div>
        <ul className={styles.featuresList}>
          {features.map((key) => (
            <li key={key} className={styles.featureListItem}>{t(key)}</li>
          ))}
        </ul>
        <div className={styles.buttonGroup}>
          <a href="#" className={styles.primaryButton}>{t('downloadBtn')}</a>
          <a href="#" className={styles.secondaryLink}>{t('docsLink')} ➔</a>
        </div>
      </div>

      <div className={styles.canvasWrapper}>
        <Canvas camera={{ position: [2, 1, 5], fov: 45 }}>
          <ambientLight intensity={0.2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#FFFFFF" />
          <spotLight position={[-10, 10, -10]} angle={0.15} penumbra={1} intensity={1} color="#F5A706" />
          <directionalLight position={[0, 5, 5]} intensity={0.5} />
          <Suspense fallback={<Loader />}>
            <Bounds fit clip observe margin={1.1}>
              <Center><DiodeModel modelPath={modelPath} /></Center>
            </Bounds>
            <Environment preset="city" />
            <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={10} blur={2} far={4} />
          </Suspense>
          <OrbitControls makeDefault enablePan={false} enableZoom={false} minDistance={2} maxDistance={10} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
    </div>
  );
}

