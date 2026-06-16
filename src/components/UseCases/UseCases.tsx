import { getTranslations } from 'next-intl/server';
import UseCasesClient from './UseCasesClient';

export default async function UseCases() {
  const t = await getTranslations('Home.UseCases');
  
  const translations = {
    title: t('title'),
    subtitle: t('subtitle'),
    c1: { headline: t('c1.headline'), description: t('c1.description') },
    c2: { headline: t('c2.headline'), description: t('c2.description') },
    c3: { headline: t('c3.headline'), description: t('c3.description') },
    c4: { headline: t('c4.headline'), description: t('c4.description') }
  };

  return <UseCasesClient t={translations} />;
}
