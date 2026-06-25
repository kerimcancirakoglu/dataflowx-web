'use client';

import { useRef, useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import styles from './Contact.module.css';

export default function ContactClient({ t }: { t: any }) {
  const formRef = useRef<HTMLFormElement>(null);

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setIsSubmitting(true);
    
    const formData = new FormData(formRef.current);
    const payload = {
      fullName: formData.get('name'),
      organization: formData.get('organization'),
      email: formData.get('email'),
      country: formData.get('country'),
      message: formData.get('message'),
      documentName: 'GENERAL_CONTACT',
      turnstileToken
    };

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (response.ok) {
        setSuccess(true);
        formRef.current.reset();
      }
    } catch (err) {
      console.error('Contact form submission failed', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.section} id="contact">
      <div className={styles.inner}>

        <div className={styles.column}>
          {/* Left Column: Text */}
          <div className={styles.textContent}>
            <h2 className={`display-lg ${styles.title}`}>
              {t.title}
            </h2>
            <p className={`body-text ${styles.subtitle}`}>
              {t.subtitle}
            </p>
          </div>
        </div>

        <div className={styles.column}>
          {/* Right Column: Form */}
          <div className={styles.formContent}>
            {success ? (
              <div className={styles.successMessage}>
                <h3 className="display-sm">Message Sent Successfully!</h3>
                <p className="body-text">Our team will get back to you shortly.</p>
              </div>
            ) : (
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

                <div className={styles.row}>
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
                    <label htmlFor="contact-country" className={`label-mono ${styles.label}`}>Country</label>
                    <select 
                      id="contact-country" 
                      name="country" 
                      className={styles.input} 
                      required
                    >
                      <option value="">Select Country</option>
                      <option value="TR">Turkey</option>
                      <option value="AE">United Arab Emirates</option>
                      <option value="SA">Saudi Arabia</option>
                      <option value="QA">Qatar</option>
                      <option value="GB">United Kingdom</option>
                      <option value="US">United States</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
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

                <div style={{ marginTop: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                  <Turnstile 
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'} 
                    onSuccess={(token) => setTurnstileToken(token)}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <input type="checkbox" id="contact-gdpr" name="gdpr" required style={{ marginTop: '0.25rem' }} />
                  <label htmlFor="contact-gdpr" className="body-text" style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                    I consent to the processing of my data in accordance with the Privacy Policy.
                  </label>
                </div>

                <button type="submit" className={`btn-pill ${styles.submit}`} disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : t.submitBtn}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
