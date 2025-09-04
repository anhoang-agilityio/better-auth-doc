import process from 'node:process';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';

import { API_VERSION } from './src/config/constants.ts';

import vercel from '@astrojs/vercel';

const {
  PUBLIC_SANITY_STUDIO_URL,
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
} = loadEnv(process.NODE_ENV, process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      apiVersion: API_VERSION,
      stega: {
        studioUrl: PUBLIC_SANITY_STUDIO_URL,
      },
    }),
  ],

  output: 'server',

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: vercel(),
});
