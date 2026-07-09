// src/app/resources/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Contact from '@/components/Contact/Contact';
import Image from 'next/image';
import TableOfContents from '@/components/BlogLayout/TableOfContents';
import SocialShare from '@/components/BlogLayout/SocialShare';
import LeadModalTrigger from './LeadModalTrigger';
import styles from './page.module.css';
import contentStyles from '@/components/BlogLayout/BlogContentStyles.module.css';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

interface MockResource {
  title: string;
  date: string;
  content: string;
  excerpt: string;
  author: { name: string };
  readingTime: string;
  featuredImage: string;
  fileUrls?: { en?: string; tr?: string };
}

// Mock Resource logic
const MOCK_RESOURCES: Record<string, MockResource> = {
  'ds-unidirectional-gateway': {
    title: 'DFX Unidirectional Gateway Data Sheet',
    date: '2023-11-15',
    content: '<p>Detailed technical specifications for DataFlowX EAL4+ certified unidirectional gateway.</p><h2>Hardware Isolation</h2><p>Our gateways provide absolute one-way data transfer, ensuring that no malicious payloads or control commands can ever reach the protected network.</p><p><a href="#" class="downloadBtn">Download PDF</a></p>',
    excerpt: 'Detailed technical specifications for DataFlowX EAL4+ certified unidirectional gateway.',
    author: { name: 'DFX Product Team' },
    readingTime: '1 min read',
    featuredImage: '/Kapak/kapaklar/datadiode1.jpg',
    fileUrls: {
      en: 'https://cdn.sanity.io/files/15oto8dp/production/bb5414c1b49bad2a4a6a8c14d135d9c7e7b1c803.pdf',
      tr: 'https://cdn.sanity.io/files/15oto8dp/production/ca93d525146da686651471dd93aa1c8973fddb49.pdf',
    },
  },
  'ds-secure-remote-access': {
    title: 'DFX Secure Remote Access Data Sheet',
    date: '2023-12-01',
    content: '<p>Architecture and features of our secure remote access and cross-domain solution.</p><h2>Zero Trust Remote Access</h2><p>DFX Secure Remote Access ensures that only authenticated users can access specific assets, with full session recording and granular access controls.</p><p><a href="#" class="downloadBtn">Download PDF</a></p>',
    excerpt: 'Architecture and features of our secure remote access and cross-domain solution.',
    author: { name: 'DFX Product Team' },
    readingTime: '1 min read',
    featuredImage: '/Kapak/kapaklar/databroker1.jpg',
    fileUrls: {
      en: 'https://cdn.sanity.io/files/15oto8dp/production/509b91b3b92053520d3feff09f3d94933caa089c.pdf',
      tr: 'https://cdn.sanity.io/files/15oto8dp/production/8f4d0ba10c9301795f006aaf8facfb72ac3efaa6.pdf',
    },
  },
  'ds-media-transfer-station': {
    title: 'DFX Media Transfer Station Data Sheet',
    date: '2024-04-12',
    content: '<p>Technical details about our secure USB kiosk featuring multi-engine AV and Deep CDR sanitization.</p><h2>Secure File Transfer</h2><p>The Media Transfer Station ensures that files entering secure facilities via USB drives are completely sanitized and safe to use.</p><p><a href="#" class="downloadBtn">Download PDF</a></p>',
    excerpt: 'Technical details about our secure USB kiosk featuring multi-engine AV and Deep CDR sanitization.',
    author: { name: 'DFX Product Team' },
    readingTime: '1 min read',
    featuredImage: '/Kapak/kapaklar/datastation1.jpg',
    fileUrls: {
      en: 'https://cdn.sanity.io/files/15oto8dp/production/696accc5bea7ff5a4587c93640cae548fd0a3398.pdf',
      tr: 'https://cdn.sanity.io/files/15oto8dp/production/5bef34b392aeaafa7a63392e202498e642637aab.pdf',
    },
  },
  'ds-email-security': {
    title: 'DFX Email Security Platform Data Sheet',
    date: '2024-05-15',
    content: '<p>Deep CDR and AI behavior detection for zero-trust email gateways.</p><h2>Next-Gen Email Protection</h2><p>Stop advanced persistent threats, phishing, and zero-day malware before they reach your users inboxes with DFX CDR technology.</p><p><a href="#" class="downloadBtn">Download PDF</a></p>',
    excerpt: 'Deep CDR and AI behavior detection for zero-trust email gateways.',
    author: { name: 'DFX Product Team' },
    readingTime: '1 min read',
    featuredImage: '/Kapak/kapaklar/datamessage1.jpg',
    fileUrls: {
      en: 'https://cdn.sanity.io/files/15oto8dp/production/be418709f8f967d2550d0b5d0415cb9c89874b13.pdf',
      tr: 'https://cdn.sanity.io/files/15oto8dp/production/2af19abc75e8fe789d3290b2eb37a5df959e7b6e.pdf',
    },
  },
  'guide-email-cyber-resilience': {
    title: 'When the Inbox Becomes the Breach: Email Cyber Resilience Guide',
    date: '2026-07-09',
    content: '<p>The baseline of enterprise defense has fundamentally shifted. Cybercriminals no longer seek only to frontally breach perimeter firewalls; instead, they compromise the human layer and abuse trusted workflows to gain an initial foothold.</p><h2>The Threat Landscape</h2><p>62% of global data breaches involve the human element. 49% year-over-year surge in ransomware groups targeting industrial infrastructure. 44% of AI-assisted initial access techniques are executed via phishing.</p><h2>Attack Vectors</h2><p>Business Email Compromise (BEC), AI-driven spear-phishing, visual format threats hidden in images, and supply chain compromise via trusted vendor emails.</p><h2>The Defense</h2><p>DFX Email Security Platform combines ML-based behavioral analysis, CDR, OCR scanning, and YARA-rule enforcement. DFX Malware Mitigation Sandbox provides isolated behavioral detonation for zero-day threats.</p><p><a href="#" class="downloadBtn">Download Guide</a></p>',
    excerpt: 'Next-generation email threats, social engineering and multi-stage attack patterns targeting enterprise critical infrastructure — and how to stop them.',
    author: { name: 'DFX Threat Intelligence' },
    readingTime: '15 min read',
    featuredImage: '/Kapak/kapaklar/email-cyber-resilience.jpg',
    fileUrls: {
      en: 'https://cdn.sanity.io/files/15oto8dp/production/990ad08c6de00014dd7ae0ac2ae193b490447be5.pdf',
    },
  },
  'ds-malware-sandbox': {
    title: 'DFX Malware Mitigation Sandbox Data Sheet',
    date: '2024-06-01',
    content: '<p>Deep content inspection and sandboxing technology that neutralizes advanced malware before it enters secure networks.</p><h2>Multi-Engine Analysis</h2><p>Files are analyzed by multiple AV engines and detonated in an isolated sandbox environment to detect zero-day threats.</p><p><a href="#" class="downloadBtn">Download PDF</a></p>',
    excerpt: 'Deep content inspection and sandboxing to neutralize advanced malware before it enters secure networks.',
    author: { name: 'DFX Product Team' },
    readingTime: '1 min read',
    featuredImage: '/Kapak/kapaklar/datasecure1.jpg',
    fileUrls: {
      en: 'https://cdn.sanity.io/files/15oto8dp/production/843f35a621b8426db2b05eeb9659bd021ae86ef9.pdf',
      tr: 'https://cdn.sanity.io/files/15oto8dp/production/cc1123960c3ffd234fc0ea91e5ca5f4ff29d6af5.pdf',
    },
  },
  'ds-pass': {
    title: 'DFX PASS Data Sheet',
    date: '2024-06-15',
    content: '<p>Portable Access Security Solution providing hardware-isolated media transfer and multi-factor authentication for high-security environments.</p><h2>Zero-Trust USB Access</h2><p>DFX PASS enforces policy-based access controls on removable media, preventing unauthorized data exfiltration and malware introduction.</p><p><a href="#" class="downloadBtn">Download PDF</a></p>',
    excerpt: 'Portable Access Security Solution for secure, hardware-isolated media transfer and authentication.',
    author: { name: 'DFX Product Team' },
    readingTime: '1 min read',
    featuredImage: '/Kapak/kapaklar/dataportx1.jpg',
    fileUrls: { en: 'https://cdn.sanity.io/files/15oto8dp/production/d2fa8ee1bd87320fd7504dd8d9ea7c34217ab3d4.pdf' },
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = MOCK_RESOURCES[resolvedParams.slug] as MockResource | undefined;

  if (!post) {
    return { title: 'Resource Not Found | DataFlowX' };
  }

  const imageUrl = post.featuredImage ?? '/og-image.jpg';

  return {
    title: `${post.title} | DataFlowX Resources`,
    description: post.excerpt,
    alternates: {
      canonical: `https://dataflowx.com/resources/${resolvedParams.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://dataflowx.com/resources/${resolvedParams.slug}`,
      type: 'article',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(MOCK_RESOURCES).map(slug => ({ slug }));
}

export default async function ResourcePostPage({ params }: Props) {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;
  const post = MOCK_RESOURCES[slug] as MockResource | undefined;

  if (!post) notFound();

  const fileUrls = post.fileUrls;
  const resolvedFileUrl = fileUrls
    ? (locale === 'tr' ? fileUrls.tr || fileUrls.en : fileUrls.en || fileUrls.tr) || undefined
    : undefined;

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const authorName = post.author?.name ?? 'DataFlowX Team';
  const readingTime = post.readingTime ?? '3 min read';
  const imageUrl = post.featuredImage;

  return (
    <>
      <main className={styles.main}>
        <div className={styles.bgGlow} aria-hidden="true" />

        {/* Hero Header */}
        <header className={styles.hero}>
          <div className={styles.breadcrumbs}>
            <a href="/">Home</a> <span>/</span> <a href="/resources">Resources</a> <span>/</span> <span>Detail</span>
          </div>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <div className={styles.authorAvatar}>
                {authorName.charAt(0)}
              </div>
              <span>{authorName}</span>
            </div>
            <div className={styles.metaItem}>
              <span>{formattedDate}</span>
            </div>
            <div className={styles.metaItem}>
              <span>{readingTime}</span>
            </div>
          </div>
        </header>

        {/* Full Width Featured Image */}
        {imageUrl && (
          <div className={styles.featuredImageContainer}>
            <Image
              src={imageUrl}
              alt={post.title}
              width={1200} height={600} style={{ width: '100%', height: 'auto' }}
              className={styles.featuredImageHero}
            />
          </div>
        )}

        {/* Two-Column Layout */}
        <div className={styles.layoutGrid}>

          {/* Main Content Column (Left) */}
          <article className={styles.contentColumn}>
            <div
              className={contentStyles.prose}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Right Sidebar (Sticky) */}
          <aside className={styles.sidebar}>
            <TableOfContents />
            <SocialShare />
          </aside>

        </div>

        <Contact />
        <LeadModalTrigger fileUrl={resolvedFileUrl} documentName={post.title} />
      </main>
    </>
  );
}
