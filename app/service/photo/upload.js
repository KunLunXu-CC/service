
const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const { create } = require('../common');
const { mkdirPath } = require('../../../utils');

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
 * 上传文件至目标目录 app/static/images
 * @param {Object[]} files 前端上传文件列表
 * @return {Object[]} 文件上传结果列表
 */
const upPhotos = async files => {
  const list = _.isArray(files) ? files : [ files ];
  const resList = [];
  for (let file of list){
    const { name: sourceFileName, path: filePath } = file;
    const fileName = getFileName(sourceFileName);
    mkdirPath(path.resolve(__dirname, '../../static/images'));
    // 使用管道复制文件
    fs.createReadStream(filePath).pipe(fs.createWriteStream(
      path.resolve(__dirname, `../../static/images/${fileName}`)
    ));
    resList.push({ sourceFileName, fileName });
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
  const body = list.map(v => ({
    type,
    payload,
    name: v.fileName,
    sourceFileName: v.sourceFileName,
  }));
  await create({ model: 'Photo', ctx, body })
}

module.exports = async (ctx) => {
  // 1. 获取上传文件参数: 需要注意的是如果只上传了一个文件那么 files 实际上就是一个 File 对象
  const files = _.get(ctx, 'request.files.file', []);

  // 2. 遍历、上传文件
  const data = await upPhotos(files);

  // 3. 存入 mongol 数据库
  await insertData(ctx, data);

  ctx.body = {
    data,
    message: '上传成功',
  };
}
