module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    "only-warn",
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'warn',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [
          'src',
        ],
      },
    },
  },
};
