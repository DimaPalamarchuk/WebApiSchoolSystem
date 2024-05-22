module.exports = {
  root: true,
  env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'react-hooks', 'jsx-a11y', 'prettier'],
  rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'prettier/prettier': [
          'error',
          {
              endOfLine: 'auto',
          },
      ],
      'no-unused-vars': 'off'
  },
}
