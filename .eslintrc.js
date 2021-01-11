/**
 * @author Benjamin Macher
 * @description ESLint config for TypeScript projects.
 *
 * @dependencies
 * yarn add --dev \
 *   eslint \
 *   prettier \
 *   eslint-plugin-import \
 *   eslint-plugin-prettier \
 *   eslint-config-airbnb-typescript \
 *   eslint-import-resolver-typescript \
 *   @typescript-eslint/eslint-plugin \
 *   @typescript-eslint/parser
 *
 * This config uses extends: ['airbnb-typescript/base'] so that it doesn't
 * involve React. However there will still be the warning with peerDependencies
 * when installing the dependencies which can be ignored.
 * Referencing issue: https://github.com/iamturns/eslint-config-airbnb-typescript/issues/6
 *
 * @commands
 * package.json
 * "scripts": [
 *   "lint": "eslint ./",
 *   "lint:fix": "eslint ./ --fix"
 * ]
 */

module.exports = {
  root: true,

  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2018,
    ecmaFeatures: {
      impliedStrict: true,
      classes: true,
    },
    sourceType: 'module',
  },

  plugins: [
    'import',
    '@typescript-eslint',
    'prettier',
  ],

  extends: [
    'airbnb-typescript/base',
  ],

  env: {
    node: true,
  },

  settings: {
    'import/resolver': {
      typescript: {
        // To resolve local depedencies under paths: {}
        project: '.',
      },
      // To resolve @types like aws-lambda
      node: {
        extensions: ['.js', '.ts', '.tsx', '.d.ts'],
        paths: ['node_modules/', 'node_modules/@types/'],
      },
    },
  },

  rules: {
    // Default exports can lead to different names in import
    // whereas import with destructuring not.
    'import/prefer-default-export': 'off',

    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-continue': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // Enable within aws-cdk projects
    // "no-new": "off",

    // Functional style prefered: map, reduce, Object.entries(), ...
    'no-restricted-syntax': [
      'off',
      { selector: 'ForInStatement' },
      { selector: 'ForOfStatement' },
    ],

    '@typescript-eslint/naming-convention': [
      'error',
      {
        // No 'I' prefix for interfaces
        // Guideline by TypeScript for contributers.
        // https://github.com/microsoft/TypeScript/wiki/Coding-guidelines#names
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^(?![I][A-Z])',
          match: true,
        },
      },
    ],
  },
  overrides: [
    {
      files: 'scripts/**/*.ts',
      rules: {
        // To import dev dependencies in scripts/*
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: '**/?(*\.)+(spec|test).ts',
      rules: {
        // To import dev dependencies in tests (e.g. @jest/globals)
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      },
    },
  ],
};
