const { getList, create, remove, update } = require('../../service/common');

module.exports = {
  Query: {
    datasetsfroms: async (parents, args, context) => await getList({
      ...args,
      ctx: context.ctx,
      model: 'Datasetsfrom',
    }),
  },

  Mutation: {
    createDatasetsfroms: async (parents, args, context) => await create({
      ...args,
      ctx: context.ctx,
      model: 'Datasetsfrom',
    }),
    removeDatasetsfroms: async (parents, args, context) => await remove({
      ...args,
      ctx: context.ctx,
      model: 'Datasetsfrom',
    }),
    updateDatasetsfroms: async (parents, args, context) => await update({
      ...args,
      ctx: context.ctx,
      model: 'Datasetsfrom',
    }),
  },
};
