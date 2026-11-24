import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'blogPost',
  title: 'Blog article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Article title',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published date',
      type: 'datetime',
      description: 'Set the date this article was published.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Image description',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'A short summary shown in the blog listing.',
      rows: 2,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'body',
      title: 'Article body',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
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
          description: 'Custom social sharing image (1200×630 px). If left blank, the main article image is used.',
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
      title: 'title',
      date: 'publishedAt',
      media: 'mainImage',
    },
    prepare: ({ title, date, media }: { title: string; date?: string; media?: unknown }) => ({
      title,
      subtitle: date ? new Date(date).toLocaleDateString('en-IN') : 'No date set',
      media,
    }),
  },
});
