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
    dictionaries: async (parents, args, context, info) => {
      return await getList({
        ...args,
        ctx: context.ctx,
        model: 'Datasetsfrom',
      });
    },
  },

  Mutation: {
    createDictionaries: async (parents, args, context, info) => {
      return await create({
        ...args,
        ctx: context.ctx,
        model: 'Datasetsfrom',
      });
    },
    removeDictionaries: async (parents, args, context, info) => {
      return await remove({
        ...args,
        ctx: context.ctx,
        model: 'Datasetsfrom',
      });
    },
    updateDictionaries: async (parents, args, context, info) => {
      return await update({
        ...args,
        ctx: context.ctx,
        model: 'Datasetsfrom',
      });
    },
  }
};
