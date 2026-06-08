import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
        destination: '/tr/cozumler/enerji-scada-guvenligi', // En uygun TR hedefi, çünkü ISO 27019 geçiyor. İngilizce okuyorsa /en/solutions/gulf de olabilir ama Türkiye enerji daha odaklı.
        permanent: true,
      },
      {
        source: '/solutions/scada-security',
        destination: '/tr/cozumler/enerji-scada-guvenligi', // SCADA güvenliği TR landing page'ine
        permanent: true,
      },
      {
        source: '/crypto-asset-storage',
        destination: '/solutions/file-security', // Dosya/Asset güvenliği için en yakın kategori
        permanent: true,
      },
      {
        source: '/solutions/secure-file-transfer',
        destination: '/solutions/file-security',
        permanent: true,
      },
      {
        source: '/post/cybersecurity-challenges-in-logistics-and-supply-chain',
        destination: '/resources/blog', // Spesifik sayfa yoksa blog ana dizinine yönlendirilir.
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
      // Note: /post/data-diodes-the-unsung-heroes-of-network-security is intentionally 
      // kept as an active page with a cross-canonical tag to /unidirectional-gateway.
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

export default nextConfig;
