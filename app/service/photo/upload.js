
const _ = require('lodash');
const path = require('path');
const { create } = require('../common');
const qiniu = require('../../../utils/qiniu');
const tinify = require('../../../utils/tinify');

/**
 * 获取上传文件列表
 * @param {Object} ctx 上下文
 * @return {Object[]}
 */
const getFiles = (ctx) => {
  // 需要注意的是如果只上传了一个文件那么 files 实际上就是一个 File 对象
  const files = _.get(ctx, 'request.files.file', []);
  return _.isArray(files) ? files : [ files ];
}

/**
 * 处理文件名(要存入数据库的文件名)
 * @param {String} sourceFileName 上传文件的源文件名
 * @param {String} 返回上传文件文件名: {当前环境}.{原文件名+时间戳的 base64 }.{文件后缀}
 */
const getFileName = (sourceFileName) => {
  const extname = path.extname(sourceFileName);
  const unique = `${sourceFileName}${new Date().getTime()}`;
  const name = Buffer.from(unique).toString('base64');
  const env = process.env.NODE_ENV === 'development' ? 'dev' : 'pro';
  return `${env}.${name}${extname}`
}

/**
 * 上传照片到七牛云(包含校验)
 * @param {Object[]} files 前端上传文件列表
 * @return {Object[]} 文件上传结果列表
 */
const upPhotos = async (files) => {
  const resList = [];
  for (let file of files){
    // TODO: 1. 校验(图片)
    const { name: sourceFileName, path: filePath } = file;
    const itemData = { sourceFileName };

    // 2. 压缩图片
    const fileBuffer = await tinify({
      path: filePath
    });

    // 3. 上传文件至七牛云
    const { respBody } = await qiniu.upload({
      fileBuffer,
      fileName: getFileName(sourceFileName),
    });

    // 4. 数据处理
    const { error, key: fileName, url } = respBody || {};
    fileName && (itemData.fileName = fileName);
    error && (itemData.error = error);
    url && (itemData.url = url);
    resList.push(itemData);
  }
  return resList;
}

/**
 * 插入数据到数据库
 * @param {Object} ctx    上下文环境
 * @param {Object[]} list 图片上传处理后的列表
 */
const insertData = async (ctx, list) => {
  const { type, payload } = ctx.request.body;
  const body = list.filter(v => !!v.url).map(v => ({
    type,
    payload,
    url: v.url,
    name: v.fileName,
    sourceFileName: v.sourceFileName,
  }));
  await create({ model: 'Photo', ctx, body })
}

module.exports = async (ctx) => {
  const data = {
    data: [],
    message: '上传成功',
  };
  // 1. 获取上传文件列表
  const files = getFiles(ctx);
  // 2. 遍历、上传文件
  data.data = await upPhotos(files);
  // 3. 存入 mongol 数据库
  await insertData(ctx, data.data);
  ctx.body = data;
}
