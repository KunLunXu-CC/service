const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const crypto = require('crypto');
const system = require('../config/system');

/**
 * 加载指定目录路径下的所有指定后缀文件
 * @param {String} dir      指定目录路径
 * @param {String} suffix   指定文件后缀
 * @param {Array}  filter   要过滤的文件列表
 * @param {Array}  handler  返回对象每个值的处理方法
 * @return {Object} { [fileName]: Object }
 */
module.exports.requireFiles = ({ 
  dir, 
  filter = [], 
  suffix = 'js', 
  handler = (dest) => require(dest),
}) => {
  const tree = {};
  const [dirs, files] = _.partition(fs.readdirSync(dir), p => {
    return fs.statSync(path.join(dir, p)).isDirectory();
  });
  files.forEach( file => {
    if (path.extname(file) === `.${suffix}` && !filter.includes(file)){
      const fileName = path.basename(file).split('.')[0];
      tree[fileName] = handler(path.join(dir, file));
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
