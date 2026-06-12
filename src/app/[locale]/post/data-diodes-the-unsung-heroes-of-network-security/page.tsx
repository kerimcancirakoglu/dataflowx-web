import type { Metadata } from 'next';
import Nav from '@/components/Nav/Nav';
import ContactMini from '@/components/ContactMini/ContactMini';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Veri Diodu Nedir? Ağ Güvenliğinin Gizli Kahramanları',
  description:
    'Veri diodunun ne olduğunu, nasıl çalıştığını ve OT ağlarını, SCADA sistemlerini ve kritik altyapıları siber tehditlerden korumak için neden kritik olduğunu öğrenin.',
  keywords: [
    'veri diodu nedir',
    'veri diodu nasıl çalışır',
    'veri diodu açıklaması',
    'tek yönlü ağ geçidi eğitimi',
    'OT güvenlik temelleri',
    'SCADA güvenlik diodu',
  ],
  alternates: {
    // CRITICAL SEO FIX:
    // This canonical tag intentionally points to the product page.
    // This resolves keyword cannibalization between this informative blog post
    // and the high-converting product page.
    canonical: 'https://dataflowx.com/unidirectional-gateway',
  },
  openGraph: {
    title: 'Veri Diodu Nedir? Nasıl Çalışır ve Neden Önemlidir',
    description: 'Kritik altyapılar için tek yönlü ağ güvenliğine giriş rehberi.',
    url: 'https://dataflowx.com/post/data-diodes-the-unsung-heroes-of-network-security',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Veri Diodu Nedir? Ağ Güvenliğinin Gizli Kahramanları',
  description: 'Veri diodunun ne olduğunu, nasıl çalıştığını ve OT ağlarını korumak için neden kritik olduğunu öğrenin.',
  author: {
    '@type': 'Organization',
    name: 'DataFlowX Güvenlik Araştırmaları',
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

export default function DataDiodeBlogPost() {
  return (
    <main className={styles.main}>
      {/* JSON-LD — inside Server Component main, hoisted by React 19 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className={styles.bgGlow} aria-hidden="true" />
      <Nav />

      {/* Article Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <p className={styles.overline}>SİBER GÜVENLİK TEMELLERİ</p>
          <h1 className={styles.title}>Veri Diodu Nedir?<br />Ağ Güvenliğinin Gizli Kahramanları</h1>
          <div className={styles.meta}>
            <span>Yazan: DataFlowX Güvenlik Araştırmaları</span>
            <span>·</span>
            <span>5 dk okuma</span>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className={styles.article}>
        <div className={styles.content}>
          <h2>Mutlak Ağ İzolasyonu İhtiyacı</h2>
          <p>
            Modern endüstriyel ortamlarda BT (Bilgi Teknolojileri) ve OT (Operasyonel Teknolojiler) yakınsaması eşi benzeri görülmemiş
            verimlilikler yarattı. Ancak, aynı zamanda ciddi güvenlik risklerini de beraberinde getirdi. İnternet bağlantılı
            BT ağları, elektrik şebekeleri, su arıtma tesisleri veya üretim tesisleri gibi kritik OT ağlarına bağlandığında,
            OT ağı siber saldırılara, fidye yazılımlarına ve yetkisiz uzaktan erişime karşı savunmasız hale gelir.
          </p>
          <p>
            Geleneksel yazılım tabanlı güvenlik duvarları (firewall), BT güvenliği için yararlı olsa da, OT ortamlarını korumada yetersiz kalır.
            Güvenlik duvarları temel olarak iki yönlü iletişime izin verecek şekilde tasarlanmıştır ve yanlış yapılandırılabilecek veya sıfırıncı gün
            (zero-day) zafiyetleri yoluyla istismar edilebilecek karmaşık yazılım kurallarına dayanır. İşte bu noktada <strong>veri diodu</strong> devreye girer.
          </p>

          <h2>Veri Diodu Tam Olarak Nedir?</h2>
          <p>
            Tek yönlü ağ geçidi (unidirectional gateway) olarak da bilinen veri diodu, iki ağ arasında tek yönlü veri akışını zorlamak için
            tasarlanmış bir donanım cihazıdır. Trafiği her iki yönde denetlemek ve filtrelemek için yazılım kullanan bir güvenlik duvarının
            aksine, bir veri diodu verilerin yalnızca tek bir yönde seyahat etmesini garanti etmek için <strong>fiziksel donanım bileşenleri</strong>
            (genellikle fiber optik) kullanır.
          </p>

          <h2>Veri Diodu Nasıl Çalışır?</h2>
          <p>
            Bir veri diodunun temel mekanizması optik izolasyona dayanır. Cihaz tipik olarak iki ayrı düğümden oluşur: bir gönderici düğüm ve bir alıcı düğüm.
          </p>
          <ul>
            <li><strong>Gönderici Düğüm:</strong> Bu taraf güvenli ağa (örn. bir OT ağı) bağlıdır. Elektrik veri sinyallerini ışık darbelerine dönüştüren bir optik verici (LED veya lazer) içerir.</li>
            <li><strong>Alıcı Düğüm:</strong> Bu taraf hedef ağa (örn. kurumsal bir BT ağı) bağlıdır. Işık darbelerini tekrar elektrik verisine dönüştüren bir fotosel veya optik alıcı içerir.</li>
          </ul>
          <p>
            En önemlisi, gönderici düğümün <em>hiçbir alıcısı</em> yoktur ve alıcı düğümün <em>hiçbir vericisi</em> yoktur. Işık bir alıcıdan bir vericiye geriye doğru gidemeyeceğinden, ters veri akışı <strong>fiziksel olarak imkansızdır</strong>. Hiçbir yazılım manipülasyonu, bilgisayar korsanlığı (hacking) veya yanlış yapılandırma, verileri fiziksel bir optik boşluk (optical gap) boyunca yanlış yönde seyahat etmeye zorlayamaz.
          </p>

          <h2>OT Güvenliği İçin Neden Kritikler?</h2>
          <p>
            Veri diotları, son derece hassas veya kritik ağları korumada altın standarttır. Aşağıdaki gibi sektörlerde yoğun olarak kullanılırlar:
          </p>
          <ul>
            <li><strong>Enerji &amp; Altyapı:</strong> SCADA sistemlerini dış müdahalelerden korurken, operasyonel verilerin analiz için kurumsal merkeze gönderilmesine olanak tanır.</li>
            <li><strong>Savunma &amp; Kamu:</strong> Sınıflandırılmış ağları (gizli), sınıflandırılmamış ağlardan izole eder (Alanlar Arası Çözümler - Cross-Domain Solutions).</li>
            <li><strong>Finans:</strong> Çekirdek bankacılık altyapısını kurumsal BT ağlarından izole eder.</li>
          </ul>

          <div className={styles.productCta}>
            <h3>Kritik altyapınızın güvenliğini sağlamaya hazır mısınız?</h3>
            <p>
              Kurumsal düzeyde bir tek yönlü ağ geçidi arıyorsanız, DataFlowX <strong>DFX Unidirectional Gateway</strong> ürününü sunar.
              EAL4+ Common Criteria sertifikasına sahiptir, Gartner tarafından tanınmaktadır ve donanım destekli mutlak izolasyon sağlar.
            </p>
            <a href="/unidirectional-gateway" className={styles.ctaBtn}>
              DFX Unidirectional Gateway Ürün Sayfasını İnceleyin →
            </a>
          </div>
        </div>
      </article>

      <ContactMini />
    </main>
  );
}
