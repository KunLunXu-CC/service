import crypto from 'crypto';
import NodeRSA from 'node-rsa';
import jwt from 'jsonwebtoken';
import config from '#config/system';

/**
 * 创建 hash 通用方法
 *
 * @param {object} params      参数
 * @param {string} params.data 待加密数据
 * @param {string} params.type hash 类型，常见类型有 md5 sha1 相对更加安全类型 sha256 sha512
 * @returns {string} 字符串
 */
export const hash = ({ data, type = 'md5' }) => {
  if (!data) {
    return '';
  }

  const hash = crypto.createHash(type);
  hash.update(data);
  return hash.digest('hex');
};

/**
 * 创建 hmac 通用方法
 *
 * @param {object} params         参数
 * @param {string} params.data    待加密数据
 * @param {string} params.type    hmac 类型
 * @param {string} params.secret  证书
 * @param {string} params.digest  转换数据字符串格式类型
 * @returns {string} 加密字符
 */
export const hmac = ({ data, secret,  type = 'sha1', digest = 'hex' }) => {
  if (!data || !secret) {
    return false;
  }

  return crypto.createHmac(type, secret).update(data)
    .digest(digest);
};

// ASR 秘钥生成
export const createRasKey = () => {
  const nodeRSA = new NodeRSA({ bits: 1024 });
  nodeRSA.setOptions({ encryptionScheme: 'pkcs1' });
  const privateKey = nodeRSA.exportKey('private');
  const publicKey = nodeRSA.exportKey('public');
  return { privateKey, publicKey };
};

/**
 * RAS 解密
 *
 * @param {string} data 待解密数据
 */
export const decryptRsa = async (data) => {
  const nodeRSA = new NodeRSA(config.privateKey);
  nodeRSA.setOptions({ encryptionScheme: 'pkcs1' });

  try {
    return nodeRSA.decrypt(data, 'utf8');
  } catch (e) {
    return false;
  }
};

/**
 * 签发 json web token
 *
 * @param {object} payload   有效载荷
 * @param {string} expiresIn   token 时长
 * @returns {string}         json web token
 */
export const signJwt = async (payload, expiresIn = '7d') => jwt.sign(
  payload,
  config.privateKey,
  {
    expiresIn,
    algorithm: 'RS256',
  },
);

/**
 * （异步）验证 json web token
 *
 * @param {string} token    token 字符串
 * @returns {object}}        有效载荷 || {}
 */
export const verifyJwt = async (token) => new Promise(
  (resolve) => {
    jwt.verify(token, config.publicKey, (err, payload) => {
      resolve(payload || {});
    });
  },
);


