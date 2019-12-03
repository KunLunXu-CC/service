const path = require('path');
const { requireFiles } = require('../../../utils');
module.exports = requireFiles({
  dir: path.resolve(__dirname, '.'),
  filter: [path.resolve(__dirname, './index.js')],
});
