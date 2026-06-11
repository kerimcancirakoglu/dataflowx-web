// src/app/resources/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav/Nav';
import Contact from '@/components/Contact/Contact';
import TableOfContents from '@/components/BlogLayout/TableOfContents';
import SocialShare from '@/components/BlogLayout/SocialShare';
import styles from './page.module.css';
import contentStyles from '@/components/BlogLayout/BlogContentStyles.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

// Mock Resource logic
const MOCK_RESOURCES: Record<string, any> = {
  'ds-datadiodex': {
    title: 'DFX Unidirectional Gateway Data Sheet',
    date: '2023-11-15',
    content: '<p>Detailed technical specifications for DataFlowX EAL4+ certified unidirectional gateway.</p><h2>Hardware Isolation</h2><p>Our gateways provide absolute one-way data transfer, ensuring that no malicious payloads or control commands can ever reach the protected network.</p><p><a href="#" class="downloadBtn">Download PDF</a></p>',
    excerpt: 'Detailed technical specifications for DataFlowX EAL4+ certified unidirectional gateway.',
    author: { name: 'DFX Product Team' },
    readingTime: '1 min read',
    featuredImage: '/Kapak/kapaklar/datadiode1.jpg'
  },
  'ds-sra': {
    title: 'DFX Secure Remote Access Features',
    date: '2023-12-01',
    content: '<p>Architecture and features of our secure remote access and cross-domain solution.</p><h2>Zero Trust Remote Access</h2><p>DFX Secure Remote Access ensures that only authenticated users can access specific assets, with full session recording and granular access controls.</p><p><a href="#" class="downloadBtn">Download PDF</a></p>',
    excerpt: 'Architecture and features of our secure remote access and cross-domain solution.',
    author: { name: 'DFX Product Team' },
    readingTime: '1 min read',
    featuredImage: '/Kapak/kapaklar/databroker1.jpg'
  },
  'wp-ot-security': {
    title: 'Zero Trust in OT Environments',
    date: '2024-01-20',
    content: '<p>Comprehensive whitepaper on applying Zero Trust principles to industrial control systems using hardware isolation.</p><h2>Why IT Security Fails in OT</h2><p>Traditional firewalls are not enough for OT networks. Discover how hardware-based unidirectional gateways provide the ultimate security for critical infrastructure.</p><p><a href="#" class="downloadBtn">Download Whitepaper</a></p>',
    excerpt: 'Comprehensive whitepaper on applying Zero Trust principles to industrial control systems using hardware isolation.',
    author: { name: 'DFX Threat Intel' },
    readingTime: '12 min read',
    featuredImage: '/Kapak/kapaklar/data3.jpg'
  },
  'cs-energy': {
    title: 'Securing National Grid Infrastructure',
    date: '2024-02-10',
    content: '<p>Case study on how a major European energy provider achieved IEC 62443 compliance using DataFlowX.</p><h2>The Challenge</h2><p>The energy provider needed to transmit real-time SCADA data to their corporate network without exposing the ICS environment to cyber threats.</p><h2>The Solution</h2><p>By deploying DFX Unidirectional Gateways, they achieved 100% network isolation while maintaining real-time data flow.</p><p><a href="#" class="downloadBtn">Download Case Study</a></p>',
    excerpt: 'Case study on how a major European energy provider achieved IEC 62443 compliance using DataFlowX.',
    author: { name: 'DFX Case Studies' },
    readingTime: '5 min read',
    featuredImage: '/Kapak/kapaklar/datasecure1.jpg'
  },
  'wp-nis2': {
    title: 'NIS2 Compliance Guide for Critical Infrastructure',
    date: '2024-03-05',
    content: '<p>Understanding the OT security requirements of the NIS2 directive and how unidirectional gateways help.</p><h2>Meeting NIS2 Requirements</h2><p>Learn how physical network isolation helps organizations meet the strict security requirements of the European NIS2 directive.</p><p><a href="#" class="downloadBtn">Download Guide</a></p>',
    excerpt: 'Understanding the OT security requirements of the NIS2 directive and how unidirectional gateways help.',
    author: { name: 'DFX Compliance Team' },
    readingTime: '8 min read',
    featuredImage: '/Kapak/kapaklar/datastation1.jpg'
  },
  'ds-mts': {
    title: 'DFX Media Transfer Station Data Sheet',
    date: '2024-04-12',
    content: '<p>Technical details about our secure USB kiosk featuring multi-engine AV and Deep CDR sanitization.</p><h2>Secure File Transfer</h2><p>The Media Transfer Station ensures that files entering secure facilities via USB drives are completely sanitized and safe to use.</p><p><a href="#" class="downloadBtn">Download PDF</a></p>',
    excerpt: 'Technical details about our secure USB kiosk featuring multi-engine AV and Deep CDR sanitization.',
    author: { name: 'DFX Product Team' },
    readingTime: '1 min read',
    featuredImage: '/Kapak/kapaklar/datamessage1.jpg'
  },
  'rep-threat-2024': {
    title: '2024 ICS Threat Landscape Report',
    date: '2024-05-01',
    content: '<p>Analysis of emerging threats targeting industrial control systems and critical infrastructure.</p><h2>State of OT Security</h2><p>Ransomware attacks on OT networks are increasing. Read our comprehensive analysis of the latest threat vectors and defensive strategies.</p><p><a href="#" class="downloadBtn">Download Report</a></p>',
    excerpt: 'Analysis of emerging threats targeting industrial control systems and critical infrastructure.',
    author: { name: 'DFX Threat Intel' },
    readingTime: '15 min read',
    featuredImage: '/Kapak/kapaklar/data3.jpg'
  },
  'ds-email': {
    title: 'DFX E-Mail Security Platform Data Sheet',
    date: '2024-05-15',
    content: '<p>Deep CDR and AI behavior detection for zero-trust email gateways.</p><h2>Next-Gen Email Protection</h2><p>Stop advanced persistent threats, phishing, and zero-day malware before they reach your users inboxes with TrueCDR technology.</p><p><a href="#" class="downloadBtn">Download PDF</a></p>',
    excerpt: 'Deep CDR and AI behavior detection for zero-trust email gateways.',
    author: { name: 'DFX Product Team' },
    readingTime: '1 min read',
    featuredImage: '/Kapak/kapaklar/datamessage1.jpg'
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = MOCK_RESOURCES[resolvedParams.slug];

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
  const post = MOCK_RESOURCES[resolvedParams.slug];

  if (!post) notFound();

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
        <Nav />

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
            <img 
              src={imageUrl} 
              alt={post.title} 
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
      </main>
    </>
  );
}
