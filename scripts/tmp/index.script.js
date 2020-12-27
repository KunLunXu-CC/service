// 临时脚本
const db = require('../../utils/mongo');

module.exports = {
  exec: async () => {
    const data = await db.Article.find();
    for (let item of data) {
      item.type === -99999 && await db.Article.updateMany(
        { _id: item.id },
        { type: 0 }
      );
    }
    console.log('\n\n\n脚本执行成功!\n\n\n\n');
  },
  name: '临时脚本',
};
