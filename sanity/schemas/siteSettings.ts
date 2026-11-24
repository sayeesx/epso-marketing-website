import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site name',
      type: 'string',
      initialValue: 'Epso',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'A short tagline for the website.',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Upload the official Epso logo here when available.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ogImage',
      title: 'Default OpenGraph / Social Share Image',
      type: 'image',
      description: 'Default preview image when sharing the website on WhatsApp, Facebook, LinkedIn, Twitter/X. Recommended: 1200×630 px.',
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
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
      description: 'Public contact email address.',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact phone',
      type: 'string',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp number',
      type: 'string',
      description: 'Include country code, e.g. +919876543210',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social media links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'platform', title: 'Platform', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
          ],
          preview: {
            select: { platform: 'platform', url: 'url' },
            prepare: ({ platform, url }: { platform: string; url: string }) => ({
              title: platform,
              subtitle: url,
            }),
          },
        },
      ],
    }),
  ],
});
