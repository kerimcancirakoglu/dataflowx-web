'use client';

import { useState, useMemo } from 'react';
import styles from './page.module.css';
import { USE_CASES } from '@/data/useCases';
import PdfLeadModal from '@/components/PdfLeadModal/PdfLeadModal';

type ResourceType = 'Data Sheet' | 'Whitepaper' | 'Case Study' | 'Guide' | 'Report' | 'Use Case';
type ProductType = 'DFX Unidirectional Gateway' | 'DFX Sandbox' | 'DFX E-Mail Security Platform' | 'DFX PortX' | 'DFX Secure Remote Access' | 'DFX Media Transfer Station' | 'DFX IntelRoom' | 'TrueCDR™';
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
}

const resourcesData: Resource[] = [
  {
    id: 'ds-datadiodex',
    title: 'DFX Unidirectional Gateway Data Sheet',
    description: 'Detailed technical specifications for DataFlowX EAL4+ certified unidirectional gateway.',
    type: 'Data Sheet',
    product: 'DFX Unidirectional Gateway',
    useCase: 'Critical Infrastructure',
    date: '2023-11-15',
    link: '/resources/ds-datadiodex',
    image: '/Kapak/kapaklar/datadiode1.jpg',
  },
  {
    id: 'ds-sra',
    title: 'DFX Secure Remote Access Features',
    description: 'Architecture and features of our secure remote access and cross-domain solution.',
    type: 'Data Sheet',
    product: 'DFX Secure Remote Access',
    useCase: 'Defense & Military',
    date: '2023-12-01',
    link: '/resources/ds-sra',
    image: '/Kapak/kapaklar/databroker1.jpg',
  },
  {
    id: 'wp-ot-security',
    title: 'Zero Trust in OT Environments',
    description: 'Comprehensive whitepaper on applying Zero Trust principles to industrial control systems using hardware isolation.',
    type: 'Whitepaper',
    useCase: 'Critical Infrastructure',
    date: '2024-01-20',
    link: '/resources/wp-ot-security',
    image: '/Kapak/kapaklar/data3.jpg',
  },
  {
    id: 'cs-energy',
    title: 'Securing National Grid Infrastructure',
    description: 'Case study on how a major European energy provider achieved IEC 62443 compliance using DataFlowX.',
    type: 'Case Study',
    product: 'DFX Unidirectional Gateway',
    useCase: 'Energy & SCADA',
    date: '2024-02-10',
    link: '/resources/cs-energy',
    image: '/Kapak/kapaklar/datasecure1.jpg',
  },
  {
    id: 'wp-nis2',
    title: 'NIS2 Compliance Guide for Critical Infrastructure',
    description: 'Understanding the OT security requirements of the NIS2 directive and how unidirectional gateways help.',
    type: 'Guide',
    useCase: 'Critical Infrastructure',
    date: '2024-03-05',
    link: '/resources/wp-nis2',
    image: '/Kapak/kapaklar/datastation1.jpg',
  },
  {
    id: 'ds-mts',
    title: 'DFX Media Transfer Station Data Sheet',
    description: 'Technical details about our secure USB kiosk featuring multi-engine AV and Deep CDR sanitization.',
    type: 'Data Sheet',
    product: 'DFX Media Transfer Station',
    useCase: 'Defense & Military',
    date: '2024-04-12',
    link: '/resources/ds-mts',
    image: '/Kapak/kapaklar/datamessage1.jpg',
  },
  {
    id: 'rep-threat-2024',
    title: '2024 ICS Threat Landscape Report',
    description: 'Analysis of emerging threats targeting industrial control systems and critical infrastructure.',
    type: 'Report',
    useCase: 'Energy & SCADA',
    date: '2024-05-01',
    link: '/resources/rep-threat-2024',
    image: '/Kapak/kapaklar/data3.jpg',
  },
  {
    id: 'ds-email',
    title: 'DFX E-Mail Security Platform Data Sheet',
    description: 'Deep CDR and AI behavior detection for zero-trust email gateways.',
    type: 'Data Sheet',
    product: 'DFX E-Mail Security Platform',
    useCase: 'Financial Services',
    date: '2024-05-15',
    link: '/resources/ds-email',
    image: '/Kapak/kapaklar/datamessage1.jpg',
  }
];

const allResourcesData: Resource[] = [
  ...resourcesData,
  ...USE_CASES.map((uc) => {
    let assignedUseCase: UseCaseType | undefined = undefined;
    if (uc.slug === 'email-security-zero-tolerance') assignedUseCase = 'Financial Services';
    if (uc.slug === 'unidirectional-gateway-critical-infrastructure') assignedUseCase = 'Energy & SCADA';
    if (uc.slug === 'secure-remote-access-defense') assignedUseCase = 'Defense & Military';
    if (uc.slug === 'media-transfer-station-manufacturing') assignedUseCase = 'Manufacturing';

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
const allProducts: ProductType[] = ['DFX Unidirectional Gateway', 'DFX Sandbox', 'DFX E-Mail Security Platform', 'DFX PortX', 'DFX Secure Remote Access', 'DFX Media Transfer Station', 'DFX IntelRoom', 'TrueCDR™'];
const allUseCases: UseCaseType[] = ['Energy & SCADA', 'Defense & Military', 'Financial Services', 'Critical Infrastructure', 'Logistics', 'Manufacturing'];

export default function ResourcesClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<Set<ResourceType>>(new Set());
  const [selectedProducts, setSelectedProducts] = useState<Set<ProductType>>(new Set());
  const [selectedUseCases, setSelectedUseCases] = useState<Set<UseCaseType>>(new Set());
  
  // PDF Lead Gen Modal State
  const [downloadTarget, setDownloadTarget] = useState<string | null>(null);

  const handleResourceClick = (e: React.MouseEvent<HTMLAnchorElement>, resource: Resource) => {
    // Treat these types as PDFs for the demo
    const pdfTypes: ResourceType[] = ['Data Sheet', 'Whitepaper', 'Guide', 'Report'];
    
    if (pdfTypes.includes(resource.type)) {
      e.preventDefault();
      setDownloadTarget(resource.link);
    }
  };

  const handleModalClose = () => {
    // Demo flow: Redirect to blog (news) when closed
    window.location.href = '/news';
  };

  const handleModalSubmit = () => {
    if (downloadTarget) {
      // Demo flow: Redirect to blog (news) when submitted
      window.location.href = '/news';
    }
    setDownloadTarget(null);
  };

  // Filter resources based on all active criteria
  const filteredResources = useMemo(() => {
    return allResourcesData.filter((res) => {
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
  }, [searchQuery, selectedTypes, selectedProducts, selectedUseCases]);

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
              placeholder="Search resources..." 
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
              Filters
            </h2>
            {(selectedTypes.size > 0 || selectedProducts.size > 0 || selectedUseCases.size > 0 || searchQuery) && (
              <button className={styles.clearAllBtn} onClick={clearFilters}>
                Clear All
              </button>
            )}
          </div>

          <div className={styles.filterGroup}>
            {allTypes.map(type => {
              const count = allResourcesData.filter(r => r.type === type).length;
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
            <h3 className={styles.groupTitle}>Product</h3>
            <div className={styles.subSearchBox}>
              <svg className={styles.subSearchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                placeholder="Filter by typing" 
                className={styles.subSearchInput}
                value={productSearchQuery}
                onChange={(e) => setProductSearchQuery(e.target.value)}
              />
            </div>
            <div className={styles.checkboxListScroll}>
              {visibleProducts.map(product => {
                const count = allResourcesData.filter(r => r.product === product || (r.products && r.products.includes(product))).length;
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
                <p className={styles.noMatchText}>No matching product found.</p>
              )}
            </div>
          </div>

          {/* Use Case Filters */}
          <div className={styles.filterGroup}>
            <h3 className={styles.groupTitle}>Use Case</h3>
            <div className={styles.checkboxListScroll}>
              {allUseCases.map(useCase => {
                const count = allResourcesData.filter(r => r.useCase === useCase).length;
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
                  <img src={resource.image} alt={resource.title} className={styles.cardImage} />
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
                    {['Data Sheet', 'Whitepaper', 'Guide', 'Report'].includes(resource.type) ? 'Download PDF' : 'Read More'} 
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
              <h3>No resources found</h3>
              <p>Try changing your filters or search query.</p>
              <button className={styles.primaryBtn} onClick={clearFilters}>Clear Filters</button>
            </div>
          )}
        </div>
        
      </div>

      {/* PDF Lead Generation Modal */}
      <PdfLeadModal 
        isOpen={downloadTarget !== null}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}
