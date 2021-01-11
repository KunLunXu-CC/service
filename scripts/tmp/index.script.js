// 临时脚本
const db = require('../../utils/mongo');

module.exports = {
  exec: async () => {
    const data = await db.Datasetsfrom.find({ code: 6 });

    console.log('----->>', data);

    for (let item of data) {
      await db.Datasetsfrom.updateMany(
        { _id: item.id },
        { parent: null }
      );
    }
    console.log('\n\n\n脚本执行成功!\n\n\n\n');
  },
  name: '临时脚本',
};
