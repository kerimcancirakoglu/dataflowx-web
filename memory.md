# DataFlowX Web Project Memory & Roadmap

## 📅 Bugüne Kadar Yapılanlar
- **Proje Kurulumu**: Next.js ve Tailwind/Vanilla CSS (Montserrat ve Inter fontları entegre edildi) tabanlı modern, karanlık mod (dark theme) odaklı tasarım sistemi kuruldu.
- **Dinamik Video Arka Planı (`VideoBackground.tsx`)**: 
  - `@/public/dynamic-particle-flow.mp4` dosyası arka plana yerleştirildi.
  - Sayfa kaydırıldıkça (scroll) videonun buna bağlı olarak ileri/geri hareket etmesi sağlandı.
  - Mobil cihazlarda (iOS Safari, Chrome Mobile vb.) video kod çözücünün kısıtlamalara takılmaması için ilk etkileşimde (`touchstart`, `scroll`) otomatik oynatma ve uykudan uyandırma mekanizması eklendi.
  - Bölümler arası siyah boşluklar kaldırıldı ve video tüm sayfada şeffaf katmanlar altında kesintisiz akıcı hale getirildi.
  - Tasarım estetiği için premium radyal gradyan katmanı eklendi.
- **Tasarım Standartları**: Sitede sadece **Montserrat** ve **Inter** fontları kullanıldı. İçerik ve tasarım dili https://www.dataflowx.com web sitesi temel alınarak geliştirilmeye başlandı.

---

## 🌐 Site Haritası ve Mevcut Yapı
home page
about us

tıklanabilir link Kurumsal Kimlik Kılavuzu
tıklanabilir link GDPR
tıklanabilir link Cookie 
Solutions:

Network Security
File Security
Email Security
Secure Remote Access
Partners
Resources

Datasheets
Blog
News
Customer Success Stories
Contact

İletişime Geçin mesaj kutusu
Kariyer için cv yükleme msj gönderme bölümü


## 🚀 Gelecek Yol Haritası (Yapılacaklar Listesi)

### 1. Sayfalar (Pages)
- [ ] **Home Page (Ana Sayfa)**: Mevcut bölümlerin zenginleştirilmesi ve görsel kalitenin artırılması.
- [ ] **About Us (Hakkımızda)**: Şirket vizyonu, misyonu ve ekibimiz.

### 2. Alt Bilgi / Yasal Sayfalar (Footer Links)
- [ ] **Kurumsal Kimlik Kılavuzu** (Tıklanabilir link/dosya indirme)
- [ ] **GDPR / KVKK** (Tıklanabilir yasal bilgilendirme sayfası)
- [ ] **Cookie Policy (Çerez Politikası)** (Tıklanabilir bilgilendirme sayfası ve onay banner'ı)

### 3. Çözümler (Solutions)
- [ ] **Network Security** (Ağ Güvenliği çözümleri sayfası/bölümü)
- [ ] **File Security** (Dosya Güvenliği çözümleri sayfası/bölümü)
- [ ] **Email Security** (E-posta Güvenliği çözümleri sayfası/bölümü)
- [ ] **Secure Remote Access** (Sınırlar Arası Güvenli Geçiş çözümleri sayfası/bölümü)

### 4. İş Ortakları (Partners)
- [ ] **Partners Sayfası/Bölümü**: Distribütörler, iş ortakları ve entegrasyon ekosistemi.

### 5. Kaynaklar (Resources)
- [ ] **Datasheets** (Ürün broşürleri ve teknik dokümanlar)
- [ ] **Blog** (Siber güvenlik makaleleri ve sektörel içerikler)
- [ ] **News** (Bizden haberler ve duyurular)
- [ ] **Customer Success Stories** (Müşteri başarı hikayeleri ve vaka analizleri)

### 6. İletişim & Kariyer (Contact)
- [ ] **İletişime Geçin**: Dinamik mesaj kutusu ve form yapısı.
- [ ] **Kariyer Bölümü**: CV yükleme (PDF/Docx) ve kariyer başvuru mesajı gönderme bölümü.

---

## ⚙️ Entegrasyon Hedefleri
- [ ] **WordPress Engine Entegrasyonu**: İlerleyen aşamalarda tüm bu sayfaların ve dinamik içeriklerin (Blog, News, Çözümler vb.) WordPress backend sistemine (headless CMS veya doğrudan entegrasyon) bağlanması.

---

## 🔴 Lead Toplama Sistemi (2026-07-01 itibarıyla tam aktif)

### Mimari Özet

Proje **Vercel'den Cloudflare Workers'a** taşındı. Deploy komutu:
```bash
npm run deploy:cf
# = opennextjs-cloudflare build && rm -rf .open-next/cache && opennextjs-cloudflare deploy
```

### Form Noktaları (3 adet, hepsi `/api/lead` endpoint'ine POST atar)

| Form | Dosya | `documentName` |
|------|-------|----------------|
| PDF Lead Modal (whitepaper indirme) | `src/components/PdfLeadModal/PdfLeadModal.tsx` | PDF başlığı (dinamik) |
| Contact Formu | `src/components/Contact/ContactClient.tsx` | `GENERAL_CONTACT` |
| Partner Başvuru | `src/components/PartnerForm/PartnerForm.tsx` | `PARTNER_APPLICATION` |

### API Route: `src/app/api/lead/route.ts`

Sıra ile şu adımları izler:
1. **Honeypot** → `website_url` field dolu ise bot, 200 dön (sessiz reddet)
2. **Validasyon** → `fullName` + `email` zorunlu
3. **Cloudflare Turnstile** → CAPTCHA doğrulama (secret: `TURNSTILE_SECRET_KEY`)
4. **Kurumsal email filtresi** → gmail/yahoo/hotmail vb. reddedilir
5. **Paralel görevler:**
   - **Task A — Resend email** → `info@dataflowx.com`'a bildirim + kullanıcıya auto-reply
   - **Task B — WP Webhook** → WordPress CF7 (form ID: 363) entegrasyonu

### Cloudflare Secrets (tam liste)

```
MY_SECRET_TOKEN       → /api/revalidate endpoint güvenliği
RESEND_API_KEY        → Resend email servisi (aktif key: re_MfydrDTM_...)
SANITY_API_READ_TOKEN → Sanity CMS okuma
SANITY_WEBHOOK_SECRET → Sanity on-demand revalidation
TURNSTILE_SECRET_KEY  → Cloudflare CAPTCHA server-side doğrulama
WP_LEAD_WEBHOOK       → WP CF7 endpoint (2026-07-01 eklendi)
```

### wrangler.toml [vars] (public değişkenler)

```toml
[vars]
NEXT_PUBLIC_TURNSTILE_SITE_KEY = "0x4AAAAAADq91aSFD3VABRaY"
NEXT_PUBLIC_SANITY_PROJECT_ID  = "15oto8dp"
NEXT_PUBLIC_SANITY_DATASET     = "production"
```

> ⚠️ ÖNEMLI: `NEXT_PUBLIC_*` değişkenler `wrangler secret put` ile DEĞİL,
> `wrangler.toml` içindeki `[vars]` bloğu ile tanımlanmalıdır.

### Bilinen Notlar

- `resend` paketi v6.14.0 — `nodejs_compat` flag'i ile Cloudflare Workers'da çalışıyor
- `global_fetch_strictly_public` flag'i aktif — sadece public internet'e istek yapılabilir
- Resend `from` adresi hâlâ `onboarding@resend.dev` — `dataflowx.com` Resend'de domain verify edilince `leads@dataflowx.com` yapılacak
- WordPress CF7 form ID: `363`, unit tag: `wpcf7-f363-p1-o1`
- Worker adı: `dataflowxtest26`
- Worker URL: `https://dataflowxtest26.kerimcan-cirakoglu.workers.dev`
- R2 Bucket (ISR cache): `dataflowx-isr-cache`

