'use client';

import dynamic from 'next/dynamic';
import CanvasErrorBoundary from '../ErrorBoundary/CanvasErrorBoundary';

const MTSModelViewer = dynamic(
  () => import('./MTSModelViewer'),
  { ssr: false }
);

export default function MTSModelViewerWrapper() {
  return (
    <CanvasErrorBoundary>
      <MTSModelViewer />
    </CanvasErrorBoundary>
  );
}
