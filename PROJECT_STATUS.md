# DataFlowX Projesi — Güncel Durum

**Son güncelleme:** 1 Temmuz 2026

---

## ✅ Tamamlananlar

### 1. Cloudflare Workers Geçişi
- Proje Vercel'den **Cloudflare Workers**'a taşındı.
- `WP_LEAD_WEBHOOK`, `RESEND_API_KEY`, `SANITY_*` secret'ları `wrangler secret put` ile eklendi.
- `NEXT_PUBLIC_*` değişkenler `wrangler.toml` → `[vars]` bloğuna taşındı.
- Deploy: `npm run deploy:cf`

### 2. Lead & Form Sistemi
- `PdfLeadModal` sistemi — PDF indirme öncesi lead yakalama formu.
- `/api/lead` → Resend (e-posta bildirimi) + WordPress CF7 webhook (CRM kaydı).
- Güvenlik: Cloudflare Turnstile + honeypot + kurumsal e-posta filtresi.

### 3. Sanity CMS Entegrasyonu (Tüm 8 Ürün)
- Schema'lar: `homePage`, `siteSettings`, `productPage`, `blogPost`, `news`, `resource`
- Visual Editing (Draft Mode) + `presentationTool` Sanity Studio'da aktif.
- `productPageQuery` (`$slug` parametreli) tüm ürün sayfalarını besliyor.
- `scripts/seed-sanity.mjs` → 9 doküman (`homePage` + 8 ürün) Sanity'e yazıldı.

#### Sanity entegrasyonlu sayfalar (pattern: `sanityData?.field ?? t('key')`)

| Sayfa | Hero | Overview | Features |
|---|---|---|---|
| `/unidirectional-gateway` | — | ✅ | — |
| `/portx` | ✅ | ✅ | — |
| `/sandbox` | — | ✅ | ✅ heading |
| `/dfx-cdr` | ✅ | — | ✅ full |
| `/email-security-platform` | — | ✅ | — |
| `/secure-remote-access` | — | ✅ | — |
| `/media-transfer-station` | — | ✅ | ✅ heading |
| `/intelroom` | ✅ | ✅ | ✅ full |

### 4. Revalidation Sistemi
- `/api/revalidate` → Sanity webhook → `TYPE_TO_PATHS` map (tüm 8 ürün sayfası + anasayfa).
- Sanity içerik değişince ilgili sayfa otomatik revalidate edilir.

### 5. SEO Altyapısı
- `HreflangLinks`, `ProductSchema`, `BreadcrumbSchema` bileşenleri tüm sayfalarda aktif.
- `buildAlternates()` + `SITE_URL` merkezi yönetim (`src/lib/seo-config.ts`).
- `x-default` hreflang desteği.

### 6. Audit
- `scripts/checklist.py` — 30 kontrol: **PASS: 30 / WARN: 2 / FAIL: 0**
- Kullanım: `python3 scripts/checklist.py --url https://www.dataflowx.com`

---

## 📌 Sıradaki Adımlar

1. **Sanity Studio'dan içerik yönetimi:**
   - `/studio` üzerinden editörler Sanity belgelerini düzenleyebilir.
   - Draft Mode: `/api/draft-mode/enable?secret=SANITY_PREVIEW_SECRET`

2. **PDF kaynaklar:**
   - `resource` schema'sı hazır — Sanity'den PDF'leri yönetmek mümkün.
   - Mevcut mock data → Sanity'e taşınabilir (TODO).

3. **Blog / News yönetimi:**
   - `blogPost` ve `news` schema'ları hazır.
   - Sanity'den canlı içerik çekiliyor.

4. **Yeni ürün sayfası eklemek için:**
   ```typescript
   // 1. seed-sanity.mjs'ye yeni ürün dokümanı ekle
   // 2. AGENTS.md → productPage Entegrasyon Şablonu'nu uygula
   // 3. Revalidate route zaten tüm sayfaları kapsıyor
   ```

---

## 🏗️ Mimari Özet

```
Sanity CMS (Studio: /studio)
  └── productPage, homePage, blogPost, news, resource
        │
        │ GROQ queries (productPageQuery, homePageQuery...)
        ▼
Next.js 16 (App Router) — Cloudflare Workers'da host
  └── locale === 'en' → Sanity veri
  └── locale === 'tr' / 'ar' → messages/ fallback
        │
        ▼
dataflowx.com/en/ → İngilizce (Sanity + messages)
dataflowx.com/tr/ → Türkçe (sadece messages)
dataflowx.com/ar/ → Arapça RTL (sadece messages)
```

---

*Bu dosya projenin durumunu belgeler. Yeni bir session'da buradan devam et.*
