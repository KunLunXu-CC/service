const touchbar = require('../../service/apple/touchbar');

module.exports = {
  Query: {
    appleTouchbar: async (parents, args, context) => await touchbar({
      ...args,
      ctx: context.ctx,
    }),
  },
};
