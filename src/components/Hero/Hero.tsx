import { getTranslations } from 'next-intl/server';
import HeroClient from './HeroClient';

interface HeroSanitySlide {
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  buttonText: string;
  buttonLink?: string;
  features?: { text: string }[];
}

interface HeroSanityData {
  hero?: {
    slides?: HeroSanitySlide[];
  };
  _id?: string;
  _type?: string;
}

interface HeroProps {
  sanityData?: HeroSanityData | null;
  locale: string;
}

export default async function Hero({ sanityData, locale }: HeroProps) {
  const t = await getTranslations({ locale, namespace: 'Home.Hero' });

  const fallbackSlides = [
    {
      titlePrefix: t('slide1.titlePrefix'),
      titleHighlight: t('slide1.titleHighlight'),
      description: t('slide1.description'),
      buttonText: t('slide1.buttonText'),
      buttonLink: '#use-cases',
    },
    {
      titlePrefix: t('slide2.titlePrefix'),
      titleHighlight: t('slide2.titleHighlight'),
      description: t('slide2.description'),
      buttonText: t('slide2.buttonText'),
      buttonLink: '#solutions',
      features: [
        { text: t('slide2.f1') },
        { text: t('slide2.f2') },
        { text: t('slide2.f3') },
      ],
    },
  ];

  // Sanity SADECE EN locale'de kullanılır — TR/AR her zaman messages/ fallback alır
  const sanitySlides = locale === 'en' ? sanityData?.hero?.slides : undefined;
  
  const processedSanitySlides = sanitySlides?.map((slide, index) => {
    return {
      ...slide,
      buttonLink: index === 0 ? '#use-cases' : (index === 1 ? '#solutions' : slide.buttonLink)
    };
  });

  const slides = processedSanitySlides && processedSanitySlides.length > 0 ? processedSanitySlides : fallbackSlides;

  return (
    <HeroClient
      slides={slides}
      sanityDocumentId={locale === 'en' ? sanityData?._id : undefined}
    />
  );
}
