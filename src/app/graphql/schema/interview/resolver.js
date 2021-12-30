import create from '#service/common/create';
import remove from '#service/common/remove';
import update from '#service/common/update';
import getList from '#service/common/getList';

export default {
  Query: {
    interviews: async (parents, args, context) => await getList({
      ...args,
      ctx: context.ctx,
      model: 'Interview',
    }),
  },

  Mutation: {
    createInterviews: async (parents, args, context) => await create({
      ...args,
      ctx: context.ctx,
      model: 'Interview',
    }),

    removeInterviews: async (parents, args, context) => await remove({
      ...args,
      ctx: context.ctx,
      model: 'Interview',
    }),
    updateInterviews: async (parents, args, context) => await update({
      ...args,
      ctx: context.ctx,
      model: 'Interview',
    }),
  },
};
