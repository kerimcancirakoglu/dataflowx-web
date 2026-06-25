'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ProductSpecs.module.css';
import { useTranslations } from 'next-intl';


const PRODUCT_DATA = {
  SMALL: [
    {
      categoryKey: 'genInfo',
      items: [
        { labelKey: 'model', value: 'DFX Unidirectional Gateway 1G Small / 10G Small' },
        { labelKey: 'code', value: 'DFX-DDX-P-SM101-C-TR / DFX-DDX-P-SM110-C-TR' },
        { labelKey: 'speed', value: '1G / 10G' },
      ]
    },
    {
      categoryKey: 'hwConn',
      items: [
        { labelKey: 'network', value: '2 × 1GbE LAN' },
        { labelKey: 'memory', value: '128 GB' },
        { labelKey: 'storage', value: '960 GB' },
        { labelKey: 'uplink', value: '2 × 10G SFP+' },
      ]
    }
  ],
  MINI: [
    {
      categoryKey: 'genInfo',
      items: [
        { labelKey: 'model', value: 'DFX Unidirectional Gateway 1G Mini' },
        { labelKey: 'code', value: 'DFX-DDX-P-MN101-C-TR' },
        { labelKey: 'speed', value: '1G' },
      ]
    },
    {
      categoryKey: 'hwConn',
      items: [
        { labelKey: 'network', value: '2 × 1GbE LAN, 2 × 10GbE SFP+' },
        { labelKey: 'memory', value: '64 GB' },
        { labelKey: 'storage', value: '960 GB' },
        { labelKey: 'uplink', value: '6 × 1GbE & 2 × 10G SFP+' },
      ]
    }
  ],
  COMPACT: [
    {
      categoryKey: 'genInfo',
      items: [
        { labelKey: 'model', value: 'DFX Unidirectional Gateway 1G Compact' },
        { labelKey: 'code', value: 'DFX-DDX-P-CC101-C-TR' },
        { labelKey: 'speed', value: '1G' },
      ]
    },
    {
      categoryKey: 'hwConn',
      items: [
        { labelKey: 'network', value: '2 × GbE (RJ45)' },
        { labelKey: 'memory', value: '16 GB' },
        { labelKey: 'storage', value: '128 GB SSD' },
        { labelKey: 'uplink', value: '2 × 1GbE (base)' },
      ]
    }
  ],
  ENTERPRISE: [
    {
      categoryKey: 'genInfo',
      items: [
        { labelKey: 'model', value: 'DFX Unidirectional Gateway 1G Enterprise / 10G Enterprise' },
        { labelKey: 'code', value: 'DFX-DDX-P-EN101-C-TR / DFX-DDX-P-EN110-C-TR' },
        { labelKey: 'speed', value: '1G / 10G' },
      ]
    },
    {
      categoryKey: 'hwConn',
      items: [
        { labelKey: 'network', value: '2 × 1GbE, 4 × 10/25Gb SFP28' },
        { labelKey: 'memory', value: '256 GB' },
        { labelKey: 'storage', value: '1.9 TB' },
        { labelKey: 'uplink', value: '4 × 10/25Gb SFP28' },
      ]
    }
  ],
  INTEGRATED: [
    {
      categoryKey: 'genInfo',
      items: [
        { labelKey: 'model', value: 'DFX Fusion 1G-TX/RX' },
        { labelKey: 'code', value: 'DFX-DDX-P-CC101-C-TR' },
        { labelKey: 'speed', value: '1G' },
      ]
    },
    {
      categoryKey: 'hwConn',
      items: [
        { labelKey: 'network', value: '2 × 1GbE LAN (isolated TX/RX)' },
        { labelKey: 'memory', value: '16 GB' },
        { labelKey: 'storage', value: '120 GB' },
        { labelKey: 'uplink', value: '2 × 1GbE' },
      ]
    }
  ]
};

export default function ProductSpecs({ 
  titleOverride, 
  modelNameOverride,
  imagePath = '/models/diode.png',
  imageScale = 1
}: { 
  titleOverride?: string;
  modelNameOverride?: string;
  imagePath?: string;
  imageScale?: number;
}) {
  const t = useTranslations("ProductSpecs");
  const tabs = Object.keys(PRODUCT_DATA) as Array<keyof typeof PRODUCT_DATA>;
  const [activeTab, setActiveTab] = useState<keyof typeof PRODUCT_DATA>('SMALL');

  return (
    <div className={styles.container}>
      {/* Left Panel - Image and Brief Info */}
      <div className={styles.leftPanel}>
        <h3 className={styles.productTitle}>{titleOverride || t('title')}</h3>
        <p className={styles.productDesc}>
          {t('desc')}
        </p>

        <div className={styles.imagePlaceholder}>
          <Image 
            src={imagePath} 
            alt={titleOverride || t('title')}
            width={600} height={600}
            style={{ width: '100%', height: '100%', objectFit: 'contain', transform: `scale(${imageScale})` }} 
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
              <div className={styles.specCategory}>{t(section.categoryKey)}</div>
              <div className={styles.specItems}>
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className={styles.specItem}>
                    <div className={styles.specLabel}>{t(item.labelKey)}</div>
                    <div className={styles.specValue}>
                      {item.labelKey === 'model' && modelNameOverride 
                        ? item.value.replace(/DFX Unidirectional Gateway/g, modelNameOverride) 
                        : item.value}
                    </div>
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
