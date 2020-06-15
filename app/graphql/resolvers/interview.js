const { getList, create, remove, update  } = require('../../service/common');

module.exports = {
  Query: {
    interviews: async (parents, args, context, info) => {
      return await getList({ model: 'Interview', ...args, ctx: context.ctx });
    },
  },

  Mutation: {
    createInterviews: async (parents, args, context, info) => {
      return await create({ model: 'Interview', ...args, ctx: context.ctx });
    },
    removeInterviews: async (parents, args, context, info) => {
      return await remove({
        ...args,
        model: 'Interview',
        ctx: context.ctx,
      });
    },
    updateInterviews: async (parents, args, context, info) => {
      return await update({ model: 'Interview', ...args, ctx: context.ctx });
    },
  },
}
