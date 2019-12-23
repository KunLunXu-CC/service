const path = require('path');
const { qiniu } = require('../../../config/system');
const { PREFIX_DELETED } = require('../../../config/conts');
const { update: updatePhotos } = require('../../../utils/qiniu');

/**
 * 删除(假删图片)
 * @param {Object} data  待删除数据
 * @param {Object} ctx   koa 上下文
 */
module.exports = async ({ data, ctx }) => {
  const { cdn } = qiniu;
  const server = ctx.db.mongo.Photo;

  // 1. 修改对象存储上的文件名
  await updatePhotos(data.map(v => ({
    src: v.name,
    dest: `${PREFIX_DELETED}${v.id}_${v.name}`,
  })));

  // 2. 修改本地存储数据 url
  for (let item of data) {
    const url = `${cdn}/${PREFIX_DELETED}${item.id}_${item.name}`;
    await server.updateMany({ _id: item.id }, { url });
  }
}
