'use client';

import dynamic from 'next/dynamic';

const PartnersMap = dynamic(
  () => import('./PartnersMap'),
  { ssr: false }
);

export default function PartnersMapWrapper() {
  return <PartnersMap />;
}
