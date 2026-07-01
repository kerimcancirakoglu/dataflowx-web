import { defineType, defineField } from 'sanity';

// Tek schema — tüm ürün sayfaları bu tipi kullanır.
// Sayfa slug'ı ile ayırt edilir (ör. 'unidirectional-gateway', 'portx', vb.)
export default defineType({
  name: 'productPage',
  title: 'Ürün Sayfası',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Sayfa Slug',
      type: 'slug',
      description: 'URL yolu — ör. unidirectional-gateway, portx, sandbox',
      options: { source: 'productName' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productName',
      title: 'Ürün Adı',
      type: 'string',
      description: 'Studio menüsünde görünür — ör. DFX Unidirectional Gateway',
      validation: (Rule) => Rule.required(),
    }),

    // ── Hero Bölümü ──────────────────────────────────────────
    defineField({
      name: 'hero',
      title: 'Hero Bölümü',
      type: 'object',
      fields: [
        defineField({ name: 'overTitle', title: 'Üst Başlık (küçük)', type: 'string' }),
        defineField({ name: 'title', title: 'Ana Başlık', type: 'string', validation: (Rule) => Rule.max(100) }),
        defineField({ name: 'titleHighlight', title: 'Vurgulu Başlık (turuncu)', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Alt Başlık / Açıklama', type: 'text', rows: 4 }),
        defineField({ name: 'primaryButtonText', title: 'Birinci Buton Metni', type: 'string' }),
        defineField({ name: 'primaryButtonLink', title: 'Birinci Buton Linki', type: 'string' }),
        defineField({ name: 'secondaryButtonText', title: 'İkinci Buton Metni (opsiyonel)', type: 'string' }),
        defineField({ name: 'secondaryButtonLink', title: 'İkinci Buton Linki (opsiyonel)', type: 'string' }),
      ],
    }),

    // ── Genel Bakış Bölümü ───────────────────────────────────
    defineField({
      name: 'overview',
      title: 'Genel Bakış Bölümü',
      type: 'object',
      fields: [
        defineField({ name: 'overTitle', title: 'Üst Etiket', type: 'string' }),
        defineField({ name: 'title', title: 'Başlık', type: 'string' }),
        defineField({ name: 'description', title: 'Açıklama', type: 'text', rows: 4 }),
        defineField({
          name: 'infoBlocks',
          title: 'Bilgi Blokları',
          description: 'Sertifika, tanınma, özellik açıklamaları — her biri label + metin',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'label', title: 'Etiket (büyük harf)', type: 'string' }),
              defineField({ name: 'title', title: 'Başlık (opsiyonel)', type: 'string' }),
              defineField({ name: 'text', title: 'Metin', type: 'text', rows: 3 }),
            ],
            preview: { select: { title: 'label', subtitle: 'text' } },
          }],
        }),
      ],
    }),

    // ── Özellikler Grid ──────────────────────────────────────
    defineField({
      name: 'features',
      title: 'Özellikler / Yetenekler',
      type: 'object',
      fields: [
        defineField({ name: 'overTitle', title: 'Üst Etiket', type: 'string' }),
        defineField({ name: 'title', title: 'Başlık (normal)', type: 'string' }),
        defineField({ name: 'titleHighlight', title: 'Başlık (vurgulu)', type: 'string' }),
        defineField({ name: 'description', title: 'Açıklama (opsiyonel)', type: 'text', rows: 3 }),
        defineField({
          name: 'items',
          title: 'Özellik Kartları',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'title', title: 'Başlık', type: 'string', validation: (Rule) => Rule.required() }),
              defineField({ name: 'description', title: 'Açıklama', type: 'text', rows: 3 }),
            ],
            preview: { select: { title: 'title', subtitle: 'description' } },
          }],
        }),
      ],
    }),

    // ── SEO ──────────────────────────────────────────────────
    defineField({
      name: 'seoTitle',
      title: 'SEO Başlığı',
      type: 'string',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Açıklaması',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),
  ],

  preview: {
    select: { title: 'productName', subtitle: 'slug.current' },
    prepare({ title, subtitle }) {
      return { title: title || 'İsimsiz Ürün', subtitle: `/${subtitle}` };
    },
  },
});
