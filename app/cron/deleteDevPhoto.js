/**
 * 删除七牛云开发环境下上传的文件(文件名前缀为 dev)
 */
const _ = require('lodash');
const moment = require('moment');
const qiniu = require('../../utils/qiniu');

// 查询列表
const getList = async () => {
  const { items } = await qiniu.getList({ prefix: 'dev' });
  return items ? _.chunk(items, 500) : [];
};

// 批量删除文件
const deleteFiles = async (files) => {
  for(let values of files) {
    await qiniu.delete(values.map(v => v.key));
  }
  console.log('---- 成功删除开发环境下上传的文件 -------');
}

const onTick = async () => {
  const files = await getList();
  deleteFiles(files);
}

module.exports = {
  onTick,                      // 在指定时间执行该函数
  onComplete: null,            // 当通过停止作业时将触发的函数
  cronTime: "0 30 3 * * *",    // 时间模式(每天早上 3 点 30 分： 0 30 3 * * *)
};
