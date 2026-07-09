import type { Metadata } from 'next';
import AboutUs from '@/components/AboutUs/AboutUs';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import { buildAlternates } from '@/lib/seo-config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
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
    alternates: buildAlternates(locale, '/about-us'),
    openGraph: {
      title: 'About DataFlowX — OT Cybersecurity Specialists',
      description:
        'EAL4+ certified data diode and unidirectional gateway solutions. Gartner-recognized. Protecting critical infrastructure globally.',
      url: `https://dataflowx.com/${locale}/about-us`,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
  };
}

export default function AboutUsPage() {
  return (
    <main>
      <VideoBackground />
      
      {/* Spacer to push content below the fixed navigation */}
      <div style={{ paddingTop: '80px' }}>
        <AboutUs />
      </div>

    </main>
  );
}
