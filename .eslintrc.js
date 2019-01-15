module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'global-require': 'off',
    'consistent-return': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'comma-dangle': 'off',
    'arrow-parens': ['error', 'as-needed'],
    // "no-shadow": ["error", { "allow": ['state'] }],
    'no-plusplus': 'off',
    'max-len': ['error', { code: 120 }],
    'no-param-reassign': ['error', { props: false }],
    'object-curly-newline': ['error', { multiline: true, minProperties: 5 }],
    'import/extensions': ['error', 'ignorePackages', { 'vue': 'never' }],
    // 'import/no-extraneous-dependencies': ['error', { 'devDependencies': true }],
    'object-property-newline': ["error", { "allowAllPropertiesOnSameLine": false }],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 3,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
