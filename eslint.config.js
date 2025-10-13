//  @ts-check
import { tanstackConfig } from '@tanstack/eslint-config';
import reactPlugin from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import progress from 'eslint-plugin-file-progress';
import prettier from 'eslint-plugin-prettier/recommended';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintParserTypeScript from '@typescript-eslint/parser';
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';

export default defineConfig([
  progress.configs.recommended,
  eslint.configs.recommended,
  ...tanstackConfig,
  {
    files: ['**/*.{ts,tsx,cts,mts}'],
    languageOptions: {
      parser: eslintParserTypeScript,
      parserOptions: {
        project: true,
      },
    },
  },
  {
    files: ['**/*.{jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'better-tailwindcss': eslintPluginBetterTailwindcss,
    },
    rules: {
      ...eslintPluginBetterTailwindcss.configs['recommended-warn'].rules,
      ...eslintPluginBetterTailwindcss.configs['recommended-error'].rules,
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/styles.css',
      },
    },
  },
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  jsxA11yPlugin.flatConfigs.recommended,
  reactHooksPlugin.configs.flat.recommended,
  tseslint.configs.recommended,
  prettier,
]);
