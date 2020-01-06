const { getList, create, remove, update } = require('../../service/common');

module.exports = {
  Query: {
    diarys: async (parents, args, context, info) => {
      return await getList({ model: 'Diary', ...args, ctx: context.ctx });
    },
  },
}
