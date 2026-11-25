import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'scsgz7wt',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  vite: (config) => ({
    ...config,
    base: '/admin/',
  }),
});
