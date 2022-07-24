import fs from 'fs';
import path from 'path';
import create from '#service/common/create';
import { mkdirPath } from '#utils/fs';

/**
 * 处理文件名(要存入数据库的文件名)
 *
 * @param {string} sourceFileName 上传文件的源文件名
 * @returns {string} 返回文件名: {当前环境}.{原文件名+时间戳的 base64 }.{文件后缀}
 */
const getFileName = (sourceFileName) => {
  const extname = path.extname(sourceFileName);
  const unique = `${sourceFileName}${new Date().getTime()}`;
  const name = Buffer.from(unique).toString('base64');
  const env = process.env.NODE_ENV === 'development' ? 'dev' : 'pro';
  return `${env}.${name}${extname}`;
};

/**
 * 上传文件至目标目录 app/static/images
 *
 * @param {object[]} files 前端上传文件列表
 * @returns {object[]} 文件上传结果列表
 */
const upPhotos = async (files) => {
  const resList = [];

  // 1. 尝试创建目录(没有才会进行创建)
  mkdirPath(new URL('../../static/images', import.meta.url));

  // 2. 循环, 上传文件
  for (const file of files) {
    const { createReadStream, filename: sourceFileName } = await file;

    const fileName = getFileName(sourceFileName);

    // 使用管道复制文件
    createReadStream().pipe(fs.createWriteStream(new URL(`../../static/images/${fileName}`, import.meta.url)));

    resList.push({ sourceFileName, fileName });
  }

  return resList;
};

export default async ({ body, ctx }) => {
  const { files, type, payload } = body;

  // 1. 遍历、上传文件
  const data = await upPhotos(files);

  // 2. 创建数据
  return await create({
    ctx,
    model: 'Photo',
    body: data.map((v) => ({
      type,
      payload,
      name: v.fileName,
      sourceFileName: v.sourceFileName,
    })),
  });
};
