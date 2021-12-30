const fs = require('fs');
const { createRasKey } = require('#utils/encryption');

// 创建公钥、私钥
module.exports = {
  name: '创建公钥、私钥',
  exec: async () => {
    const { privateKey, publicKey } = createRasKey();
    fs.writeFileSync(
      new URL('../../config/system/index.js/private.key', import.meta.url),
      privateKey,
      'utf-8',
    );
    fs.writeFileSync(
      new URL('../../config/system/index.js/public.key', import.meta.url),
      publicKey,
      'utf-8',
    );
  },
};
