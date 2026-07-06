'use client';

import dynamic from 'next/dynamic';

const MTSModelViewer = dynamic(
  () => import('./MTSModelViewer'),
  { ssr: false }
);

export default function MTSModelViewerWrapper() {
  return <MTSModelViewer />;
}
