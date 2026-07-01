<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# DataFlowX Web — Agent Bağlam Dosyası

Bu dosyayı oku, sonra koda dokun. Projeyi yanlış anlamak saatlerce hata ayıklamaya yol açar.

## Stack & Deploy

| Katman | Teknoloji |
|---|---|
| Framework | Next.js 16 (App Router), TypeScript |
| Deploy | **Cloudflare Workers** — `npm run deploy:cf` |
| CMS | Sanity (`projectId: 15oto8dp`, `dataset: production`) |
| i18n | next-intl, 3 dil: `en` / `tr` / `ar` → `messages/` klasörü |
| Stil | CSS Modules (`*.module.css`) |
| Animasyon | GSAP (dinamik import — SSR'da çalışmaz, sadece `useEffect` içinde) |
| 3D | React Three Fiber / Drei |
| E-posta | Resend API |
| Form koruması | Cloudflare Turnstile + honeypot alanı |

**KRITIK:** `npm run build` değil, `npm run deploy:cf` kullan. Vercel'e deploy etme — proje Cloudflare Workers üzerinde.

---

## Environment Değişkenleri

### `.env.local` + Cloudflare `wrangler secret put`
```
SANITY_API_READ_TOKEN      # Sanity okuma (draft/preview için)
SANITY_API_WRITE_TOKEN     # Sanity yazma (seed scriptleri için)
SANITY_WEBHOOK_SECRET      # Revalidate webhook doğrulaması
SANITY_PREVIEW_SECRET      # Draft Mode aktivasyon anahtarı (openssl rand -hex 32)
RESEND_API_KEY             # E-posta bildirimleri
WP_LEAD_WEBHOOK            # WordPress CF7 webhook (lead formu)
TURNSTILE_SECRET_KEY       # Turnstile server-side doğrulama
```

### `wrangler.toml` → `[vars]` bloğu (NEXT_PUBLIC_* buraya gider, wrangler secret'a değil)
```
NEXT_PUBLIC_TURNSTILE_SITE_KEY
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
```

Yeni değişken eklerken **her ikisine de** ekle: `.env.local` + Cloudflare.

---

## Dil Stratejisi — ASLA İhlal Etme

```
EN locale  → Sanity CMS'ten çekilir (tek kaynak)
TR locale  → messages/tr.json  (Sanity'e dokunmaz)
AR locale  → messages/ar.json  (Sanity'e dokunmaz)
```

Sayfalarda her zaman `locale === 'en'` kontrolü yap:
```typescript
const data = locale === 'en' ? await getClient(preview).fetch(query) : null;
```
TR/AR'da Sanity içeriği **asla** gösterilmemelidir.

---

## Sanity Mimarisi

### Client'lar
- `src/sanity/lib/client.ts` → `getClient(preview?: boolean)` — her zaman bunu kullan
- `src/lib/sanity.ts` → Eski client (news/blog queryleri için, dokunma)

### Schema'lar (`src/sanity/schemaTypes/`)
| Schema | Açıklama |
|---|---|
| `homePage` | Anasayfa hero slaytları + SEO (singleton, `_id: 'homePage'`) |
| `siteSettings` | Genel site ayarları (singleton) |
| `productPage` | Tüm 8 ürün sayfası — slug ile ayırt edilir (`_id: 'product-{slug}'`) |
| `blogPost` | Blog yazıları |
| `news` | Haberler (Sanity'den çekiliyor) |
| `resource` | PDF kaynaklar (whitepaper, datasheet, vb.) |
| `author`, `category`, `seo` | Yardımcı tipler |

### GROQ Sorguları
- `src/sanity/lib/queries.ts` → `homePageQuery`, `siteSettingsQuery`, `productPageQuery`
- `productPageQuery` `$slug` parametresi alır — `getClient(preview).fetch(productPageQuery, { slug: 'portx' })`
- Mevcut news/blog sorguları: `src/lib/sanity-queries.ts`

### Revalidation
`/api/revalidate` → Sanity webhook tetikler → `TYPE_TO_PATHS` map'i üzerinden `revalidatePath` çağırır.
```typescript
// src/app/api/revalidate/route.ts — mevcut entries:
homePage:     ['/[locale]'],
siteSettings: ['/[locale]', '/[locale]/contact'],
productPage:  ['/[locale]/unidirectional-gateway', '/[locale]/portx', ...] // tüm 8 sayfa
```

### Draft Mode
- Aktifleştirme: `/api/draft-mode/enable?secret=SANITY_PREVIEW_SECRET`
- Devre dışı: `/api/draft-mode/disable`
- Studio URL: `[domain]/studio` (veya workers.dev/studio geçici olarak)
- `VisualEditing` component layout'ta sadece `preview === true` iken yüklenir

---

## Lead / Form Sistemi

`/api/lead` → iki paralel görev:
1. Resend ile `info@dataflowx.com`'a bildirim maili
2. WordPress CF7 webhook'una FormData POST

**Güvenlik katmanları (hiçbirini kaldırma):**
- Honeypot alanı: `website_url` dolu gelirse bot — sessizce 200 dön
- Cloudflare Turnstile: server-side doğrulama
- Kurumsal e-posta filtresi: gmail/yahoo/hotmail vb. reddedilir

`PdfLeadModal` → `.downloadBtn` class'ına tıklanınca açılır (event delegation).
`LeadModalTrigger` → dinamik `href` yakalama — `fileUrl` prop yoksa tıklanan linkin `href`'ini kullanır.

---

## Sayfa Yapısı

### Tamamlananlar (Sanity'den beslenenler)
- `/[locale]` → hero Sanity'den, fallback `messages/`
- `/[locale]/news/[slug]` → Sanity
- `/[locale]/resources/blog/[slug]` → Sanity
- `/[locale]/resources/[slug]` → Mock data (TODO: Sanity'e taşı)
- `/[locale]/unidirectional-gateway` → overview section Sanity'den (EN), fallback messages/
- `/[locale]/portx` → hero + overview Sanity'den (EN), fallback messages/
- `/[locale]/sandbox` → overview + features heading Sanity'den (EN), fallback messages/
- `/[locale]/dfx-cdr` → hero + features section Sanity'den (EN), fallback messages/

### Sıradaki (Opus'a devredildi)
- Ürün sayfaları → aynı `productPage` pattern ile:
  - `/email-security-platform` (`_id: 'product-email-security-platform'`)
  - `/secure-remote-access` (`_id: 'product-secure-remote-access'`)
  - `/media-transfer-station` (`_id: 'product-media-transfer-station'`)
  - `/intelroom` (`_id: 'product-intelroom'`)

### productPage Entegrasyon Şablonu
```typescript
// Sayfaya import ekle
import { draftMode } from 'next/headers';
import { getClient } from '@/sanity/lib/client';
import { productPageQuery } from '@/sanity/lib/queries';

// generateMetadata'ya ekle
const { isEnabled: preview } = await draftMode();
const sanityData = locale === 'en'
  ? await getClient(preview).fetch(productPageQuery, { slug: 'SLUG_BURAYA' })
  : null;

// Default export'a params ekle
export default async function PageName({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { isEnabled: preview } = await draftMode();
  const sanityData = locale === 'en'
    ? await getClient(preview).fetch(productPageQuery, { slug: 'SLUG_BURAYA' })
    : null;
  // sanityData?.hero, sanityData?.overview, sanityData?.features
  // Her alan için: sanityData?.field ?? t('translation.key')
}
```

### Hardcoded Kalacaklar (Editör ihtiyacı yok)
- 3D model dosyaları (`.glb`)
- GSAP animasyon konfigürasyonları
- İnteraktif diyagramlar (GatewayFamily, IntelRoom)
- Form alanları (ContactMini, Contact)

---

## Hero Component Mimarisi

```
Hero.tsx (Server Component)
  ├── Sanity'den slide'ları çeker (locale === 'en' ise)
  ├── Fallback: messages/ çevirilerinden slide oluşturur
  └── HeroClient.tsx'e slides[] ve sanityDocumentId prop'u geçer

HeroClient.tsx (Client Component)
  ├── GSAP animasyonu (useEffect içinde dinamik import)
  ├── 6s otomatik geçiş
  ├── SLIDE_ICONS[] — index tabanlı, Sanity'den gelmiyor
  └── sanityAttr() helper — data-sanity attribute'ları (Visual Editing için)
```

---

## Önemli Kurallar

1. **Client component'lerde async/await kullanma** — `'use client'` + `async` birlikte çalışmaz.
2. **GSAP'i dinamik import et** — `import('gsap')` şeklinde, SSR hatasını önler.
3. **`npm run build` değil `npm run deploy:cf`** — build artefaktı farklı.
4. **CSS Modules kullan** — global stil ekleme, `styles.xxx` class'larını koru.
5. **`messages/` dosyalarına dokunma** — TR/AR içerikleri buradan geliyor, Sanity'e taşıma.
6. **Yeni schema = revalidate route güncelle** — `TYPE_TO_PATHS` map'ini unutma.
7. **Secret'ları `wrangler.toml`'a yazma** — `wrangler secret put` kullan.
8. **`NEXT_PUBLIC_*` değişkenleri `[vars]` bloğuna** — wrangler secret bunları desteklemez.

---

## Sık Kullanılan Komutlar

```bash
# Geliştirme
npm run dev

# Cloudflare deploy
npm run deploy:cf

# Sanity seed scripti (homePage + 4 ürün sayfası)
SANITY_API_WRITE_TOKEN="..." node scripts/seed-sanity.mjs

# Cloudflare secret ekleme
echo "değer" | npx wrangler secret put DEĞİŞKEN_ADI

# TypeScript kontrol
npx tsc --noEmit

# Audit (güvenlik/SEO/hız/UX)
python3 scripts/checklist.py --url https://www.dataflowx.com
```

---

## Proje Dosya Haritası (Kritik Yollar)

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          ← VisualEditing, draftMode, next-intl provider
│   │   ├── page.tsx            ← Anasayfa — Sanity + locale kontrolü
│   │   ├── news/[slug]/        ← Sanity (PortableText + PDF lead intercept)
│   │   └── resources/[slug]/   ← Mock data (LeadModalTrigger burada)
│   └── api/
│       ├── lead/route.ts       ← Resend + WP webhook
│       ├── revalidate/route.ts ← Sanity webhook alıcısı
│       └── draft-mode/         ← enable + disable route'ları
├── components/
│   ├── Hero/
│   │   ├── Hero.tsx            ← Server: Sanity fetch + fallback
│   │   └── HeroClient.tsx      ← Client: GSAP, slider, VisualEditing attrs
│   └── PdfLeadModal/           ← Lead form modal
├── sanity/
│   ├── schemaTypes/            ← Tüm Sanity schema'ları
│   └── lib/
│       ├── client.ts           ← getClient(preview?) fonksiyonu
│       └── queries.ts          ← GROQ sorguları
├── lib/
│   ├── sanity.ts               ← Eski client (news/blog için)
│   └── sanity-queries.ts       ← News/blog GROQ sorguları
├── messages/                   ← TR/AR/EN çevirileri (EN kısmen Sanity'de)
└── scripts/
    ├── seed-sanity.mjs         ← Sanity içerik seed scripti
    └── checklist.py            ← Audit scripti
sanity.config.ts                ← Studio yapılandırması (presentationTool dahil)
wrangler.toml                   ← Cloudflare Workers config ([vars] bloğu burada)
```
