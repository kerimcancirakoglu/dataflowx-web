'use client';

import { useState, useMemo } from 'react';
import styles from './page.module.css';

type BlogCategory = 
  | 'En Son'
  | 'Sektörel Haberler'
  | 'Cloud Security'
  | 'Kritik Ağ Güvenliği'
  | 'Email Security'
  | 'Dosya Güvenliği'
  | 'Supply Chain Security'
  | 'Threat Intelligence';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  category: BlogCategory;
  date: string;
  link: string;
  image: string;
  featured?: boolean;
  heroFeatured?: boolean;
}

const CATEGORIES: BlogCategory[] = [
  'En Son',
  'Sektörel Haberler',
  'Cloud Security',
  'Kritik Ağ Güvenliği',
  'Email Security',
  'Dosya Güvenliği',
  'Supply Chain Security',
  'Threat Intelligence',
];

const mockPosts: BlogPost[] = [
  {
    id: 'hero-1',
    title: 'Mini Shai-Hulud: TanStack, OpenAI ve npm Supply Chain',
    description: 'Kendi kendine yayılan solucan, bir kez daha güvenilir paketler ve veri akış kanalları üzerinden kritik altyapılara nasıl sızıyor?',
    category: 'Supply Chain Security',
    date: '2 Haziran 2026',
    link: '#',
    image: '/og-image.jpg',
    heroFeatured: true,
  },
  {
    id: 'feat-1',
    title: 'Birleştirilmiş PDF\'ler: Kötü Amaçlı Yazılım Önleme Motorlarını Aşmak',
    description: 'Belge tabanlı tehditler ve gelişmiş CDR teknikleri.',
    category: 'Dosya Güvenliği',
    date: '28 Mayıs 2026',
    link: '#',
    image: '/og-image.jpg',
    featured: true,
  },
  {
    id: 'feat-2',
    title: 'SBOM\'un Ötesinde: Görünürlüğü Uygulamaya Dönüştürmek',
    description: 'Yazılım tedarik zinciri güvenliğinde bir sonraki adım.',
    category: 'Supply Chain Security',
    date: '20 Mayıs 2026',
    link: '#',
    image: '/og-image.jpg',
    featured: true,
  },
  {
    id: 'feat-3',
    title: 'Ayrıcalık Yükseltmeden Tam Hizmet Engellemeye: Yeni ICS Zafiyetleri',
    description: 'Sektörel haberler ve yeni tehdit aktörleri üzerine inceleme.',
    category: 'Sektörel Haberler',
    date: '15 Mayıs 2026',
    link: '#',
    image: '/og-image.jpg',
    featured: true,
  },
  {
    id: 'grid-1',
    title: 'İçerik Temizleme ve Yeniden Yapılandırma (CDR): 2026\'nın En İyi Yöntemleri',
    description: 'Belge tabanlı tehditler, belgelerdeki sıfırıncı gün istismarlarından görünüşte güvenli dosyalara gizlenmiş APT\'lere kadar, işletmeler için en büyük riski taşıyor. DataFlowX MTS ile tam izolasyon.',
    category: 'Dosya Güvenliği',
    date: '10 Mayıs 2026',
    link: '#',
    image: '/og-image.jpg',
  },
  {
    id: 'grid-2',
    title: 'Axios npm Saldırısı: Güvenilir Bir Paket Nasıl Ele Geçirildi?',
    description: 'Tedarik zinciri saldırılarının anatomisi ve korunma yolları.',
    category: 'Supply Chain Security',
    date: '3 Nisan 2026',
    link: '#',
    image: '/og-image.jpg',
  },
  {
    id: 'grid-3',
    title: 'AB Siber Dayanıklılık Yasası (CRA): Donanım Üreticileri İçin Ne Anlama Geliyor?',
    description: 'Avrupa Birliği regülasyonları ve ICS/OT üreticilerine etkileri.',
    category: 'Sektörel Haberler',
    date: '2 Nisan 2026',
    link: '#',
    image: '/og-image.jpg',
  },
  {
    id: 'grid-4',
    title: 'Colonial Pipeline Benzeri Bir Saldırı Data Diode İle Nasıl Önlenebilirdi?',
    description: 'Fidye yazılımlarının OT ağlarına sıçramasını fiziksel olarak engellemenin mühendislik analizi.',
    category: 'Kritik Ağ Güvenliği',
    date: '28 Mart 2026',
    link: '#',
    image: '/og-image.jpg',
  },
  {
    id: 'grid-5',
    title: 'Veri Diodu Nedir? Ağ Güvenliğinin Gizli Kahramanları',
    description: 'Donanım destekli tek yönlü veri aktarımının temelleri.',
    category: 'Kritik Ağ Güvenliği',
    date: '15 Mart 2026',
    link: '/post/data-diodes-the-unsung-heroes-of-network-security',
    image: '/og-image.jpg',
  },
];

export default function BlogClient() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>('En Son');

  const heroPost = mockPosts.find(p => p.heroFeatured);
  const featuredPosts = mockPosts.filter(p => p.featured).slice(0, 3);
  
  // Filter for the main grid
  const gridPosts = useMemo(() => {
    let posts = mockPosts.filter(p => !p.heroFeatured && !p.featured);
    if (activeCategory !== 'En Son') {
      posts = posts.filter(p => p.category === activeCategory);
    }
    return posts;
  }, [activeCategory]);

  return (
    <div className={styles.pageWrapper}>
      
      {/* Top Header */}
      <section className={styles.headerSection}>
        <h1 className={styles.mainTitle}>Sektör İçgörüleri</h1>
        <p className={styles.subtitle}>Siber güvenlik dünyasını yönlendiren trend hikayeleri ve stratejik analizleri okuyun.</p>
      </section>

      {/* Featured Area (Hero Left + Right List) */}
      {activeCategory === 'En Son' && (
        <section className={styles.featuredArea}>
          {heroPost && (
            <div className={styles.heroCard}>
              <div className={styles.heroImageWrapper}>
                <img src={heroPost.image} alt={heroPost.title} className={styles.heroImage} />
              </div>
              <div className={styles.heroContent}>
                <span className={styles.metaData}>{heroPost.date} | {heroPost.category}</span>
                <h2 className={styles.heroTitle}>{heroPost.title}</h2>
                <p className={styles.heroDesc}>{heroPost.description}</p>
                <a href={heroPost.link} className={styles.readMoreBtn}>
                  Devamını Oku 
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '6px'}}>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          )}

          <div className={styles.featuredListSidebar}>
            <h3 className={styles.featuredSidebarTitle}>Öne Çıkan Makaleler</h3>
            <div className={styles.featuredList}>
              {featuredPosts.map(post => (
                <a href={post.link} key={post.id} className={styles.featuredListItem}>
                  <div className={styles.featuredListImageWrapper}>
                    <img src={post.image} alt={post.title} className={styles.featuredListImage} />
                  </div>
                  <div className={styles.featuredListContent}>
                    <span className={styles.metaDataSmall}>{post.category}</span>
                    <h4 className={styles.featuredListTitle}>{post.title}</h4>
                    <span className={styles.readMoreText}>Devamını Oku ➔</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content Layout (Grid + Sidebar) */}
      <section className={styles.mainLayout}>
        
        {/* Left Side: Grid */}
        <div className={styles.gridContainer}>
          {gridPosts.length > 0 ? (
            gridPosts.map((post, index) => {
              // İlk elemanı (veya "En Son" seçili değilse ilk elemanı) geniş yapabiliriz.
              // Tasarım diline uyması için "largeCard" sınıfı vereceğiz.
              const isLarge = index === 0 && gridPosts.length > 2; 

              return (
                <div key={post.id} className={`${styles.card} ${isLarge ? styles.largeCard : ''}`}>
                  <div className={styles.cardImageWrapper}>
                    <img src={post.image} alt={post.title} className={styles.cardImage} />
                  </div>
                  <div className={styles.cardContent}>
                    <span className={styles.metaData}>{post.date} | {post.category}</span>
                    <h3 className={styles.cardTitle}>{post.title}</h3>
                    {isLarge && <p className={styles.cardDesc}>{post.description}</p>}
                    <a href={post.link} className={styles.readMoreBtn}>
                      Devamını Oku 
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '6px'}}>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </a>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.emptyState}>
              <p>Bu kategoride henüz makale bulunmamaktadır.</p>
            </div>
          )}
        </div>

        {/* Right Side: Category Sidebar */}
        <aside className={styles.categorySidebar}>
          <h3 className={styles.sidebarTitle}>Kategoriler</h3>
          <ul className={styles.categoryList}>
            {CATEGORIES.map(category => (
              <li key={category}>
                <button
                  className={`${styles.categoryBtn} ${activeCategory === category ? styles.activeCategory : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </aside>

      </section>

      <div className="section-spacer" aria-hidden="true" />
    </div>
  );
}
