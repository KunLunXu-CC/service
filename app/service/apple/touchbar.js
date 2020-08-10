const _ = require('lodash');

const getLatestWeight = async ({ ctx }) => {
  const server = ctx.db.mongo.Diary;
  const [data] = await server.find()
    .skip(0)
    .limit(1)
    .sort({ name: -1 });
  return _.get(data, 'bodyIndex.weight', 0);
};

// 用于 mac touchbar 上信息提示
module.exports = async args => {
  return {
    latestWeight: await getLatestWeight(args),
  };
};
