module.exports = {
  env: {
    es6: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 13,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    /* Indentation */
    'no-mixed-spaces-and-tabs': 2,
    indent: [2, 2],
    /* Language constructs */
    curly: 2,
    eqeqeq: [2, 'smart'],
    'func-style': [1, 'expression'],
    /* Semicolons */
    semi: 2,
    'no-extra-semi': 2,
    /* Padding & additional whitespace (preferred but optional) */
    'brace-style': [2, '1tbs', { allowSingleLine: true }],
    'semi-spacing': 1,
    'key-spacing': 1,
    'block-spacing': 1,
    'comma-spacing': 1,
    'no-multi-spaces': 1,
    'space-before-blocks': 1,
    'keyword-spacing': [1, { before: true, after: true }],
    'space-infix-ops': 1,
    /* Variable declaration */
    'one-var': [1, { uninitialized: 'never', initialized: 'never' }],
    'no-use-before-define': [2, { functions: false }],
    'comma-style': [2, 'last'],
    quotes: [1, 'single'],
  },
};
