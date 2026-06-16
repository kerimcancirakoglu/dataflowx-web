'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import styles from './PartnersMap.module.css';
import mapData3D from './mapData3D.json';
import gsap from 'gsap';

const PINS = [
  { 
    id: 'europe', 
    label: 'EUROPE', 
    lon: 10, lat: 50, 
    description: "Compute close to users reduces network latency.",
    align: "left",
    linePath: "M 0 0 L -30 -30 L -50 -30",
    boxOffset: { x: -50, y: -30 }
  },
  { 
    id: 'turkey', 
    label: 'TURKEY', 
    lon: 35, lat: 39, 
    description: "Smart Placement moves workloads closer to your data.",
    align: "right",
    linePath: "M 0 0 L 30 -40 L 50 -40",
    boxOffset: { x: 50, y: -40 }
  },
  { 
    id: 'north_africa', 
    label: 'NORTH AFRICA', 
    lon: 10, lat: 25 
  },
  { 
    id: 'gulf', 
    label: 'GULF REGION', 
    lon: 45, lat: 25,
    description: "Optimized end-to-end latency for critical infrastructure.",
    align: "right",
    linePath: "M 0 0 L 40 30 L 60 30",
    boxOffset: { x: 60, y: 30 }
  },
  { 
    id: 'apac', 
    label: 'ASIA PACIFIC', 
    lon: 110, lat: 10
  },
];

function PinItem({ pin, parentRef }: { pin: any, parentRef: React.RefObject<THREE.Group | null> }) {
  const htmlRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const phi = (90 - pin.lat) * (Math.PI / 180);
  const theta = pin.lon * (Math.PI / 180);
  
  const x = Math.sin(phi) * Math.sin(theta);
  const y = Math.cos(phi);
  const z = Math.sin(phi) * Math.cos(theta);
  const r = 1.02;

  const localPos = new THREE.Vector3(x * r, y * r, z * r);

  useFrame(({ camera, clock }) => {
    if (parentRef.current && htmlRef.current && meshRef.current) {
      const worldPos = localPos.clone().applyMatrix4(parentRef.current.matrixWorld);
      const normal = worldPos.clone().normalize();
      const cameraDir = camera.position.clone().sub(worldPos).normalize();
      
      const isVisible = normal.dot(cameraDir) > -0.1;
      
      const targetOpacity = isVisible ? '1' : '0';
      if (htmlRef.current.style.opacity !== targetOpacity) {
        htmlRef.current.style.opacity = targetOpacity;
        htmlRef.current.style.transition = 'opacity 0.3s ease-out';
      }
      
      const mat = meshRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = isVisible ? 1 : 0;
      mat.transparent = true;
    }
  });

  return (
    <group position={[localPos.x, localPos.y, localPos.z]}>
      {/* The Pin Dot */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshBasicMaterial color="#F5A706" />
      </mesh>
      <Html center style={{ pointerEvents: 'none' }}>
        <div ref={htmlRef} className={styles.pinContainer}>
          <div className={styles.pinGlow} />
          <span className={styles.pinName}>{pin.label}</span>
          
          {pin.description && (
            <>
              <svg className={styles.connectionSvg} style={{ overflow: 'visible', position: 'absolute', top: 0, left: 0 }}>
                <path d={pin.linePath} stroke="#F5A706" strokeWidth="1" strokeDasharray="4 4" fill="none" />
              </svg>
              <div 
                className={styles.infoBox} 
                style={{ 
                  left: pin.boxOffset.x, 
                  top: pin.boxOffset.y, 
                  transform: pin.align === 'left' ? 'translate(-100%, -50%)' : 'translate(0, -50%)' 
                }}
              >
                <div className={styles.infoBoxCorners} />
                {pin.description}
              </div>
            </>
          )}
        </div>
      </Html>
    </group>
  );
}

function Globe() {
  const pointsRef = useRef<THREE.Points>(null);
  const gridRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const gridShaderRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, size } = useThree();

  const isMobile = size.width < 768;
  const globeScale = isMobile ? 0.6 : 1.0;
  
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

  // Calculate pin positions for the shader to use
  const pinPositions = useMemo(() => {
    return PINS.map(pin => {
      const phi = (90 - pin.lat) * (Math.PI / 180);
      const theta = pin.lon * (Math.PI / 180);
      return new THREE.Vector3(
        Math.sin(phi) * Math.sin(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.cos(theta)
      );
    });
  }, []);

  const pulsingShader = useMemo(() => ({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color('#ffffff') },
      dpr: { value: dpr },
      pins: { value: pinPositions }
    },
    vertexShader: `
      uniform float time;
      uniform float dpr;
      uniform vec3 pins[5];
      attribute float randomOffset;
      varying float vAlpha;
      varying vec3 vColor;

      void main() {
        vec3 vNormal = normalize(normalMatrix * position);
        vAlpha = 0.2 + 0.8 * (0.5 * sin(time * 2.0 + randomOffset) + 0.5);
        
        // Check distance to pins to color the dots instead of drawing geometric rings
        float isBorder = 0.0;
        float isInside = 0.0;
        for(int i=0; i<5; i++) {
          float d = distance(position, pins[i]);
          // If the dot is within the territory
          if (d < 0.16) {
            isInside = 1.0;
            // If the dot is on the outer edge of the territory, it acts as the border
            if (d > 0.13) {
              isBorder = 1.0;
            }
          }
        }

        vColor = vec3(1.0, 1.0, 1.0); // Default white
        
        if (isBorder > 0.0) {
           vColor = vec3(0.96, 0.65, 0.02); // Bright Orange for border dots
           vAlpha = 1.0; // Make border glow strongly
        } else if (isInside > 0.0) {
           vColor = vec3(0.96, 0.65, 0.02); // Orange for inside dots
           vAlpha *= 0.3; // Faint inside
        }

        if (vNormal.z < -0.1) {
          vAlpha = 0.0;
        } else if (vNormal.z < 0.2) {
          vAlpha *= (vNormal.z + 0.1) / 0.3;
        }

        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        
        // Increase point size slightly for the colored territory dots
        float pSize = isBorder > 0.0 ? 1.5 : 0.8;
        gl_PointSize = (pSize + vAlpha * 1.0) * (4.0 / -mvPosition.z) * dpr;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying float vAlpha;
      varying vec3 vColor;
      void main() {
        if (vAlpha <= 0.0) discard;
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        float strength = 1.0 - (dist * 2.0);
        gl_FragColor = vec4(vColor, vAlpha * strength);
      }
    `
  }), [dpr, pinPositions]);

  const gridShader = useMemo(() => ({
    uniforms: {
      dpr: { value: dpr }
    },
    vertexShader: `
      uniform float dpr;
      varying float vAlpha;
      void main() {
        vec3 vNormal = normalize(normalMatrix * position);
        vAlpha = 0.2;
        if (vNormal.z < -0.1) {
          vAlpha = 0.0;
        } else if (vNormal.z < 0.2) {
          vAlpha *= (vNormal.z + 0.1) / 0.3;
        }
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = 1.0 * (4.0 / -mvPosition.z) * dpr;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying float vAlpha;
      void main() {
        if (vAlpha <= 0.0) discard;
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        gl_FragColor = vec4(0.5, 0.5, 0.5, vAlpha);
      }
    `
  }), [dpr]);

  const { positions, randoms } = useMemo(() => {
    const pos = new Float32Array(mapData3D);
    const count = pos.length / 3;
    const rands = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      rands[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, randoms: rands };
  }, []);

  const gridPositions = useMemo(() => {
    const pos = [];
    for (let lat = -90; lat <= 90; lat += 10) {
      for (let lon = -180; lon < 180; lon += 10) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = lon * (Math.PI / 180);
        pos.push(Math.sin(phi) * Math.sin(theta), Math.cos(phi), Math.sin(phi) * Math.cos(theta));
      }
    }
    return new Float32Array(pos);
  }, []);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
    if (shaderRef.current) {
      shaderRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <group ref={groupRef} scale={[globeScale, globeScale, globeScale]}>
      <points ref={gridRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[gridPositions, 3]} />
        </bufferGeometry>
        <shaderMaterial
          ref={gridShaderRef}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={gridShader.uniforms}
          vertexShader={gridShader.vertexShader}
          fragmentShader={gridShader.fragmentShader}
        />
      </points>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-randomOffset" args={[randoms, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={shaderRef}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={pulsingShader.uniforms}
          vertexShader={pulsingShader.vertexShader}
          fragmentShader={pulsingShader.fragmentShader}
        />
      </points>
      
      {PINS.map(pin => (
         <PinItem key={pin.id} pin={pin} parentRef={groupRef} />
      ))}
    </group>
  );
}

export default function PartnersMap() {
  const bgParticles = useMemo(() => Array.from({ length: 30 }).map((_, i) => ({
    id: `bgp-${i}`,
    cx: Math.random() * 100,
    cy: Math.random() * 100,
    r: Math.random() * 3 + 1,
  })), []);

  useEffect(() => {
    gsap.to('.bg-particle', {
      y: 'random(-40, 40)',
      x: 'random(-40, 40)',
      opacity: 'random(0.1, 0.4)',
      scale: 'random(0.5, 1.5)',
      duration: () => 6 + Math.random() * 6,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });
  }, []);

  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapBackgroundLayer}></div>
      
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {bgParticles.map(p => (
          <circle 
            key={p.id}
            cx={`${p.cx}%`}
            cy={`${p.cy}%`}
            r={p.r}
            fill="#F5A706"
            className="bg-particle"
            filter="url(#glow)"
            opacity="0.2"
          />
        ))}
      </svg>

      {/* Force native pixel ratio mapping for high-density mobile screens */}
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0.8, 2.2], fov: 45 }} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Globe />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
