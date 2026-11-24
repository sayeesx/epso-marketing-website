import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homepageContent',
  title: 'Homepage content',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeading',
      title: 'Hero heading',
      type: 'string',
      description: 'The main heading on the homepage. Keep it short and clear.',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero subheading',
      type: 'text',
      description: 'A short sentence below the main heading.',
      rows: 2,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      description: 'The main banner image. Use a wide image (1440×600 px or wider).',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ogImage',
      title: 'OpenGraph / Social share image',
      type: 'image',
      description: 'Custom social sharing banner for the homepage (1200×630 px). If left blank, the hero image or default brand image is used.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Image description (alt text)',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'brandIntroTitle',
      title: 'Brand intro heading',
      type: 'string',
      description: 'Heading for the About section on the homepage.',
    }),
    defineField({
      name: 'brandIntroText',
      title: 'Brand intro text',
      type: 'text',
      description: 'A short paragraph about Epso for the homepage.',
      rows: 3,
    }),
    defineField({
      name: 'featuredCategories',
      title: 'Featured categories',
      type: 'array',
      description: 'Select categories to highlight on the homepage. Max 6.',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: 'featuredProducts',
      title: 'Featured products',
      type: 'array',
      description: 'Select products to feature on the homepage. Max 8.',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
      validation: (Rule) => Rule.max(8),
    }),
  ],
});
