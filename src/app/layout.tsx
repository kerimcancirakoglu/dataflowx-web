import type { Metadata } from 'next';
import './globals.css';
import Footer from '@/components/Footer/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://dataflowx.com'), // Replace with actual domain when ready
  title: 'DataFlowX — Zero Trust Data Transfer Solutions',
  description: 'Hardware-enforced data isolation for critical infrastructure. Military-grade air-gap technology for defense, finance, and government sectors.',
  keywords: 'data diode, air gap, zero trust, cybersecurity, critical infrastructure, data transfer, military security',
  authors: [{ name: 'DataFlowX' }],
  openGraph: {
    title: 'DataFlowX — Zero Trust Data Transfer',
    description: 'Hardware-enforced data isolation for critical infrastructure.',
    url: 'https://dataflowx.com',
    siteName: 'DataFlowX',
    images: [
      {
        url: '/og-image.jpg', // Placeholder for actual OG image
        width: 1200,
        height: 630,
        alt: 'DataFlowX Zero Trust Architecture',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DataFlowX — Zero Trust Data Transfer',
    description: 'Hardware-enforced data isolation for critical infrastructure.',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
