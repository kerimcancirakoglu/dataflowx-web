'use client';

import dynamic from 'next/dynamic';
import CanvasErrorBoundary from '../ErrorBoundary/CanvasErrorBoundary';

const DiodeModelViewer = dynamic(
  () => import('./DiodeModelViewer'),
  { ssr: false }
);

export default function DiodeModelViewerWrapper({ title, modelPath, hideInfoPanel, datasheetUrl }: { title?: string, modelPath?: string, hideInfoPanel?: boolean, datasheetUrl?: string }) {
  return (
    <CanvasErrorBoundary>
      <DiodeModelViewer title={title} modelPath={modelPath} hideInfoPanel={hideInfoPanel} datasheetUrl={datasheetUrl} />
    </CanvasErrorBoundary>
  );
}
