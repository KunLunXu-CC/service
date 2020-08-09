const touchbar = require('../../service/apple/touchbar');

module.exports = {
  Query: {
    appleTouchbar: async (parents, args, context, info) => {
      return await touchbar({ ...args, ctx: context.ctx });
    },
  },
}
