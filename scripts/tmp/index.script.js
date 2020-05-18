// 临时脚本
const mongo = require('../../utils/mongo');
const dbData = require('./db.json');
const { STATUS } = require('../../config/consts');

// 插入字典数据
const insertDatasetsfrom = async db => {
  const admin = await db.User.findOne({
    account: 'admin',
    status: { $ne: STATUS.DELETE },
  });
  await db.Datasetsfrom.insertMany(dbData.map(v => ({
    ...v,
    creator: admin.id,
    updater: admin.id,
  })));
  console.log('------ 插入字典数据成功 --------');
};

// 处理日志数据
const handleDiary = async db => {
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
  console.log('------ 处理日志数据成功 --------');
}

module.exports = {
  exec: async () => {
    const db = mongo();
    await insertDatasetsfrom(db);
    await handleDiary(db);
  },
  name: '临时脚本',
};
