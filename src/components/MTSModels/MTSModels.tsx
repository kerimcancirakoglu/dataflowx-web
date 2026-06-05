'use client';

import React, { useState } from 'react';
import styles from './MTSModels.module.css';

const PRODUCT_DATA = {
  KIOSK: [
    {
      category: 'General Information',
      items: [
        { label: 'Model', value: 'DFX Media Transfer Station Kiosk' },
        { label: 'Form Factor', value: 'Standalone Kiosk' },
        { label: 'Use Case', value: 'Lobby, Secure Entry Points' },
      ]
    },
    {
      category: 'Features & Security',
      items: [
        { label: 'Media Support', value: 'USB, CD/DVD, Portable Disks' },
        { label: 'Anti-Malware', value: 'AI-Powered Multiple AV Engines' },
        { label: 'Purification', value: 'Content Disarm & Reconstruction (CDR)' },
        { label: 'Authentication', value: 'Active Directory / LDAP' },
      ]
    }
  ],
  PORTABLE: [
    {
      category: 'General Information',
      items: [
        { label: 'Model', value: 'DFX Media Transfer Station Portable' },
        { label: 'Form Factor', value: 'Rugged Portable Case / Desktop' },
        { label: 'Use Case', value: 'Field Operations, Mobile Sites' },
      ]
    },
    {
      category: 'Features & Security',
      items: [
        { label: 'Media Support', value: 'USB, SD Card, Portable Disks' },
        { label: 'Anti-Malware', value: 'AI-Powered Multiple AV Engines' },
        { label: 'Purification', value: 'Content Disarm & Reconstruction (CDR)' },
        { label: 'Authentication', value: 'Active Directory / LDAP' },
      ]
    }
  ]
};

export default function MTSModels() {
  const tabs = Object.keys(PRODUCT_DATA) as Array<keyof typeof PRODUCT_DATA>;
  const [activeTab, setActiveTab] = useState<keyof typeof PRODUCT_DATA>('KIOSK');

  return (
    <div className={styles.container}>
      {/* Left Panel - Image and Brief Info */}
      <div className={styles.leftPanel}>
        <h3 className={styles.productTitle}>DFX Media Transfer Station Models</h3>
        <p className={styles.productDesc}>
          Available in multiple form factors to fit your organization's physical security needs. Choose between the robust standalone Kiosk for secure facilities, or the Portable unit for field operations.
        </p>

        <div className={styles.imagePlaceholder}>
          {/* We can place an image of the kiosk or portable here if available */}
          <div className={styles.modelVisual}>
            {activeTab === 'KIOSK' ? (
              <img 
                src="/models/kiosk.png" 
                alt="DFX Media Transfer Station Kiosk" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
              />
            ) : (
              <img 
                src="/models/station-tablet.png" 
                alt="DFX Media Transfer Station Portable" 
                style={{ width: '80%', height: '80%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Right Panel - Specs Table */}
      <div className={styles.rightPanel}>
        {/* Tabs */}
        <div className={styles.tabs}>
          {tabs.map(tab => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table Content */}
        <div className={styles.specsTable}>
          {PRODUCT_DATA[activeTab].map((section, idx) => (
            <div key={idx} className={styles.specRow}>
              <div className={styles.specCategory}>{section.category}</div>
              <div className={styles.specItems}>
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className={styles.specItem}>
                    <div className={styles.specLabel}>{item.label}</div>
                    <div className={styles.specValue}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
