import fs from 'fs';
import path from 'path';
import OSS from 'ali-oss';
import tinify from '#utils/tinify';
import system from '#config/system';
const client = new OSS(system.oss);

/**
 * 处理文件名(要存入数据库的文件名)
 *
 * @param {string} sourceFileName 上传文件的源文件名
 * @returns {string} 返回文件名: klx. {当前环境}.{原文件名+时间戳的 base64 }.{文件后缀}
 */
const getFileName = (sourceFileName) => {
  const extname = path.extname(sourceFileName);
  const unique = `${sourceFileName}${new Date().getTime()}`;
  const name = Buffer.from(unique).toString('base64');
  const env = process.env.NODE_ENV === 'development' ? 'dev' : 'pro';
  return `klx.${env}.${name}${extname}`;
};

// 文件上传
export const upload = async ({ fileName, fileStream, filePath }) => {
  const stream = fileStream
    ? fileStream
    : fs.createReadStream(filePath);
  const compress = await tinify(stream); // 压缩
  const handledFileName = getFileName(fileName); // 处理文件名

  return await client.putStream(handledFileName, compress); // 上传
};

export const span = null;
