
const _ = require('lodash');
const qiniu = require('../../../utils/qiniu');

module.exports = async (ctx, next) => {
  const files = _.get(ctx, 'request.files.file', []);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    await qiniu.upload(file.path, `tem.${file.name}`);
  }
  
  ctx.body = "上传完成";
}
