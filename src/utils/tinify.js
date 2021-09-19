const fs = require('fs');
const tinify = require('tinify');
const { tinify: { apiKey } } = require('../config/system');

// 1. 设置 api key
tinify.key = apiKey;

/**
 * 压缩图片方法: sourceData, path  参数二选一即可
 * @param {Buffer} sourceData 要压缩图片二进制数据
 * @param {String} path 文件路径
 * @return {Promise} Promise 返回的是压缩后的二进制内容
 */
module.exports = ({ sourceData, path }) => new Promise((resolve) => {
  const fromBuffer = sourceData || fs.readFileSync(path);
  tinify.fromBuffer(fromBuffer).toBuffer((err, resultData) => {
    resolve(err ?  fromBuffer : resultData);
  });
});
