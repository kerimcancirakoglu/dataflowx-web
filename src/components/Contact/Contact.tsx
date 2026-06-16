import { getTranslations } from 'next-intl/server';
import ContactClient from './ContactClient';

export default async function Contact() {
  const t = await getTranslations('Home.Contact');
  
  const translations = {
    title: t('title'),
    subtitle: t('subtitle'),
    nameLabel: t('nameLabel'),
    orgLabel: t('orgLabel'),
    emailLabel: t('emailLabel'),
    messageLabel: t('messageLabel'),
    submitBtn: t('submitBtn')
  };

  return <ContactClient t={translations} />;
}
