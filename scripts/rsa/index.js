const fs = require('fs');
const path = require('path');
const { createRasKey } = require('../../utils/encryption');

module.exports.createProKey = async () => {
  const { private, public } = createRasKey();
  fs.writeFileSync(
    path.resolve(__dirname, '../../config/system/private.pro.key'),
    private,
    'utf-8'
  );
  fs.writeFileSync(
    path.resolve(__dirname, '../../config/system/public.pro.key'),
    public,
    'utf-8'
  );
}
