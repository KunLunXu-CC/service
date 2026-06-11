import create from '#service/common/create';
import remove from '#service/common/remove';
import update from '#service/common/update';
import getList from '#service/common/getList';
import sendMessage from '#service/botMate/sendMessage';
import { subscribeBotMateMessageEvents } from '#service/botMate/messageEvent';

export default {
  Query: {
    botMateMessages: async (parents, args, context) => await getList({
      ...args,
      model: 'BotMateMessage',
      ctx: context.ctx,
    }),
  },

  Subscription: {
    botMateMessageEvents: {
      subscribe: subscribeBotMateMessageEvents,
    },
  },

  Mutation: {
    sendBotMateMessage: async (parents, args, context) => await sendMessage({
      ...args,
      ctx: context.ctx,
    }),

    createBotMateMessages: async (parents, args, context) => await create({
      ...args,
      model: 'BotMateMessage',
      ctx: context.ctx,
    }),

    removeBotMateMessages: async (parents, args, context) => await remove({
      ...args,
      model: 'BotMateMessage',
      ctx: context.ctx,
    }),

    updateBotMateMessages: async (parents, args, context) => await update({
      ...args,
      model: 'BotMateMessage',
      ctx: context.ctx,
    }),
  },
};
