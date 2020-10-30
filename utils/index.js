const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const crypto = require('crypto');

/**
 * 读取文件夹下所有文件并返回文件列表
 * @param {String} dir 指定目录路径
 */
module.exports.readFileList = (dir, filesList = []) =>{
  let files = [];
  try {
    files = fs.readdirSync(dir);
  } catch (e) {}
  files.forEach((item, index) => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      this.readFileList(path.join(dir, item), filesList);
    } else {
      filesList.push(fullPath);
    }
  });
  return filesList;
}

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
  handler = dest => require(dest),
}) => {
  const tree = {};
  const files = this.readFileList(dir);
  files.forEach(file => {
    // 是否过滤掉该文件
    const isFilter = _.isArray(filter)
      ? filter.includes(file)
      : filter(file);
    if (path.extname(file) === extname && !isFilter){
      const fileName = path.basename(file).split('.')[0];
      tree[fileName] = handler(file);
    }
  });
  return tree
}

/**
 * 创建 hash 通用方法
 * @param {String} data 待加密数据
 * @param {String} type hash 类型，常见类型有 md5 sha1 相对更加安全类型 sha256 sha512
 */
module.exports.createHash = ({ data, type = 'md5' }) => {
  const hash = crypto.createHash(type);
  hash.update(data);
  return hash.digest('hex');
}

/**
 * 判读路径是否存在, 如不存在则按照层级创建文件夹
 * @param pathStr 绝对路径
 * @return projectPath 返回绝对路径
 */
module.exports.mkdirPath = pathStr => {
  const tempDirArray = pathStr.split('/').filter(v => v);
  let tempDir = '';
  for (let item of tempDirArray) {
    tempDir += `/${item}`;
    try {
      !fs.readdirSync(tempDir) &&
      new Error('目录不存在!');
    } catch (e) {
      fs.mkdirSync(tempDir);
    }
  }
  return pathStr;
}

/**
 * 延时函数
 * @param {Number} time 延时时长(单位毫秒)
 */
module.exports.delayed = time => new Promise(
  resolve => setTimeout(() => resolve(true), time)
);
