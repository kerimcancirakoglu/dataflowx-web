import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Ayarları',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Adı',
      type: 'string',
      initialValue: 'DataFlowX',
    }),
    defineField({
      name: 'defaultSeoDescription',
      title: 'Varsayılan SEO Açıklaması',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'contactEmail',
      title: 'İletişim E-postası',
      type: 'string',
      initialValue: 'info@dataflowx.com',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'twitterUrl',
      title: 'Twitter/X URL',
      type: 'url',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Ayarları' };
    },
  },
});
