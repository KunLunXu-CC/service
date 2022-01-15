import remove from '#service/common/remove';
import getList from '#service/common/getList';

export default {
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
