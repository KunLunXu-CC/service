import touchbar from '#service/apple/touchbar';

export default {
  Query: {
    appleTouchbar: async (parents, args, context) => await touchbar({
      ...args,
      ctx: context.ctx,
    }),
  },
};
