'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, Html, Bounds, Center } from '@react-three/drei';
import { Model as PortXModel } from '../PortXAnimation/PortxModel';
import styles from './PortXModelViewer.module.css';

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
  return (
    <div className={styles.container}>

      {/* Left Panel: Content matching the requested layout */}
      <div className={styles.infoPanel}>
        <h2 className={styles.mainTitle}>DFX Portable Access Security System</h2>

        <div className={styles.subtitle}>
          Learn how <a href="#" className={styles.subtitleLink}>Portable Zero Trust</a> protects your network.
        </div>

        <ul className={styles.featuresList}>
          {[
            'Zero USB Policy enforced physically',
            'Military-grade AES-256 encryption',
            'Full traceability and audit-ready logs',
            'Hardened OS and TPM architecture',
            'Dual-layer NFC authentication',
            'Seamlessly integrates with DFX Unidirectional Gateway'
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
