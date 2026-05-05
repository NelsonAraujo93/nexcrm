// .eslintrc.js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  env: {
    node: true,
    es2022: true
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error'
  },
  overrides: [
    {
      files: ['apps/web/**/*.{ts,tsx}'],
      plugins: ['react', 'react-hooks'],
      extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended'
      ],
      settings: { react: { version: 'detect' } },
      rules: {
        'react/react-in-jsx-scope': 'off'
      }
    }
  ]
}