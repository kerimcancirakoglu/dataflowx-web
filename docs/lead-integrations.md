# DataFlowX — Lead Sistemi: Resend & HubSpot

Bu döküman, sitemizdeki **form/lead sisteminin** nasıl çalıştığını ve her iki servisin bu projede ne işe yaradığını açıklar. Kurulum için gereken adımlar en sonda yer almaktadır.

---

## Genel Akış

```
Ziyaretçi formu doldurur (PDF indirme / İletişim)
        ↓
Sistem güvenlik kontrollerini yapar
(Bot mu? Kurumsal mail mi? Captcha geçti mi?)
        ↓
Resend → info@dataflowx.com'a bildirim maili atar
Resend → Ziyaretçiye "Talebinizi aldık" otomatik yanıtı gönderir
HubSpot → Ziyaretçiyi CRM'e contact olarak kaydeder
HubSpot → Hangi PDF'i indirdiğini timeline'a not olarak ekler
        ↓
Ziyaretçi PDF'i indirir
```

---

## Resend — Ne İşe Yarıyor?

**Kısaca:** Siteden gönderilen her e-postanın altyapısı.

| Ne yapar | Detay |
|---|---|
| **Satış ekibi bildirimi** | Form her dolduğunda `info@dataflowx.com`'a isim, şirket, mail, indirilen doküman bilgisiyle mail atar |
| **Otomatik yanıt** | Formu dolduran kişiye "Talebinizi aldık" maili gönderir |
| **Gönderici adres** | `leads@dataflowx.com` ve `noreply@dataflowx.com` adresleriyle çıkar |

> Resend olmadan sistem çalışır ama hiçbir mail gelmez — sadece log'da görünür.

---

## HubSpot — Ne İşe Yarıyor?

**Kısaca:** Gelen lead'lerin (potansiyel müşterilerin) tutulduğu CRM paneli.

| Ne yapar | Detay |
|---|---|
| **Contact oluşturur** | Form dolduran her kişiyi HubSpot'a isim, şirket, e-posta ile kaydeder |
| **Tekrar formu dolduranları birleştirir** | Aynı e-posta ikinci kez form doldurursa yeni kayıt açmaz, mevcut profile ekler |
| **İndirilen PDF'i takip eder** | Her contact'ın timeline'ına "Downloaded: DFX Unidirectional Gateway Data Sheet" şeklinde not düşer |
| **Panel** | `app.hubspot.com`'dan tüm lead'leri görebilir, filtreleyebilir, mail atabilirsin |

> HubSpot olmadan sistem çalışır ama lead'ler hiçbir yerde depolanmaz, sadece `info@dataflowx.com` inbox'ında birikir.

---

## Kurulum — Yapılması Gerekenler

### RESEND

**1. Hesap ve Domain Kurulumu**

1. [resend.com](https://resend.com) → hesap aç (veya giriş yap)
2. Sol menü → **Domains** → **Add Domain**
   - Domain: `dataflowx.com`
   - Region: `eu-west-1 (Europe)`
3. Resend, Cloudflare'e bağlanmak için izin isteyecek — ekranda **"Authorize DNS records from Resend"** sayfası çıkar
4. **Authorize** butonuna tıkla → DNS kayıtları otomatik eklenir, domain birkaç dakika içinde doğrulanır

**2. API Key Oluşturma**

1. Sol menü → **API Keys** → **Create API Key**
   - Name: `DataFlowX Website`
   - Permission: `Sending access`
2. Çıkan anahtarı (`re_xxxxxxxxxxxx`) kopyala — **bir daha göremezsin**

**3. Cloudflare'e Ekleme**

Cloudflare Dashboard → **Workers & Pages** → `dataflowx-web` → **Settings → Environment Variables**

| Name | Type | Value |
|---|---|---|
| `RESEND_API_KEY` | Secret | `re_xxxxxxxxxxxx` |

---

### HUBSPOT

**1. Hesap Aç**

1. [hubspot.com](https://hubspot.com) → **Get started free** (ücretsiz plan yeterli)
2. Şirket: `DataFlowX` olarak ayarla

**2. Private App (API Erişim Anahtarı) Oluştur**

1. Sağ üst köşe → profil ikonu → **Account Settings**
2. Sol menü → **Integrations → Private Apps** → **Create a private app**
3. App name: `DataFlowX Website`
4. **Scopes** sekmesi → şunları seç:
   - `crm.objects.contacts.write`
   - `crm.objects.contacts.read`
   - `crm.objects.notes.write`
5. **Create app** → çıkan token'ı (`pat-eu1-xxxx-xxxx-...`) kopyala

**3. Cloudflare'e Ekleme**

Cloudflare Dashboard → **Workers & Pages** → `dataflowx-web` → **Settings → Environment Variables**

| Name | Type | Value |
|---|---|---|
| `HUBSPOT_ACCESS_TOKEN` | Secret | `pat-eu1-xxxx-xxxx-...` |

---

## Özet: Cloudflare'e Eklenecek Secret'lar

| Secret | Nereden alınır |
|---|---|
| `RESEND_API_KEY` | Resend → API Keys |
| `HUBSPOT_ACCESS_TOKEN` | HubSpot → Private Apps |
| `DOWNLOAD_SECRET` | Rastgele üretildi: `987e05ad0ed1d61118d7c71f3cd535b8c51c50f33066a8a3da64ee20cf66aa28` |
| `TURNSTILE_SECRET_KEY` | Cloudflare → Turnstile (zaten mevcut) |

Tüm secret'lar eklendikten sonra bir `git push origin main` yeterli — sistem otomatik deploy olur ve çalışmaya başlar.
