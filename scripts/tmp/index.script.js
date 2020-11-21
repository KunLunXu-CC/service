// 临时脚本
const db = require('../../utils/mongo');

module.exports = {
  exec: async () => {
    await db.Article.updateMany({}, {
      type: 0,
      tags: [],
    }, {});
    console.log('\n\n\n修改文章类型成功!\n\n\n\n');
  },
  name: '临时脚本',
};
