import fs from 'fs';
import path from 'path';
import OSS from 'ali-oss';
import logger from '#logger';
import sharp from '#utils/sharp';
import system from '#config/system';
import { hash } from '#utils/encryption';

const client = system.oss?.accessKeySecret ? new OSS(system.oss) : null;

/**
 * 处理文件名(要存入数据库的文件名)
 *
 * @param {string} sourceFileName 上传文件的源文件名
 * @returns {string} 返回文件名: klx. {当前环境}.{原文件名+时间戳的 base64 }.{文件后缀}
 */
const getFileName = (sourceFileName) => {
  const extname = path.extname(sourceFileName);
  const name = hash({ data: `${sourceFileName}${new Date().getTime()}` });
  const env = process.env.NODE_ENV === 'development' ? 'dev' : 'pro';
  return {
    handledFileName: `klx.${env}.${name}${extname}`,
    originFileName: `klx.${env}.origin.${name}${extname}`,
  };
};

// 文件上传
export const upload = async ({ fileName, fileStream, filePath }) => {
  if (!client) {
    logger({
      level: 'error',
      label: '文件上传失败',
      message: '未设置阿里云 OSS 配置',
    });
    return;
  }

  const stream = fileStream
    ? fileStream
    : fs.createReadStream(filePath);

  const { handledFileName, originFileName }  = getFileName(fileName); // 处理文件名

  // 源文件只是为了备份, 所以就不用 await 了
  client.putStream(originFileName, stream); // 源文件上传

  const sharpStream = await sharp(stream); // 压缩
  const res = await client.putStream(handledFileName, sharpStream); // 压缩文件上传

  return { ...res, originFileName };
};

export const span = null;
