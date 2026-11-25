import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import path from 'path';

export default defineConfig({
  site: 'https://www.epso.in',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) => !page.includes('/studio') && !page.includes('/admin'),
    }),
  ],
  output: 'static',
  build: {
    format: 'directory',
    assets: '_assets',
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@components': path.resolve('./src/components'),
        '@layouts': path.resolve('./src/layouts'),
        '@lib': path.resolve('./src/lib'),
        '@types': path.resolve('./src/types'),
      },
    },
    optimizeDeps: {
      include: ['@sanity/client', '@sanity/image-url'],
    },
  },
});
