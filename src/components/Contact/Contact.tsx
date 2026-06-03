'use client';

import { useRef } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
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
          Get Contact<br />
        </h2>

        <p className={`body-text ${styles.subtitle}`}>
          Consult with our security experts to determine the right solution for your critical infrastructure
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="contact-name" className={`label-mono ${styles.label}`}>Name Surname</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                className={styles.input}
                placeholder="Name Surname"
                required
                autoComplete="name"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="contact-org" className={`label-mono ${styles.label}`}>Company</label>
              <input
                id="contact-org"
                type="text"
                name="organization"
                className={styles.input}
                placeholder="Company"
                required
                autoComplete="organization"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="contact-email" className={`label-mono ${styles.label}`}>E-Mail</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              className={styles.input}
              placeholder="E-Mail"
              required
              autoComplete="email"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="contact-message" className={`label-mono ${styles.label}`}>Your Message</label>
            <textarea
              id="contact-message"
              name="message"
              className={`${styles.input} ${styles.textarea}`}
              placeholder="Your Message"
              rows={5}
              required
            />
          </div>

          <button type="submit" className={`btn-pill ${styles.submit}`}>
            Send Message
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
