import fs from 'fs';
import path from 'path';
import OSS from 'ali-oss';
import logger from '#logger';
import tinify from '#utils/tinify';
import system from '#config/system';
import { hash } from '#utils/encryption';

const client = system.oss?.accessKeySecret ? new OSS(system.oss) : null;

/**
 * 处理文件名(要存入数据库的文件名)
 *
 * @param {string} sourceFileName 上传文件的源文件名
 * @param {boolean} isTinify 是否压缩
 * @returns {string} 返回文件名: klx. {当前环境}.{原文件名+时间戳的 base64 }.{文件后缀}
 */
const getFileName = (sourceFileName, isTinify) => {
  const extname = path.extname(sourceFileName);
  const name = hash({ data: `${sourceFileName}${new Date().getTime()}` });
  const env = process.env.NODE_ENV === 'development' ? 'dev' : 'pro';
  return `klx.${env}${isTinify ? '.tinify' : ''}.${name}${extname}`;
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
  const handledTinify = await tinify(stream); // 压缩
  const handledFileName = getFileName(fileName, !handledTinify.error); // 处理文件名

  return await client.putStream(handledFileName, handledTinify.stream); // 上传
};

export const span = null;
