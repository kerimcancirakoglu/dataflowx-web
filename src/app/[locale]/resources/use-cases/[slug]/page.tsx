import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav/Nav';
import styles from './page.module.css';
import { USE_CASES } from '@/data/useCases';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const useCase = USE_CASES.find(u => u.slug === slug);
  if (!useCase) return { title: 'Not Found' };

  return {
    title: `${useCase.title} | DFX Zero Trust`,
    description: useCase.challenge,
  };
}

export function generateStaticParams() {
  return USE_CASES.map(useCase => ({
    slug: useCase.slug,
  }));
}

const getProductUrl = (productName: string) => {
  switch (productName) {
    case 'DFX Unidirectional Gateway': return '/unidirectional-gateway';
    case 'DFX Secure Remote Access': return '/secure-remote-access';
    case 'DFX E-Mail Security Platform': return '/email-security-platform';
    case 'DFX IntelRoom': return '/intelroom';
    case 'TrueCDR™': return '/true-cdr';
    case 'DFX Sandbox': return '/sandbox';
    case 'DFX Media Transfer Station': return '/media-transfer-station';
    case 'DFX PortX': return '/portx';
    default: return '/#solutions';
  }
};

const renderTextContent = (text: string, isChallenge: boolean = false) => {
  if (!text) return null;
  return text.split('\n\n').map((paragraph, idx) => {
    if (paragraph.trim().startsWith('Key Outcomes:')) {
      const parts = paragraph.split('\n');
      return (
        <div key={idx} className={styles.outcomesBlock}>
          <h3 className={styles.outcomesTitle}>{parts[0]}</h3>
          <ul className={styles.outcomesList}>
            {parts.slice(1).map((item, i) => {
              if (!item.trim()) return null;
              return <li key={i}>{item.replace('• ', '').trim()}</li>;
            })}
          </ul>
        </div>
      );
    }
    
    return (
      <p key={idx} className={`${styles.paragraph} ${isChallenge && idx === 0 ? styles.dropCap : ''}`}>
        {paragraph}
      </p>
    );
  });
};

export default async function UseCaseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const useCase = USE_CASES.find(u => u.slug === slug);

  if (!useCase) {
    notFound();
  }

  return (
    <div className={styles.pageWrapper}>
      <Nav />
      
      {/* Hero Section with Photo and Overlay */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img src={useCase.image} alt={useCase.title} className={styles.heroImage} />
        </div>
        <div className={styles.heroOverlay} />
        
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{useCase.title}</h1>
          <img src="/DataFlowX_Logo_W.png" alt="DataFlowX Logo" className={styles.heroLogo} />
        </div>
      </section>

      {/* Content Section - 2 Column Layout */}
      <section className={styles.contentContainer}>
        
        {/* Main Content Column */}
        <div className={styles.mainContent}>
          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <svg className={styles.sectionIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <div className={styles.sectionLabel}>The Challenge</div>
            </div>
            <div className={styles.sectionText}>{renderTextContent(useCase.challenge, true)}</div>
          </div>

          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <svg className={styles.sectionIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <polyline points="9 12 11 14 15 10"></polyline>
              </svg>
              <div className={styles.sectionLabel}>Solution & Impact</div>
            </div>
            <div className={styles.sectionText}>{renderTextContent(useCase.solutionAndImpact, false)}</div>
          </div>

          {useCase.quote && (
            <div className={styles.quoteBlock}>
              <div className={styles.quoteText}>"{useCase.quote.text}"</div>
              <div className={styles.quoteAuthor}>{useCase.quote.author}</div>
            </div>
          )}
        </div>

        {/* Sidebar Column */}
        <aside className={styles.sidebar}>
          
          <div className={styles.sidebarBlock}>
            <div className={styles.sidebarLabel}>Customer</div>
            <div className={styles.sidebarValue}>{useCase.customer}</div>
          </div>

          <div className={styles.sidebarBlock}>
            <div className={styles.sidebarLabel}>Industry</div>
            <div className={styles.sidebarValue}>{useCase.category}</div>
          </div>

          <div className={styles.sidebarBlock}>
            <div className={styles.sidebarLabel}>Date</div>
            <div className={styles.sidebarValue}>{useCase.date}</div>
          </div>

          <div className={styles.sidebarBlock}>
            <div className={styles.sidebarLabel}>Products Used</div>
            <div className={styles.productList}>
              {useCase.products.map((product) => (
                <Link key={product} href={getProductUrl(product)} className={styles.productPill}>
                  {product}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              ))}
            </div>
          </div>

        </aside>

      </section>
    </div>
  );
}
