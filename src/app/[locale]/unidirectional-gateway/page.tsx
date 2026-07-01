import type { Metadata } from 'next';
import { draftMode } from 'next/headers';

import Nav from '@/components/Nav/Nav';
import ContactMini from '@/components/ContactMini/ContactMini';
import GartnerTestimonial from '@/components/GartnerTestimonial/GartnerTestimonial';
import DiodeModelViewerWrapper from '@/components/DiodeModelViewer/DiodeModelViewerWrapper';
import ProductSpecs from '@/components/ProductSpecs/ProductSpecs';
import FeaturesGrid from '@/components/FeaturesGrid/FeaturesGrid';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import GatewayFamily from '@/components/GatewayFamily/GatewayFamily';
import styles from './page.module.css';
import { getTranslations } from 'next-intl/server';
import { HreflangLinks } from '@/components/SEO/HreflangLinks';
import ProductSchema from '@/components/SEO/ProductSchema';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import { buildAlternates, SITE_URL } from '@/lib/seo-config';
import { getClient } from '@/sanity/lib/client';
import { productPageQuery } from '@/sanity/lib/queries';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { isEnabled: preview } = await draftMode();
  const sanityData = locale === 'en'
    ? await getClient(preview).fetch(productPageQuery, { slug: 'unidirectional-gateway' })
    : null;
  return {
    title: sanityData?.seoTitle ?? 'DataFlowX Unidirectional Gateway & Data Diode — OT/SCADA Security',
    description: sanityData?.seoDescription ??
      'DFX Unidirectional Gateway: EAL4+ certified hardware-enforced unidirectional gateway for OT/SCADA security. Physically isolates critical networks — recognized by Gartner for 3 consecutive years.',
    keywords: [
      'unidirectional gateway',
      'data diode',
      'OT security',
      'SCADA security',
      'ICS cybersecurity',
      'EAL4+ certified',
      'critical infrastructure protection',
      'hardware enforced security',
      'data diyodu',
      'tek yönlü ağ geçidi',
    ],
    alternates: buildAlternates(locale, '/unidirectional-gateway'),
    openGraph: {
      title: 'DFX Unidirectional Gateway — EAL4+ Certified',
      description:
        'Hardware-enforced one-way data transfer. Gartner-recognized. EAL4+ certified. Securing energy, defense, and critical infrastructure.',
      url: `${SITE_URL}/${locale}/unidirectional-gateway`,
      images: [{ url: `${SITE_URL}/og/unidirectional-gateway.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'DFX Unidirectional Gateway — EAL4+ Certified',
      description: 'Hardware-enforced one-way data transfer. Gartner-recognized. EAL4+ certified.',
      images: [`${SITE_URL}/og/unidirectional-gateway.jpg`],
    },
  };
}

// Product schema is now rendered via the ProductSchema component

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a unidirectional gateway?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A unidirectional gateway (also called a data diode) is a hardware device that physically enforces one-way data flow between networks. It makes reverse data transfer physically impossible, providing absolute protection for critical OT/SCADA networks.',
      },
    },
    {
      '@type': 'Question',
      name: 'What certifications does DFX Unidirectional Gateway hold?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DFX Unidirectional Gateway holds the EAL4+ Common Criteria certification and is recognized by Gartner in the Hype Cycle for CPS Security in the Unidirectional Gateways category for three consecutive years.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which industries use unidirectional gateways?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Unidirectional gateways are used in energy (power plants, oil & gas, SCADA), defense, nuclear facilities, water treatment, finance, and any critical infrastructure requiring absolute network isolation.',
      },
    },
  ],
};

export default async function UnidirectionalGatewayPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("UDG.page");
  const { isEnabled: preview } = await draftMode();
  const sanityData = locale === 'en'
    ? await getClient(preview).fetch(productPageQuery, { slug: 'unidirectional-gateway' })
    : null;
  const overview = sanityData?.overview;
  return (
    <main>
      <HreflangLinks slug="unidirectional-gateway" />
      <BreadcrumbSchema 
        items={[
          { name: 'DataFlowX', url: 'https://www.dataflowx.com' },
          { name: 'Solutions', url: 'https://www.dataflowx.com' },
          { name: 'DFX Unidirectional Gateway', url: 'https://www.dataflowx.com/en/unidirectional-gateway' }
        ]} 
      />
      <ProductSchema 
        name="DFX Unidirectional Gateway"
        description="EAL4+ certified hardware-enforced unidirectional gateway for OT/SCADA security. Physically prevents reverse data flow."
        url="https://www.dataflowx.com/en/unidirectional-gateway"
        image="https://www.dataflowx.com/og/unidirectional-gateway.jpg"
        category="Cybersecurity Hardware"
        award="Gartner Hype Cycle for CPS Security — Sample Vendor, 3 Consecutive Years"
        certifications="Common Criteria EAL4+"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <VideoBackground />
      <Nav />

      {/* Opening hero statement */}
      <div style={{ paddingTop: '8rem' }}>
        <GartnerTestimonial />
      </div>

      <div className="section-spacer" aria-hidden="true" />

      {/* Interactive hardware flow diagram — replaces the old static diagram */}
      <section style={{ padding: '0 2rem' }}>
        <GatewayFamily />
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* UG Text Details — the content from the old diagram's right column, now as full-width text */}
      <section className={styles.ugDetails} style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div className={styles.ugDetailsHeader}>
          <p className={styles.ugDetailsOverTitle}>{overview?.overTitle ?? t("overviewOverTitle")}</p>
          <h2 className={styles.ugDetailsTitle}>{overview?.title ?? "Unidirectional Gateway"}</h2>
          <p className={styles.ugDetailsDesc}>
            {overview?.description ?? t("overviewDesc")}
          </p>
        </div>
        <div className={styles.ugDetailsGrid}>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>{overview?.infoBlocks?.[0]?.label ?? t("protectsLabel")}</div>
            <p className={styles.ugDetailText}>
              {overview?.infoBlocks?.[0]?.text ?? t("protectsText")}
            </p>
          </div>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>{overview?.infoBlocks?.[1]?.label ?? t("gartnerLabel")}</div>
            <p className={styles.ugDetailText}>
              {overview?.infoBlocks?.[1]?.text ?? t("gartnerText")}
            </p>
          </div>
          <div className={styles.ugDetailCard}>
            <div className={styles.ugDetailLabel}>{overview?.infoBlocks?.[2]?.label ?? t("eal4Label")}</div>
            <p className={styles.ugDetailText}>
              {overview?.infoBlocks?.[2]?.text ?? t("eal4Text")}
            </p>
          </div>
        </div>
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* Interactive 3D Model Viewer */}
      <section style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <DiodeModelViewerWrapper />
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* Product Catalog / Specs */}
      <section style={{ padding: '0 2rem' }}>
        <ProductSpecs />
      </section>

      <div className="section-spacer" aria-hidden="true" />

      {/* Features Grid */}
      <section style={{ padding: '0 2rem' }}>
        <FeaturesGrid />
      </section>

      <div className="section-spacer" aria-hidden="true" />

      <ContactMini />
    </main>
  );
}
