module.exports = {
    parser: 'babel-eslint',
    extends: [
      'airbnb-base',
      'prettier'
    ],
    globals: { fetch: false },
    env: {
      browser: false,
      es6: true,
      jest: false
    },
    settings: {
      'import/resolver': {
        'babel-module': {}
      }
    },
    plugins: ['prettier'],
    rules: {
      'class-methods-use-this': 0,
      'eol-last': 0,
      'max-len': [2, 80, 2],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
          optionalDependencies: false,
          peerDependencies: false
        }
      ],
      'import/prefer-default-export': 0,
      'no-trailing-spaces': ['error', { skipBlankLines: true }],
      'no-underscore-dangle': 0,
      'no-param-reassign': 0,
      'no-debugger': 1,
      'indent': [
        'error',
        2
      ],
      'arrow-parens': [0],
      'function-paren-newline': [0],
      'implicit-arrow-linebreak': 'off',
      'no-use-before-define': [
        'error',
        { functions: false }
      ],
      'prettier/prettier': 'error',
    }
  }
