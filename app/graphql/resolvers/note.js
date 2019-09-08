const { getList, create, remove, update } = require('../../service/common');
const { creator, updater } = require('./fragment');

module.exports = {
  Query: {
    notes: async (parents, args, context, info) => {
      return await getList({ model: 'Note', ...args, ctx: context.ctx });
    },
  },

  Mutation: {
    createNotes: async (parents, args, context, info) => {
      return await create({ model: 'Note', ...args, ctx: context.ctx });
    },
    removeNotes: async (parents, args, context, info) => {
      return await remove({ model: 'Note', ...args, ctx: context.ctx });
    },
    updateNotes: async (parents, args, context, info) => {
      return await update({ model: 'Note', ...args, ctx: context.ctx });
    },
  },
  
  Note: {
    creator, 
    updater,
    tags: async (parents, args, context, info) => {
      if (parents.tags){
        const data = await getList({
          model: 'Tag',
          ctx: context.ctx, 
          search: { ids: parents.tags }
        });
        return data.list;
      } else {
        return [];
      }
    },
  }
}
