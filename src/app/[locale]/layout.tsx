import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../globals.css';
import Footer from '@/components/Footer/Footer';
import { ApolloWrapper } from '@/providers/ApolloWrapper';
const BASE_URL = 'https://dataflowx.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'DataFlowX — Unidirectional Gateway & Data Diode Solutions',
    template: '%s | DataFlowX',
  },
  description:
    'Hardware-enforced unidirectional gateway and data diode solutions for critical infrastructure. EAL4+ certified. Trusted by energy, defense, and government sectors across Turkey, Gulf, and Europe.',
  keywords: [
    'data diode',
    'unidirectional gateway',
    'OT security',
    'SCADA security',
    'critical infrastructure protection',
    'zero trust',
    'ICS cybersecurity',
    'NIS2 compliance',
    'IEC 62443',
    'air gap security',
    'data diyodu',
    'unidirectional gateway Türkiye',
    'OT güvenlik',
    'SCADA güvenliği',
  ],
  authors: [{ name: 'DataFlowX', url: BASE_URL }],
  creator: 'DataFlowX',
  publisher: 'DataFlowX',
  alternates: {
    canonical: BASE_URL,
    languages: {
      'en': `${BASE_URL}/en`,
      'tr': `${BASE_URL}/tr`,
      'ar': `${BASE_URL}/ar`,
      'x-default': BASE_URL,
    },
  },
  openGraph: {
    title: 'DataFlowX — Unidirectional Gateway & Data Diode Solutions',
    description:
      'Hardware-enforced data isolation for critical infrastructure. EAL4+ certified. Trusted by energy, defense, and government sectors.',
    url: BASE_URL,
    siteName: 'DataFlowX',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DataFlowX Zero Trust Unidirectional Gateway Architecture',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DataFlowX — Unidirectional Gateway & Data Diode Solutions',
    description:
      'Hardware-enforced data isolation for critical infrastructure. EAL4+ certified.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN', // Add when available
  },
};

// Organization structured data (JSON-LD)
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DataFlowX',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    'DataFlowX develops hardware-enforced unidirectional gateway and data diode solutions for critical infrastructure cybersecurity.',
  foundingLocation: {
    '@type': 'Place',
    addressCountry: 'TR',
  },
  areaServed: ['TR', 'AE', 'SA', 'QA', 'RS', 'RO', 'BG', 'KZ', 'AZ', 'EG', 'DZ'],
  sameAs: [
    'https://www.linkedin.com/company/dataflowx',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'DataFlowX Cybersecurity Product Portfolio',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'DFX Unidirectional Gateway' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'DFX Secure Remote Access' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'DFX Media Transfer Station' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'DFX Email Security Platform' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'DFX Sandbox' } },
    ],
  },
};

// WebSite structured data for sitelinks searchbox
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'DataFlowX',
  url: BASE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const direction = locale === 'ar' ? 'rtl' : 'ltr';
  const messages = await getMessages();

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* hreflang alternate links */}
        <link rel="alternate" hrefLang="en" href={`${BASE_URL}/en`} />
        <link rel="alternate" hrefLang="tr" href={`${BASE_URL}/tr`} />
        <link rel="alternate" hrefLang="ar" href={`${BASE_URL}/ar`} />
        <link rel="alternate" hrefLang="x-default" href={BASE_URL} />
        {/* Organization & WebSite structured data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Theme init — runs before paint to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.setAttribute('data-theme','light');}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ApolloWrapper>
            {children}
            <Footer />
          </ApolloWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
