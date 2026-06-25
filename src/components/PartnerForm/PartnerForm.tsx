'use client';

import React, { useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import styles from './PartnerForm.module.css';

export default function PartnerForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Re-use the existing lead API for simplicity, passing a special documentName
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          documentName: 'PARTNER_APPLICATION',
          turnstileToken
        }),
      });
      
      if (response.ok) {
        setSuccess(true);
        setFormData({ fullName: '', email: '', company: '', message: '' });
      }
    } catch (err) {
      console.error('Partner application failed', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.glowBorder}></div>
      <div className={styles.formContent}>
        <h3 className={styles.title}>Become A Partner</h3>
        <p className={styles.subtitle}>Join our global zero-trust ecosystem.</p>

        {success ? (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✓</div>
            <p>Application Received. Our team will contact you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <input 
                type="text" 
                required 
                placeholder="Full Name"
                value={formData.fullName}
                onChange={e => setFormData({...formData, fullName: e.target.value})}
                className={styles.input}
              />
            </div>
            
            <div className={styles.inputGroup}>
              <input 
                type="email" 
                required 
                placeholder="Work Email"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className={styles.input}
              />
            </div>
            
            <div className={styles.inputGroup}>
              <input 
                type="text" 
                required 
                placeholder="Company Name"
                value={formData.company}
                onChange={e => setFormData({...formData, company: e.target.value})}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <textarea 
                required 
                placeholder="Tell us about your partnership goals..."
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className={styles.textarea}
                rows={4}
              />
            </div>
            
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
              <Turnstile 
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'} 
                onSuccess={(token) => setTurnstileToken(token)}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={styles.submitBtn}
            >
              {isSubmitting ? 'INITIATING...' : 'SUBMIT APPLICATION'}
              <span className={styles.btnGlow}></span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
