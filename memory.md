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
