
const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const qiniu = require('qiniu');
const systemConfig = require('../config/system');

/**
 * 七牛云对象存储 - 获取上传凭证
 * @param {String} path       文件路径
 * @param {String} fileName   文件命名
 */
module.exports.getUptoken = () => {
  const { qiniu: { bucket, accessKey, secretKey } } = systemConfig;
  const putPolicy = new qiniu.rs.PutPolicy({ scope: bucket });
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  return putPolicy.uploadToken(mac);
}

/**
 * 七牛云对象存储 - 文件流上传文件
 * @param {String} path       文件路径
 * @param {String} fileName   文件命名
 */
module.exports.upload = (path, fileName) => new Promise((resolve, reject) => {
  const { qiniu: { zone } } = systemConfig;
  const uploadToken = this.getUptoken();
  const putExtra = new qiniu.form_up.PutExtra();
  const config = new qiniu.conf.Config();
  // 设置存储区域(华南)
  config.zone = qiniu.zone[zone]; 
  const formUploader = new qiniu.form_up.FormUploader(config);
  // 读取文件流
  const readStream = fs.createReadStream(path);
  // 使用流的方式进行上传
  formUploader.putStream(uploadToken, fileName, readStream, putExtra, (...args) => {
    const [ respErr, respBody, respInfo ] = args;
    respErr ?  reject(respErr) : resolve({ respBody, respInfo });
  }); 
});
