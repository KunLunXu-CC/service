import fs from 'fs';
import path from 'path';
import { Duplex } from 'stream';

/**
 * 读取给定文件夹下所有文件并返回文件路径列表(递归所有目录)
 *
 * @param {string} dir 指定目录路径
 * @returns {string[]} 目录下所有文件路径
 */
export const readFileList = (dir) => {
  const isDirectory = fs.statSync(dir)?.isDirectory();
  return isDirectory
    ? fs.readdirSync(dir).reduce((total, file) => ([
      ...total,
      ...readFileList(path.join(dir?.pathname ?? dir, file)),
    ]), [])
    : [dir];
};

/**
 * 加载指定目录路径下的所有文件, 并进行处理(导入)
 *
 * @param {string} dir                  指定目录路径
 * @param {string[]} extensions         指定文件后缀, 默认为 .js
 * @param {Function} filter             忽略文件, 同 Array.filter 返回 true 则保留: file => boolean
 * @param {Function} handler            filePath => value, 文件的读取处理方法, 默认是使用 import 加载文件
 * @returns {object[]} { fileName, value, filePath }[]
 */
export const importFiles = async ({
  dir,
  handler,
  extensions = '.js',
  filter = (fileName) => fileName,
}) => {
  const modules = []; // { fileName, value, filePath }[]

  // 1. 读取所有文件路径: 并进行过滤
  const files = readFileList(dir)
    .filter((fileName) => path.extname(fileName) === extensions)
    .filter(filter);

  // 2. 遍历所有文件: 加载(处理文件)、并添加到 modules 变量中
  for (const filePath of files) {
    modules.push({
      filePath,                                      // 文件路径
      value: handler                                 // 读取解析后的值
        ? await handler(filePath)
        : (await import(filePath))?.default,
      fileName: path.basename(filePath, extensions), // 文件名
    });
  }

  return modules;
};

/**
 * 判读路径是否存在, 如不存在则按照层级创建文件夹
 *
 * @param {URL | string} pathStr 绝对路径
 * @returns projectPath 返回绝对路径
 */
export const mkdirPath = (pathStr) => {
  const tempDirArray = (pathStr?.pathname ?? pathStr).split('/').filter((v) => v);
  let tempDir = '';

  for (const item of tempDirArray) {
    tempDir += `/${item}`;

    try {
      !fs.readdirSync(tempDir) &&
      new Error('目录不存在!');
    } catch (e) {
      fs.mkdirSync(tempDir);
    }
  }

  return pathStr;
};

// Stream 转 Buffer
export const streamToBuffer = (stream) => new Promise((resolve, reject) => {
  const buffers = [];
  stream.on('error', reject);
  stream.on('data', (data) => buffers.push(data));
  stream.on('end', () => resolve(Buffer.concat(buffers)));
});

// Buffer 转 Stream
export const bufferToStream = (buffer) => {
  const stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
};
