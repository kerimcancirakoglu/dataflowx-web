import { MetadataRoute } from 'next';

const BASE_URL = 'https://dataflowx.com';

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

function makeRoutes(
  paths: string[],
  options: { changeFrequency: ChangeFrequency; priority: number; lastModified?: Date }
) {
  return paths.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: options.lastModified ?? new Date(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Core pages (highest priority) ─────────────────────────────────────────
  const coreRoutes = makeRoutes(
    ['', '/about-us', '/contact'],
    { changeFrequency: 'monthly', priority: 1.0 }
  );

  // ── Product pages ──────────────────────────────────────────────────────────
  const productRoutes = makeRoutes(
    [
      '/unidirectional-gateway',
      '/secure-remote-access',
      '/media-transfer-station',
      '/email-security-platform',
      '/sandbox',
    ],
    { changeFrequency: 'monthly', priority: 0.9 }
  );

  // ── Türkiye çözüm sayfaları ────────────────────────────────────────────────
  const turkeyRoutes = makeRoutes(
    [
      '/tr',
      '/tr/cozumler/enerji-scada-guvenligi',
      '/tr/cozumler/savunma-sanayi',
      '/tr/cozumler/kamu-kritik-altyapi',
      '/tr/cozumler/finans-sektoru',
      '/tr/cozumler/osb-endustriyel-aglar',
      '/tr/regulasyon/bddk-siber-guvenlik',
      '/tr/regulasyon/epdk-kritik-altyapi',
      '/tr/regulasyon/btk-veri-guvenligi',
      '/tr/regulasyon/tse-iso27001-ot',
    ],
    { changeFrequency: 'monthly', priority: 0.85 }
  );

  // ── Regional / English landing pages ──────────────────────────────────────
  const regionalRoutes = makeRoutes(
    [
      '/en',
      '/en/solutions/gulf',
      '/en/solutions/balkans',
      '/en/solutions/central-asia',
      '/en/solutions/north-africa',
    ],
    { changeFrequency: 'monthly', priority: 0.8 }
  );

  // ── Competitor comparison pages ────────────────────────────────────────────
  const compareRoutes = makeRoutes(
    [
      '/compare/dataflowx-vs-opswat',
      '/compare/dataflowx-vs-waterfall',
      '/compare/dataflowx-vs-owl',
      '/compare/dataflowx-vs-paloalto',
      '/compare/dataflowx-vs-claroty',
    ],
    { changeFrequency: 'monthly', priority: 0.75 }
  );

  // ── Resource & solution pages ──────────────────────────────────────────────
  const resourceRoutes = makeRoutes(
    [
      '/solutions/network-security',
      '/solutions/file-security',
      '/solutions/email-security',
      '/solutions/cross-domain-solutions',
      '/partners',
      '/resources/datasheets',
      '/resources/blog',
      '/resources/news',
      '/resources/customer-success-stories',
    ],
    { changeFrequency: 'weekly', priority: 0.7 }
  );

  // ── Blog posts (dynamic — extend here when CMS is integrated) ─────────────
  // const blogPosts = await fetchBlogPostsFromWPEngine();
  // const blogRoutes = blogPosts.map((post) => ({ url: `${BASE_URL}/resources/blog/${post.slug}`, ... }));

  return [
    ...coreRoutes,
    ...productRoutes,
    ...turkeyRoutes,
    ...regionalRoutes,
    ...compareRoutes,
    ...resourceRoutes,
  ];
}

