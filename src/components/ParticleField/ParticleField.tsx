'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const PARTICLE_COUNT = 18000;
const MOBILE_PARTICLE_COUNT = 5000;

export default function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? MOBILE_PARTICLE_COUNT : PARTICLE_COUNT;
    const halfCount = Math.floor(count / 2);

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // TX particles (blue — left spiral flowing right)
    const txPositions = new Float32Array(halfCount * 3);
    const txColors = new Float32Array(halfCount * 3);

    for (let i = 0; i < halfCount; i++) {
      const t = (i / halfCount) * Math.PI * 6;
      const radius = 0.8 * (1 - i / halfCount) + 0.05;
      const x = -2.5 + (i / halfCount) * 2.5 + (Math.random() - 0.5) * 0.15;
      const y = Math.sin(t) * radius + (Math.random() - 0.5) * 0.12;
      const z = Math.cos(t) * radius * 0.4 + (Math.random() - 0.5) * 0.12;

      txPositions[i * 3] = x;
      txPositions[i * 3 + 1] = y;
      txPositions[i * 3 + 2] = z;

      // Blue to white near center
      const proximityToCenter = Math.max(0, 1 - Math.abs(x) / 1.5);
      txColors[i * 3] = 0 + proximityToCenter * 1;       // R
      txColors[i * 3 + 1] = 0.706 + proximityToCenter * 0.294;   // G
      txColors[i * 3 + 2] = 1;                           // B
    }

    const txGeometry = new THREE.BufferGeometry();
    txGeometry.setAttribute('position', new THREE.BufferAttribute(txPositions, 3));
    txGeometry.setAttribute('color', new THREE.BufferAttribute(txColors, 3));

    const txMaterial = new THREE.PointsMaterial({
      size: 0.018,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const txParticles = new THREE.Points(txGeometry, txMaterial);
    scene.add(txParticles);

    // RX particles (amber — right spiral flowing left)
    const rxPositions = new Float32Array(halfCount * 3);
    const rxColors = new Float32Array(halfCount * 3);

    for (let i = 0; i < halfCount; i++) {
      const t = (i / halfCount) * Math.PI * 6 + Math.PI;
      const radius = 0.8 * (i / halfCount) + 0.05;
      const x = 0 + (i / halfCount) * 2.5 + (Math.random() - 0.5) * 0.15;
      const y = Math.sin(t) * (0.8 - radius * 0.5 + 0.05) + (Math.random() - 0.5) * 0.12;
      const z = Math.cos(t) * (0.8 - radius * 0.5 + 0.05) * 0.4 + (Math.random() - 0.5) * 0.12;

      rxPositions[i * 3] = x;
      rxPositions[i * 3 + 1] = y;
      rxPositions[i * 3 + 2] = z;

      // Amber to white near center (x near 0)
      const proximityToCenter = Math.max(0, 1 - Math.abs(x) / 1.5);
      rxColors[i * 3] = 0.961 + proximityToCenter * 0.039;       // R (#F5)
      rxColors[i * 3 + 1] = 0.655 * (1 - proximityToCenter * 0.3); // G (#A7)
      rxColors[i * 3 + 2] = 0.024 + proximityToCenter * 0.976;   // B (#06)
    }

    const rxGeometry = new THREE.BufferGeometry();
    rxGeometry.setAttribute('position', new THREE.BufferAttribute(rxPositions, 3));
    rxGeometry.setAttribute('color', new THREE.BufferAttribute(rxColors, 3));

    const rxMaterial = new THREE.PointsMaterial({
      size: 0.018,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const rxParticles = new THREE.Points(rxGeometry, rxMaterial);
    scene.add(rxParticles);

    // Mouse parallax
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Scroll reactive speed
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      scrollVelocity = Math.abs(window.scrollY - lastScrollY) * 0.002;
      lastScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    // Animation loop
    let frameId: number;
    let time = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += 0.004 + scrollVelocity * 0.5;
      scrollVelocity *= 0.92; // decay

      // Smooth camera parallax
      targetX += (mouseX * 0.3 - targetX) * 0.05;
      targetY += (-mouseY * 0.2 - targetY) * 0.05;
      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(0, 0, 0);

      // Rotate both particle systems slowly
      txParticles.rotation.z = time * 0.12;
      rxParticles.rotation.z = -time * 0.12;
      txParticles.rotation.y = Math.sin(time * 0.3) * 0.1;
      rxParticles.rotation.y = -Math.sin(time * 0.3) * 0.1;

      // Pulse opacity
      txMaterial.opacity = 0.75 + Math.sin(time * 1.5) * 0.15;
      rxMaterial.opacity = 0.75 + Math.sin(time * 1.5 + Math.PI) * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      txGeometry.dispose();
      rxGeometry.dispose();
      txMaterial.dispose();
      rxMaterial.dispose();
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}
