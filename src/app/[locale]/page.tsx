import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo-config';
import Nav from '@/components/Nav/Nav';
import Hero from '@/components/Hero/Hero';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import UseCases from '@/components/UseCases/UseCases';
import Solutions from '@/components/Solutions/Solutions';
import Testimonials from '@/components/Testimonials/Testimonials';
import LatestNews from '@/components/LatestNews/LatestNews';
import Contact from '@/components/Contact/Contact';
import VideoBackground from '@/components/VideoBackground/VideoBackground';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'DataFlowX (DFX) | Secure Critical Infrastructure via Unidirectional Gateway',
    description: 'Secure your critical network infrastructure with DataFlowX (DFX). EAL4+ certified unidirectional gateway, data diode, and email security solutions for zero-trust environments.',
    alternates: buildAlternates(locale, ''),
  };
}

export default async function Home() {
  return (
    <main>
      <VideoBackground />
      <Nav />
      <Hero />

      {/* Section spacer — 25vh isolation */}
      <div className="section-spacer" aria-hidden="true" />

      <HowItWorks />

      <div className="section-spacer" aria-hidden="true" />

      <UseCases />

      <div className="section-spacer" aria-hidden="true" />

      <Solutions />

      <div className="section-spacer" aria-hidden="true" />

      <Testimonials />

      <div className="section-spacer" aria-hidden="true" />

      <LatestNews />

      <div className="section-spacer" aria-hidden="true" />

      <Contact />
    </main>
  );
}
