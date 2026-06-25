'use client';

import dynamic from 'next/dynamic';

const DiodeModelViewer = dynamic(
  () => import('./DiodeModelViewer'),
  { ssr: false }
);

export default function DiodeModelViewerWrapper({ title, modelPath }: { title?: string, modelPath?: string }) {
  return <DiodeModelViewer title={title} modelPath={modelPath} />;
}
