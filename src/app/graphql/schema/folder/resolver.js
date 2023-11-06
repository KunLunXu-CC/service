import create from '#service/common/create';
import remove from '#service/common/remove';
import update from '#service/common/update';
import getList from '#service/common/getList';

export default {
  Query: {
    folders: async (parents, args, context) => await getList({
      ...args,
      ctx: context.ctx,
      model: 'Folder',
      // astrictUser: true,
    }),
  },

  Mutation: {
    createFolders: async (parents, args, context) => await create({
      ...args,
      ctx: context.ctx,
      model: 'Folder',
    }),
    removeFolders: async (parents, args, context) => await remove({
      ...args,
      ctx: context.ctx,
      model: 'Folder',
    }),
    updateFolders: async (parents, args, context) => await update({
      ...args,
      ctx: context.ctx,
      model: 'Folder',
    }),
  },
};
