#!/usr/bin/env node
// Load .env.local FIRST — before any code runs
import { readFileSync } from 'fs';
import { resolve } from 'path';

try {
  const envFile = readFileSync(resolve(process.cwd(), '.env.local'), 'utf-8');
  envFile.split('\n').forEach(line => {
    const eqIdx = line.indexOf('=');
    if (eqIdx === -1 || line.startsWith('#')) return;
    const key = line.slice(0, eqIdx).trim();
    const value = line.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
    if (key && !process.env[key]) process.env[key] = value;
  });
  console.log('✅ .env.local loaded');
} catch {
  console.warn('⚠️  Could not load .env.local — using existing env vars');
}

/**
 * DataFlowX — WordPress → Sanity Migration Script
 * 
 * Neler yapar:
 *  1. WordPress REST API'den tüm yayında olan yazıları çeker (TR + EN + AR)
 *  2. Sanity'ye Author, Category, BlogPost dokümanları oluşturur
 *  3. Kapak görsellerini Sanity asset olarak yükler
 *  4. HTML içeriği Sanity Portable Text bloğuna dönüştürür
 *  5. Aynı yazının farklı dil versiyonlarını translationId ile birbirine bağlar
 * 
 * Kullanım:
 *   node scripts/migrate-to-sanity.mjs
 *
 * ⚠️  DRY-RUN önce: Script her çalışmada önce bir özet yazdırır.
 *     Eğer Sanity'de halihazırda aynı slug varsa o yazıyı atlar.
 */

import { createClient } from '@sanity/client';
import { randomUUID } from 'crypto';
import { createWriteStream } from 'fs';

// ── Config ──────────────────────────────────────────────────────────────────
const WP_BASE = process.env.NEXT_PUBLIC_WP_URL || 'https://dataflowx1.wpenginepowered.com';
const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '15oto8dp';
const SANITY_DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET    || 'production';
const SANITY_TOKEN      = process.env.SANITY_API_WRITE_TOKEN;

if (!SANITY_TOKEN) {
  console.error('❌ SANITY_API_WRITE_TOKEN is missing in .env.local or env vars');
  console.error('   Current SANITY_API_WRITE_TOKEN:', process.env.SANITY_API_WRITE_TOKEN ? '(set)' : '(missing)');
  process.exit(1);
}

const sanity = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2025-06-29',
  token: SANITY_TOKEN,
  useCdn: false,
});

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * WordPress'in dil kodunu Sanity şema diline çevirir
 * WP WPML/Polylang: "tr", "en", "ar" → şemamız: "TR", "EN", "AR"
 */
function wpLangToSanity(lang) {
  const map = { en: 'EN', tr: 'TR', ar: 'AR' };
  return map[lang?.toLowerCase()] || 'EN';
}

/**
 * HTML içeriği, sadece metne indirgeyerek basit Portable Text bloğu üretir.
 * Tam bir HTML→PT dönüşümü ayrı bir kütüphane gerektirir, 
 * bu versiyon paragrafları korur.
 */
function htmlToPortableText(html) {
  if (!html) return [];
  
  // HTML tag'lerini temizle ve paragrafları böl
  const clean = html
    .replace(/<\/?(div|section|article)[^>]*>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<p[^>]*>/gi, '')
    .replace(/<\/?(strong|b)[^>]*>/gi, '') // Şimdilik bold markup'ı kaldır
    .replace(/<\/?(em|i)[^>]*>/gi, '')
    .replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi, '\n## $1\n')
    .replace(/<a\s[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi, '$2')
    .replace(/<img[^>]+>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8217;/g, '’')
    .replace(/&#8218;/g, '‚')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#8222;/g, '„')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8230;/g, '…')
    .replace(/&#8226;/g, '•')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // Her paragrafı ayrı bir block olarak döndür
  const paragraphs = clean.split(/\n\n+/).filter(p => p.trim().length > 0);
  
  return paragraphs.map(paragraph => ({
    _type: 'block',
    _key: randomUUID().replace(/-/g, '').substring(0, 12),
    style: paragraph.startsWith('## ') ? 'h2' : 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: randomUUID().replace(/-/g, '').substring(0, 12),
        text: paragraph.replace(/^## /, '').trim(),
        marks: [],
      }
    ]
  }));
}

/**
 * Slug string'i temizler
 */
function sanitizeSlug(slug) {
  return slug?.toLowerCase().trim().replace(/[^a-z0-9-_]/g, '-').replace(/-{2,}/g, '-') || '';
}

/**
 * Bir URL'den görseli Sanity'ye upload eder
 */
async function uploadImageFromUrl(url) {
  if (!url) return null;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`⚠️  Image fetch failed: ${url} (${response.status})`);
      return null;
    }
    const buffer = await response.arrayBuffer();
    const mimeType = response.headers.get('content-type') || 'image/jpeg';
    const ext = mimeType.split('/')[1]?.split(';')[0] || 'jpg';
    
    const asset = await sanity.assets.upload('image', Buffer.from(buffer), {
      filename: url.split('/').pop() || `image.${ext}`,
      contentType: mimeType,
    });
    return { _type: 'reference', _ref: asset._id };
  } catch (err) {
    console.warn(`⚠️  Image upload error for ${url}:`, err.message);
    return null;
  }
}

/**
 * Tüm WP yazılarını sayfalayarak çeker
 */
async function fetchAllWPPosts(lang = 'en') {
  const posts = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const url = `${WP_BASE}/wp-json/wp/v2/posts?per_page=100&page=${page}&lang=${lang}&status=publish&_embed=author,wp:featuredmedia,wp:term`;
    console.log(`  📥 Fetching WP posts page ${page}/${totalPages} [${lang.toUpperCase()}]...`);
    const res = await fetch(url);
    
    if (!res.ok) {
      if (res.status === 400 && page > 1) break; // No more pages
      console.warn(`⚠️  WP API returned ${res.status} for ${lang} page ${page}`);
      break;
    }
    
    totalPages = parseInt(res.headers.get('x-wp-totalpages') || '1', 10);
    const data = await res.json();
    posts.push(...data);
    page++;
  }
  
  return posts;
}

/**
 * Sanity'de slug + language kombinasyonu kontrolü
 */
async function slugExistsInSanity(slug, lang) {
  // Bütün tiplerde (blogPost, news, resource) kontrol et
  const result = await sanity.fetch(
    `*[(_type == "blogPost" || _type == "news" || _type == "resource") && slug.current == $slug && language == $lang][0]._id`,
    { slug, lang }
  );
  return !!result;
}

// ── Author Cache ─────────────────────────────────────────────────────────────
const authorCache = {}; // WP author name → Sanity _id

async function getOrCreateAuthor(authorName) {
  const normalizedName = authorName?.trim() || 'DataFlowX Team';
  if (authorCache[normalizedName]) return authorCache[normalizedName];
  
  // Sanity'de var mı?
  const existing = await sanity.fetch(
    `*[_type == "author" && name == $name][0]._id`,
    { name: normalizedName }
  );
  if (existing) {
    authorCache[normalizedName] = existing;
    return existing;
  }

  // Yok, oluştur
  const slug = sanitizeSlug(normalizedName.toLowerCase().replace(/\s+/g, '-'));
  const doc = await sanity.create({
    _type: 'author',
    name: normalizedName,
    slug: { _type: 'slug', current: slug },
  });
  authorCache[normalizedName] = doc._id;
  console.log(`  ✅ Author created: ${normalizedName}`);
  return doc._id;
}

// ── Doc-type mapping ─────────────────────────────────────────────────────────
// Only these WP category slugs map to _type:'news' — company events/announcements.
// "industry-news" is intentionally excluded; those are editorial blog posts.
const NEWS_CATEGORY_SLUGS = new Set([
  'news-dfx',
  'dataflowx-news',
  'dataflowx-news-2',
]);

function determineDocType(wpPost) {
  const cats = wpPost._embedded?.['wp:term']?.[0] || [];
  if (cats.some(c => NEWS_CATEGORY_SLUGS.has(c.slug))) return 'news';
  // No WP category maps to 'resource' — those are created manually in Studio
  return 'blogPost';
}

// ── Category Cache ────────────────────────────────────────────────────────────
const categoryCache = {}; // WP category name → Sanity _id

async function getOrCreateCategory(catName) {
  const normalized = catName?.trim() || 'Uncategorized';
  if (categoryCache[normalized]) return categoryCache[normalized];

  const existing = await sanity.fetch(
    `*[_type == "category" && name == $name][0]._id`,
    { name: normalized }
  );
  if (existing) {
    categoryCache[normalized] = existing;
    return existing;
  }

  const slug = sanitizeSlug(normalized.toLowerCase().replace(/\s+/g, '-'));
  const doc = await sanity.create({
    _type: 'category',
    name: normalized,
    slug: { _type: 'slug', current: slug },
  });
  categoryCache[normalized] = doc._id;
  console.log(`  ✅ Category created: ${normalized}`);
  return doc._id;
}

// ── Main Migration ────────────────────────────────────────────────────────────

async function deleteExistingMigrationDocs() {
  const types = ['blogPost', 'news'];
  for (const type of types) {
    // [0..9999] forces GROQ to bypass the default 100-item limit
    const ids = await sanity.fetch(`*[_type == $type][0..9999]._id`, { type });
    if (ids.length === 0) {
      console.log(`  ℹ️  No existing "${type}" documents to delete`);
      continue;
    }
    console.log(`  🗑️  Deleting ${ids.length} existing "${type}" documents...`);
    for (let i = 0; i < ids.length; i += 100) {
      const batch = ids.slice(i, i + 100).map(id => ({ delete: { id } }));
      await sanity.mutate(batch);
    }
    console.log(`  ✅ Deleted ${ids.length} "${type}" documents`);
  }
}

async function migratePosts() {
  const languages = ['en', 'tr'];  // AR için WP'de içerik varsa 'ar' da ekle

  console.log('\n🧹 Step 1: Cleaning up previous migration data...');
  await deleteExistingMigrationDocs();

  let totalCreated = 0;
  let totalSkipped = 0;
  let totalFailed  = 0;

  // WP'de slug → sanity translationId (aynı içeriğin farklı dilleri için)
  const translationMap = {}; // wpSlug_normalized → translationId

  for (const lang of languages) {
    console.log(`\n🌐 Processing language: ${lang.toUpperCase()}`);
    const posts = await fetchAllWPPosts(lang);
    console.log(`  Found ${posts.length} posts in WordPress [${lang.toUpperCase()}]`);

    for (const wpPost of posts) {
      const slug = sanitizeSlug(wpPost.slug);
      const sanityLang = wpLangToSanity(lang);
      // TR ve AR için slug'a dil suffixini ekle — Sanity'de her dil ayrı doküman
      const sanitySlug = sanityLang === 'EN' ? slug : `${slug}-${sanityLang.toLowerCase()}`;
      
      // 1. Doküman tipini belirle (slug existence kontrolünden ÖNCE)
      const wpCategories = wpPost._embedded?.['wp:term']?.[0] || [];
      const docType = determineDocType(wpPost);

      // Daha önce bu tip+dil+slug kombinasyonuyla eklendiyse atla
      const exists = await slugExistsInSanity(sanitySlug, sanityLang, docType);
      if (exists) {
        console.log(`  ⏭️  Skip (already exists): ${sanitySlug} [${sanityLang}] (${docType})`);
        totalSkipped++;
        continue;
      }

      try {
        // 2. Kategoriler
        const categoryIds = await Promise.all(
          wpCategories.map(cat => getOrCreateCategory(cat.name))
        );

        // 3. Kapak görseli
        const featuredImageUrl = wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
        const imageAsset = featuredImageUrl ? await uploadImageFromUrl(featuredImageUrl) : null;

        // 4. İçerik
        const contentBlocks = htmlToPortableText(wpPost.content?.rendered || '');

        // 5. Excerpt (news şeması max 200 karakter)
        const excerptLimit = docType === 'news' ? 200 : 300;
        const excerpt = (wpPost.excerpt?.rendered || '')
          .replace(/<[^>]+>/g, '')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&nbsp;/g, ' ')
          .replace(/&#8216;/g, '‘')
          .replace(/&#8217;/g, '’')
          .replace(/&#8220;/g, '“')
          .replace(/&#8221;/g, '”')
          .replace(/&#8211;/g, '–')
          .replace(/&#8212;/g, '—')
          .replace(/&#8230;/g, '…')
          .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
          .trim()
          .slice(0, excerptLimit);

        // 6. translationId
        const baseKey = wpPost.slug.replace(/-tr$|-en$|-ar$/, '');
        if (!translationMap[baseKey]) translationMap[baseKey] = randomUUID();
        const translationId = translationMap[baseKey];

        // 7. Ortak alanlar
        const title = wpPost.title?.rendered
          ?.replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&#8216;/g, '‘')
          .replace(/&#8217;/g, '’')
          .replace(/&#8220;/g, '“')
          .replace(/&#8221;/g, '”')
          .replace(/&#8211;/g, '–')
          .replace(/&#8212;/g, '—')
          .replace(/&#8230;/g, '…')
          .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code))) || '';

        const doc = {
          _type: docType,
          language: sanityLang,
          translationId,
          title,
          slug: { _type: 'slug', current: sanitySlug },
          date: wpPost.date || new Date().toISOString(),
          excerpt: excerpt || undefined,
          featuredImage: imageAsset ? { _type: 'image', asset: imageAsset } : undefined,
          categories: categoryIds.map(id => ({ _type: 'reference', _ref: id })),
          content: contentBlocks.length > 0 ? contentBlocks : undefined,
        };

        // blogPost'a özgü alan: author (news şemasında yok)
        if (docType === 'blogPost') {
          const authorName = wpPost._embedded?.author?.[0]?.name || 'DataFlowX Team';
          const authorId = await getOrCreateAuthor(authorName);
          if (authorId) doc.author = { _type: 'reference', _ref: authorId };
        }

        await sanity.create(doc);
        totalCreated++;
        console.log(`  ✅ [${sanityLang}][${docType}] Created: ${slug}`);

      } catch (err) {
        totalFailed++;
        console.error(`  ❌ Failed: ${slug} — ${err.message}`);
      }
    }
  }

  console.log(`\n📊 Migration Complete:`);
  console.log(`   ✅ Created: ${totalCreated}`);
  console.log(`   ⏭️  Skipped: ${totalSkipped}`);
  console.log(`   ❌ Failed:  ${totalFailed}`);
  console.log('\n🔍 Run validation: node -e "..." or check Sanity Studio at /studio');
}

// .env.local was already loaded at the top of this script

console.log('\n🚀 DataFlowX — WordPress → Sanity Migration');
console.log(`   WP Source:  ${WP_BASE}`);
console.log(`   Sanity:     ${SANITY_PROJECT_ID}/${SANITY_DATASET}`);
console.log('');

migratePosts().catch(err => {
  console.error('\n💥 Fatal error:', err);
  process.exit(1);
});
