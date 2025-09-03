import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    sanity({
      projectId: '0gl88wwy',
      dataset: 'production',
      useCdn: false, // for static builds
    }),
  ],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
