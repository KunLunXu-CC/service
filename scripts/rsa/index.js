const fs = require('fs');
const path = require('path');
const { createRasKey } = require('../../utils/encryption');

// 创建公钥、私钥
module.exports.createSecretKey = async () => {
  const { private, public } = createRasKey();
  fs.writeFileSync(
    path.resolve(__dirname, '../../config/system/private.key'),
    private,
    'utf-8'
  );
  fs.writeFileSync(
    path.resolve(__dirname, '../../config/system/public.key'),
    public,
    'utf-8'
  );
}
