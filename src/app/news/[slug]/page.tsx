// src/app/news/[slug]/page.tsx
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

// Mock News logic
const MOCK_NEWS: Record<string, any> = {
  'news-1': {
    title: 'DataFlowX Awarded 2026 Cybersecurity Excellence Award',
    date: 'May 15, 2026',
    content: '<p>DataFlowX\'s DFX Unidirectional Gateway product won one of the industry\'s most prestigious awards in the "Critical Infrastructure Security" category.</p><h2>Setting the Standard for OT Security</h2><p>This award recognizes our continued commitment to providing unparalleled physical network isolation solutions that defend the world\'s most critical networks from sophisticated cyber threats.</p><h2>Looking Ahead</h2><p>As we celebrate this milestone, our engineering teams are already working on the next generation of our hardware-enforced security appliances.</p>',
    excerpt: 'DataFlowX\'s DFX Unidirectional Gateway product won one of the industry\'s most prestigious awards...',
    author: { name: 'DataFlowX PR Team' },
    readingTime: '2 min read',
    featuredImage: '/Kapak/kapaklar/datamessage1.jpg'
  },
  'news-2': {
    title: 'New Partnership Announcement: DataFlowX and European Energy Consortium',
    date: 'April 2, 2026',
    content: '<p>We have signed a strategic partnership to secure critical energy infrastructures. The new agreement starts distribution in 5 major European countries.</p>',
    excerpt: 'We have signed a strategic partnership to secure critical energy infrastructures...',
    author: { name: 'DataFlowX PR Team' },
    readingTime: '3 min read',
    featuredImage: '/Kapak/kapaklar/databroker1.jpg'
  },
  'news-3': {
    title: 'Global Tech Magazine: "DataFlowX, A Game Changer in OT Security"',
    date: 'March 18, 2026',
    content: '<p>Global Tech, one of the world\'s leading technology publications, reviewed the innovative approach of DataFlowX solutions in industrial security.</p>',
    excerpt: 'Global Tech reviewed the innovative approach of DataFlowX solutions...',
    author: { name: 'In the Media' },
    readingTime: '4 min read',
    featuredImage: '/Kapak/kapaklar/datasecure1.jpg'
  },
  'news-4': {
    title: 'Next-Generation DFX Secure Remote Access V2.0 Released',
    date: 'January 5, 2026',
    content: '<p>Setting new standards in secure remote access and Cross-Domain, DFX Secure Remote Access is now faster and more modular with its new version.</p>',
    excerpt: 'Setting new standards in secure remote access and Cross-Domain...',
    author: { name: 'Product Team' },
    readingTime: '3 min read',
    featuredImage: '/Kapak/kapaklar/datadiode1.jpg'
  },
  'news-5': {
    title: 'The DFX Impact at CyberSec 2025 Conference',
    date: 'November 20, 2025',
    content: '<p>Our CEO\'s speech on "Zero Trust in OT Networks" drew great interest from attendees.</p>',
    excerpt: 'Our CEO\'s speech on Zero Trust in OT Networks drew great interest...',
    author: { name: 'DataFlowX PR Team' },
    readingTime: '2 min read',
    featuredImage: '/Kapak/kapaklar/data3.jpg'
  },
  'news-6': {
    title: 'The Wall Street Journal: The Rise of Local Technology in Critical Infrastructures',
    date: 'October 10, 2025',
    content: '<p>WSJ\'s special report analyzes how DataFlowX competes globally as a national company.</p>',
    excerpt: 'WSJ\'s special report analyzes how DataFlowX competes globally...',
    author: { name: 'In the Media' },
    readingTime: '5 min read',
    featuredImage: '/Kapak/kapaklar/datastation1.jpg'
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = MOCK_NEWS[resolvedParams.slug];

  if (!post) {
    return { title: 'News Not Found | DataFlowX' };
  }

  const imageUrl = post.featuredImage ?? '/og-image.jpg';

  return {
    title: `${post.title} | DataFlowX Newsroom`,
    description: post.excerpt,
    alternates: {
      canonical: `https://dataflowx.com/news/${resolvedParams.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://dataflowx.com/news/${resolvedParams.slug}`,
      type: 'article',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(MOCK_NEWS).map(slug => ({ slug }));
}

export default async function NewsPostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = MOCK_NEWS[resolvedParams.slug];

  if (!post) notFound();

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
            <a href="/">Home</a> <span>/</span> <a href="/news">Newsroom</a> <span>/</span> <span>Article</span>
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
              <span>{post.date}</span>
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
