// 临时脚本
const mongo = require('../../utils/mongo');
const dbData = require('./db.json');
const { STATUS } = require('../../config/consts');

// 插入字典数据
const insertDatasetsfrom = async () => {
  const db = mongo();
  const admin = await db.User.findOne({
    account: 'admin',
    status: { $ne: STATUS.DELETE },
  });
  await db.Datasetsfrom.insertMany(dbData.map(v => ({
    ...v,
    creator: admin.id,
    updater: admin.id,
  })));
};

// 处理日志数据
const handleDiary = async () => {
  const db = mongo();

  const data = await db.Diary.find();
  for (let item of data) {
    const { fitness, id } = item;

    id && fitness && fitness.length > 0 && await db.Diary.updateMany(
      { _id: item.id },
      { fitness: fitness.map(v => ({
        type: v.type,
        place: v.place,
      }))}
    );
  }
}

module.exports = {
  exec: async () => {
    await insertDatasetsfrom();
    await handleDiary();
  },
  name: '临时脚本',
};
