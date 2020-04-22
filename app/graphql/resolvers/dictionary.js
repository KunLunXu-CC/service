const { findOne, getList, create, remove, update } = require('../../service/common');

module.exports = {
  Dictionary: {
    parent: async (parents, args, context, info) => {
      if (parents.parent){
        const data = await findOne({
          model: 'Dictionary',
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
        model: 'Dictionary',
      });
    },
  },

  Mutation: {
    createDictionaries: async (parents, args, context, info) => {
      return await create({
        ...args,
        ctx: context.ctx,
        model: 'Dictionary',
      });
    },
    removeDictionaries: async (parents, args, context, info) => {
      return await remove({
        ...args,
        ctx: context.ctx,
        model: 'Dictionary',
      });
    },
    updateDictionaries: async (parents, args, context, info) => {
      return await update({
        ...args,
        ctx: context.ctx,
        model: 'Dictionary',
      });
    },
  }
};
