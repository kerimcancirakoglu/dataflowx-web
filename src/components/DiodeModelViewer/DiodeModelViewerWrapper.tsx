'use client';

import dynamic from 'next/dynamic';

const DiodeModelViewer = dynamic(
  () => import('./DiodeModelViewer'),
  { ssr: false }
);

export default function DiodeModelViewerWrapper() {
  return <DiodeModelViewer />;
}
