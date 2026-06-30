import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'seo',
  title: 'SEO & Meta Veriler',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Başlık (Meta Title)',
      description: 'Arama motorlarında ve tarayıcı sekmesinde görünen başlık. Boş bırakılırsa içeriğin ana başlığı kullanılır.',
      type: 'string',
      validation: (Rule) => Rule.max(60).warning('Başlık 60 karakterden uzun olmamalıdır.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Açıklama (Meta Description)',
      description: 'Arama sonuçlarında başlığın altında görünen özet metin.',
      type: 'text' as const,
      rows: 3,
      validation: (Rule) => Rule.max(160).warning('Açıklama 160 karakterden uzun olmamalıdır.'),
    }),
    defineField({
      name: 'openGraphImage',
      title: 'Sosyal Medya Görseli (Open Graph Image)',
      description: 'X (Twitter), LinkedIn, Facebook vb. platformlarda paylaşıldığında görünecek görsel. Oran: 1200x630px.',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'noIndex',
      title: 'Arama Motorlarından Gizle (NoIndex)',
      description: 'Eğer bu sayfanın Google vb. arama motorlarında çıkmasını İSTEMİYORSANIZ bunu işaretleyin.',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});
