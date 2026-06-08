import type { Metadata } from 'next';
import Nav from '@/components/Nav/Nav';
import AboutUs from '@/components/AboutUs/AboutUs';
import Contact from '@/components/Contact/Contact';
import VideoBackground from '@/components/VideoBackground/VideoBackground';

export const metadata: Metadata = {
  title: 'About DataFlowX — Unidirectional Gateway & Data Diode Specialists',
  description:
    'DataFlowX is a cybersecurity company specializing in hardware-enforced unidirectional gateways and data diode solutions. EAL4+ certified. Gartner-recognized. Protecting critical infrastructure across Turkey, Gulf, and Europe.',
  keywords: [
    'DataFlowX company',
    'data diode manufacturer',
    'unidirectional gateway vendor',
    'OT security company Turkey',
    'critical infrastructure cybersecurity vendor',
    'EAL4+ certified company',
    'Gartner recognized cybersecurity',
  ],
  alternates: {
    canonical: 'https://dataflowx.com/about-us',
  },
  openGraph: {
    title: 'About DataFlowX — OT Cybersecurity Specialists',
    description:
      'EAL4+ certified data diode and unidirectional gateway solutions. Gartner-recognized. Protecting critical infrastructure globally.',
    url: 'https://dataflowx.com/about-us',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function AboutUsPage() {
  return (
    <main>
      <VideoBackground />
      <Nav />
      
      {/* Spacer to push content below the fixed navigation */}
      <div style={{ paddingTop: '80px' }}>
        <AboutUs />
      </div>

      <div className="section-spacer" aria-hidden="true" />
      <Contact />
    </main>
  );
}
