const path = require('path');

module.exports = {
  globals: {},
  extends: [
    path.resolve(__dirname, './node_modules/qy-norm/.eslintrc.js'),
  ],
  rules: {
    'no-param-reassign': 0, // 修改对象属性
  },
};
