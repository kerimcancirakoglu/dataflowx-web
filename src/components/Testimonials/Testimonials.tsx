'use client';

import React from 'react';
import styles from './Testimonials.module.css';

const TESTIMONIALS = [
  {
    text: "DataFlowX's Unidirectional Gateway completely transformed our OT network security. We can now safely export real-time production data without ever exposing our critical industrial control systems to external threats.",
    role: "Head of OT Security",
    sector: "Major Energy Provider",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20"></path>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    )
  },
  {
    text: "The Sandbox solution catches zero-day threats that our previous vendors missed. Its ability to simulate human behavior and evade detection by advanced malware is truly game-changing for our SOC team.",
    role: "Chief Information Security Officer",
    sector: "Global Financial Institution",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    )
  },
  {
    text: "Implementing DataFlowX's Secure Remote Access allowed us to maintain secure communication channels between different classification levels. The peace of mind it brings to our defense infrastructure is invaluable.",
    role: "Security Architect",
    sector: "National Defense Agency",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    )
  }
];

export default function Testimonials() {
  return (
    <section className={styles.section} id="testimonials">
      <div className={styles.inner}>
        <div className={styles.title}>
          <h2 className="display-lg">
            Trusted by <span style={{ color: '#F5A706' }}>Industry Leaders</span>
          </h2>
          <p className="body-md" style={{ color: 'rgba(255,255,255,0.6)', marginTop: '16px', maxWidth: '600px', margin: '16px auto 0' }}>
            Hear how organizations worldwide secure their critical infrastructure and mission-critical data with DataFlowX.
          </p>
        </div>

        <div className={styles.grid}>
          {TESTIMONIALS.map((testimonial, index) => (
            <div key={index} className={styles.card}>
              {/* Quote Icon Background */}
              <svg className={styles.quoteIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21L16.44 14.976C16.666 14.384 16.792 13.753 16.804 13.111C16.822 12.152 16.516 11.222 15.932 10.457C15.348 9.692 14.516 9.133 13.557 8.861L13.13 8.741L13.553 8.318C14.159 7.712 14.981 7.372 15.838 7.372H16.002V3H15.838C14.07 3 12.375 3.702 11.125 4.952C9.875 6.202 9.173 7.897 9.173 9.665V10.222C9.173 11.258 9.42 12.274 9.892 13.181L11.594 16.447L14.017 21ZM5.017 21L7.44 14.976C7.666 14.384 7.792 13.753 7.804 13.111C7.822 12.152 7.516 11.222 6.932 10.457C6.348 9.692 5.516 9.133 4.557 8.861L4.13 8.741L4.553 8.318C5.159 7.712 5.981 7.372 6.838 7.372H7.002V3H6.838C5.07 3 3.375 3.702 2.125 4.952C0.875 6.202 0.173 7.897 0.173 9.665V10.222C0.173 11.258 0.42 12.274 0.892 13.181L2.594 16.447L5.017 21Z" />
              </svg>

              {/* Stars */}
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={styles.starIcon} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Text */}
              <p className={styles.text}>"{testimonial.text}"</p>

              {/* Author */}
              <div className={styles.author}>
                <div className={styles.avatar}>
                  {testimonial.icon}
                </div>
                <div className={styles.authorInfo}>
                  <span className={styles.role}>{testimonial.role}</span>
                  <span className={styles.sector}>{testimonial.sector}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
