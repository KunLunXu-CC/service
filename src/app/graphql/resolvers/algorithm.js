const { getList, create, remove, update  } = require('../../service/common');

module.exports = {
  Query: {
    algorithms: async (parents, args, context) => await getList({
      ...args,
      model: 'Algorithm',
      ctx: context.ctx,
    }),
  },

  Mutation: {
    createAlgorithms: async (parents, args, context) => await create({
      ...args,
      model: 'Algorithm',
      ctx: context.ctx,
    }),

    removeAlgorithms: async (parents, args, context) => await remove({
      ...args,
      model: 'Algorithm',
      ctx: context.ctx,
    }),

    updateAlgorithms: async (parents, args, context) => await update({
      ...args,
      model: 'Algorithm',
      ctx: context.ctx,
    }),
  },
};
