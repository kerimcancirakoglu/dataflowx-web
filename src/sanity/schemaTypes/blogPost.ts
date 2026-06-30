import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'blogPost',
  title: 'Blog Yazısı (Post)',
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
      description: 'Aynı içeriğin farklı dillerdeki versiyonlarını birbirine bağlamak için kullanılan ortak kimlik. İçerik göçü sırasında otomatik doldurulur.',
      type: 'string',
      hidden: true, // Editörlerin görmesine gerek yok, arka planda kullanılacak
    }),
    defineField({
      name: 'title',
      title: 'Başlık (Title)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL Bağlantısı)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Yazar (Author)',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'featuredImage',
      title: 'Kapak Görseli (Featured Image)',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternatif Metin (Alt Text - SEO için)',
        }
      ]
    }),
    defineField({
      name: 'categories',
      title: 'Kategoriler (Categories)',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'date',
      title: 'Yayın Tarihi (Published Date)',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Özet (Excerpt)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'content',
      title: 'İçerik (Content)',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
      ],
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
      author: 'author.name',
      media: 'featuredImage',
      language: 'language',
    },
    prepare(selection) {
      const { author, language } = selection;
      return {
        ...selection,
        subtitle: `${language ? `[${language}] ` : ''}${author && `by ${author}`}`,
      };
    },
  },
});
