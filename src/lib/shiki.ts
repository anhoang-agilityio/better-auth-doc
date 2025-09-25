import { createHighlighter } from 'shiki';
import type { CodeOptionsThemes, CodeToHastOptions } from 'shiki';

// Supported languages for Shiki highlighting
export const supportedLanguages: string[] = [
  'jsx',
  'tsx',
  'html',
  'css',
  'json',
  'yaml',
  'markdown',
  'sql',
  'sh',
];

export const highlighter = await createHighlighter({
  langs: supportedLanguages,
  themes: ['github-light', 'github-dark'],
});

export const options: Omit<CodeToHastOptions, 'lang'> & CodeOptionsThemes = {
  themes: {
    light: 'github-light',
    dark: 'github-dark',
  },
  colorReplacements: {
    'github-dark': {
      '#24292e': 'inherit',
      '#e1e4e8': 'inherit',
    },
    'github-light': {
      '#24292e': 'inherit',
      '#defdef': 'inherit',
      '#fff': 'inherit',
    },
  },
  transformers: [
    {
      pre(node) {
        this.addClassToHast(node, 'overflow-auto');
      },
    },
  ],
};
