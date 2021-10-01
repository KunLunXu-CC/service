import crypto from 'crypto';
import NodeRSA from 'node-rsa';
import jwt from 'jsonwebtoken';
import getConfig from '../config/system/index.mjs';

/**
 * 创建 hash 通用方法
 * @param {String} data 待加密数据
 * @param {String} type hash 类型，常见类型有 md5 sha1 相对更加安全类型 sha256 sha512
 */
export const hash = ({ data, type = 'md5' }) => {
  if (!data) {
    return false;
  }

  const hash = crypto.createHash(type);
  hash.update(data);
  return hash.digest('hex');
};

/**
 * 创建 hmac 通用方法
 * @param {String} data     待加密数据
 * @param {String} type     hmac 类型
 * @param {String} secret   证书
 * @param {String} digest   转换数据字符串格式类型
 */
export const hmac = ({ data, secret,  type = 'sha1', digest = 'hex' }) => {
  if (!data || !secret) {
    return false;
  }

  return crypto.createHmac(type, secret).update(data)
    .digest(digest);
};

/**
 * ASR 秘钥生成
 */
export const createRasKey = () => {
  const nodeRSA = new NodeRSA({ bits: 1024 });
  nodeRSA.setOptions({ encryptionScheme: 'pkcs1' });
  const privateKey = nodeRSA.exportKey('private');
  const publicKey = nodeRSA.exportKey('public');
  return { privateKey, publicKey };
};

/**
 * RAS 解密
 * @param {String} data 待解密数据
 */
export const decryptRsa = async (data) => {
  const { privateKey } = await getConfig();

  const nodeRSA = new NodeRSA(privateKey);
  nodeRSA.setOptions({ encryptionScheme: 'pkcs1' });

  try {
    return nodeRSA.decrypt(data, 'utf8');
  } catch (e) {
    return false;
  }
};

/**
 * 签发 json web token
 * @param {Object} payload   有效载荷
 * @param {String} expiresIn   token 时长
 * @returns {String}         json web token
 */
export const signJwt = async (payload, expiresIn = '7d') => {
  const { privateKey } = await getConfig();
  return jwt.sign(payload, privateKey, {
    expiresIn,
    algorithm: 'RS256',
  });
};

/**
 * （异步）验证 json web token
 * @param {String} token    token 字符串
 * @returns {Object}}        有效载荷 || {}
 */
export const verifyJwt = async (token) => {
  const { publicKey } = await getConfig();

  return new Promise((resolve) => {
    jwt.verify(token, publicKey, (err, payload) => {
      resolve(payload || {});
    });
  });
};


