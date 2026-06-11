'use client';

import { useEffect, useRef } from 'react';
import styles from './IntelComponents.module.css';

const BENTO_ITEMS = [
  {
    title: 'The Mesh',
    label: 'BİLGİ GRAFİĞİ',
    desc: 'Tehdit aktörleri, kampanyalar ve IOC\'ler arasındaki gizli bağlantıları ortaya çıkaran yaşayan, ilişkisel beyin. Her veri noktası bir düğüm, her ilişki bir kenar.',
    size: 'large',
    tags: [
      { text: 'APT-29', type: 'red' },
      { text: 'APT-41', type: 'red' },
      { text: 'Cobalt Strike', type: 'amber' },
      { text: 'SolarWinds', type: 'amber' },
      { text: 'T1055 — Injection', type: 'blue' },
      { text: 'T1190 — Exploit', type: 'blue' },
    ]
  },
  {
    title: 'Sentinels',
    label: 'SENSÖRLER',
    desc: 'Otonom veri toplayan izleyici ağı. Yüzlerce kaynaktan IOC, feed ve tehdit sinyali gerçek zamanlı olarak toplanır.',
    size: 'medium',
    tags: []
  },
  {
    title: 'Oracle',
    label: 'PUANLAMA MOTORU',
    desc: 'Birleşik karar motoru. Her IOC ve tehdidi bağlamsal kanıt zincirleriyle puanlar.',
    size: 'medium',
    tags: []
  },
  {
    title: 'Arsenal',
    label: 'KURAL MOTORU',
    desc: 'YARA · Sigma · Snort yaşam döngüsü yönetimi.',
    size: 'medium',
    tags: [
      { text: 'YARA', type: 'blue' },
      { text: 'Sigma', type: 'blue' },
      { text: 'Snort', type: 'blue' },
    ]
  },
  {
    title: 'Relay',
    label: 'API KATMANI',
    desc: 'REST API sinir uçları. Gerçek zamanlı entegrasyon.',
    size: 'medium',
    tags: []
  },
  {
    title: 'Briefs',
    label: 'YÖNETSEL KATMAN',
    desc: 'AI tarafından sentezlenmiş, yönetim kuruluna hazır tehdit brifingleri.',
    size: 'small',
    tags: []
  },
  {
    title: 'Operations',
    label: 'ANALİST KATMANI',
    desc: 'SOC analistleri için gerçek zamanlı komuta merkezi. Bento Grid arayüzü.',
    size: 'small',
    tags: []
  },
  {
    title: 'Bureau',
    label: 'MSSP KATMANI',
    desc: 'Çok kiracılı yönetim. Beyaz etiket raporlama. Ölçeklenebilir kâr marjı.',
    size: 'wide',
    tags: []
  }
];

export default function IntelBentoGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll(`.${styles.bentoCard}`);
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add(styles.animateIn);
            }, index * 100);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.bentoGrid} ref={gridRef}>
      {BENTO_ITEMS.map((item, i) => (
        <div key={i} className={`${styles.bentoCard} ${styles[item.size]}`}>
          <div className={styles.bentoLabel}>{item.label}</div>
          <h3 className={styles.bentoTitle}>{item.title}</h3>
          <p className={styles.bentoDesc}>{item.desc}</p>
          
          {item.tags.length > 0 && (
            <div className={styles.tagGroup}>
              {item.tags.map((tag, j) => (
                <span key={j} className={`${styles.tag} ${styles[tag.type]}`}>
                  {tag.text}
                </span>
              ))}
            </div>
          )}
          
          {item.title === 'The Mesh' && (
            <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center' }}>
              {/* Infinity symbol icon */}
              <svg width="40" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6a6 6 0 1 1-12 0 6 6 0 0 1 12 0v12a6 6 0 1 1-12 0 6 6 0 0 1 12 0z"/>
                <path d="M6 12h12"/>
              </svg>
            </div>
          )}
          
          {item.title === 'Sentinels' && (
            <div style={{ marginTop: '2rem', display: 'flex', gap: '4px', height: '40px', alignItems: 'flex-end' }}>
              {[30, 50, 40, 80, 50, 60, 90, 40].map((h, j) => (
                <div key={j} style={{ width: '12%', height: `${h}%`, background: h > 70 ? '#EF4444' : '#DC2626', opacity: h > 70 ? 1 : 0.6, borderRadius: '2px' }} />
              ))}
            </div>
          )}
          
          {item.title === 'Oracle' && (
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '3rem', fontWeight: 800, color: '#EF4444' }}>9.4</span>
              <span style={{ color: '#64748B', fontWeight: 600 }}>/ 10</span>
            </div>
          )}
          
          {item.title === 'Relay' && (
            <div style={{ marginTop: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#64748B' }}>
              <div style={{ color: '#DC2626', marginBottom: '4px' }}>GET /v1/ioc/{'{hash}'}</div>
              <div style={{ color: '#DC2626' }}>POST /v1/hunt/query</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
