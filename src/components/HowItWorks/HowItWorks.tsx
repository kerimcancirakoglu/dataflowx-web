import { getTranslations } from 'next-intl/server';
import HowItWorksClient from './HowItWorksClient';

export default async function HowItWorks() {
  const t = await getTranslations('Home.HowItWorks');
  
  const translations = {
    titlePrefix: t('titlePrefix'),
    titleHighlight: t('titleHighlight'),
    subtitle: t('subtitle'),
    network: { title: t('network.title'), description: t('network.description'), l1: t('network.l1'), l2: t('network.l2') },
    file: { title: t('file.title'), description: t('file.description'), l1: t('file.l1'), l2: t('file.l2') },
    email: { title: t('email.title'), description: t('email.description'), l1: t('email.l1'), l2: t('email.l2'), l3: t('email.l3') },
    ot: { title: t('ot.title'), description: t('ot.description'), l1: t('ot.l1') }
  };

  return <HowItWorksClient t={translations} />;
}
