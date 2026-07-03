import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { buildAlternates } from '@/lib/seo-config';
import Hero from '@/components/Hero/Hero';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import UseCases from '@/components/UseCases/UseCases';
import Solutions from '@/components/Solutions/Solutions';
import Testimonials from '@/components/Testimonials/Testimonials';
import LatestNews from '@/components/LatestNews/LatestNews';
import Contact from '@/components/Contact/Contact';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import { getClient } from '@/sanity/lib/client';
import { homePageQuery } from '@/sanity/lib/queries';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  // Sanity SEO verisi sadece EN locale için kullanılır — TR/AR fallback'e düşer
  const data = locale === 'en' ? await getClient().fetch(homePageQuery) : null;

  return {
    title: data?.seoTitle || 'DataFlowX (DFX) | Secure Critical Infrastructure via Unidirectional Gateway',
    description: data?.seoDescription || 'Secure your critical network infrastructure with DataFlowX (DFX). EAL4+ certified unidirectional gateway, data diode, and email security solutions for zero-trust environments.',
    alternates: buildAlternates(locale, ''),
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { isEnabled: preview } = await draftMode();

  // Sanity verisi SADECE EN locale'de çekilir — TR/AR her zaman messages/ fallback kullanır
  const homeData = locale === 'en' ? await getClient(preview).fetch(homePageQuery) : null;

  return (
    <main>
      <VideoBackground />
      <Hero sanityData={homeData} locale={locale} />

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
