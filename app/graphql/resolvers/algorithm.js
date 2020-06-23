const { getList, create, remove, update  } = require('../../service/common');

module.exports = {
  Query: {
    algorithms: async (parents, args, context, info) => {
      return await getList({ model: 'Algorithm', ...args, ctx: context.ctx });
    },
  },

  Mutation: {
    createAlgorithms: async (parents, args, context, info) => {
      return await create({ model: 'Algorithm', ...args, ctx: context.ctx });
    },
    removeAlgorithms: async (parents, args, context, info) => {
      return await remove({
        ...args,
        model: 'Algorithm',
        ctx: context.ctx,
      });
    },
    updateAlgorithms: async (parents, args, context, info) => {
      return await update({ model: 'Algorithm', ...args, ctx: context.ctx });
    },
  },
}
