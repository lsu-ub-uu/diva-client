import globals from 'globals';
import pluginJs from '@eslint/js';
import typescriptEslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

const hooksPluginFlatConfig = {
  plugins: {
    'react-hooks': hooksPlugin,
  },
  rules: hooksPlugin.configs.recommended.rules,
};

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.react-router/**',
      'target/**',
      'coverage/**',
    ],
  },

  {
    files: ['**/*.{ts,tsx}'],
  },

  pluginJs.configs.recommended,
  ...typescriptEslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  hooksPluginFlatConfig,
  jsxA11y.flatConfigs.recommended,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
      'no-console': [
        'error',
        {
          allow: ['error', 'warn', 'info', 'trace'],
        },
      ],
      'react/no-unknown-property': ['error', { ignore: ['closedby'] }],
    },
  },
];
