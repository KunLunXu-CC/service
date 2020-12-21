// 临时脚本
const db = require('../../utils/mongo');

module.exports = {
  exec: async () => {

    const data = await db.Role.find();
    for (let item of data) {
      const auth = item.auth.map(v => {
        v.code === 'read' && (v.code = 'reader');
        return v;
      });

      await db.Role.updateMany(
        { _id: item.id },
        { auth }
      );
    }

    console.log('\n\n\n脚本执行成功!\n\n\n\n');
  },
  name: '临时脚本',
};
