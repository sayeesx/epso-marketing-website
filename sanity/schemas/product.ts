import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product name',
      type: 'string',
      description: 'The full product name as it appears on the website.',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      description: 'The URL-friendly version of the product name. Click Generate.',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      description: 'Only published products appear on the website.',
      initialValue: false,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured product',
      type: 'boolean',
      description: 'Featured products appear on the homepage.',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Which category does this product belong to?',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main product image',
      type: 'image',
      description: 'The primary product photo. Use a square image (1:1 ratio, minimum 800×800 px).',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Image description (alt text)',
          type: 'string',
          description: 'Describe the image for screen readers and search engines.',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'images',
      title: 'Additional product images',
      type: 'array',
      description: 'Up to 4 extra product photos.',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Image description',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short description',
      type: 'text',
      description: 'One or two sentences describing the product. Shown on product cards.',
      rows: 2,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'description',
      title: 'Full description',
      type: 'array',
      description: 'The full product description shown on the product page.',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'packagingSizes',
      title: 'Packaging sizes',
      type: 'array',
      description: 'Available pack sizes (e.g. 100 g, 250 g, 500 g).',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'size',
              title: 'Size',
              type: 'string',
              description: 'e.g. 100',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'unit',
              title: 'Unit',
              type: 'string',
              description: 'e.g. g, ml, kg, L',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Note',
              type: 'string',
              description: 'Optional note about this size.',
            }),
          ],
          preview: {
            select: { size: 'size', unit: 'unit' },
            prepare: ({ size, unit }: { size: string; unit: string }) => ({
              title: `${size} ${unit}`,
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Product features',
      type: 'array',
      description: 'Key features of this product.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'feature',
              title: 'Feature',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { feature: 'feature' },
            prepare: ({ feature }: { feature: string }) => ({ title: feature }),
          },
        },
      ],
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'text',
      description: 'For food products — list all ingredients. Leave blank if not applicable.',
      rows: 3,
    }),
    defineField({
      name: 'usageInstructions',
      title: 'Usage instructions',
      type: 'text',
      description: 'How to use this product. Leave blank if not applicable.',
      rows: 3,
    }),
    defineField({
      name: 'seo',
      title: 'SEO settings',
      type: 'object',
      description: 'Optional — improves search engine visibility.',
      fields: [
        defineField({
          name: 'title',
          title: 'SEO title',
          type: 'string',
          description: 'Appears in search results. Keep under 60 characters.',
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: 'description',
          title: 'SEO description',
          type: 'text',
          description: 'Appears in search results. Keep under 160 characters.',
          rows: 2,
          validation: (Rule) => Rule.max(160),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category.name',
      media: 'mainImage',
    },
  },
});

