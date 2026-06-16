'use client';

import { useRef } from 'react';
import styles from './Contact.module.css';

export default function ContactClient({ t }: { t: any }) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // WPGraphQL mutation or form handler goes here
    console.log('Form submitted');
  };

  return (
    <section className={styles.section} id="contact">
      <div className={styles.inner}>

        <h2 className={`display-lg ${styles.title}`}>
          {t.title}<br />
        </h2>

        <p className={`body-text ${styles.subtitle}`}>
          {t.subtitle}
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="contact-name" className={`label-mono ${styles.label}`}>{t.nameLabel}</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                className={styles.input}
                placeholder={t.nameLabel}
                required
                autoComplete="name"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="contact-org" className={`label-mono ${styles.label}`}>{t.orgLabel}</label>
              <input
                id="contact-org"
                type="text"
                name="organization"
                className={styles.input}
                placeholder={t.orgLabel}
                required
                autoComplete="organization"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="contact-email" className={`label-mono ${styles.label}`}>{t.emailLabel}</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              className={styles.input}
              placeholder={t.emailLabel}
              required
              autoComplete="email"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="contact-message" className={`label-mono ${styles.label}`}>{t.messageLabel}</label>
            <textarea
              id="contact-message"
              name="message"
              className={`${styles.input} ${styles.textarea}`}
              placeholder={t.messageLabel}
              rows={5}
              required
            />
          </div>

          <button type="submit" className={`btn-pill ${styles.submit}`}>
            {t.submitBtn}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerLogo}>
            <img src="/DataFlowX_Logo_W.png" alt="DataFlowX Logo" className={styles.footerLogoImage} />
          </div>
          <span className={`label-mono ${styles.copyright}`}>
            © {new Date().getFullYear()} DataFlowX
          </span>
        </footer>
      </div>
    </section>
  );
}
