# DataFlowX Zero Trust Web Application

DataFlowX, kritik IT ve OT ağlarını korumak için geliştirilmiş, donanım tabanlı siber güvenlik çözümleri (Unidirectional Gateway, Media Transfer Station, Secure Remote Access vb.) sunan bir platformdur. Bu proje, DataFlowX'in modern, dinamik ve "Glassmorphism" odaklı Zero Trust konseptli yeni web sitesidir.

Proje **Next.js**, **React**, ve **CSS Modules** kullanılarak geliştirilmiş olup, interaktif şemalar, 3D model renderları ve veri akışı animasyonlarına ev sahipliği yapmaktadır.

---

## 🚀 Başlangıç

Geliştirme sunucusunu çalıştırmak için:

```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
# veya
bun dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak projeyi görüntüleyebilirsiniz.

---

## 📅 Geliştirme Günlüğü (Changelog)

### 05 Haziran 2026 (Bugün)
- **Yeni Ürün Sayfaları:** `Media Transfer Station (MTS)`, `Email Security` ve `Sandbox` sayfaları sıfırdan oluşturuldu ve tasarlandı.
- **Dinamik Diyagramlar:** MTS'nin USB tarama ve aktarım animasyonu, Email Security'nin tehdit algılama ağı ve Sandbox'ın dosya izolasyon/analiz mimarisi interaktif kod bileşenleri (CSS animasyonları) olarak geliştirildi.
- **Tasarım Dili Standardizasyonu:** Tüm diyagram kapsayıcıları (container) için `1400px` genişliğinde, koyu *Glassmorphism* tabanlı (iç/dış parlamalı ve turuncu/sarımsı ince kenarlıklı) standart bir arka plan tasarımı oluşturuldu ve bu kural AI Agent Hafızasına (Memory) kalıcı olarak eklendi.
- **Model Görselleri Optimizasyonu:** Diode ve MTS Kiosk "Models" sekmelerine ait gerçek yüksek kaliteli ürün fotoğrafları (`diode.png`, `kiosk.png`) sisteme entegre edildi. MTS'deki ağır 3D Canvas yükü kaldırılarak sayfalar hızlandırıldı.
- **Mobil Uyumluluk (Responsive):** Diode, MTS, Email ve Sandbox sayfalarındaki geniş diyagramların mobilde sayfayı bozması veya aşağı doğru şişirmesi engellendi. Dar ekranlarda (mobile) bu diyagramlara **"yatay kaydırma" (horizontal swipe/scroll)** özelliği eklendi, böylece orantıları korundu.
- **Hata Düzeltmeleri:** Anasayfadaki arka plan videosunun (`VideoBackground`) mobil cihazlarda veya güç tasarrufu modunda yüklenmeden önce eski bir "inşaat işçisi" kapak fotoğrafını (`poster`) gösterme sorunu düzeltildi. Kapak fotoğrafı kaldırılarak orijinal siyah (#000) arka planın pürüzsüzce devreye girmesi sağlandı.
- **GitHub Push:** Yapılan tüm yenilikler ve eklentiler `feat: Update product pages, diagrams, models, and responsive mobile layouts` commit mesajıyla GitHub repository'sine gönderildi (Push).

### 03 Haziran 2026 - 04 Haziran 2026 (Hazırlık ve İlk Sayfalar)
- **Proje Kurulumu:** Next.js (App Router) altyapısı, `create-next-app` ile başlatıldı.
- **Core Bileşenler:** Navigasyon çubuğu (`Nav`), Alt bilgi (`Footer`) ve interaktif video arka planı (`VideoBackground`) geliştirildi.
- **İlk Ürün Sayfaları:** `Unidirectional Gateway (Diode)` ve `Secure Remote Access` ürün sayfalarının temelleri atıldı.
- **Tasarım Konsepti:** Koyu tema, parıltılı (glowing) efektler, "Data Movement Under Control" yaklaşımı ve DFX Zero Trust kurumsal renk kodları entegre edildi.
- **3D Denemeleri:** `@react-three/fiber` entegrasyonu ile `.glb` formatlı üç boyutlu cihaz modellerinin (Diode) tarayıcı üzerinde render edilmesi sağlandı.

---

## 🛠️ Teknolojiler
- **Framework:** Next.js (App Router)
- **Stil & Tasarım:** Vanilla CSS (CSS Modules), CSS Variables
- **Animasyon & 3D:** CSS Keyframes, React Three Fiber (Fiber & Drei)
- **Platform:** Vercel

## 🌐 Yayına Alma (Deployment)
Proje Vercel üzerinde canlıya (Production) otomatik olarak çıkacak şekilde yapılandırılmıştır. `main` branch'ine yapılan her bir *push* işleminde Vercel yeni bir *build* alıp projeyi günceller. Manuel çıkmak isterseniz `npx vercel --prod` komutunu kullanabilirsiniz.
