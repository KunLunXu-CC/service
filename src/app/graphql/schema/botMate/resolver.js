import create from '#service/common/create';
import remove from '#service/common/remove';
import update from '#service/common/update';
import getList from '#service/common/getList';

export default {
  Query: {
    botMates: async (parents, args, context) => await getList({
      ...args,
      model: 'BotMate',
      ctx: context.ctx,
    }),
  },

  Mutation: {
    createBotMates: async (parents, args, context) => await create({
      ...args,
      model: 'BotMate',
      ctx: context.ctx,
    }),

    removeBotMates: async (parents, args, context) => await remove({
      ...args,
      model: 'BotMate',
      ctx: context.ctx,
    }),

    updateBotMates: async (parents, args, context) => await update({
      ...args,
      model: 'BotMate',
      ctx: context.ctx,
    }),
  },
};
