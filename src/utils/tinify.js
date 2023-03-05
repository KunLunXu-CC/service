import tinify from 'tinify';
import logger from '#logger';
import system from '#config/system';
import { streamToBuffer, bufferToStream } from '#utils/fs';

// 1. 设置 api key
tinify.key = system.tinifyApiKey;

/**
 * 压缩图片方法: sourceData, path  参数二选一即可
 *
 * @param {stream} stream 要压缩图片流
 * @returns {object} { error stream } 返回的是压缩后的流
 */
export default async (stream) => {
  const buffer = await streamToBuffer(stream);
  let error = null;
  let newBuffer = buffer;

  // 1. 压缩
  try {
    newBuffer = await new Promise((resolve) => {
      tinify.fromBuffer(buffer).toBuffer((err, resultData) => {
        if (!err) {
          resolve(resultData);
        }

        error = err;
      });
    });
  } catch (err) {
    error = err;
  }

  // 2. 错误打印
  if (error) {
    logger({
      message: error,
      level: 'error',
      label: '压缩文件',
    });
  }

  // 3. 返回文件流、错误
  return {
    error,
    stream: bufferToStream(newBuffer),
  };
};
