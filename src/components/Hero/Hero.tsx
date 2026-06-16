import { getTranslations } from 'next-intl/server';
import HeroClient from './HeroClient';

export default async function Hero() {
  const t = await getTranslations('Home.Hero');
  
  // Pass translation functions or string maps down
  const translations = {
    slide1: {
      titlePrefix: t('slide1.titlePrefix'),
      titleHighlight: t('slide1.titleHighlight'),
      description: t('slide1.description'),
      buttonText: t('slide1.buttonText')
    },
    slide2: {
      titlePrefix: t('slide2.titlePrefix'),
      titleHighlight: t('slide2.titleHighlight'),
      description: t('slide2.description'),
      buttonText: t('slide2.buttonText'),
      f1: t('slide2.f1'),
      f2: t('slide2.f2'),
      f3: t('slide2.f3')
    }
  };

  return <HeroClient t={translations} />;
}
