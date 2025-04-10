import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript',
    'eslint-config-prettier',
    'prettier',
    'next',
  ),
  {
    ignores: ['.eslintrc.js', 'tailwind.config.js', 'lint-staged.config.js', 'postcss.config.js', 'middleware.ts'],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-var': 'error',
      'spaced-comment': ['warn', 'always'],
      'prefer-const': 'error',
      'no-invalid-this': 'off',
      'default-case': 'error',
      'react/no-unknown-property': ['error', { ignore: ['jsx'] }],
      'import/no-cycle': 'off',
    },
  },
];

export default eslintConfig;
