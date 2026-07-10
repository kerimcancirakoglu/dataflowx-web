'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';
import Image from 'next/image';
import { USE_CASES } from '@/data/useCases';
import PdfLeadModal from '@/components/PdfLeadModal/PdfLeadModal';
import { useTranslations, useLocale } from 'next-intl';

type ResourceType = 'Data Sheet' | 'Whitepaper' | 'Case Study' | 'Guide' | 'Report' | 'Use Case';
type ProductType = 'DFX Unidirectional Gateway' | 'DFX Malware Mitigation Sandbox' | 'DFX Email Security Platform' | 'DFX PASS' | 'DFX Secure Remote Access' | 'DFX Media Transfer Station' | 'DFX IntelRoom' | 'DFX CDR';
type UseCaseType = 'Energy & SCADA' | 'Defense & Military' | 'Financial Services' | 'Critical Infrastructure' | 'Logistics' | 'Manufacturing';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  product?: ProductType;
  products?: ProductType[];
  useCase?: UseCaseType;
  date: string;
  link: string;
  image: string;
  /** Locale-specific PDF URLs. 'ar' falls back to 'en' if not set. */
  fileUrls?: { en?: string; tr?: string; ar?: string };
}

const resourcesData: Resource[] = [
  {
    id: 'ds-unidirectional-gateway',
    title: 'DFX Unidirectional Gateway Data Sheet',
    description: 'Detailed technical specifications for DataFlowX EAL4+ certified unidirectional gateway.',
    type: 'Data Sheet',
    product: 'DFX Unidirectional Gateway',
    useCase: 'Critical Infrastructure',
    date: '2023-11-15',
    link: '/resources/ds-unidirectional-gateway',
    image: '/Kapak/kapaklar/datadiode1.jpg',
    fileUrls: {
      en: 'https://cdn.sanity.io/files/15oto8dp/production/bb5414c1b49bad2a4a6a8c14d135d9c7e7b1c803.pdf',
      tr: 'https://cdn.sanity.io/files/15oto8dp/production/ca93d525146da686651471dd93aa1c8973fddb49.pdf',
    },
  },
  {
    id: 'ds-secure-remote-access',
    title: 'DFX Secure Remote Access Data Sheet',
    description: 'Architecture and features of our secure remote access and cross-domain solution.',
    type: 'Data Sheet',
    product: 'DFX Secure Remote Access',
    useCase: 'Defense & Military',
    date: '2023-12-01',
    link: '/resources/ds-secure-remote-access',
    image: '/Kapak/kapaklar/databroker1.jpg',
    fileUrls: {
      en: 'https://cdn.sanity.io/files/15oto8dp/production/509b91b3b92053520d3feff09f3d94933caa089c.pdf',
      tr: 'https://cdn.sanity.io/files/15oto8dp/production/8f4d0ba10c9301795f006aaf8facfb72ac3efaa6.pdf',
    },
  },
  {
    id: 'ds-media-transfer-station',
    title: 'DFX Media Transfer Station Data Sheet',
    description: 'Technical details about our secure USB kiosk featuring multi-engine AV and Deep CDR sanitization.',
    type: 'Data Sheet',
    product: 'DFX Media Transfer Station',
    useCase: 'Defense & Military',
    date: '2024-04-12',
    link: '/resources/ds-media-transfer-station',
    image: '/Kapak/kapaklar/datastation1.jpg',
    fileUrls: {
      en: 'https://cdn.sanity.io/files/15oto8dp/production/696accc5bea7ff5a4587c93640cae548fd0a3398.pdf',
      tr: 'https://cdn.sanity.io/files/15oto8dp/production/5bef34b392aeaafa7a63392e202498e642637aab.pdf',
    },
  },
  {
    id: 'ds-email-security',
    title: 'DFX Email Security Platform Data Sheet',
    description: 'Deep CDR and AI behavior detection for zero-trust email gateways.',
    type: 'Data Sheet',
    product: 'DFX Email Security Platform',
    useCase: 'Financial Services',
    date: '2024-05-15',
    link: '/resources/ds-email-security',
    image: '/Kapak/kapaklar/datamessage1.jpg',
    fileUrls: {
      en: 'https://cdn.sanity.io/files/15oto8dp/production/be418709f8f967d2550d0b5d0415cb9c89874b13.pdf',
      tr: 'https://cdn.sanity.io/files/15oto8dp/production/2af19abc75e8fe789d3290b2eb37a5df959e7b6e.pdf',
    },
  },
  {
    id: 'guide-email-cyber-resilience',
    title: 'When the Inbox Becomes the Breach: Email Cyber Resilience Guide',
    description: 'Next-generation email threats, social engineering and multi-stage attack patterns targeting enterprise critical infrastructure — and how to stop them.',
    type: 'Guide',
    product: 'DFX Email Security Platform',
    useCase: 'Financial Services',
    date: '2026-07-09',
    link: '/resources/guide-email-cyber-resilience',
    image: '/Kapak/kapaklar/email-cyber-resilience.jpg',
    fileUrls: {
      en: 'https://cdn.sanity.io/files/15oto8dp/production/990ad08c6de00014dd7ae0ac2ae193b490447be5.pdf',
    },
  },
  {
    id: 'ds-malware-sandbox',
    title: 'DFX Malware Mitigation Sandbox Data Sheet',
    description: 'Deep content inspection and sandboxing to neutralize advanced malware before it enters secure networks.',
    type: 'Data Sheet',
    product: 'DFX Malware Mitigation Sandbox',
    useCase: 'Critical Infrastructure',
    date: '2024-06-01',
    link: '/resources/ds-malware-sandbox',
    image: '/Kapak/kapaklar/datasecure1.jpg',
    fileUrls: {
      en: 'https://cdn.sanity.io/files/15oto8dp/production/843f35a621b8426db2b05eeb9659bd021ae86ef9.pdf',
      tr: 'https://cdn.sanity.io/files/15oto8dp/production/cc1123960c3ffd234fc0ea91e5ca5f4ff29d6af5.pdf',
    },
  },
  {
    id: 'ds-pass',
    title: 'DFX PASS Data Sheet',
    description: 'Portable Access Security Solution for secure, hardware-isolated media transfer and authentication.',
    type: 'Data Sheet',
    product: 'DFX PASS',
    useCase: 'Defense & Military',
    date: '2024-06-15',
    link: '/resources/ds-pass',
    image: '/Kapak/kapaklar/dataportx1.jpg',
    fileUrls: { en: 'https://cdn.sanity.io/files/15oto8dp/production/d2fa8ee1bd87320fd7504dd8d9ea7c34217ab3d4.pdf' },
  }
];

const allResourcesData: Resource[] = [
  ...resourcesData,
  ...USE_CASES.map((uc) => {
    let assignedUseCase: UseCaseType | undefined = undefined;
    if (uc.slug === 'financial-services-targeted-sector') assignedUseCase = 'Financial Services';
    if (uc.slug === 'energy-utilities-critical-infrastructure') assignedUseCase = 'Energy & SCADA';
    if (uc.slug === 'defense-government-controlled-access') assignedUseCase = 'Defense & Military';
    if (uc.slug === 'manufacturing-industrial-production-floor') assignedUseCase = 'Manufacturing';
    if (uc.slug === 'oil-gas-physical-catastrophe') assignedUseCase = 'Critical Infrastructure';
    if (uc.slug === 'energy-hydroelectric-ot-it-isolation') assignedUseCase = 'Energy & SCADA';
    if (uc.slug === 'defense-supplier-zero-trust-remote-access') assignedUseCase = 'Defense & Military';
    if (uc.slug === 'finance-bec-email-security') assignedUseCase = 'Financial Services';
    if (uc.slug === 'manufacturing-cnc-zero-usb-policy') assignedUseCase = 'Manufacturing';
    if (uc.slug === 'energy-ot-usb-threat-defense') assignedUseCase = 'Energy & SCADA';

    return {
      id: uc.slug,
      title: uc.title,
      description: uc.challenge,
      type: 'Use Case' as ResourceType,
      products: uc.products as ProductType[],
      useCase: assignedUseCase,
      date: uc.date,
      link: `/resources/use-cases/${uc.slug}`,
      image: uc.image,
    };
  })
];

const allTypes: ResourceType[] = ['Guide', 'Report', 'Data Sheet', 'Case Study', 'Whitepaper', 'Use Case'];
const allProducts: ProductType[] = ['DFX Unidirectional Gateway', 'DFX Malware Mitigation Sandbox', 'DFX Email Security Platform', 'DFX PASS', 'DFX Secure Remote Access', 'DFX Media Transfer Station', 'DFX IntelRoom', 'DFX CDR'];
const allUseCases: UseCaseType[] = ['Energy & SCADA', 'Defense & Military', 'Financial Services', 'Critical Infrastructure', 'Logistics', 'Manufacturing'];



function resolveFileUrl(fileUrls: Resource['fileUrls'], locale: string): string | undefined {
  if (!fileUrls) return undefined;
  if (locale === 'tr') return fileUrls.tr || fileUrls.en || undefined;
  if (locale === 'ar') return fileUrls.ar || fileUrls.en || undefined;
  return fileUrls.en || undefined;
}

function ResourcesContent() {
  const t = useTranslations('Resources');
  const locale = useLocale();
  const searchParams = useSearchParams();

  // URL'den başlangıç filtrelerini oku
  const initialType = searchParams.get('type') as ResourceType | null;
  const initialUseCase = searchParams.get('useCase') as UseCaseType | null;

  const [searchQuery, setSearchQuery] = useState('');
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<Set<ResourceType>>(
    initialType ? new Set([initialType]) : new Set()
  );
  const [selectedProducts, setSelectedProducts] = useState<Set<ProductType>>(new Set());
  const [selectedUseCases, setSelectedUseCases] = useState<Set<UseCaseType>>(
    initialUseCase ? new Set([initialUseCase]) : new Set()
  );

  // URL param değiştiğinde state'i güncelle (client-side navigation'da component remount olmayabilir)
  useEffect(() => {
    setSelectedTypes(initialType ? new Set([initialType]) : new Set());
  }, [initialType]);

  useEffect(() => {
    setSelectedUseCases(initialUseCase ? new Set([initialUseCase]) : new Set());
  }, [initialUseCase]);

  // PDF Lead Gen Modal State
  const [downloadTarget, setDownloadTarget] = useState<{ title: string; fileUrl?: string } | null>(null);

  const handleResourceClick = (e: React.MouseEvent<HTMLAnchorElement>, resource: Resource) => {
    const pdfTypes: ResourceType[] = ['Data Sheet', 'Whitepaper', 'Guide', 'Report'];

    if (pdfTypes.includes(resource.type)) {
      e.preventDefault();
      setDownloadTarget({ title: resource.title, fileUrl: resolveFileUrl(resource.fileUrls, locale) });
    }
  };

  const handleModalClose = () => {
    setDownloadTarget(null);
  };

  const handleModalSubmit = () => {
    // fileUrl download is handled inside PdfLeadModal via triggerDownload
    setDownloadTarget(null);
  };

  const finalResourcesData = useMemo(() => {
    return allResourcesData;
  }, []);

  // Filter resources based on all active criteria
  const filteredResources = useMemo(() => {
    return finalResourcesData.filter((res) => {
      // 1. Main Search Filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!res.title.toLowerCase().includes(query) && !res.description.toLowerCase().includes(query)) {
          return false;
        }
      }
      
      // 2. Type Filter
      if (selectedTypes.size > 0 && !selectedTypes.has(res.type)) {
        return false;
      }

      // 3. Product Filter (AND logic: resource must contain ALL selected products)
      if (selectedProducts.size > 0) {
        let satisfiesAll = true;
        for (const selected of selectedProducts) {
          const hasSelected = (res.product === selected) || (res.products && res.products.includes(selected));
          if (!hasSelected) {
            satisfiesAll = false;
            break;
          }
        }
        if (!satisfiesAll) {
          return false;
        }
      }

      // 4. Use Case Filter
      if (selectedUseCases.size > 0 && (!res.useCase || !selectedUseCases.has(res.useCase))) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedTypes, selectedProducts, selectedUseCases, finalResourcesData]);

  const toggleType = (type: ResourceType) => {
    const next = new Set(selectedTypes);
    if (next.has(type)) next.delete(type);
    else next.add(type);
    setSelectedTypes(next);
  };

  const toggleProduct = (product: ProductType) => {
    const next = new Set(selectedProducts);
    if (next.has(product)) next.delete(product);
    else next.add(product);
    setSelectedProducts(next);
  };

  const toggleUseCase = (useCase: UseCaseType) => {
    const next = new Set(selectedUseCases);
    if (next.has(useCase)) next.delete(useCase);
    else next.add(useCase);
    setSelectedUseCases(next);
  };

  const clearFilters = () => {
    setSelectedTypes(new Set());
    setSelectedProducts(new Set());
    setSelectedUseCases(new Set());
    setSearchQuery('');
    setProductSearchQuery('');
  };

  // Filter products list based on the sidebar product search
  const visibleProducts = allProducts.filter(p => 
    p.toLowerCase().includes(productSearchQuery.toLowerCase())
  );

  return (
    <div className={styles.pageWrapper}>
      
      {/* Top Header Area */}
      <div className={styles.topHeader}>
        <div className={styles.headerLeft}>
          <h1 className={styles.mainTitle}>All Resources</h1>
          <span className={styles.resourceCountBadge}>{filteredResources.length}</span>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.searchBox}>
            <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder={t('searchPlaceholder')} 
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className={styles.layoutContainer}>
        
        {/* Left Sidebar - Filters */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h2 className={styles.sidebarTitle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              {t('filterTitle')}
            </h2>
            {(selectedTypes.size > 0 || selectedProducts.size > 0 || selectedUseCases.size > 0 || searchQuery) && (
              <button className={styles.clearAllBtn} onClick={clearFilters}>
                {t('clearAll')}
              </button>
            )}
          </div>

          <div className={styles.filterGroup}>
            {allTypes.map(type => {
              const count = finalResourcesData.filter(r => r.type === type).length;
              if (count === 0) return null;
              return (
                <label key={type} className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    className={styles.checkbox}
                    checked={selectedTypes.has(type)}
                    onChange={() => toggleType(type)}
                  />
                  <span className={styles.checkboxText}>{type} <span className={styles.itemCount}>[{count}]</span></span>
                </label>
              );
            })}
          </div>

          {/* Product Filters */}
          <div className={styles.filterGroup}>
            <h3 className={styles.groupTitle}>{t('productLabel')}</h3>
            <div className={styles.subSearchBox}>
              <svg className={styles.subSearchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                placeholder={t('filterByTyping')} 
                className={styles.subSearchInput}
                value={productSearchQuery}
                onChange={(e) => setProductSearchQuery(e.target.value)}
              />
            </div>
            <div className={styles.checkboxListScroll}>
              {visibleProducts.map(product => {
                const count = finalResourcesData.filter(r => r.product === product || (r.products && r.products.includes(product))).length;
                return (
                  <label key={product} className={styles.checkboxLabel}>
                    <input 
                      type="checkbox" 
                      className={styles.checkbox}
                      checked={selectedProducts.has(product)}
                      onChange={() => toggleProduct(product)}
                    />
                    <span className={styles.checkboxText}>{product} <span className={styles.itemCount}>[{count}]</span></span>
                  </label>
                );
              })}
              {visibleProducts.length === 0 && (
                <p className={styles.noMatchText}>{t('noProduct')}</p>
              )}
            </div>
          </div>

          {/* Use Case Filters */}
          <div className={styles.filterGroup}>
            <h3 className={styles.groupTitle}>{t('useCaseLabel')}</h3>
            <div className={styles.checkboxListScroll}>
              {allUseCases.map(useCase => {
                const count = finalResourcesData.filter(r => r.useCase === useCase).length;
                if (count === 0) return null; // Sadece içerik olanları göster
                return (
                  <label key={useCase} className={styles.checkboxLabel}>
                    <input 
                      type="checkbox" 
                      className={styles.checkbox}
                      checked={selectedUseCases.has(useCase)}
                      onChange={() => toggleUseCase(useCase)}
                    />
                    <span className={styles.checkboxText}>{useCase} <span className={styles.itemCount}>[{count}]</span></span>
                  </label>
                );
              })}
            </div>
          </div>

        </aside>

        {/* Right Content - Grid */}
        <div className={styles.mainContent}>
          <div className={styles.gridContainer}>
            {filteredResources.map((resource) => (
              <div key={resource.id} className={styles.card}>
                <div className={styles.cardImageWrapper}>
                  <Image src={resource.image} alt={resource.title} fill style={{ objectFit: 'cover' }} className={styles.cardImage} />
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardType}>{resource.type}</div>
                  <h3 className={styles.cardTitle}>{resource.title}</h3>
                  <p className={styles.cardDesc} style={{fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem', lineHeight: 1.5}}>
                    {resource.description.substring(0, 100)}{resource.description.length > 100 ? '...' : ''}
                  </p>
                  <a 
                    href={resource.link} 
                    className={styles.readMoreLink}
                    onClick={(e) => handleResourceClick(e, resource)}
                  >
                    {['Data Sheet', 'Whitepaper', 'Guide', 'Report'].includes(resource.type) ? t('downloadPDF') : t('readMore')} 
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '6px'}}>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          {filteredResources.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🔍</div>
              <h3>{t('noResources')}</h3>
              <p>{t('noResourcesHint')}</p>
              <button className={styles.primaryBtn} onClick={clearFilters}>{t('clearFilters')}</button>
            </div>
          )}
        </div>
        
      </div>

      {/* PDF Lead Generation Modal */}
      <PdfLeadModal
        isOpen={downloadTarget !== null}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        documentName={downloadTarget?.title}
        fileUrl={downloadTarget?.fileUrl}
      />
    </div>
  );
}

export default function ResourcesClient() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <ResourcesContent />
    </Suspense>
  );
}
