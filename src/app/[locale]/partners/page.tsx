import type { Metadata } from 'next';
import PartnersMapWrapper from '@/components/PartnersMap/PartnersMapWrapper';
import PartnerForm from '@/components/PartnerForm/PartnerForm';
import styles from './page.module.css';
import { getTranslations } from 'next-intl/server';
import { buildAlternates } from '@/lib/seo-config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'DataFlowX | Partners',
    description: 'A Global Network. Local Expertise. Trusted Delivery.',
    alternates: buildAlternates(locale, '/partners'),
  };
}

export default async function PartnersPage() {
  const t = await getTranslations('Partners');

  return (
    <main className={styles.main}>
      
      {/* 1. Map at the top (transparent background) */}
      <section className={styles.mapSection}>
        <PartnersMapWrapper />
      </section>

      {/* 2. Title & Text centered */}
      <section className={styles.textSection}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.description}>{t('desc')}</p>
      </section>

      {/* 3. Bottom two columns */}
      <section className={styles.bottomSection}>
        <div className={styles.partnerBox}>
          <h2>{t('becomeTitle')}</h2>
          <p>{t('becomeDesc')}</p>
        </div>
        <div className={styles.formBox}>
          <PartnerForm />
        </div>
      </section>
    </main>
  );
}
