import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homePage',
  title: 'Anasayfa',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Bölümü',
      type: 'object',
      fields: [
        defineField({
          name: 'slides',
          title: 'Slaytlar',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'heroSlide',
              title: 'Slayt',
              fields: [
                defineField({
                  name: 'titlePrefix',
                  title: 'Başlık (Normal)',
                  type: 'string',
                  description: 'Örnek: "The Infrastructure Runs."',
                  validation: (Rule) => Rule.required().max(80),
                }),
                defineField({
                  name: 'titleHighlight',
                  title: 'Başlık (Vurgulu, turuncu)',
                  type: 'string',
                  description: "Örnek: \"The Threats Don't.\"",
                  validation: (Rule) => Rule.required().max(80),
                }),
                defineField({
                  name: 'description',
                  title: 'Açıklama Metni',
                  type: 'text',
                  rows: 4,
                  validation: (Rule) => Rule.required().max(400),
                }),
                defineField({
                  name: 'buttonText',
                  title: 'Buton Metni',
                  type: 'string',
                  validation: (Rule) => Rule.required().max(40),
                }),
                defineField({
                  name: 'buttonLink',
                  title: 'Buton Linki',
                  type: 'string',
                  description: 'Örnek: #product veya /en/contact',
                  initialValue: '#product',
                }),
                defineField({
                  name: 'features',
                  title: 'Özellik Kartları (opsiyonel)',
                  type: 'array',
                  description:
                    "Boş bırakılabilir. Max 3 kart desteklenir — ikonlar sırayla atanır (1.shield, 2.monitor, 3.globe). 3'ten fazla eklenirse ikonlar tekrar eder.",
                  of: [
                    {
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'text',
                          title: 'Kart Metni',
                          type: 'string',
                          validation: (Rule) => Rule.required().max(80),
                        }),
                      ],
                    },
                  ],
                  // Max 3 features — ikonlar sabit SVG sırasına göre atandığı için
                  // 3'ten fazlası tekrar eden ikonla görünür (tasarım sınırlaması)
                  validation: (Rule) => Rule.max(3),
                }),
              ],
              preview: {
                select: { title: 'titlePrefix', subtitle: 'titleHighlight' },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Başlığı',
      type: 'string',
      description: 'Tarayıcı sekmesinde görünen başlık. Max 60 karakter.',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Açıklaması',
      type: 'text',
      rows: 3,
      description: 'Google arama sonuçlarında görünen açıklama. Max 160 karakter.',
      validation: (Rule) => Rule.max(160),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Anasayfa' };
    },
  },
});
