import type { Metadata } from 'next';
import Nav from '@/components/Nav/Nav';
import Hero from '@/components/Hero/Hero';
import Product from '@/components/Product/Product';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import UseCases from '@/components/UseCases/UseCases';
import Solutions from '@/components/Solutions/Solutions';
import Testimonials from '@/components/Testimonials/Testimonials';
import LatestNews from '@/components/LatestNews/LatestNews';
import Contact from '@/components/Contact/Contact';
import VideoBackground from '@/components/VideoBackground/VideoBackground';

export const metadata: Metadata = {
  title: 'DataFlowX | Türkiye\'nin EAL4+ Sertifikalı Data Diode Çözümü',
  description: 'Siber güvenlikte mutlak ağ izolasyonu. Kritik altyapılar, savunma sanayii ve finans sektörü için donanım destekli Unidirectional Gateway ve güvenli veri aktarım çözümleri.',
  alternates: {
    canonical: 'https://dataflowx.com/tr',
    languages: {
      'tr': 'https://dataflowx.com/tr',
      'en': 'https://dataflowx.com',
    },
  },
  openGraph: {
    title: 'DataFlowX - Mutlak Ağ İzolasyonu',
    description: 'Türkiye\'nin EAL4+ sertifikalı, USOM kayıtlı ilk ve tek yerli Data Diode platformu.',
    url: 'https://dataflowx.com/tr',
    locale: 'tr_TR',
  },
};

export default function TurkishHome() {
  return (
    <main>
      <VideoBackground />
      <Nav />
      {/* İleride bu komponentlere lang="tr" prop'u göndererek veya içeriklerini Türkçeleştirerek güncelleyebiliriz. Şimdilik 404'ü önlemek için İngilizce komponentler kullanılıyor. */}
      <Hero />

      {/* Section spacer — 25vh isolation */}
      <div className="section-spacer" aria-hidden="true" />

      <Product />

      <div className="section-spacer" aria-hidden="true" />

      <HowItWorks />

      <div className="section-spacer" aria-hidden="true" />

      <UseCases />

      <div className="section-spacer" aria-hidden="true" />

      <Solutions />

      <div className="section-spacer" aria-hidden="true" />

      <Testimonials />

      <div className="section-spacer" aria-hidden="true" />

      <LatestNews />

      <div className="section-spacer" aria-hidden="true" />

      <Contact />
    </main>
  );
}
