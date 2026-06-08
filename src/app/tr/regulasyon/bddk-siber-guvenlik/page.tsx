import type { Metadata } from 'next';
import Nav from '@/components/Nav/Nav';
import Contact from '@/components/Contact/Contact';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'BDDK Siber Güvenlik Uyum & Veri İzolasyonu | DataFlowX',
  description:
    'Finans sektörü için BDDK siber güvenlik gereksinimlerine tam uyumlu Data Diode ve Unidirectional Gateway çözümleri. Kritik ağlarda mutlak izolasyon sağlayın.',
  keywords: [
    'BDDK siber güvenlik gereksinimleri',
    'BDDK bilgi sistemleri tebliği',
    'finans sektörü veri güvenliği',
    'bankacılık ağ güvenliği',
    'BDDK uyumlu data diode',
    'SWIFT ağı siber güvenlik',
    'banka kritik altyapı koruma',
  ],
  alternates: {
    canonical: 'https://dataflowx.com/tr/regulasyon/bddk-siber-guvenlik',
  },
  openGraph: {
    title: 'BDDK Siber Güvenlik Uyum & Veri İzolasyonu',
    description:
      'Bankacılık ve finans sistemlerinde BDDK bilgi sistemleri tebliğine uyumlu, EAL4+ sertifikalı donanımsal ağ izolasyonu.',
    url: 'https://dataflowx.com/tr/regulasyon/bddk-siber-guvenlik',
    locale: 'tr_TR',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'BDDK Siber Güvenlik Gereksinimleri ve Ağ İzolasyonu',
  description: 'Finansal kuruluşların BDDK Bilgi Sistemleri tebliği kapsamında kritik ağları koruma ve güvenli veri aktarımı sağlamasına yönelik rehber.',
  author: {
    '@type': 'Organization',
    name: 'DataFlowX',
  },
  publisher: {
    '@type': 'Organization',
    name: 'DataFlowX',
    logo: {
      '@type': 'ImageObject',
      url: 'https://dataflowx.com/logo.png',
    },
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'BDDK Bilgi Sistemleri Tebliği ağ izolasyonu konusunda ne diyor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tebliğ, bankacılık ve ödeme sistemlerindeki kritik ağların (örneğin SWIFT ve ana bankacılık sistemleri) dış ağlardan katı kurallarla izole edilmesini şart koşar. Özellikle üretim ortamlarından test ortamlarına veya log sunucularına veri aktarımında ters yönde bir sızıntı olmaması istenir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Data Diode kullanımı bankalarda neden gerekli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Güvenlik duvarları (firewall) yazılımsal olduğu için yapılandırma hatalarına veya sıfırıncı gün açıklarına maruz kalabilir. Data Diode (unidirectional gateway) ise donanımsal olarak sadece tek yönlü veri akışına izin verir, böylece kritik finansal ağlara dışarıdan erişimi fiziksel olarak imkansız hale getirir.',
      },
    },
    {
      '@type': 'Question',
      name: 'SWIFT ağı güvenliği için DataFlowX nasıl konumlandırılır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SWIFT ağından çıkan işlem loglarının merkezi SIEM veya izleme sistemlerine güvenle aktarılması gerekir. DataFlowX, bu logları tek yönlü olarak dışarı aktarırken, izleme ağından SWIFT ağına doğru herhangi bir ters bağlantı veya sızıntı riskini donanımsal olarak engeller.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://dataflowx.com/tr' },
    { '@type': 'ListItem', position: 2, name: 'Regülasyonlar', item: 'https://dataflowx.com/tr/regulasyon' },
    { '@type': 'ListItem', position: 3, name: 'BDDK Siber Güvenlik', item: 'https://dataflowx.com/tr/regulasyon/bddk-siber-guvenlik' },
  ],
};

export default function BddkCybersecurityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className={styles.main}>
        <VideoBackground />
        <Nav />

        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.overline}>FİNANS SEKTÖRÜ REGÜLASYONLARI</p>
            <h1 className={styles.heroTitle}>
              BDDK Bilgi Sistemleri Tebliği ve Mutlak Ağ İzolasyonu
            </h1>
            <p className={styles.heroSubtitle}>
              Bankalar ve elektronik para kuruluşları için <strong>BDDK</strong> gereksinimlerine uyumlu
              donanım destekli ağ güvenliği. Kritik bankacılık ağlarından merkezi izleme ve log sistemlerine
              <strong> %100 güvenli, tek yönlü</strong> veri aktarımı sağlayın.
            </p>
            <div className={styles.heroActions}>
              <a href="#contact" className={styles.primaryBtn}>Finans Sektörü İçin Çözümleri İncele ➔</a>
            </div>
          </div>
        </section>

        <div className="section-spacer" aria-hidden="true" />

        {/* Content & Problem Space */}
        <section className={styles.section}>
          <div className={styles.contentGrid}>
            <div className={styles.mainContent}>
              <h2 className={styles.sectionTitle}>Finansal Ağlarda İzolasyon Zorunluluğu</h2>
              <p className={styles.textBody}>
                BDDK Bankaların Bilgi Sistemleri ve Elektronik Bankacılık Hizmetleri Hakkında Yönetmelik
                ve ilgili tebliğler, finansal altyapıların siber tehditlere karşı en üst düzeyde
                korunmasını talep eder. Özellikle <strong>SWIFT altyapısı</strong>, ana bankacılık (core banking) 
                sunucuları ve kritik veritabanlarının bulunduğu ağ segmentlerinin, kurumsal ağdan (IT) 
                kesin çizgilerle ayrılması gerekir.
              </p>
              <p className={styles.textBody}>
                Geleneksel güvenlik duvarları (firewall) iki yönlü iletişime açık yapıları gereği,
                yapılandırma hataları veya yeni nesil zafiyetler durumunda aşılabilir. Finans sektöründe 
                kabul edilebilir risk seviyesi "sıfır" olduğu için, ağlar arası bağlantılarda 
                fiziksel bir bariyer şarttır.
              </p>
              
              <h3 className={styles.subTitle}>Sık Karşılaşılan Uyum Zorlukları</h3>
              <ul className={styles.bulletList}>
                <li>
                  <strong>Log Aktarımı:</strong> İzole ağlardaki sunucuların (örn. HSM cihazları, veritabanları)
                  ürettiği sistem loglarının, güvenlik izleme (SIEM) sunucularına aktarılması gerekir.
                </li>
                <li>
                  <strong>Veritabanı Replika:</strong> Üretim (Production) veritabanlarından test, analiz veya
                  raporlama (DWH) ortamlarına veri çıkarılırken üretim sistemine ters erişim olmamalıdır.
                </li>
                <li>
                  <strong>Yama ve Güncelleme:</strong> İzole ağlara güvenli bir şekilde dosya, virüs imza veya 
                  yazılım güncellemesi aktarımı gereklidir.
                </li>
              </ul>
            </div>
            
            <div className={styles.sidePanel}>
              <div className={styles.panelCard}>
                <h4 className={styles.panelTitle}>Neden DataFlowX?</h4>
                <div className={styles.panelFeature}>
                  <strong>Fiziksel Güvence</strong>
                  <p>Yazılım değil, optik izolasyon ile ters yönde veri sızıntısını donanımsal olarak engeller.</p>
                </div>
                <div className={styles.panelFeature}>
                  <strong>Yerli ve Sertifikalı</strong>
                  <p>Common Criteria EAL4+ sertifikalı ve USOM kayıtlı milli ürün avantajı.</p>
                </div>
                <div className={styles.panelFeature}>
                  <strong>Protokol Desteği</strong>
                  <p>Syslog, FTP, SMB, SMTP, UDP, TCP ve finansal veritabanı replikasyonlarını destekler.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-spacer" aria-hidden="true" />

        {/* Use Cases */}
        <section className={styles.section}>
          <p className={styles.overline}>BANKACILIK SENARYOLARI</p>
          <h2 className={styles.sectionTitle}>Finans Sektörü İçin Çözüm Mimarisi</h2>
          <div className={styles.useCaseGrid}>
            <div className={styles.useCaseCard}>
              <div className={styles.useCaseIcon}>🔄</div>
              <h3 className={styles.useCaseTitle}>Güvenli SIEM ve Log Aktarımı</h3>
              <p className={styles.useCaseDesc}>
                DataDiodeX, kritik finansal ağlarda üretilen Syslog, Windows Event Log ve uygulama loglarını
                merkezi SIEM platformuna <strong>tek yönlü ve kayıpsız</strong> olarak taşır. SIEM ortamı ele
                geçirilse bile kritik ağa geri dönülmesi fiziksel olarak imkansızdır.
              </p>
            </div>
            <div className={styles.useCaseCard}>
              <div className={styles.useCaseIcon}>🏦</div>
              <h3 className={styles.useCaseTitle}>SWIFT Ağ İzolasyonu</h3>
              <p className={styles.useCaseDesc}>
                SWIFT altyapısının bulunduğu zone, kurumun geri kalanından tamamen izole edilmelidir.
                DataFlowX ürünleri, SWIFT ağıyla iletişimde ağ segmentasyonunu en üst seviye donanım 
                güvencesiyle sağlar ve yetkisiz erişimi sıfırlar.
              </p>
            </div>
            <div className={styles.useCaseCard}>
              <div className={styles.useCaseIcon}>📊</div>
              <h3 className={styles.useCaseTitle}>Production'dan Teste Veri Aktarımı</h3>
              <p className={styles.useCaseDesc}>
                Ana bankacılık sistemlerinden (Core Banking) raporlama veya test ortamlarına günlük veritabanı 
                replikasyonları yapılırken, test ortamındaki zafiyetlerin üretim ortamına sıçramasını 
                donanımsal optik bariyer ile engeller.
              </p>
            </div>
          </div>
        </section>

        <div className="section-spacer" aria-hidden="true" />

        {/* FAQ */}
        <section className={styles.section} id="sss">
          <div className={styles.sectionInner}>
            <p className={styles.overline}>SIK SORULAN SORULAR</p>
            <h2 className={styles.sectionTitle}>BDDK Uyumu ve Ağ Güvenliği</h2>
            <div className={styles.faqList}>
              {faqSchema.mainEntity.map((item) => (
                <details key={item.name} className={styles.faqItem}>
                  <summary className={styles.faqQuestion}>{item.name}</summary>
                  <p className={styles.faqAnswer}>{item.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <div className="section-spacer" aria-hidden="true" />

        <Contact />
      </main>
    </>
  );
}
