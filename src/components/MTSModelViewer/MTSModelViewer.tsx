'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Float, Html, Bounds, Center } from '@react-three/drei';
import styles from './MTSModelViewer.module.css';

function MTSModel() {
  const { scene } = useGLTF('/models/kiosk.glb');

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.1}
      floatIntensity={0.2}
      floatingRange={[-0.05, 0.05]}
    >
      <primitive
        object={scene}
        position={[0, -0.5, 0]}
        rotation={[0, -Math.PI / 8, 0]}
      />
    </Float>
  );
}

function Loader() {
  return (
    <Html center>
      <div className={styles.loader}>
        Loading Model...
      </div>
    </Html>
  );
}

export default function MTSModelViewer() {
  return (
    <div className={styles.container}>
      {/* Left Panel: Content matching the requested layout */}
      <div className={styles.infoPanel}>
        <h2 className={styles.mainTitle}>DFX MTS</h2>

        <div className={styles.subtitle}>
          Discover how <a href="#" className={styles.subtitleLink}>DFX Media Transfer Station protects your network</a> from malicious physical media.
        </div>

        <ul className={styles.featuresList}>
          {[
            'Secure media transfer kiosk for sensitive environments',
            'Prevents zero-day autorun exploits and firmware-level malware',
            'Advanced content-aware filtering and File Purification (CDR)',
            'Integrates with Active Directory / LDAP for authentication',
            'Enforces Zero USB Policy on core workstations',
            'Immutable audit logs for complete compliance'
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
          <ambientLight intensity={0.4} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#FFFFFF" />
          <spotLight position={[-10, 10, -10]} angle={0.15} penumbra={1} intensity={1} color="#F5A706" />
          <directionalLight position={[0, 5, 5]} intensity={0.5} />

          <Suspense fallback={<Loader />}>
            <Bounds fit clip observe margin={1.1}>
              <Center>
                <MTSModel />
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
