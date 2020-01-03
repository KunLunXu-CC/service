const fs = require('fs');
const { getList, create, remove, update } = require('../../service/common');

module.exports = {
  Query: {
    photos: async (parents, args, context, info) => {
      return await getList({ model: 'Photo', ...args, ctx: context.ctx });
    },
  },

  Mutation: {
    removePhotos: async (parents, args, context, info) => {
      return await remove({ model: 'Photo', ...args, ctx: context.ctx });
    },
  }
}
