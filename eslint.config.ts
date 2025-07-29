// eslint.config.ts
import globals from 'globals';
import * as pluginJs from '@eslint/js'; // Use 'import * as' for commonjs modules like @eslint/js
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

// Optional: Import Linter type for explicit type safety, though often inferred
import type { Linter } from 'eslint';

export default [
  // 1. Base configuration for all files
  { files: ['**/*.{js,mjs,cjs,ts,tsx}'] },

  // 2. TypeScript-specific configuration
  {
    files: ['**/*.{ts,tsx}'], // Only apply this to TypeScript files
    languageOptions: {
      parser: tsParser, // Use the TypeScript parser
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest', // Or specify a year like 2022
        sourceType: 'module',
        // IMPORTANT: This links ESLint to your TypeScript project for type-aware linting.
        // Adjust path if your tsconfig.json is not in the root directory.
        project: './tsconfig.json',
      },
      globals: globals.browser, // Define browser globals like 'window', 'document'
    },
    plugins: {
      '@typescript-eslint': tsPlugin, // Register the TypeScript plugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules, // Apply recommended TypeScript rules
      // Add any specific TypeScript-related overrides here
    },
  },

  // 3. General JavaScript and CommonJS rules (from @eslint/js)
  pluginJs.configs.recommended, // This should be fine directly as a recommended config

  // 4. React-specific configuration (using the plugin directly)
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'], // Apply to all JS/TS files
    plugins: {
      react: pluginReact, // Register the React plugin
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
    },
    rules: {
      // Apply recommended React rules directly from the plugin
      ...pluginReact.configs.recommended.rules,
      // Apply recommended React Hooks rules
      ...pluginReactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // Disable rules that conflict with new JSX transform or TypeScript
      'react/react-in-jsx-scope': 'off', // Not needed with React 17+ JSX transform
      'react/prop-types': 'off', // Prop types are handled by TypeScript
    },
    settings: {
      // Auto-detect React version for correct linting
      react: {
        version: 'detect',
      },
    },
  },

  // 5. Prettier integration (must be last to override other formatting rules)
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'], // Apply Prettier rules to all relevant files
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error', // Mark Prettier formatting errors as ESLint errors
    },
  },
  configPrettier, // Disables ESLint rules that conflict with Prettier
] as Linter.FlatConfig[]; // Explicitly cast to Linter.FlatConfig[] for robust type safety
