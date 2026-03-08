import create from '#service/common/create';
// import remove from '#service/common/remove';
// import update from '#service/common/update';
import getList from '#service/common/getList';

export default {
  Query: {
    linkHubs: async (parents, args, context) => {
      const { list, pagination } = await getList({
        ...args,
        model: 'LinkHub',
        ctx: context.ctx,
        astrictUser: true,
      });
      console.log('%c [ list ]-15', 'font-size:13px; background:pink; color:#bf2c9f;', list);
      return {
        list,
        pagination,
      };
    },

    // tagsWithArticles: async (parents, args, context) => await tagsWithArticles({
    //   ...args,
    //   ctx: context.ctx,
    // }),
  },

  Mutation: {
    createLinkHub: async (parents, args, context) => await create({
      ...args,
      model: 'LinkHub',
      ctx: context.ctx,
    }),

    // removeTags: async (parents, args, context) => await remove({
    //   ...args,
    //   model: 'Tag',
    //   ctx: context.ctx,
    // }),

    // updateTags: async (parents, args, context) => await update({
    //   ...args,
    //   model: 'Tag',
    //   ctx: context.ctx,
    // }),
  },
};
