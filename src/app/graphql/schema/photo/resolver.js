import remove from '#service/common/remove';
import getList from '#service/common/getList';
import upload from '#service/photo/upload';

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

    uploadPhotos: async (parent, args, context) => await upload({
      ...args,
      ctx: context.ctx,
    }),
  },
};
