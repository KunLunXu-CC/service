import create from '#service/common/create';
import update from '#service/common/update';
import remove from '#service/common/remove';
import getList from '#service/common/getList';

export default {
  Query: {
    aiChats: async (parents, args, context) => await getList({
      ...args,
      model: 'AiChat',
      ctx: context.ctx,
    }),
  },

  Mutation: {
    createAiChats: async (parents, args, context) => await create({
      ...args,
      model: 'AiChat',
      ctx: context.ctx,
    }),

    removeAiChats: async (parents, args, context) => await remove({
      ...args,
      model: 'AiChat',
      ctx: context.ctx,
    }),

    updateAiChats: async (parents, args, context) => await update({
      ...args,
      model: 'AiChat',
      ctx: context.ctx,
    }),
  },
};
