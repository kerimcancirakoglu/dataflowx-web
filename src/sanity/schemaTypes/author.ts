import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'author',
  title: 'Yazar (Author)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'İsim (Name)',
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
      name: 'image',
      title: 'Profil Fotoğrafı (Image)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Biyografi (Bio)',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
});
