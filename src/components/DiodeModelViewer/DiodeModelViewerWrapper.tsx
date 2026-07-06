'use client';

import dynamic from 'next/dynamic';
import CanvasErrorBoundary from '../ErrorBoundary/CanvasErrorBoundary';

const DiodeModelViewer = dynamic(
  () => import('./DiodeModelViewer'),
  { ssr: false }
);

export default function DiodeModelViewerWrapper({ title, modelPath }: { title?: string, modelPath?: string }) {
  return (
    <CanvasErrorBoundary>
      <DiodeModelViewer title={title} modelPath={modelPath} />
    </CanvasErrorBoundary>
  );
}
