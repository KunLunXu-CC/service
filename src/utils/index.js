const fs = require('fs');
const _ = require('lodash');
const path = require('path');

/**
 * 读取给定文件夹下所有文件并返回文件路径列表(递归所有目录)
 * @param {String} dir 指定目录路径
 */
module.exports.readFileList = (dir) => {
  const isDirectory = fs.statSync(dir)?.isDirectory();

  return isDirectory
    ? fs.readdirSync(dir).reduce((total, file) => ([
      ...total,
      ...this.readFileList(path.join(dir, file)),
    ]), [])
    : [dir];
};

/**
 * 加载指定目录路径下的所有指定后缀文件
 * @param {String} dir                  指定目录路径
 * @param {String} extname              指定文件后缀, 默认为 .js
 * @param {Array || Function}  filter   要过滤掉的文件路径列表或过滤方法
 * @param {Array}  handler              返回对象每个值的处理方法, 默认是使用 require 直接加载文件
 * @return {Object} { [fileName]: Object }
 */
module.exports.requireFiles = ({
  dir,
  filter = [],
  extname = '.js',
  handler = (dest) => require(dest),
}) => this.readFileList(dir).reduce((total, file) => {
  // 是否过滤掉该文件
  const isFilter = _.isArray(filter)
    ? filter.includes(file)
    : filter(file);

  // 循环
  return path.extname(file) === extname && !isFilter
    ? { ...total, [path.basename(file).split('.')[0]]: handler(file) }
    : total;
}, {});

/**
 * 判读路径是否存在, 如不存在则按照层级创建文件夹
 * @param pathStr 绝对路径
 * @return projectPath 返回绝对路径
 */
module.exports.mkdirPath = (pathStr) => {
  const tempDirArray = pathStr.split('/').filter((v) => v);
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
