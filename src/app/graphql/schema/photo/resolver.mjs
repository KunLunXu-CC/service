import { getList, remove } from '../../../service/common/index.mjs';

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
