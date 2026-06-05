'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Float, Html, Bounds, Center } from '@react-three/drei';
import styles from './DiodeModelViewer.module.css';

// A sub-component to load the model
function DiodeModel() {
  // We append ?v=3 to bypass browser cache and force the updated model to load
  const { scene } = useGLTF('/models/diode.glb?v=5');

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <primitive
        object={scene}
        position={[0, -0.5, 0]}
        rotation={[0, -Math.PI / 6, 0]}
      />
    </Float>
  );
}

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

export default function DiodeModelViewer() {
  return (
    <div className={styles.container}>

      {/* Left Panel: Content matching the requested layout */}
      <div className={styles.infoPanel}>
        <h2 className={styles.mainTitle}>Optical Diode 1U</h2>

        <div className={styles.subtitle}>
          Learn how <a href="#" className={styles.subtitleLink}>Data Diodes protect your network</a>.
        </div>

        <ul className={styles.featuresList}>
          {[
            'Airtight protection for OT/ICS-to-IT communication',
            'Secure, segmented, unidirectional data paths',
            'True protocol break, non-routable connection',
            'Redundant optical connection for unsurpassed reliability',
            'Easy to deploy and operate data diode',
            'Seamlessly integrates with DataFlowX Ecosystem'
          ].map((text, i) => (
            <li key={i} className={styles.featureListItem}>
              {text}
            </li>
          ))}
        </ul>

        <div className={styles.buttonGroup}>
          <a href="#" className={styles.primaryButton}>Download Datasheet</a>
          <a href="#" className={styles.secondaryLink}>View Documentation ➔</a>
        </div>
      </div>

      {/* Right Panel: 3D Model Canvas */}
      <div className={styles.canvasWrapper}>
        <Canvas camera={{ position: [2, 1, 5], fov: 45 }}>
          {/* Lighting setup for a premium, dark aesthetic */}
          <ambientLight intensity={0.2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#FFFFFF" />
          <spotLight position={[-10, 10, -10]} angle={0.15} penumbra={1} intensity={1} color="#F5A706" />
          <directionalLight position={[0, 5, 5]} intensity={0.5} />

          <Suspense fallback={<Loader />}>
            <Bounds fit clip observe margin={1.1}>
              <Center>
                <DiodeModel />
              </Center>
            </Bounds>
            <Environment preset="city" />
            <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={10} blur={2} far={4} />
          </Suspense>

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={2}
            maxDistance={10}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

    </div>
  );
}
