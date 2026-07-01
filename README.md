# DataFlowX — Zero Trust Web Platform

**DataFlowX** kurumsal web sitesi — Next.js 16 (App Router), Sanity CMS ve Cloudflare Workers üzerinde çalışan çok dilli (EN / TR / AR) bir Zero Trust ürün platformu.

---

## 🏗️ Stack

| Katman | Teknoloji |
|---|---|
| **Framework** | Next.js 16 (App Router), TypeScript |
| **Deploy** | **Cloudflare Workers** — `npm run deploy:cf` |
| **CMS** | **Sanity** (`projectId: 15oto8dp`, `dataset: production`) |
| **i18n** | next-intl — 3 dil: `en` / `tr` / `ar` |
| **Stil** | CSS Modules (`*.module.css`) |
| **Animasyon** | GSAP (dinamik import — sadece `useEffect` içinde) |
| **3D** | React Three Fiber / Drei |
| **E-posta** | Resend API |
| **Form koruması** | Cloudflare Turnstile + honeypot |
| **Lead sistemi** | `/api/lead` → Resend + WordPress CF7 webhook |

> ⚠️ **Deploy:** `npm run build` değil, `npm run deploy:cf` kullan. Vercel **değil** — Cloudflare Workers.

---

## 🚀 Başlangıç

```bash
# Geliştirme sunucusu
npm run dev

# Cloudflare Workers deploy
npm run deploy:cf

# Sanity Studio (tarayıcıda)
# → localhost:3000/studio

# TypeScript kontrol
npx tsc --noEmit

# Sanity içerik seed (SANITY_API_WRITE_TOKEN gerekli)
SANITY_API_WRITE_TOKEN="..." node scripts/seed-sanity.mjs

# Audit (güvenlik/SEO/hız/UX)
python3 scripts/checklist.py --url https://www.dataflowx.com
```

---

## 🌍 Dil Stratejisi

```
EN locale  → Sanity CMS'ten çekilir (kayıtlı içerik)
TR locale  → messages/tr.json  (Sanity'e dokunmaz)
AR locale  → messages/ar.json  (Sanity'e dokunmaz)
```

Sayfalarda her zaman `locale === 'en'` kontrolü yapılır. TR/AR'da Sanity içeriği **asla** gösterilmez.

---

## 📦 Sanity Schema'ları

| Schema | Açıklama |
|---|---|
| `homePage` | Anasayfa hero slaytları + SEO (singleton) |
| `siteSettings` | Global site ayarları |
| `productPage` | 8 ürün sayfası (slug ile ayırt edilir) |
| `blogPost` | Blog yazıları |
| `news` | Haberler |
| `resource` | PDF kaynaklar (whitepaper, datasheet) |

### Seed edilen `productPage` dokümanları (9 toplam)

| `_id` | Sayfa |
|---|---|
| `homePage` | Anasayfa |
| `product-unidirectional-gateway` | `/unidirectional-gateway` |
| `product-portx` | `/portx` |
| `product-sandbox` | `/sandbox` |
| `product-dfx-cdr` | `/dfx-cdr` |
| `product-email-security-platform` | `/email-security-platform` |
| `product-secure-remote-access` | `/secure-remote-access` |
| `product-media-transfer-station` | `/media-transfer-station` |
| `product-intelroom` | `/intelroom` |

---

## 🗂️ Sayfa Yapısı

### Ben (ilk 4 ürün — tam Sanity entegrasyonlu)
| Sayfa | Sanity Alanlar |
|---|---|
| `/unidirectional-gateway` | overview |
| `/portx` | hero + overview |
| `/sandbox` | overview + features heading |
| `/dfx-cdr` | hero + features |

### Opus (son 4 ürün — Sanity entegrasyonu tamamlandı: 1 Temmuz 2026)
| Sayfa | Sanity Alanlar |
|---|---|
| `/email-security-platform` | SEO + overview (3 infoBlock) |
| `/secure-remote-access` | SEO + overview (3 infoBlock) |
| `/media-transfer-station` | SEO + overview + features heading |
| `/intelroom` | SEO + hero + overview + features |

### Hardcoded (editör ihtiyacı yok)
- 3D model dosyaları (`.glb`)
- GSAP animasyon konfigürasyonları
- İnteraktif diyagramlar
- Form alanları

---

## 🔑 Environment Değişkenleri

### `.env.local`
```
SANITY_API_READ_TOKEN
SANITY_API_WRITE_TOKEN
SANITY_WEBHOOK_SECRET
SANITY_PREVIEW_SECRET
RESEND_API_KEY
WP_LEAD_WEBHOOK
TURNSTILE_SECRET_KEY
```

### `wrangler.toml` → `[vars]` (NEXT_PUBLIC_*)
```
NEXT_PUBLIC_TURNSTILE_SITE_KEY
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
```

---

## 📅 Geliştirme Günlüğü

### 1 Temmuz 2026 — Opus Ürün Sayfaları Sanity Entegrasyonu
- `/email-security-platform`, `/secure-remote-access`, `/media-transfer-station`, `/intelroom` sayfalarına `productPage` Sanity entegrasyonu eklendi.
- Her sayfa: `locale === 'en'` kontrolü + `sanityData?.field ?? t('key')` fallback pattern'i.
- `scripts/seed-sanity.mjs` güncellendi: 4 yeni doküman eklendi → 9/9 başarılı seed.
- `npx tsc --noEmit` → 0 hata.
- `TYPE_TO_PATHS` revalidate map'i zaten tüm 8 sayfayı kapsıyor.

### 1 Temmuz 2026 — Cloudflare Workers Migrasyonu
- Proje Cloudflare Workers'a taşındı, Vercel kaldırıldı.
- Lead sistemi Cloudflare secrets ile güvence altına alındı.
- `wrangler.toml` yapılandırması tamamlandı.

### Haziran 2026 — Sanity CMS Entegrasyonu
- `homePage`, `siteSettings`, `productPage` schema'ları oluşturuldu.
- Visual Editing (Draft Mode) kuruldu.
- `presentationTool` Sanity Studio'ya eklendi.
- İlk 5 ürün dokümanı seed edildi.

### Haziran 2026 — İlk Ürün Sayfaları
- `Email Security`, `MTS`, `Sandbox`, `IntelRoom`, `SRA` sayfaları tasarlandı.
- GSAP animasyonlar, 3D model görüntüleyiciler entegre edildi.
- next-intl `[locale]` routing aktif hale getirildi.

---

## 🛠️ Teknolojiler

- **Framework:** Next.js 16 (App Router), TypeScript
- **CMS:** Sanity (Visual Editing, Draft Mode)
- **Deploy:** Cloudflare Workers (`wrangler`)
- **Stil:** CSS Modules, CSS Variables (Tailwind YOK)
- **Animasyon:** GSAP (dinamik import)
- **3D:** React Three Fiber / Drei
- **i18n:** next-intl (EN/TR/AR)
- **E-posta:** Resend API
- **Form:** Cloudflare Turnstile
