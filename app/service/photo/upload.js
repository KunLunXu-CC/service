
const _ = require('lodash');
const qiniu = require('../../../utils/qiniu');

/**
 * 获取上传文件列表
 * @param {Object} ctx 上下文 
 * @return {Object[]}
 */
const getFiles = (ctx) => {
  // 需要注意的是如果只上传了一个文件那么 files 实际上就是一个 File 对象
  const files = _.get(ctx, 'request.files.file', []);
  return _.isArray(files) ? files : [ files ];
}

module.exports = async (ctx, next) => {
  const files = getFiles(ctx);
  console.log('\n\n\n\n\n\n\n\n\n----------------------------------->>>>>>>>>>>>>> 文件上传日志');
  console.log('七牛云文件上传 files:', files);
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    console.log('七牛云文件上传 file:', file);
    await qiniu.upload(file.path, `tem.${file.name}`).catch(err => {
      console.log('七牛云文件上传失败:', err);
    });
  }
  
  ctx.body = "上传完成";
}
