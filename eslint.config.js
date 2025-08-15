import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import testingLibrary from 'eslint-plugin-testing-library';
import jestDom from 'eslint-plugin-jest-dom';
import astro from 'eslint-plugin-astro';
import checkFile from 'eslint-plugin-check-file';
import globals from 'globals';

export default defineConfig([
  // Ignore patterns
  {
    ignores: ['dist/*', 'node_modules/*', '.astro/*'],
  },

  // Prettier configuration
  {
    plugins: {
      prettier: prettier,
    },
    rules: {
      // Prettier rules
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    },
  },

  // Typescript and Astro files common configuration
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.astro'],
    plugins: {
      import: importPlugin,
      '@typescript-eslint': typescript,
      'check-file': checkFile,
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/explicit-function-return-type': ['off'],
      '@typescript-eslint/explicit-module-boundary-types': ['off'],
      '@typescript-eslint/no-empty-function': ['off'],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      // Import rules
      'import/no-cycle': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-named-as-default': 'off',

      // File naming rules
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{ts,tsx,astro}': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],

      // Other rules
      'linebreak-style': ['error', 'unix'],
    },
  },

  // Astro files configuration
  astro.configs.recommended,
  astro.configs['jsx-a11y-recommended'],
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astro.parser,
      parserOptions: {
        parser: typescriptParser,
        extraFileExtensions: ['.astro'],
        sourceType: 'module',
        ecmaVersion: 'latest',
        project: './tsconfig.json',
      },
    },
    rules: {
      'no-undef': 'off',
    },
  },

  // Typescript and React files configuration
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': typescript,
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      prettier,
      'testing-library': testingLibrary,
      'jest-dom': jestDom,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: {},
      },
    },
    rules: {
      // React rules
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',

      // JSX A11y rules
      ...jsxA11y.configs.recommended.rules,
      'jsx-a11y/anchor-is-valid': 'off',

      // Testing rules
      ...testingLibrary.configs.react.rules,
      ...jestDom.configs.recommended.rules,
    },
  },

  // Folder naming convention
  {
    files: ['src/**/!(__tests__)/*'],
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      'check-file/folder-naming-convention': [
        'error',
        {
          '**/*': 'KEBAB_CASE',
        },
      ],
    },
  },
]);
