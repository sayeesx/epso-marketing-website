import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'epso-studio',
  title: 'Epso CMS',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'scsgz7wt',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  basePath: '/admin',
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Homepage')
              .id('homepageContent')
              .child(
                S.document()
                  .schemaType('homepageContent')
                  .documentId('homepageContent')
              ),
            S.divider(),
            S.listItem()
              .title('Products')
              .child(S.documentTypeList('product').title('All products')),
            S.listItem()
              .title('Categories')
              .child(S.documentTypeList('category').title('All categories')),
            S.divider(),
            S.listItem()
              .title('Blog')
              .child(S.documentTypeList('blogPost').title('All articles')),
            S.divider(),
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});

