'use client';

import { useRef } from 'react';
import styles from './ContactMini.module.css';
import { useTranslations } from 'next-intl';

export default function ContactMini() {
  const t = useTranslations('ContactMini');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <section className={styles.section} id="contact">
      <div className={styles.inner}>

        <div className={styles.textContent}>
          <h2 className={`display-md ${styles.title}`}>
            {t('title')} <span style={{ color: '#F5A706' }}>{t('titleHighlight')}</span>
          </h2>
          <p className={`body-text ${styles.subtitle}`}>{t('subtitle')}</p>
        </div>

        <div className={styles.formContent}>
          <div className={styles.formCard}>
            <form ref={formRef} onSubmit={handleSubmit} className={styles.form} noValidate>

              <div className={styles.row}>
                <div className={styles.field}>
                  <input id="contact-firstname" type="text" className={styles.input} placeholder={t('firstName')} required />
                </div>
                <div className={styles.field}>
                  <input id="contact-lastname" type="text" className={styles.input} placeholder={t('lastName')} required />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <input id="contact-jobtitle" type="text" className={styles.input} placeholder={t('jobTitle')} required />
                </div>
                <div className={styles.field}>
                  <input id="contact-company" type="text" className={styles.input} placeholder={t('company')} required />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <input id="contact-phone" type="tel" className={styles.input} placeholder={t('phone')} required />
                </div>
                <div className={styles.field}>
                  <input id="contact-email" type="email" className={styles.input} placeholder={t('email')} required />
                </div>
              </div>

              <div className={styles.field}>
                <select className={styles.select} required defaultValue="">
                  <option value="" disabled hidden>{t('country')}</option>
                  <option value="TR">{t('countryTR')}</option>
                  <option value="AE">{t('countryAE')}</option>
                  <option value="SA">{t('countrySA')}</option>
                  <option value="QA">{t('countryQA')}</option>
                  <option value="UK">{t('countryUK')}</option>
                  <option value="US">{t('countryUS')}</option>
                  <option value="Other">{t('countryOther')}</option>
                </select>
              </div>

              <div className={styles.checkboxField}>
                <input type="checkbox" id="contact-consent" className={styles.checkbox} required />
                <label htmlFor="contact-consent">{t('consent')}</label>
              </div>

              <div className={styles.submitWrapper}>
                <button type="submit" className={`btn-pill ${styles.submit}`}>
                  {t('submitBtn')}
                </button>
              </div>

            </form>
          </div>

          <p className={styles.trustedText}>{t('trustedText')}</p>
        </div>

      </div>
    </section>
  );
}
