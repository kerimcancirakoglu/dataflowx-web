import { getTranslations } from 'next-intl/server';
import TestimonialsClient from './TestimonialsClient';

export default async function Testimonials() {
  const t = await getTranslations('Home.Testimonials');
  
  const translations = {
    title: t('title'),
    titleHighlight: t('titleHighlight'),
    subtitle: t('subtitle'),
    t1: { text: t('t1.text'), role: t('t1.role'), sector: t('t1.sector') },
    t2: { text: t('t2.text'), role: t('t2.role'), sector: t('t2.sector') },
    t3: { text: t('t3.text'), role: t('t3.role'), sector: t('t3.sector') }
  };

  return <TestimonialsClient t={translations} />;
}
