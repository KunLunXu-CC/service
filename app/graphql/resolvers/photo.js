const { getList, remove } = require('../../service/common');

module.exports = {
  Query: {
    photos: async (parents, args, context, info) => {
      return await getList({ model: 'Photo', ...args, ctx: context.ctx });
    },
  },

  Mutation: {
    removePhotos: async (parents, args, context, info) => {
      return await remove({
        ...args,
        model: 'Photo',
        ctx: context.ctx,
      });
    },
  }
}
