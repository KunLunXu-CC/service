
const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const qiniu = require('qiniu');
const systemConfig = require('../config/system');

const { qiniu: { bucket, accessKey, secretKey } } = systemConfig;

/**
 * 七牛云对象存储 - 获取上传凭证
 */
module.exports.getUptoken = () => {
  const putPolicy = new qiniu.rs.PutPolicy({ scope: bucket });
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  return putPolicy.uploadToken(mac);
}

/**
 * 七牛云对象存储 -获取 Bucket Manager
 * @param {String} path       文件路径
 * @param {String} fileName   文件命名
 */
module.exports.getBucketManager = () => {
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const config = new qiniu.conf.Config();
  return new qiniu.rs.BucketManager(mac, config);
}

/**
 * 七牛云对象存储 - 文件流上传文件
 * @param {String} path       文件路径
 * @param {String} fileName   文件命名
 */
module.exports.upload = (path, fileName) => new Promise((resolve, reject) => {
  const { qiniu: { zone, cdn } } = systemConfig;
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
    if (respErr){
      reject(respErr);
    } else {
      respBody.key && (respBody.url = `${cdn}/${respBody.key}`);
      resolve({ respBody, respInfo });
    }
  });
});

/**
 * 七牛云对象存储 - 批量删除文件
 * @param {String} files      要删除的文件(文件名)列表
 */
module.exports.delete = (files = []) => {
  var deleteOperations = files.map(v => (
    qiniu.rs.deleteOp(bucket, 'NzQ4NTcxMjVfcDAucG5nMTU3MDAwNzUzMzAxOA==.png')
  ));

  bucketManager.batch(deleteOperations, function(err, respBody, respInfo) {
    console.log('============>>');
  });
}
