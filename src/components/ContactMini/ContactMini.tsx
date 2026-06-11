'use client';

import { useRef } from 'react';
import styles from './ContactMini.module.css';

export default function ContactMini() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // WPGraphQL mutation or form handler goes here
    console.log('Form submitted');
  };

  return (
    <section className={styles.section} id="contact">
      <div className={styles.inner}>

        <div className={styles.textContent}>
          <h2 className={`display-md ${styles.title}`}>
            End-to-End Cybersecurity Architecture for <span style={{ color: '#F5A706' }}>Critical Infrastructure</span>
          </h2>

          <p className={`body-text ${styles.subtitle}`}>
            Secure your operational continuity. Request a strategic consultation to evaluate DataFlowX solutions tailored to your specific needs, and our experts will contact you shortly.
          </p>
        </div>

        <div className={styles.formContent}>
          <div className={styles.formCard}>
          <form ref={formRef} onSubmit={handleSubmit} className={styles.form} noValidate>
            
            <div className={styles.row}>
              <div className={styles.field}>
                <input id="contact-firstname" type="text" className={styles.input} placeholder="First Name*" required />
              </div>
              <div className={styles.field}>
                <input id="contact-lastname" type="text" className={styles.input} placeholder="Last Name*" required />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <input id="contact-jobtitle" type="text" className={styles.input} placeholder="Job Title*" required />
              </div>
              <div className={styles.field}>
                <input id="contact-company" type="text" className={styles.input} placeholder="Company*" required />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <input id="contact-phone" type="tel" className={styles.input} placeholder="Phone Number*" required />
              </div>
              <div className={styles.field}>
                <input id="contact-email" type="email" className={styles.input} placeholder="Email*" required />
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
              <input type="checkbox" id="contact-consent" className={styles.checkbox} required />
              <label htmlFor="contact-consent">
                I consent to the processing of my data in accordance with the DataFlowX Privacy Policy. I agree to be contacted regarding relevant security solutions and industry updates.
              </label>
            </div>

            <div className={styles.submitWrapper}>
              <button type="submit" className={`btn-pill ${styles.submit}`}>
                Request Strategic Consultation
              </button>
            </div>

          </form>
        </div>

          <p className={styles.trustedText}>
            Trusted by critical infrastructures worldwide.
          </p>
        </div>

      </div>
    </section>
  );
}
