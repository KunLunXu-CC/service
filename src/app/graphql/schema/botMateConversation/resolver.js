import create from '#service/common/create';
import remove from '#service/common/remove';
import update from '#service/common/update';
import getList from '#service/common/getList';

export default {
  Query: {
    botMateConversations: async (parents, args, context) => await getList({
      ...args,
      model: 'BotMateConversation',
      ctx: context.ctx,
    }),
  },

  Mutation: {
    createBotMateConversations: async (parents, args, context) => await create({
      ...args,
      model: 'BotMateConversation',
      ctx: context.ctx,
    }),

    removeBotMateConversations: async (parents, args, context) => await remove({
      ...args,
      model: 'BotMateConversation',
      ctx: context.ctx,
    }),

    updateBotMateConversations: async (parents, args, context) => await update({
      ...args,
      model: 'BotMateConversation',
      ctx: context.ctx,
    }),
  },
};
