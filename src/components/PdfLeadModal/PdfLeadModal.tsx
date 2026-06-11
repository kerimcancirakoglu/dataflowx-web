'use client';

import { useRef, useEffect } from 'react';
import styles from './PdfLeadModal.module.css';

interface PdfLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function PdfLeadModal({ isOpen, onClose, onSubmit }: PdfLeadModalProps) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        
        <div className={styles.header}>
          <h2 className={styles.title}>Download Resource</h2>
          <p className={styles.subtitle}>Please fill out the form below to access the PDF.</p>
        </div>

        <div className={styles.formCard}>
          <form ref={formRef} onSubmit={handleSubmit} className={styles.form} noValidate>
            
            <div className={styles.row}>
              <div className={styles.field}>
                <input id="modal-firstname" type="text" className={styles.input} placeholder="First Name*" required />
              </div>
              <div className={styles.field}>
                <input id="modal-lastname" type="text" className={styles.input} placeholder="Last Name*" required />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <input id="modal-jobtitle" type="text" className={styles.input} placeholder="Job Title*" required />
              </div>
              <div className={styles.field}>
                <input id="modal-company" type="text" className={styles.input} placeholder="Company*" required />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <input id="modal-phone" type="tel" className={styles.input} placeholder="Phone Number*" required />
              </div>
              <div className={styles.field}>
                <input id="modal-email" type="email" className={styles.input} placeholder="Email*" required />
              </div>
            </div>

            <div className={styles.field}>
              <select className={styles.select} required defaultValue="">
                <option value="" disabled hidden>Country*</option>
                <option value="TR">Turkey</option>
                <option value="AE">United Arab Emirates</option>
                <option value="SA">Saudi Arabia</option>
                <option value="QA">Qatar</option>
                <option value="UK">United Kingdom</option>
                <option value="US">United States</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className={styles.checkboxField}>
              <input type="checkbox" id="modal-consent" className={styles.checkbox} required />
              <label htmlFor="modal-consent">
                I consent to the processing of my data in accordance with the DataFlowX Privacy Policy. I agree to be contacted regarding relevant security solutions and industry updates.
              </label>
            </div>

            <div className={styles.submitWrapper}>
              <button type="submit" className={styles.submit}>
                REQUEST STRATEGIC CONSULTATION
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
