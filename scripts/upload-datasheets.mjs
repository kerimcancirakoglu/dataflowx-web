/**
 * upload-datasheets.mjs
 * ---------------------
 * USB diskteki PDF datasheet'leri Sanity'e yükler,
 * CDN URL'lerini scripts/datasheet-urls.json'a yazar.
 *
 * Kullanım:
 *   cd "/Users/kerim/Desktop/DFX Zero Trust/dataflowx-web"
 *   node scripts/upload-datasheets.mjs
 */

import { createClient } from '@sanity/client';
import { readFileSync, createReadStream, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// ── .env.local oku ──────────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const envPath = join(rootDir, '.env.local');

if (!existsSync(envPath)) {
  console.error('❌ .env.local bulunamadı:', envPath);
  process.exit(1);
}

// .env.local'ı parse et (dotenv gerektirmeden)
const envContent = readFileSync(envPath, 'utf-8');
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx).trim();
  let value = trimmed.slice(eqIdx + 1).trim();
  // Tırnak kaldır
  if ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1);
  }
  if (!process.env[key]) {
    process.env[key] = value;
  }
}

// ── Sanity client ───────────────────────────────────────────────────────────
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error('❌ Eksik env değişkenleri:');
  if (!projectId) console.error('   - NEXT_PUBLIC_SANITY_PROJECT_ID');
  if (!dataset) console.error('   - NEXT_PUBLIC_SANITY_DATASET');
  if (!token) console.error('   - SANITY_API_WRITE_TOKEN');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// ── PDF mapping ─────────────────────────────────────────────────────────────
const USB_ROOT = '/Volumes/DataFlowx/Resources Kısmı';

const FILES = [
  {
    key: 'ds-unidirectional-gateway',
    lang: 'en',
    source: 'Undirectional Gateway/En/converted_yeni_DataDiodeX_TS_Brosur_EN.pdf',
    filename: 'dfx-unidirectional-gateway-en.pdf',
  },
  {
    key: 'ds-unidirectional-gateway',
    lang: 'tr',
    source: 'Undirectional Gateway/TR/converted_yeni_DataDiodeX_TS_Brosur_TR.pdf',
    filename: 'dfx-unidirectional-gateway-tr.pdf',
  },
  {
    key: 'ds-secure-remote-access',
    lang: 'en',
    source: 'Remote Secure Access/En/converted_yeni2_DataBrokerX_TS_Brosur_EN.pdf',
    filename: 'dfx-secure-remote-access-en.pdf',
  },
  {
    key: 'ds-secure-remote-access',
    lang: 'tr',
    source: 'Remote Secure Access/Tr/converted_yeni2_DataBrokerX_TS_Brosur_TR.pdf',
    filename: 'dfx-secure-remote-access-tr.pdf',
  },
  {
    key: 'ds-media-transfer-station',
    lang: 'en',
    source: 'Media Transfer Station/En/converted_yeni_DataStationX_EN.pdf',
    filename: 'dfx-media-transfer-station-en.pdf',
  },
  {
    key: 'ds-media-transfer-station',
    lang: 'tr',
    source: 'Media Transfer Station/TR/converted_yeni_DataStationX_TR.pdf',
    filename: 'dfx-media-transfer-station-tr.pdf',
  },
  {
    key: 'ds-email-security',
    lang: 'en',
    source: 'E-Mail Security/En/converted_yeni_DataMessage X DataSheet_EN.pdf',
    filename: 'dfx-email-security-en.pdf',
  },
  {
    key: 'ds-email-security',
    lang: 'tr',
    source: 'E-Mail Security/TR/converted_yeni_DataMessage X DataSheet_TR.pdf',
    filename: 'dfx-email-security-tr.pdf',
  },
  {
    key: 'ds-malware-sandbox',
    lang: 'en',
    source: 'Malware Mitigation Sandbox/En/converted_yeni_DataSecureX_EN.pdf',
    filename: 'dfx-malware-sandbox-en.pdf',
  },
  {
    key: 'ds-malware-sandbox',
    lang: 'tr',
    source: 'Malware Mitigation Sandbox/TR/converted_yeni_DataSecureX_TR.pdf',
    filename: 'dfx-malware-sandbox-tr.pdf',
  },
  {
    key: 'ds-pass',
    lang: 'en',
    source: 'Portable Access Media /DFX PASS.pdf',
    filename: 'dfx-pass.pdf',
  },
];

// ── Upload ──────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n📦 Sanity Datasheet Upload`);
  console.log(`   Project: ${projectId} / ${dataset}`);
  console.log(`   USB Root: ${USB_ROOT}\n`);

  const result = {};
  let successCount = 0;
  let errorCount = 0;

  for (const file of FILES) {
    const sourcePath = join(USB_ROOT, file.source);

    if (!existsSync(sourcePath)) {
      console.error(`❌ Dosya bulunamadı: ${sourcePath}`);
      errorCount++;
      continue;
    }

    try {
      console.log(`⏳ Yükleniyor: ${file.filename}...`);

      const asset = await client.assets.upload(
        'file',
        createReadStream(sourcePath),
        {
          filename: file.filename,
          contentType: 'application/pdf',
        }
      );

      const url = asset.url;

      // result objesine ekle
      if (!result[file.key]) {
        result[file.key] = {};
      }
      result[file.key][file.lang] = url;

      console.log(`✓ ${file.filename} → ${url}`);
      successCount++;
    } catch (err) {
      console.error(`❌ ${file.filename} yüklenemedi:`, err.message);
      errorCount++;
    }
  }

  // ── JSON çıktısı yaz ───────────────────────────────────────────────────
  const outputPath = join(__dirname, 'datasheet-urls.json');
  writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');

  console.log(`\n────────────────────────────────────`);
  console.log(`✅ Tamamlandı: ${successCount} başarılı, ${errorCount} hata`);
  console.log(`📄 URL'ler yazıldı: ${outputPath}\n`);
}

main().catch((err) => {
  console.error('💥 Beklenmeyen hata:', err);
  process.exit(1);
});
