// 临时脚本
const db = require('../../utils/mongo');
const { STATUS } = require('../../config/consts');

module.exports = {
  exec: async () => {
    await db.Datasetsfrom.remove({ status: STATUS.DELETE });
    console.log('\n\n\n脚本执行成功!\n\n\n\n');
  },
  name: '临时脚本',
};
