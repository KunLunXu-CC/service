const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const NodeRSA = require('node-rsa');
const jwt = require('jsonwebtoken');

/**
 * 创建 hash 通用方法
 * @param {String} data 待加密数据
 * @param {String} type hash 类型，常见类型有 md5 sha1 相对更加安全类型 sha256 sha512
 */
module.exports.hash = ({ data, type = 'md5' }) => {
  if (!data){return false;}
  const hash = crypto.createHash(type);
  hash.update(data);
  return hash.digest('hex');
}

/**
 * 创建 hmac 通用方法
 * @param {String} data     待加密数据
 * @param {String} type     hmac 类型
 * @param {String} secret   证书
 * @param {String} digest   转换数据字符串格式类型
 */
module.exports.hmac = ({ data, secret,  type = 'sha1', digest = 'hex' }) => {
  if (!data || !secret){return false;}
  return crypto.createHmac(type, secret).update(data).digest(digest);
}

/**
 * ASR 秘钥生成
 */
module.exports.createRasKey = () => {
  const nodeRSA = new NodeRSA({ bits: 1024 });
  nodeRSA.setOptions({ encryptionScheme: 'pkcs1' });
  const private = nodeRSA.exportKey('private');
  const public = nodeRSA.exportKey('public');
  return { private, public };
}

/**
 * RAS 解密
 * @param {String} data 待解密数据
 */
module.exports.decryptRsa = (data) => {
  const { privateKey } = require('../config/system');
  const nodeRSA = new NodeRSA(privateKey);
  nodeRSA.setOptions({ encryptionScheme: 'pkcs1' });
  try {
    return nodeRSA.decrypt(data, 'utf8');
  } catch (e) {
    return false;
  }
}

/**
 * 签发 json web token
 * @param {Object} payload   有效载荷
 * @returns {String}         json web token
 */
module.exports.signJwt = (payload) => {
  const { privateKey } = require('../config/system');
  return jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: '7d'
  });
};

/**
 * （异步）验证 json web token
 * @param {String} token    token 字符串
 * @returns {Object}}        有效载荷 || {}
 */
module.exports.verifyJwt = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, publicKey, (err, payload) => {
    resolve(payload || {});
  });
});
