import type { Metadata } from 'next';
import Nav from '@/components/Nav/Nav';
import Contact from '@/components/Contact/Contact';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Enerji Sektörü SCADA Güvenliği — OT Ağ Koruması | DataFlowX',
  description:
    'DataFlowX data diode çözümleriyle enerji sektörünüzün SCADA ağlarını siber saldırılara karşı koruyun. EPDK kritik altyapı gereksinimleri, IEC 62443 ve NERC CIP uyumlu. Türkiye\'de yerli çözüm.',
  keywords: [
    'enerji sektörü SCADA güvenliği Türkiye',
    'EPDK kritik altyapı koruma',
    'SCADA siber güvenlik',
    'OT güvenlik enerji',
    'elektrik santrali siber güvenlik',
    'data diode enerji sektörü',
    'IEC 62443 Türkiye',
    'NERC CIP uyum',
    'endüstriyel kontrol sistemi güvenliği',
    'kritik altyapı koruma',
  ],
  alternates: {
    canonical: 'https://dataflowx.com/tr/cozumler/enerji-scada-guvenligi',
    languages: {
      'tr': 'https://dataflowx.com/tr/cozumler/enerji-scada-guvenligi',
      'en': 'https://dataflowx.com/en/solutions/energy-scada-security',
    },
  },
  openGraph: {
    title: 'Enerji Sektörü SCADA Güvenliği — DataFlowX',
    description:
      'EPDK uyumlu, donanım destekli unidirectional gateway çözümleriyle enerji altyapınızı koruyun. Türkiye\'de yerli OT güvenlik platformu.',
    url: 'https://dataflowx.com/tr/cozumler/enerji-scada-guvenligi',
    locale: 'tr_TR',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'DataFlowX Enerji SCADA Güvenlik Çözümü',
  description:
    'Enerji sektörüne özel donanım destekli unidirectional gateway. EPDK, IEC 62443 ve NERC CIP uyumlu.',
  brand: { '@type': 'Brand', name: 'DataFlowX' },
  manufacturer: { '@type': 'Organization', name: 'DataFlowX', url: 'https://dataflowx.com' },
  category: 'OT/SCADA Siber Güvenlik',
  url: 'https://dataflowx.com/tr/cozumler/enerji-scada-guvenligi',
  audience: {
    '@type': 'Audience',
    audienceType: 'Enerji Sektörü SCADA Mühendisleri, OT Güvenlik Yöneticileri',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'SCADA sistemlerini siber saldırılardan nasıl korurum?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SCADA sistemlerini korumak için en etkili yöntem, IT ve OT ağları arasına donanım destekli bir unidirectional gateway (data diode) yerleştirmektir. Bu çözüm, ters veri akışını fiziksel olarak imkânsız kılarak SCADA ağınıza dışarıdan erişimi engeller.',
      },
    },
    {
      '@type': 'Question',
      name: 'EPDK kritik altyapı koruması için hangi standartlar gerekli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EPDK kapsamındaki enerji altyapıları için IEC 62443 (Endüstriyel Otomasyon Güvenliği), NERC CIP (elektrik altyapısı) ve ISO/IEC 27019 (enerji sektörü bilgi güvenliği) standartları temel referanslardır. DataFlowX çözümleri bu standartların gerektirdiği ağ segmentasyonu ve tek yönlü veri transferini donanım düzeyinde sağlar.',
      },
    },
    {
      '@type': 'Question',
      name: 'Data diode ile SCADA güvenliği nasıl sağlanır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Data diode (unidirectional gateway), SCADA ağına giden veri akışına izin verirken SCADA ağından dışarıya veri çıkışını fiziksel olarak engeller. Bu sayede uzaktan erişim saldırıları, ransomware ve kötü amaçlı yazılımlar OT ağına ulaşamaz.',
      },
    },
    {
      '@type': 'Question',
      name: 'Türkiye\'de yerli data diode ürünü var mı?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Evet. DataFlowX, Türkiye\'de geliştirilen ve EAL4+ Common Criteria sertifikalı bir data diode ve unidirectional gateway platformudur. USOM kayıtlı ve savunma sanayi projeleri dahil kritik altyapılarda kullanılmaktadır.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://dataflowx.com/tr' },
    { '@type': 'ListItem', position: 2, name: 'Çözümler', item: 'https://dataflowx.com/tr/cozumler' },
    { '@type': 'ListItem', position: 3, name: 'Enerji SCADA Güvenliği', item: 'https://dataflowx.com/tr/cozumler/enerji-scada-guvenligi' },
  ],
};

export default function EnerjiScadaGuvenligiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className={styles.main}>
        <VideoBackground />
        <Nav />

        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.overline}>ENERJİ SEKTÖRÜ OT GÜVENLİK</p>
            <h1 className={styles.heroTitle}>
              SCADA & Endüstriyel Kontrol Sistemi Güvenliği
            </h1>
            <p className={styles.heroSubtitle}>
              Elektrik santralleri, petrol-gaz tesisleri ve enerji iletim altyapılarınızı
              donanım destekli <strong>unidirectional gateway</strong> ile siber tehditlere
              karşı koruyun. <strong>EPDK</strong> kritik altyapı gereksinimlerine ve
              <strong> IEC 62443</strong> standardına uyumlu, Türkiye'de yerli çözüm.
            </p>
            <div className={styles.heroActions}>
              <a href="#contact" className={styles.primaryBtn}>Teknik Demo Talep Et ➔</a>
              <a href="/unidirectional-gateway" className={styles.secondaryBtn}>DataDiodeX Ürün Sayfası</a>
            </div>
          </div>
        </section>

        <div className="section-spacer" aria-hidden="true" />

        {/* Neden Enerji Sektörü Savunmasız? */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <p className={styles.overline}>TEHDİT TABLOSU</p>
            <h2 className={styles.sectionTitle}>Enerji Altyapıları Neden Hedef?</h2>
            <p className={styles.sectionDesc}>
              Enerji sektörü, 2023 yılında küresel OT siber saldırılarının %%28'inin hedefi olmuştur. Türkiye'de
              TEİAŞ, BOTAŞ ve OSB ağları dahil kritik altyapılar, IT-OT entegrasyon noktalarından sızan
              saldırılara karşı savunmasız kalmaktadır.
            </p>
            <div className={styles.threatGrid}>
              <div className={styles.threatCard}>
                <div className={styles.threatIcon}>⚡</div>
                <h3 className={styles.threatTitle}>SCADA Ağ Sızması</h3>
                <p className={styles.threatText}>
                  Endüstriyel kontrol sistemlerine uzaktan erişim sağlayan saldırılar, üretim
                  durmalarına veya fiziksel hasara yol açabilir.
                </p>
              </div>
              <div className={styles.threatCard}>
                <div className={styles.threatIcon}>🔒</div>
                <h3 className={styles.threatTitle}>Ransomware OT Yayılımı</h3>
                <p className={styles.threatText}>
                  IT ağından OT ağına yayılan fidye yazılımları, kritik operasyonları
                  durma noktasına getirebilir.
                </p>
              </div>
              <div className={styles.threatCard}>
                <div className={styles.threatIcon}>📡</div>
                <h3 className={styles.threatTitle}>Uzaktan Erişim İstismarı</h3>
                <p className={styles.threatText}>
                  VPN ve RDP tabanlı uzaktan erişim noktaları, OT ağlarına açılan
                  kritik saldırı vektörleridir.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="section-spacer" aria-hidden="true" />

        {/* Çözüm */}
        <section className={styles.section}>
          <div className={styles.solutionBlock}>
            <div className={styles.solutionLeft}>
              <p className={styles.overline}>DATAFLOWX ÇÖZÜMÜ</p>
              <h2 className={styles.sectionTitle}>Donanım Destekli Mutlak İzolasyon</h2>
              <p className={styles.sectionDesc}>
                <strong>DFX DataDiodeX</strong>, OT ve IT ağları arasına fiziksel bir optik bariyer koyar.
                Ters veri akışı donanım seviyesinde imkânsız hale gelir. Yazılım güvenlik açıkları,
                sıfırıncı gün saldırıları veya yapılandırma hataları bu korumanın dışına çıkamaz.
              </p>
              <ul className={styles.featureList}>
                <li><strong>EAL4+</strong> Common Criteria sertifikalı donanım</li>
                <li><strong>IEC 62443</strong> ve <strong>NERC CIP</strong> uyumlu</li>
                <li><strong>EPDK</strong> kritik altyapı gereksinimlerini karşılar</li>
                <li>Gartner Hype Cycle for CPS Security tanınırlığı (3 yıl üst üste)</li>
                <li>Türkiye'de yerli geliştirme ve yerel destek</li>
              </ul>
              <a href="/unidirectional-gateway" className={styles.linkBtn}>
                DataDiodeX Teknik Detayları →
              </a>
            </div>
            <div className={styles.solutionRight}>
              <div className={styles.complianceBadges}>
                <div className={styles.badge}>EAL4+</div>
                <div className={styles.badge}>IEC 62443</div>
                <div className={styles.badge}>NERC CIP</div>
                <div className={styles.badge}>EPDK Uyumlu</div>
                <div className={styles.badge}>ISO/IEC 27019</div>
                <div className={styles.badge}>USOM Kayıtlı</div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-spacer" aria-hidden="true" />

        {/* SSS — FAQ (hem kullanıcı hem schema için) */}
        <section className={styles.section} id="sss">
          <div className={styles.sectionInner}>
            <p className={styles.overline}>SIK SORULAN SORULAR</p>
            <h2 className={styles.sectionTitle}>SCADA Güvenliği Hakkında</h2>
            <div className={styles.faqList}>
              <details className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  SCADA sistemlerimi siber saldırılardan nasıl korurum?
                </summary>
                <p className={styles.faqAnswer}>
                  En etkili yöntem, IT ve OT ağları arasına donanım destekli bir
                  unidirectional gateway (data diode) yerleştirmektir. Bu çözüm, ters veri
                  akışını fiziksel olarak imkânsız kılarak SCADA ağınıza dışarıdan erişimi engeller.
                </p>
              </details>
              <details className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  EPDK kritik altyapı koruması için hangi standartlar gerekli?
                </summary>
                <p className={styles.faqAnswer}>
                  IEC 62443, NERC CIP ve ISO/IEC 27019 temel referanslardır. DataFlowX çözümleri
                  bu standartların gerektirdiği ağ segmentasyonu ve tek yönlü veri transferini
                  donanım düzeyinde sağlar.
                </p>
              </details>
              <details className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  Türkiye'de yerli data diode ürünü var mı?
                </summary>
                <p className={styles.faqAnswer}>
                  Evet. DataFlowX, Türkiye'de geliştirilen EAL4+ Common Criteria sertifikalı
                  data diode ve unidirectional gateway platformudur. USOM kayıtlı ve savunma
                  sanayi projeleri dahil kritik altyapılarda kullanılmaktadır.
                </p>
              </details>
            </div>
          </div>
        </section>

        <div className="section-spacer" aria-hidden="true" />

        <Contact />
      </main>
    </>
  );
}
