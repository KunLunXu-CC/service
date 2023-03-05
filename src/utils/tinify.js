import tinify from 'tinify';
import logger from '#logger';
import system from '#config/system';
import { streamToBuffer, bufferToStream } from '#utils/fs';

// 1. 设置 api key
tinify.key = system.tinifyApiKey;

const tinifyLogger = (message) => logger({ message, label: '压缩文件', level: 'error' });

/**
 * 压缩图片方法: sourceData, path  参数二选一即可
 *
 * @param {stream} stream 要压缩图片流
 * @returns {Promise} Promise 返回的是压缩后的流
 */
export default async (stream) => {
  const buffer = await streamToBuffer(stream);

  try {
    const newBuffer = await new Promise((resolve) => {
      tinify.fromBuffer(buffer).toBuffer((err, resultData) => {
        if (err) {
          tinifyLogger(err);
        }

        resolve(err ? buffer : resultData);
      });
    });

    return bufferToStream(newBuffer);
  } catch (err) {
    // 错误处理
    tinifyLogger(err);
    return bufferToStream(buffer);
  }
};
