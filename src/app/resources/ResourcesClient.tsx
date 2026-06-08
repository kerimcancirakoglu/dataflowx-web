'use client';

import { useState, useMemo } from 'react';
import styles from './page.module.css';

type ResourceType = 'Datasheet' | 'Whitepaper' | 'Case Study' | 'Guide' | 'Report';
type ProductType = 'DataDiodeX' | 'DataBrokerX' | 'Media Transfer Station' | 'Email Security Platform';
type UseCaseType = 'Energy & SCADA' | 'Defense & Military' | 'Financial Services' | 'Critical Infrastructure' | 'Logistics';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  product?: ProductType;
  useCase?: UseCaseType;
  date: string;
  link: string;
  image: string;
}

const resourcesData: Resource[] = [
  {
    id: 'ds-datadiodex',
    title: 'DataDiodeX Technical Datasheet',
    description: 'Detailed technical specifications for the DataFlowX EAL4+ certified unidirectional gateway.',
    type: 'Datasheet',
    product: 'DataDiodeX',
    useCase: 'Critical Infrastructure',
    date: '2023-11-15',
    link: '#download-datadiodex',
    image: '/og-image.jpg',
  },
  {
    id: 'ds-databrokerx',
    title: 'DataBrokerX Specifications',
    description: 'Architecture and features of our secure remote access and cross-domain solution.',
    type: 'Datasheet',
    product: 'DataBrokerX',
    useCase: 'Defense & Military',
    date: '2023-12-01',
    link: '#download-databrokerx',
    image: '/og-image.jpg',
  },
  {
    id: 'wp-ot-security',
    title: 'Zero Trust in OT Environments',
    description: 'A comprehensive whitepaper on applying Zero Trust principles to industrial control systems using hardware isolation.',
    type: 'Whitepaper',
    useCase: 'Critical Infrastructure',
    date: '2024-01-20',
    link: '#read-ot-security',
    image: '/og-image.jpg',
  },
  {
    id: 'cs-energy',
    title: 'Securing National Grid Infrastructure',
    description: 'How a major European energy provider achieved IEC 62443 compliance using DataFlowX.',
    type: 'Case Study',
    product: 'DataDiodeX',
    useCase: 'Energy & SCADA',
    date: '2024-02-10',
    link: '#read-energy-case',
    image: '/og-image.jpg',
  },
  {
    id: 'wp-nis2',
    title: 'NIS2 Compliance Guide for Critical Infrastructure',
    description: 'Understanding the OT security requirements of the NIS2 directive and how unidirectional gateways help.',
    type: 'Guide',
    useCase: 'Critical Infrastructure',
    date: '2024-03-05',
    link: '#read-nis2-guide',
    image: '/og-image.jpg',
  },
  {
    id: 'ds-mts',
    title: 'Media Transfer Station (MTS) Datasheet',
    description: 'Technical details on our secure USB kiosk with multi-engine AV and CDR sanitization.',
    type: 'Datasheet',
    product: 'Media Transfer Station',
    useCase: 'Defense & Military',
    date: '2024-04-12',
    link: '#download-mts',
    image: '/og-image.jpg',
  },
  {
    id: 'rep-threat-2024',
    title: '2024 ICS Threat Landscape Report',
    description: 'An analysis of emerging threats to industrial control systems and critical infrastructure.',
    type: 'Report',
    useCase: 'Energy & SCADA',
    date: '2024-05-01',
    link: '#read-report',
    image: '/og-image.jpg',
  },
  {
    id: 'ds-email',
    title: 'DFX Email Security Platform',
    description: 'Deep CDR and AI behavioral detection for zero-trust email gateways.',
    type: 'Datasheet',
    product: 'Email Security Platform',
    useCase: 'Financial Services',
    date: '2024-05-15',
    link: '#download-email',
    image: '/og-image.jpg',
  }
];

const allTypes: ResourceType[] = ['Guide', 'Report', 'Datasheet', 'Case Study', 'Whitepaper'];
const allProducts: ProductType[] = ['DataDiodeX', 'DataBrokerX', 'Media Transfer Station', 'Email Security Platform'];
const allUseCases: UseCaseType[] = ['Energy & SCADA', 'Defense & Military', 'Financial Services', 'Critical Infrastructure', 'Logistics'];

export default function ResourcesClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<Set<ResourceType>>(new Set());
  const [selectedProducts, setSelectedProducts] = useState<Set<ProductType>>(new Set());
  const [selectedUseCases, setSelectedUseCases] = useState<Set<UseCaseType>>(new Set());

  // Filter resources based on all active criteria
  const filteredResources = useMemo(() => {
    return resourcesData.filter((res) => {
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

      // 3. Product Filter
      if (selectedProducts.size > 0 && (!res.product || !selectedProducts.has(res.product))) {
        return false;
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
              const count = resourcesData.filter(r => r.type === type).length;
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
                const count = resourcesData.filter(r => r.product === product).length;
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
                <p className={styles.noMatchText}>No products match.</p>
              )}
            </div>
          </div>

          {/* Use Case Filters */}
          <div className={styles.filterGroup}>
            <h3 className={styles.groupTitle}>Use Case</h3>
            <div className={styles.checkboxListScroll}>
              {allUseCases.map(useCase => {
                const count = resourcesData.filter(r => r.useCase === useCase).length;
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
                  <a href={resource.link} className={styles.readMoreLink}>
                    {resource.type === 'Datasheet' ? 'Download PDF' : 'Read More'} 
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
              <p>Try adjusting your filters or search query.</p>
              <button className={styles.primaryBtn} onClick={clearFilters}>Clear Filters</button>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
