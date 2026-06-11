'use client';

import React, { useState } from 'react';
import styles from './ProductSpecs.module.css';


const PRODUCT_DATA = {
  SMALL: [
    {
      category: 'General Information',
      items: [
        { label: 'Model', value: 'DFX Unidirectional Gateway 1G Small / 10G Small' },
        { label: 'Product Code', value: 'DFX-DDX-P-SM101-C-TR / DFX-DDX-P-SM110-C-TR' },
        { label: 'Diode Speed', value: '1G / 10G' },
      ]
    },
    {
      category: 'Hardware & Connectivity',
      items: [
        { label: 'Network Interface', value: '2 × 1GbE LAN' },
        { label: 'Memory', value: '128 GB' },
        { label: 'Storage', value: '960 GB' },
        { label: 'UpLink Port', value: '2 × 10G SFP+' },
      ]
    }
  ],
  MINI: [
    {
      category: 'General Information',
      items: [
        { label: 'Model', value: 'DFX Unidirectional Gateway 1G Mini' },
        { label: 'Product Code', value: 'DFX-DDX-P-MN101-C-TR' },
        { label: 'Diode Speed', value: '1G' },
      ]
    },
    {
      category: 'Hardware & Connectivity',
      items: [
        { label: 'Network Interface', value: '2 × 1GbE LAN, 2 × 10GbE SFP+' },
        { label: 'Memory', value: '64 GB' },
        { label: 'Storage', value: '960 GB' },
        { label: 'UpLink Port', value: '6 × 1GbE & 2 × 10G SFP+' },
      ]
    }
  ],
  COMPACT: [
    {
      category: 'General Information',
      items: [
        { label: 'Model', value: 'DFX Unidirectional Gateway 1G Compact' },
        { label: 'Product Code', value: 'DFX-DDX-P-CC101-C-TR' },
        { label: 'Diode Speed', value: '1G' },
      ]
    },
    {
      category: 'Hardware & Connectivity',
      items: [
        { label: 'Network Interface', value: '2 × GbE (RJ45)' },
        { label: 'Memory', value: '16 GB' },
        { label: 'Storage', value: '128 GB SSD' },
        { label: 'UpLink Port', value: '2 × 1GbE (base)' },
      ]
    }
  ],
  ENTERPRISE: [
    {
      category: 'General Information',
      items: [
        { label: 'Model', value: 'DFX Unidirectional Gateway 1G Enterprise / 10G Enterprise' },
        { label: 'Product Code', value: 'DFX-DDX-P-EN101-C-TR / DFX-DDX-P-EN110-C-TR' },
        { label: 'Diode Speed', value: '1G / 10G' },
      ]
    },
    {
      category: 'Hardware & Connectivity',
      items: [
        { label: 'Network Interface', value: '2 × 1GbE, 4 × 10/25Gb SFP28' },
        { label: 'Memory', value: '256 GB' },
        { label: 'Storage', value: '1.9 TB' },
        { label: 'UpLink Port', value: '4 × 10/25Gb SFP28' },
      ]
    }
  ],
  INTEGRATED: [
    {
      category: 'General Information',
      items: [
        { label: 'Model', value: 'DFX Fusion 1G-TX/RX' },
        { label: 'Product Code', value: 'DFX-DDX-P-CC101-C-TR' },
        { label: 'Diode Speed', value: '1G' },
      ]
    },
    {
      category: 'Hardware & Connectivity',
      items: [
        { label: 'Network Interface', value: '2 × 1GbE LAN (isolated TX/RX)' },
        { label: 'Memory', value: '16 GB' },
        { label: 'Storage', value: '120 GB' },
        { label: 'UpLink Port', value: '2 × 1GbE' },
      ]
    }
  ]
};

export default function ProductSpecs() {
  const tabs = Object.keys(PRODUCT_DATA) as Array<keyof typeof PRODUCT_DATA>;
  const [activeTab, setActiveTab] = useState<keyof typeof PRODUCT_DATA>('SMALL');

  return (
    <div className={styles.container}>
      {/* Left Panel - Image and Brief Info */}
      <div className={styles.leftPanel}>
        <h3 className={styles.productTitle}>DFX UG Models</h3>
        <p className={styles.productDesc}>
          Listed in the NATO Information Assurance Product Catalogue. Technical documents and specifications for DataFlowX Unidirectional Gateway hardware appliances.
        </p>

        <div className={styles.imagePlaceholder}>
          <img 
            src="/models/diode.png" 
            alt="DFX Unidirectional Gateway Models" 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
          />
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
