import type { Metadata } from 'next';
import Nav from '@/components/Nav/Nav';
import Contact from '@/components/Contact/Contact';
import PartnersMap from '@/components/PartnersMap/PartnersMap';
import PartnerForm from '@/components/PartnerForm/PartnerForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'DataFlowX | Partners',
  description: 'A Global Network. Local Expertise. Trusted Delivery.',
};

export default function PartnersPage() {
  return (
    <main className={styles.main}>
      <Nav />
      
      {/* 1. Map at the top (transparent background) */}
      <section className={styles.mapSection}>
        <PartnersMap />
      </section>

      {/* 2. Title & Text centered */}
      <section className={styles.textSection}>
        <h1 className={styles.title}>
          A Global Network. Local Expertise. Trusted Delivery.
        </h1>
        <p className={styles.description}>
          Cybersecurity challenges vary across industries, regions, and operational environments. Through our growing network of trusted partners worldwide, DataFlowX delivers expert guidance, rapid deployment, and tailored security solutions wherever they are needed. Together, we help organizations strengthen resilience, protect critical infrastructure, and secure their digital operations with confidence.
        </p>
      </section>

      {/* 3. Bottom two columns */}
      <section className={styles.bottomSection}>
        <div className={styles.partnerBox}>
          <h2>Become A Partner</h2>
          <p>Join our elite network of cybersecurity innovators to protect critical infrastructure globally.</p>
        </div>
        <div className={styles.formBox}>
          <PartnerForm />
        </div>
      </section>

      <Contact />
    </main>
  );
}
