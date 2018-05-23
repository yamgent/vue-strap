module.exports = {
  'env': {
    'node': true,
    'es6': true,
  },
  'extends': ['airbnb-base', 'plugin:vue/recommended'],
  'rules': {
    'array-bracket-newline': ['error', { 'multiline': true }],
    'func-names': 'off',
    'function-paren-newline': 'off',
    'indent': [
      'error',
      2,
      {
        'CallExpression': { 'arguments': 'first' },
        'FunctionDeclaration': { 'parameters': 'first' },
        'FunctionExpression': { 'parameters': 'first' },
      },
    ],
    'max-len': ['error', { 'code': 110 }],
    'operator-linebreak': ['error', 'before'],
    'quote-props': 'off',
  },
};
