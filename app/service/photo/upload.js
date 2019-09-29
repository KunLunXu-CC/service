
const fs = require('fs');
const _ = require('lodash');
const path = require('path');

module.exports = async (ctx, next) => {
  const files = _.get(ctx, 'request.files.file', []);
  for (let file of files) {
    // 1. 创建读流
    const reader = fs.createReadStream(file.path);

    // 2. 拼接存储文件路径
    let filePath = path.join(__dirname, `/${file.name}`);

    // 3. 创建写流(传入存储文件路径)
    const upStream = fs.createWriteStream(filePath);

    // 4. 通过管道将读流对接写流(导出文件)
    reader.pipe(upStream);
  }
  ctx.body = "上传完成";
}
