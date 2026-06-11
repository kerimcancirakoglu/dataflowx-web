'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the 3D viewer to avoid SSR issues with Three.js
const PortXModelViewer = dynamic(() => import('./PortXModelViewer'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: '100%',
        height: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-text-muted)',
        fontFamily: 'var(--font-mono)',
      }}
    >
      Loading Interactive Model...
    </div>
  ),
});

export default function PortXModelViewerWrapper() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <PortXModelViewer />
    </div>
  );
}
