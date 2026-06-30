import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'news',
  title: 'Haber (News)',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Dil (Language)',
      type: 'string',
      options: {
        list: [
          { title: 'Türkçe', value: 'TR' },
          { title: 'English', value: 'EN' },
          { title: 'العربية', value: 'AR' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
      initialValue: 'TR',
    }),
    defineField({
      name: 'translationId',
      title: 'Çeviri Bağlantı Kimliği (Translation ID)',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'title',
      title: 'Başlık (Title)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Özet (Excerpt)',
      type: 'text' as const,
      rows: 3,
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Kaynak Linki (Source URL)',
      description: 'Haberin orjinal yayınlandığı dış link',
      type: 'url',
    }),
    defineField({
      name: 'date',
      title: 'Yayın Tarihi (Published Date)',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Kategoriler (Categories)',
      type: 'array' as const,
      of: [{ type: 'reference' as const, to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Kapak Görseli',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'content',
      title: 'İçerik (Content - Opsiyonel)',
      type: 'array' as const,
      of: [{ type: 'block' }, { type: 'image' }],
    }),
    // SEO Objesi
    defineField({
      name: 'seo',
      title: 'SEO & Sosyal Medya',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      language: 'language',
    },
    prepare(selection) {
      const { date, language } = selection;
      return {
        ...selection,
        subtitle: `${language ? `[${language}] ` : ''}${date ? new Date(date).toLocaleDateString() : ''}`,
      };
    },
  },
});
