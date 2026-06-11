import React from 'react';
import styles from './FeaturesGrid.module.css';

const features = [
  {
    title: 'Easy to Deploy',
    desc: 'Preconfigured platform deploys quickly and seamlessly.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    )
  },
  {
    title: 'Transparent to Users',
    desc: 'Fast and high-fidelity data replication means there is no need to alter work procedures of corporate users.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )
  },
  {
    title: 'Highly Scalable',
    desc: 'We offer a 100Mbps base platform that can be field upgraded to 1Gbps. Additionally, we offer an option for 10Gbps delivered on enterprise servers. The 10Mbps DIN rail model is field upgradeable to 50Mbps.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="13 2 13 9 20 9" />
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <path d="M9 13l3 3 3-3" />
        <path d="M12 16v-6" />
      </svg>
    )
  },
  {
    title: 'Full Support for Industrial Protocols',
    desc: 'Includes TCP, UDP, HTTPS, FTP, SFTP, FTPS, SMB, Windows File Share, CIFS, SMTP, Video, Aveva Pi (1U model only), Modbus, OPC DA/AE/UA, MQTT, DNP3, IEC-104, ICCP, and Screen View.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    )
  },
  {
    title: 'Enables Regulatory Compliance',
    desc: 'Supports compliance with Industrial Cybersecurity standards: NERC CIP, NIST CSF, ICS 800-82, 800-53, IEC 62443, NRC 5.71, CFATS ISO 27001, 27032, 27103, ANSSI, IIC SF and more.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
        <path d="M10 9H8" />
      </svg>
    )
  },
  {
    title: 'Certifications',
    desc: 'DFX UG is certified in Common Criteria EAL4+ and C1D2*. \n*DFX UG DIN rail model only. C1D2 certification as of November 2024.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    )
  }
];

export default function FeaturesGrid() {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {features.map((feature, idx) => (
          <div key={idx} className={styles.card}>
            <div className={styles.iconWrapper}>
              {feature.icon}
            </div>
            <h3 className={styles.cardTitle}>{feature.title}</h3>
            <p className={styles.cardDesc}>{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
