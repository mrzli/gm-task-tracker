module.exports = {
  env: {
    node: false,
    browser: true,
    jest: true,
    es2021: true,
  },
  globals: {
    process: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  extends: [
    'react-app',
    'react-app/jest',
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // 'no-console': 'error',
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
      },
    ],
    'react/prop-types': 'error',
  },
  overrides: [
    {
      files: ['**/*.stories.js'],
      rules: {
        'import/no-anonymous-default-export': 'off',
      },
    },
  ],
};
