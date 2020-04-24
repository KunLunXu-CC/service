const { findOne, getList, create, remove, update } = require('../../service/common');

module.exports = {
  Datasetsfrom: {
    parent: async (parents, args, context, info) => {
      if (parents.parent){
        const data = await findOne({
          model: 'Datasetsfrom',
          search: { id: parents.parent },
          ctx: context.ctx
        });
        return data.data;
      } else {
        return {};
      }
    },
  },

  Query: {
    datasetsfroms: async (parents, args, context, info) => {
      return await getList({
        ...args,
        ctx: context.ctx,
        model: 'Datasetsfrom',
      });
    },
  },

  Mutation: {
    createDatasetsfroms: async (parents, args, context, info) => {
      return await create({
        ...args,
        ctx: context.ctx,
        model: 'Datasetsfrom',
      });
    },
    removeDatasetsfroms: async (parents, args, context, info) => {
      return await remove({
        ...args,
        ctx: context.ctx,
        model: 'Datasetsfrom',
      });
    },
    updateDatasetsfroms: async (parents, args, context, info) => {
      return await update({
        ...args,
        ctx: context.ctx,
        model: 'Datasetsfrom',
      });
    },
  }
};
