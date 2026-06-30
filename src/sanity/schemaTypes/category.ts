import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Kategori (Category)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Kategori Adı (Name)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Açıklama (Description)',
      type: 'text' as const,
    }),
  ],
});
