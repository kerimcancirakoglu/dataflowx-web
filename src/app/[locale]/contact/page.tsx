import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Contact from '@/components/Contact/Contact';
import Nav from '@/components/Nav/Nav';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import styles from './ContactPage.module.css';
import { buildAlternates } from '@/lib/seo-config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home.Contact' });
  
  return {
    title: `${t('title')} | DataFlowX`,
    description: t('subtitle'),
    alternates: {
      canonical: `https://www.dataflowx.com/${locale}/contact`,
      languages: {
        'en': 'https://www.dataflowx.com/en/contact',
        'tr': 'https://www.dataflowx.com/tr/contact',
        'ar': 'https://www.dataflowx.com/ar/contact',
      },
    },
  };
}

const offices = [
  {
    country: 'Türkiye',
    city: 'Ankara',
    address: 'Hacettepe Teknokent Safir Blokları No: 65, 06800 Çankaya, Ankara - TR'
  },
  {
    country: 'Qatar',
    city: 'Doha',
    address: 'QFC Tower 2, Ambassador Street, West Bay, Doha - QA'
  },
  {
    country: 'UAE',
    city: 'Abu Dhabi',
    address: 'Hub71, Al Maryah Island, Abu Dhabi - AE'
  },
  {
    country: 'KSA',
    city: 'Riyadh',
    address: 'King Fahad Road, Olaya District, Riyadh - SA'
  },
  {
    country: 'UK',
    city: 'London',
    address: '71-75 Shelton Street, Covent Garden, London, WC2H 9JQ - GB'
  }
];

export default async function ContactPage() {
  const t = await getTranslations('Home.Contact');

  return (
    <main className={styles.container}>
      <VideoBackground playMode="scrub" />
      <div className={styles.bg}></div>
      <Nav />
      
      {/* 1. Split Layout (Left: Title/Subtitle, Right: Form) */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Contact />
      </div>

      {/* 2. Text Layout matching old About page (No Cards!) */}
      <div className={styles.content}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 800, color: '#fff' }}>İletişim</h2>
          <div style={{ width: '80px', height: '4px', background: '#F5A706', margin: '0.5rem auto 2rem' }}></div>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', color: '#fff', fontSize: '1rem', lineHeight: 1.8, fontFamily: 'var(--font-mono)' }}>
          <p style={{ marginBottom: '1rem' }}>
            <strong>Ar-Ge:</strong> Hacettepe Teknokent, Üniversiteler Mh., Hacettepe Üniversitesi Teknokent, 1596. Cadde, 6. Ar-Ge C Blok No: 6C, D: 82, 06800 Çankaya/Ankara
          </p>
          <p style={{ marginBottom: '3rem' }}>
            <strong>Dubai Ofisi:</strong> World Trade Center, The Offices 1, One Central Office, No: 01.03, Dubai/UAE
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <p style={{ marginBottom: '1rem' }}><strong>Satış:</strong> <a href="mailto:sales@dataflowx.com" style={{ color: '#fff', textDecoration: 'underline' }}>sales@dataflowx.com</a></p>
              <p style={{ marginBottom: '1rem' }}><strong>Kanal:</strong> <a href="mailto:channel@dataflowx.com" style={{ color: '#fff', textDecoration: 'underline' }}>channel@dataflowx.com</a></p>
              <p><strong>Yatırımcı İlişkileri:</strong> <a href="mailto:investors@dataflowx.com" style={{ color: '#fff', textDecoration: 'underline' }}>investors@dataflowx.com</a></p>
            </div>
            <div>
              <p style={{ marginBottom: '1.5rem' }}>
                Kızılırmak Mh. 1443 Cd.<br/>
                1071 Usta Plaza C Blok No: 12<br/>
                Çankaya/Ankara/TÜRKİYE
              </p>
              <p style={{ marginBottom: '0.5rem' }}>E-mail: <a href="mailto:info@dataflowx.com" style={{ color: '#fff' }}>info@dataflowx.com</a></p>
              <p>Telefon: <a href="tel:+908508886091" style={{ color: '#fff' }}>+90 850 888 60 91</a></p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
