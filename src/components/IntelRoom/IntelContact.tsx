'use client';

import { useRef } from 'react';
import styles from './IntelContact.module.css';

export default function IntelContact() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <section className={styles.section} id="contact">
      <div className={styles.inner}>
        
        <div className={styles.grid}>
          {/* Left Side */}
          <div className={styles.leftContent}>
            <h2 className={styles.title}>
              Get <span className={styles.titleHighlight}>Contact</span>
            </h2>
            <p className={styles.subtitle}>
              Consult with our security experts to determine the right solution for your critical infrastructure.
            </p>
          </div>

          {/* Right Side - Form Box */}
          <div className={styles.rightContent}>
            <div className={styles.formContainer}>
              <form ref={formRef} onSubmit={handleSubmit} className={styles.form} noValidate>
                <div className={styles.row}>
                  <input type="text" className={styles.input} placeholder="First Name*" required />
                  <input type="text" className={styles.input} placeholder="Last Name*" required />
                </div>
                
                <div className={styles.row}>
                  <input type="text" className={styles.input} placeholder="Job Title*" required />
                  <input type="text" className={styles.input} placeholder="Company*" required />
                </div>

                <div className={styles.row}>
                  <input type="tel" className={styles.input} placeholder="Phone Number*" required />
                  <input type="email" className={styles.input} placeholder="Email*" required />
                </div>

                <select className={styles.input} required defaultValue="">
                  <option value="" disabled>Country*</option>
                  <option value="us">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="tr">Turkey</option>
                  <option value="other">Other</option>
                </select>

                <div className={styles.consentWrapper}>
                  <input type="checkbox" id="consent" className={styles.checkbox} required />
                  <label htmlFor="consent" className={styles.consentText}>
                    I consent to the processing of my data in accordance with the DataFlowX Privacy Policy. I agree to be contacted regarding relevant security solutions and industry updates.
                  </label>
                </div>

                <button type="submit" className={styles.submitBtn}>
                  REQUEST STRATEGIC CONSULTATION
                </button>
              </form>
            </div>
            
            <p className={styles.trustedText}>
              Trusted by critical infrastructures worldwide.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
