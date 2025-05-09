import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import tsdoc from 'eslint-plugin-tsdoc';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.strictTypeChecked, ...tseslint.configs.stylisticTypeChecked],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json', './tsconfig.test.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'tsdoc': tsdoc
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'indent': ["error", 2],
      'no-empty-pattern': ["error", { "allowObjectPatternsAsParameters": true }],
      "@typescript-eslint/restrict-template-expressions": ["error", { 
        "allowNumber": true,
        "allowNullish": false,
        "allowAny": false,
        "allowBoolean": false,
        "allowNever": false,
        "allowRegExp": false,
      }],
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      'tsdoc/syntax': 'warn'
    },
  },
)
