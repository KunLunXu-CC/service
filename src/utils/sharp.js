import sharp from 'sharp';
import { streamToBuffer, bufferToStream } from '#utils/fs';

/**
 * 压缩图片
 *
 * @param {stream} stream 要压缩图片流
 * @returns {stream} 返回的是压缩后的流
 */
export default async (stream) => {
  const imagesBuffer = await streamToBuffer(stream);
  const metadata = await sharp(imagesBuffer).metadata();

  let options = {}; // sharp 配置
  let formatOptions = {}; // 不同格式方法参数

  // 根据文件格式, 设置不同的配置
  switch (metadata.format) {
    case 'gif':
      options = {
        animated: true,
        limitInputPixels: false,
      };
      formatOptions = { colours: 256  };
      break;
    case 'raw':
    case 'tile':
      break;
    default:
      formatOptions = { quality: 75 };
  }

  // 压缩: 调用 sharp
  const newBuffer = await sharp(imagesBuffer, options)
    ?.[metadata.format](formatOptions)
    .toBuffer();

  // 返回文件流
  return bufferToStream(newBuffer);
};
