import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'resource',
  title: 'Kaynak (Resource)',
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
      name: 'type',
      title: 'Kaynak Türü (Resource Type)',
      type: 'string',
      options: {
        list: [
          { title: 'White Paper', value: 'white-paper' },
          { title: 'Case Study', value: 'case-study' },
          { title: 'Datasheet', value: 'datasheet' },
          { title: 'E-Book', value: 'e-book' },
          { title: 'Brochure', value: 'brochure' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Kısa Açıklama (Excerpt)',
      type: 'text' as const,
      rows: 3,
    }),
    defineField({
      name: 'featuredImage',
      title: 'Kapak Görseli',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'file',
      title: 'PDF / Dosya (File Upload)',
      description: 'Eğer bir dosya yüklenecekse burayı kullanın.',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx,.ppt,.pptx',
      },
    }),
    defineField({
      name: 'externalLink',
      title: 'Harici Link (External Link)',
      description: 'Dosya yüklemek yerine dışarıya bir link verilecekse buraya yazın (Örn: Youtube video linki).',
      type: 'url',
    }),
    defineField({
      name: 'date',
      title: 'Yayın Tarihi (Published Date)',
      type: 'datetime',
      validation: (rule) => rule.required(),
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
      type: 'type',
      language: 'language',
    },
    prepare(selection) {
      const { type, language } = selection;
      return {
        ...selection,
        subtitle: `${language ? `[${language}] ` : ''}${type ? type.toUpperCase() : ''}`,
      };
    },
  },
});
