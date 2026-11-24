import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category name',
      type: 'string',
      description: 'The category name as it appears on the website.',
      validation: (Rule) => Rule.required().min(2).max(60),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      description: 'The URL-friendly version of the name. Click Generate.',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'parent',
      title: 'Parent category',
      type: 'reference',
      to: [{ type: 'category' }],
      description:
        'Leave blank for a top-level category. Select a parent for subcategories (e.g. Food → Mixtures).',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A short description of this category.',
      rows: 2,
    }),
    defineField({
      name: 'image',
      title: 'Category image',
      type: 'image',
      description: 'An image representing this category. Recommended: 400×300 px.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Image description',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first. Leave blank to sort alphabetically.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO settings',
      type: 'object',
      description: 'Search engine and social sharing settings.',
      fields: [
        defineField({
          name: 'title',
          title: 'SEO title',
          type: 'string',
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: 'description',
          title: 'SEO description',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: 'ogImage',
          title: 'OpenGraph / Social share image',
          type: 'image',
          description: 'Custom social sharing image (1200×630 px). If left blank, the category image is used.',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Image description (alt text)',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'parent.name',
      media: 'image',
    },
    prepare: ({ title, subtitle, media }: { title: string; subtitle?: string; media?: unknown }) => ({
      title,
      subtitle: subtitle ? `Under: ${subtitle}` : 'Top-level category',
      media,
    }),
  },
});
