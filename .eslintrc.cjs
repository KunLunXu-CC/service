const path = require('path');

module.exports = {
  globals: {},
  extends: [path.resolve(__dirname, './node_modules/@kunlunxu/norm/.eslintrc.js')],
  rules: {
    'import/no-unresolved': 'off',
  },
};
