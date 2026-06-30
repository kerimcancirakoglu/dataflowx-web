import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy-Report-Only',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.sanity.io https://vercel.live wss://ws-eu.pusher.com; media-src 'self'; frame-ancestors 'none';"
          }
        ],
      },
    ];
  },
  images: {
    loader: 'custom',
    loaderFile: './src/lib/image.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wp.dataflowx.com',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        pathname: '/avatar/**',
      },
    ],
  },
  async redirects() {
    return [
      // ── MIGRATION / SEO REDIRECTS ──────────────────────────────────────────
      // This ensures any old URLs point to the newly structured pages
      // using 301 Permanent Redirects for SEO value transfer.

      // 1. Unidirectional Gateway
      {
        source: '/products/data-diode',
        destination: '/unidirectional-gateway',
        permanent: true,
      },
      {
        source: '/solutions/unidirectional-gateway',
        destination: '/unidirectional-gateway',
        permanent: true,
      },
      
      // 2. Secure Remote Access
      {
        source: '/products/secure-remote-access',
        destination: '/secure-remote-access',
        permanent: true,
      },
      {
        source: '/solutions/databrokerx',
        destination: '/secure-remote-access',
        permanent: true,
      },

      // 3. MTS
      {
        source: '/products/mts',
        destination: '/media-transfer-station',
        permanent: true,
      },
      {
        source: '/solutions/usb-security',
        destination: '/media-transfer-station',
        permanent: true,
      },

      // 4. Regional Fallbacks
      {
        source: '/uae',
        destination: '/en/solutions/gulf',
        permanent: true,
      },
      {
        source: '/saudi',
        destination: '/en/solutions/gulf',
        permanent: true,
      },

      // 5. Old Language Parameters
      {
        source: '/',
        has: [
          {
            type: 'query',
            key: 'lang',
            value: 'tr',
          },
        ],
        destination: '/tr',
        permanent: true,
      },

      // 6. Missing Redirects (Old Site -> New Structure)
      {
        source: '/solutions/secure-data-sharing-with-third-parties',
        destination: '/solutions/cross-domain-solutions',
        permanent: true,
      },
      {
        source: '/post/cybersecurity-compliance-in-the-energy-sector-iso-iec-27019-requirements',
        destination: '/tr/cozumler/enerji-scada-guvenligi', 
        permanent: true,
      },
      {
        source: '/solutions/scada-security',
        destination: '/tr/cozumler/enerji-scada-guvenligi', 
        permanent: true,
      },
      {
        source: '/crypto-asset-storage',
        destination: '/solutions/file-security', 
        permanent: true,
      },
      {
        source: '/solutions/secure-file-transfer',
        destination: '/solutions/file-security',
        permanent: true,
      },
      {
        source: '/post/cybersecurity-challenges-in-logistics-and-supply-chain',
        destination: '/resources/blog', 
        permanent: true,
      },
      {
        source: '/datadiodex',
        destination: '/unidirectional-gateway',
        permanent: true,
      },
      {
        source: '/solutions/hardware-based-isolation',
        destination: '/unidirectional-gateway',
        permanent: true,
      },
      {
        source: '/post/sharing-threat-intelligence-between-networks-misp-and-data-diodes',
        destination: '/resources/blog', 
        permanent: true,
      },
      {
        source: '/post/ai-in-cybersecurity-benefits-vs-risks',
        destination: '/resources/blog', 
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
