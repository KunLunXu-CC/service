import fs from 'fs';
import tinify from 'tinify';
import logger from '#logger';
import system from '#config/system';

// 1. 设置 api key
tinify.key = system.tinifyApiKey;

/**
 * 压缩图片方法: sourceData, path  参数二选一即可
 *
 * @param {object} params 参数
 * @param {Buffer} params.sourceBuffer 要压缩图片二进制数据
 * @param {string} params.path 文件路径
 * @returns {Promise} Promise 返回的是压缩后的二进制内容
 */
export default ({ sourceBuffer, path }) => new Promise((resolve) => {
  const buffer = sourceBuffer || fs.readFileSync(path);
  tinify.fromBuffer(buffer).toBuffer((err, resultData) => {
    if (err) {
      logger({ level: 'error', message: err });
    }

    resolve(err ?  buffer : resultData);
  });
});
