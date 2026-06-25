import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Script from 'next/script';
import '../globals.css';
import Footer from '@/components/Footer/Footer';
import { ApolloWrapper } from '@/providers/ApolloWrapper';
import OrganizationSchema from '@/components/SEO/OrganizationSchema';
const BASE_URL = 'https://www.dataflowx.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'DataFlowX (DFX) | Secure Critical Infrastructure via Unidirectional Gateway',
    template: '%s | DataFlowX (DFX)',
  },
  description:
    'Secure your critical network infrastructure with DataFlowX (DFX). EAL4+ certified unidirectional gateway, data diode, and email security solutions for zero-trust environments across Turkey, Gulf, and Europe.',
  keywords: [
    'dfx',
    'security',
    'infrastructure',
    'critical infrastructure',
    'secure network',
    'email security',
    'data diode',
    'unidirectional gateway',
    'OT security',
    'SCADA security',
    'zero trust',
    'ICS cybersecurity',
    'NIS2 compliance'
  ],
  authors: [{ name: 'DataFlowX', url: BASE_URL }],
  creator: 'DataFlowX',
  publisher: 'DataFlowX',
  openGraph: {
    title: 'DataFlowX (DFX) | Secure Network & Email Infrastructure',
    description:
      'Secure your critical network infrastructure with DataFlowX (DFX). EAL4+ certified unidirectional gateway and data diode solutions.',
    url: BASE_URL,
    siteName: 'DataFlowX',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DataFlowX (DFX) Zero Trust Unidirectional Gateway Architecture',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DataFlowX (DFX) | Secure Network & Email Infrastructure',
    description:
      'Secure your critical network infrastructure with DataFlowX (DFX). EAL4+ certified unidirectional gateway and data diode solutions.',
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

// Old organizationSchema was moved to OrganizationSchema.tsx

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

import { Noto_Sans_Arabic } from 'next/font/google';

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
});

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
  
  const fontClass = locale === 'ar' ? notoSansArabic.variable : '';

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning className={fontClass}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* hreflang alternate links will be injected by individual pages using HreflangLinks component */}
        {/* Organization structured data - JSON-LD */}
        <OrganizationSchema />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Theme init — runs before paint to prevent flash */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.setAttribute('data-theme','light');}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        {/* Google Analytics Placeholder */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
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
