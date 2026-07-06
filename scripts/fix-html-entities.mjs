// Sanity'deki news/blogPost dokümanlarında kalan çözülmemiş HTML entity'lerini
// (&#8217; &#8220; &#8221; &#8211; &#8212; &amp; vb.) gerçek karaktere çevirir.
// Kullanım: SANITY_API_WRITE_TOKEN="..." node scripts/fix-html-entities.mjs [--dry-run]

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '15oto8dp',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const dryRun = process.argv.includes('--dry-run');

const ENTITY_MAP = {
  '&#8216;': '‘',
  '&#8217;': '’',
  '&#8218;': '‚',
  '&#8220;': '“',
  '&#8221;': '”',
  '&#8222;': '„',
  '&#8211;': '–',
  '&#8212;': '—',
  '&#8230;': '…',
  '&#8226;': '•',
  '&#39;': "'",
  '&nbsp;': ' ',
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
};

function decodeEntities(str) {
  if (typeof str !== 'string' || !str.includes('&')) return str;
  let out = str;
  for (const [entity, char] of Object.entries(ENTITY_MAP)) {
    out = out.split(entity).join(char);
  }
  // Herhangi bir sayısal entity kalırsa genel bir decode denemesi yap
  out = out.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
  return out;
}

function decodePortableText(blocks) {
  if (!Array.isArray(blocks)) return blocks;
  return blocks.map((block) => {
    if (block._type !== 'block' || !Array.isArray(block.children)) return block;
    return {
      ...block,
      children: block.children.map((child) =>
        child._type === 'span' && typeof child.text === 'string'
          ? { ...child, text: decodeEntities(child.text) }
          : child
      ),
    };
  });
}

async function fixDocType(type) {
  const docs = await client.fetch(`*[_type == $type]{_id, title, excerpt, content}`, { type });
  let changed = 0;

  for (const doc of docs) {
    const patch = {};

    if (doc.title) {
      const fixed = decodeEntities(doc.title);
      if (fixed !== doc.title) patch.title = fixed;
    }
    if (doc.excerpt) {
      const fixed = decodeEntities(doc.excerpt);
      if (fixed !== doc.excerpt) patch.excerpt = fixed;
    }
    if (doc.content) {
      const fixed = decodePortableText(doc.content);
      if (JSON.stringify(fixed) !== JSON.stringify(doc.content)) patch.content = fixed;
    }

    if (Object.keys(patch).length > 0) {
      changed++;
      console.log(`[${type}] ${doc._id} -> alanlar: ${Object.keys(patch).join(', ')}`);
      if (!dryRun) {
        await client.patch(doc._id).set(patch).commit();
      }
    }
  }

  console.log(`${type}: ${changed}/${docs.length} doküman ${dryRun ? 'güncellenecekti (dry-run)' : 'güncellendi'}`);
}

async function main() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('SANITY_API_WRITE_TOKEN env değişkeni gerekli.');
    process.exit(1);
  }
  await fixDocType('news');
  await fixDocType('blogPost');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
