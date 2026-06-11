import create from '#service/common/create';
import remove from '#service/common/remove';
import update from '#service/common/update';
import getList from '#service/common/getList';

export default {
  Query: {
    botMateSkills: async (parents, args, context) => await getList({
      ...args,
      model: 'BotMateSkill',
      ctx: context.ctx,
    }),
  },

  Mutation: {
    createBotMateSkills: async (parents, args, context) => await create({
      ...args,
      model: 'BotMateSkill',
      ctx: context.ctx,
    }),

    removeBotMateSkills: async (parents, args, context) => await remove({
      ...args,
      model: 'BotMateSkill',
      ctx: context.ctx,
    }),

    updateBotMateSkills: async (parents, args, context) => await update({
      ...args,
      model: 'BotMateSkill',
      ctx: context.ctx,
    }),
  },
};
