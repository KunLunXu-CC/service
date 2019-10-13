const fs = require('fs');
const {getList, create, remove, update } = require('../../service/common');
const { creator, updater } = require('./fragment');

module.exports = {
  Query: {

  },

  Mutation: {
    removePhotos: async (parents, args, context, info) => {
      // return await remove({ model: 'Tag', ...args, ctx: context.ctx });
      return {};
    },
  },

  Photo: {
    creator,
    updater,
  }
}
