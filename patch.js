const fs = require('fs');

let tsx = fs.readFileSync('src/app/intelroom/IntelRoomClient.tsx', 'utf8');

// 1. Add states and data
const stateInjection = `
  const [activeTab, setActiveTab] = useState(0);
  const [activeLayer, setActiveLayer] = useState(1);

  const tickerData = [
    { text: 'APT-29 — Yeni C2 altyapısı tespit edildi', cls: styles.tickerRed },
    { text: 'MITRE T1190 — 3 yeni exploit varyantı', cls: styles.tickerAmber },
    { text: 'The Mesh: 14,332 yeni düğüm eklendi bugün', cls: '' },
    { text: 'Oracle Skoru Güncellendi: CVE-2025-4891 → 9.8', cls: styles.tickerRed },
    { text: 'Cobalt Strike beacon — 12 yeni IOC', cls: styles.tickerAmber },
    { text: 'FS-ISAC Bülteni — Finansal sektör uyarısı aktif', cls: '' },
    { text: 'Lazarus Group — Güney Kore odaklı kampanya', cls: styles.tickerRed },
    { text: 'YARA Kural Güncellemesi: Arsenal v4.2.1', cls: '' },
    { text: 'Relay API — 99.97% uptime bu ay', cls: '' },
    { text: 'Bureau: 47 MSSP kiracısı — 312 müşteri profili', cls: '' },
  ];

  const layers = [
    { name: 'Sentinels', role: 'Sensörler', icon: '📡', sub: 'Veri Toplama', desc: 'Otonom veri toplayan izleyici ağı. Yüzlerce kaynaktan IOC, feed ve tehdit sinyali gerçek zamanlı olarak toplanır.' },
    { name: 'The Mesh', role: 'Bilgi Grafiği', icon: '🧠', sub: 'İlişkisel Hafıza', desc: 'Tehdit aktörleri, kampanyalar ve IOC\\'ler arasındaki gizli bağlantıları ortaya çıkaran yaşayan, büyüyen bilgi grafiği.' },
    { name: 'Oracle', role: 'Puanlama Motoru', icon: '⚡', sub: 'Karar Zekası', desc: 'Her IOC ve tehdidi bağlamsal kanıt zincirleriyle puanlayan, açıklanabilir AI kararları üreten birleşik motor.' },
    { name: 'Operations', role: 'Analist Katmanı', icon: '🔬', sub: 'Komuta Merkezi', desc: 'SOC analistleri için gerçek zamanlı avlanma arayüzü. Bento Grid düzeni ile çoklu monitör optimizasyonu.' },
    { name: 'Briefs', role: 'Yönetsel Katman', icon: '📋', sub: 'Liderlik İstihbaratı', desc: 'AI sentezli, yönetim kuruluna hazır tehdit brifingleri. Teknik veriyi iş diline otomatik çevirir.' },
    { name: 'Bureau', role: 'MSSP Katmanı', icon: '🏢', sub: 'Çok Kiracılı Yönetim', desc: 'MSSP\\'lerin personel artırmadan daha fazla müşteriye hizmet vermesini sağlayan çok kiracılı beyaz etiket platformu.' },
    { name: 'Arsenal', role: 'Kural Motoru', icon: '🛡️', sub: 'Tespit Mühendisliği', desc: 'YARA, Sigma ve Snort kurallarının tüm yaşam döngüsünü yöneten, sürüm kontrolü entegre kural deposu.' },
    { name: 'Relay', role: 'API Katmanı', icon: '🔗', sub: 'Entegrasyon Siniri', desc: 'REST API ile sistemin sinir uçları. SIEM, SOAR ve diğer araçlara gerçek zamanlı istihbarat akışı sağlar.' },
  ];

  const activeLayerData = layers[activeLayer];
`;

tsx = tsx.replace('const [activeTab, setActiveTab] = useState(0);', stateInjection);

// 2. Inject Ticker
const tickerInjection = `
      <div className={styles.tickerInner} id="ticker-inner">
        {[...tickerData, ...tickerData].map((d, i) => (
          <div key={i} className={\`\${styles.tickerItem} \${d.cls}\`}>
            <div className={styles.dot}></div>{d.text}
          </div>
        ))}
      </div>
`;
tsx = tsx.replace('<div className={styles.tickerInner} id="ticker-inner"></div>', tickerInjection);

// 3. Inject Layers Items
const layersInjection = `
        <div className={styles.layerItems} id="layer-items">
          {layers.map((l, i) => (
            <div 
              key={i} 
              className={\`\${styles.layerItem} \${activeLayer === i ? styles.open : ''}\`}
              onClick={() => setActiveLayer(i)}
            >
              <div className={styles.layerHeader}>
                <div className={styles.layerIndex}>0{i + 1}</div>
                <div className={styles.layerName}>{l.name}</div>
                <div className={styles.layerRole}>{l.role}</div>
              </div>
              <div className={styles.layerDesc}>{l.desc}</div>
            </div>
          ))}
        </div>
`;
tsx = tsx.replace('<div className={styles.layerItems} id="layer-items"></div>', layersInjection);

// 4. Update Layer Visuals
tsx = tsx.replace('<div className={styles.layerVisualIcon} id="lv-icon">🧠</div>', '<div className={styles.layerVisualIcon} id="lv-icon">{activeLayerData.icon}</div>');
tsx = tsx.replace('<div className={styles.layerVisualTitle} id="lv-title">The Mesh</div>', '<div className={styles.layerVisualTitle} id="lv-title">{activeLayerData.name}</div>');
tsx = tsx.replace('<div className={styles.layerVisualSub} id="lv-sub">Bilgi Grafiği</div>', '<div className={styles.layerVisualSub} id="lv-sub">{activeLayerData.sub}</div>');

// 5. Update Personas Tabs
tsx = tsx.replace('<div className={`${styles.pTab} ${styles.active}`} >CISO</div>', '<div className={`${styles.pTab} ${activeTab === 0 ? styles.active : \'\'}`} onClick={() => setActiveTab(0)}>CISO</div>');
tsx = tsx.replace('<div className={styles.pTab} >SOC Analisti</div>', '<div className={`${styles.pTab} ${activeTab === 1 ? styles.active : \'\'}`} onClick={() => setActiveTab(1)}>SOC Analisti</div>');
tsx = tsx.replace('<div className={styles.pTab} >MSSP İşletmecisi</div>', '<div className={`${styles.pTab} ${activeTab === 2 ? styles.active : \'\'}`} onClick={() => setActiveTab(2)}>MSSP İşletmecisi</div>');

// 6. Update Personas Panels
tsx = tsx.replace('<div className={`${styles.pPanel} ${styles.active}`} id="pp-0">', '<div className={`${styles.pPanel} ${activeTab === 0 ? styles.active : \'\'}`} id="pp-0">');
tsx = tsx.replace('<div className={styles.pPanel} id="pp-1">', '<div className={`${styles.pPanel} ${activeTab === 1 ? styles.active : \'\'}`} id="pp-1">');
tsx = tsx.replace('<div className={styles.pPanel} id="pp-2">', '<div className={`${styles.pPanel} ${activeTab === 2 ? styles.active : \'\'}`} id="pp-2">');

fs.writeFileSync('src/app/intelroom/IntelRoomClient.tsx', tsx);
console.log('Interactivity added.');
