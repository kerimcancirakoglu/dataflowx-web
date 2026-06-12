'use client';

import { useRef, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './PdfLeadModal.module.css';

interface PdfLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  // This gets passed the PDF filename when submitting is successful
  onSubmit: () => void;
  documentName?: string;
}

export default function PdfLeadModal({ isOpen, onClose, onSubmit, documentName = 'Generic Document' }: PdfLeadModalProps) {
  const t = useTranslations('ContactForm');
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset state on open
      setIsSubmitting(false);
      setErrorMsg(null);
      setIsSuccess(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    const formData = new FormData(formRef.current);
    
    // Construct payload
    const payload = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      company: formData.get('company'),
      website_url: formData.get('website_url'), // Honeypot
      documentName,
    };

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        // We throw to catch block, but use API's error message if provided
        throw new Error(result.error || t('genericError'));
      }

      // Success
      setIsSuccess(true);
      
      // Trigger the download callback after a short delay so user sees success message
      setTimeout(() => {
        onSubmit();
        onClose();
      }, 2000);

    } catch (err: any) {
      setErrorMsg(err.message || t('genericError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        
        <div className={styles.header}>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.subtitle}>{t('description')}</p>
        </div>

        <div className={styles.formCard}>
          {isSuccess ? (
            <div style={{ textAlign: 'center', padding: '2rem 0', color: '#10B981' }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 1rem' }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{t('successMessage')}</h3>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className={styles.form} noValidate>
              
              {/* HONEYPOT - Hidden from real users */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
              </div>

              {errorMsg && (
                <div style={{ color: '#EF4444', marginBottom: '1rem', fontSize: '0.9rem', padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '4px' }}>
                  {errorMsg}
                </div>
              )}

              <div className={styles.row}>
                <div className={styles.field} style={{ width: '100%' }}>
                  <input name="fullName" type="text" className={styles.input} placeholder={t('namePlaceholder')} required />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <input name="company" type="text" className={styles.input} placeholder="Company*" required />
                </div>
                <div className={styles.field}>
                  <input name="email" type="email" className={styles.input} placeholder={t('emailPlaceholder')} required />
                </div>
              </div>

              <div className={styles.checkboxField}>
                <input type="checkbox" id="modal-consent" className={styles.checkbox} required />
                <label htmlFor="modal-consent">
                  I consent to the processing of my data in accordance with the DataFlowX Privacy Policy. I agree to be contacted regarding relevant security solutions and industry updates.
                </label>
              </div>

              <div className={styles.submitWrapper}>
                <button type="submit" className={styles.submit} disabled={isSubmitting}>
                  {isSubmitting ? t('submitting') : t('submitBtn')}
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
