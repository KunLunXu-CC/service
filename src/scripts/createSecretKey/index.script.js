const fs = require('fs');
const path = require('path');
const { createRasKey } = require('../../utils/encryption');

// 创建公钥、私钥
module.exports = {
  name: '创建公钥、私钥',
  exec: async () => {
    const { privateKey, publicKey } = createRasKey();
    fs.writeFileSync(
      path.resolve(__dirname, '../../config/system/private.key'),
      privateKey,
      'utf-8',
    );
    fs.writeFileSync(
      path.resolve(__dirname, '../../config/system/public.key'),
      publicKey,
      'utf-8',
    );
  },
};
