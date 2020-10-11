// 临时脚本
const mongo = require('../../utils/mongo');

module.exports = {
  exec: async () => {
    const db = mongo();
    await db.Article.updateMany({}, {
      type: 0,
      tags: [],
    }, {});
    console.log('\n\n\n修改文章类型成功!\n\n\n\n');
  },
  name: '临时脚本',
};
