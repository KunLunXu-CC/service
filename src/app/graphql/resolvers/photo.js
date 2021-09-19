const { getList, remove } = require('../../service/common');

module.exports = {
  Query: {
    photos: async (parents, args, context) => await getList({
      ...args,
      model: 'Photo',
      ctx: context.ctx,
    }),
  },

  Mutation: {
    removePhotos: async (parents, args, context) => await remove({
      ...args,
      model: 'Photo',
      ctx: context.ctx,
    }),
  },
};
