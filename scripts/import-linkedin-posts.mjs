/**
 * LinkedIn Blog Post → Sanity CMS Import Script
 * ================================================
 * Kullanım:
 *   SANITY_API_WRITE_TOKEN="sk10eOwk..." node scripts/import-linkedin-posts.mjs
 *
 * Klasör yapısı:
 *   scripts/linkedin-posts/
 *     post-01/          ← klasör adı slug olarak kullanılmaz, title'dan üretilir
 *       cover.png       ← kapak görseli (opsiyonel)
 *       content.docx    ← yazı içeriği (zorunlu)
 *     post-02/
 *       ...
 *
 * ⚠️  Idempotent değil: iki kez çalıştırırsan duplicate oluşur.
 *     İlk testte tek bir klasörle (post-01) dene.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

// mammoth + slugify: scripts/node_modules'dan yükle
const _require = createRequire(join(__dirname, 'package.json'));
const mammoth   = _require('mammoth');
const _slugify  = _require('slugify');
const slugifyFn = typeof _slugify === 'function' ? _slugify : _slugify.default;

// @sanity/client: kök node_modules'dan (projeye bağlı)
const { createClient } = await import('@sanity/client');

// ── Token kontrolü ─────────────────────────────────────────────────────────

if (!process.env.SANITY_API_WRITE_TOKEN) {
  console.error('\n❌ SANITY_API_WRITE_TOKEN tanımlı değil!');
  console.error('   Şu komutla çalıştır:');
  console.error('   SANITY_API_WRITE_TOKEN="sk10eOwk..." node scripts/import-linkedin-posts.mjs\n');
  process.exit(1);
}

// ── Sanity client ──────────────────────────────────────────────────────────

const client = createClient({
  projectId: '15oto8dp',
  dataset:   'production',
  apiVersion: '2024-01-01',
  token:     process.env.SANITY_API_WRITE_TOKEN,
  useCdn:    false,
});

// ── Yardımcı fonksiyonlar ──────────────────────────────────────────────────

const randomKey = () => crypto.randomUUID().replace(/-/g, '').slice(0, 12);

function decodeEntities(str) {
  return str
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ').replace(/&#\d+;/g, '').trim();
}

const stripTags = html =>
  decodeEntities(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());

// ── Inline mark parser ─────────────────────────────────────────────────────

function parseInline(html) {
  const spans = [];
  const parts = html.split(/(<\/?(?:strong|b|em|i)[^>]*>)/gi);
  const active = [];

  for (const part of parts) {
    if (!part) continue;
    const lo = part.toLowerCase().replace(/\s[^>]*/g, '');
    if      (lo === '<strong>' || lo === '<b>')  { active.push('strong'); continue; }
    else if (lo === '</strong>' || lo === '</b>') { const i = active.lastIndexOf('strong'); if (i>=0) active.splice(i,1); continue; }
    else if (lo === '<em>' || lo === '<i>')       { active.push('em');    continue; }
    else if (lo === '</em>' || lo === '</i>')     { const i = active.lastIndexOf('em'); if (i>=0) active.splice(i,1); continue; }

    const text = decodeEntities(part.replace(/<[^>]+>/g, ''));
    if (text) spans.push({ _type: 'span', _key: randomKey(), text, marks: [...active] });
  }

  return spans.length
    ? spans
    : [{ _type: 'span', _key: randomKey(), text: stripTags(html), marks: [] }];
}

// ── HTML → PortableText ────────────────────────────────────────────────────

function htmlToBlocks(html) {
  const blocks = [];
  const listItems = [];

  // Listeleri önce işle, yerinden çıkart
  const withoutLists = html.replace(/<(ul|ol)(?:[^>]*)?>([^]*?)<\/\1>/gi, (_, type, content) => {
    const liRe = /<li(?:[^>]*)?>([^]*?)<\/li>/gi;
    let m;
    while ((m = liRe.exec(content)) !== null) {
      const children = parseInline(m[1]);
      if (children.some(c => c.text.trim())) {
        listItems.push({
          _type: 'block', _key: randomKey(),
          style: 'normal',
          listItem: type === 'ol' ? 'number' : 'bullet',
          level: 1,
          children,
          markDefs: [],
        });
      }
    }
    return '';
  });

  // Paragraf ve başlıklar
  const blockRe = /<(h[1-4]|p)(?:[^>]*)?>([^]*?)<\/\1>/gi;
  let m;
  while ((m = blockRe.exec(withoutLists)) !== null) {
    const tag = m[1].toLowerCase();
    const children = parseInline(m[2]);
    if (children.some(c => c.text.trim())) {
      blocks.push({
        _type: 'block', _key: randomKey(),
        style: tag === 'p' ? 'normal' : tag,
        children,
        markDefs: [],
      });
    }
  }

  return [...blocks, ...listItems];
}

// ── Başlık çıkar ───────────────────────────────────────────────────────────

function extractTitle(html) {
  const h1 = html.match(/<h1[^>]*>([^]*?)<\/h1>/i);
  if (h1) return stripTags(h1[1]).slice(0, 120);
  const p = html.match(/<p[^>]*>([^]*?)<\/p>/i);
  if (p) {
    const t = stripTags(p[1]);
    return t.length > 80 ? t.slice(0, 77) + '...' : t;
  }
  return 'Untitled Post';
}

// ── Özet çıkar ────────────────────────────────────────────────────────────

function extractExcerpt(html, max = 300) {
  const re = /<p[^>]*>([^]*?)<\/p>/gi;
  const parts = [];
  let total = 0, m;
  while ((m = re.exec(html)) !== null && total < max) {
    const t = stripTags(m[1]);
    if (t.length > 20) { parts.push(t); total += t.length; }
  }
  const joined = parts.join(' ').slice(0, max);
  return joined + (joined.length >= max ? '...' : '');
}

// ── Tarih ──────────────────────────────────────────────────────────────────

function extractDate(folder, index) {
  const m = folder.match(/(\d{4}-\d{2}-\d{2})/);
  if (m) return new Date(m[1]).toISOString();
  const d = new Date();
  d.setDate(d.getDate() - index * 7);  // Tarih yoksa: en yeni = bugün, gerisi -7 gün
  return d.toISOString();
}

// ── Ana döngü ──────────────────────────────────────────────────────────────

async function run() {
  const POSTS_DIR = join(__dirname, 'linkedin-posts');

  if (!existsSync(POSTS_DIR)) {
    console.error(`\n❌ Bulunamadı: ${POSTS_DIR}`);
    console.error('   scripts/linkedin-posts/ klasörünü oluştur ve post-01/ gibi alt klasörler ekle.\n');
    process.exit(1);
  }

  const folders = readdirSync(POSTS_DIR)
    .filter(f => statSync(join(POSTS_DIR, f)).isDirectory())
    .sort();

  if (!folders.length) {
    console.error('\n❌ scripts/linkedin-posts/ içinde alt klasör yok.\n');
    process.exit(1);
  }

  console.log(`\n📂 ${folders.length} post klasörü: ${folders.join(', ')}\n`);

  let ok = 0, fail = 0;

  for (let i = 0; i < folders.length; i++) {
    const folder = folders[i];
    const dir = join(POSTS_DIR, folder);
    console.log(`\n[${i+1}/${folders.length}] ${folder}`);

    try {
      // 1. DOCX → HTML
      const docxPath = join(dir, 'content.docx');
      if (!existsSync(docxPath)) { console.warn('  ⚠️  content.docx yok — atlandı'); continue; }

      const { value: html, messages } = await mammoth.convertToHtml({ path: docxPath });
      if (messages.length) console.warn('  ⚠️  Mammoth:', messages.map(x => x.message).join(' | '));

      // 2. Parse
      const title   = extractTitle(html);
      const excerpt = extractExcerpt(html);
      const blocks  = htmlToBlocks(html);
      const date    = extractDate(folder, i);
      const slug    = slugifyFn(title, { lower: true, strict: true }).slice(0, 96);

      console.log(`  📝 "${title}"`);
      console.log(`  🔗 /${slug}   📅 ${date.slice(0,10)}   📄 ${blocks.length} blok`);

      // 3. Görsel yükle
      const pngPath = join(dir, 'cover.png');
      const jpegPath = join(dir, 'cover.jpeg');
      const jpgPath = join(dir, 'cover.jpg');
      
      let imagePath = null;
      let contentType = null;
      let ext = null;

      if (existsSync(pngPath)) { imagePath = pngPath; contentType = 'image/png'; ext = 'png'; }
      else if (existsSync(jpegPath)) { imagePath = jpegPath; contentType = 'image/jpeg'; ext = 'jpeg'; }
      else if (existsSync(jpgPath)) { imagePath = jpgPath; contentType = 'image/jpeg'; ext = 'jpg'; }

      let featuredImage;
      if (imagePath) {
        const asset = await client.assets.upload('image', readFileSync(imagePath), {
          filename: `${folder}-cover.${ext}`,
          contentType: contentType,
        });
        featuredImage = {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
          alt: title,
        };
        console.log(`  🖼️  Görsel: ${asset._id}`);
      } else {
        console.warn('  ⚠️  Kapak görseli (cover.png/jpeg) yok — featuredImage atlandı');
      }

      // 4. Sanity belgesi oluştur
      const created = await client.create({
        _type: 'blogPost',
        language: 'EN',
        title,
        slug:   { _type: 'slug', current: slug },
        date,
        excerpt,
        content: blocks,
        ...(featuredImage && { featuredImage }),
      });

      console.log(`  ✅ Oluşturuldu: ${created._id}`);
      ok++;

    } catch (err) {
      console.error(`  ❌ Hata: ${err.message}`);
      fail++;
    }
  }

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`Sonuç → ✅ Başarılı: ${ok}  |  ❌ Hata: ${fail}`);
  console.log('\n🌐 Sanity Studio: https://www.dataflowx.com/studio');
  console.log('   "Blog Yazıları" bölümünde postları incele ve Publish et.\n');
}

run().catch(err => { console.error('\n💥 Beklenmedik hata:', err); process.exit(1); });
