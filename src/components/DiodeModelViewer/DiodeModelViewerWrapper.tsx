'use client';

import dynamic from 'next/dynamic';
import CanvasErrorBoundary from '../ErrorBoundary/CanvasErrorBoundary';

const DiodeModelViewer = dynamic(
  () => import('./DiodeModelViewer'),
  { ssr: false }
);

export default function DiodeModelViewerWrapper({ title, modelPath, hideInfoPanel }: { title?: string, modelPath?: string, hideInfoPanel?: boolean }) {
  return (
    <CanvasErrorBoundary>
      <DiodeModelViewer title={title} modelPath={modelPath} hideInfoPanel={hideInfoPanel} />
    </CanvasErrorBoundary>
  );
}
