import getList from '#service/common/getList';

export default {
  Query: {
    getAiChats: async (parents, args, context) => await getList({
      ...args,
      model: 'AiChat',
      ctx: context.ctx,
    }),
  },

  Mutation: {

  },
};
