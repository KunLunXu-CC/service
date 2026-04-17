import create from '#service/common/create';
import remove from '#service/common/remove';
import update from '#service/common/update';
import getList from '#service/common/getList';

const MODEL = 'Wallpaper';

export default {
  Query: {
    wallpapers: async (parents, args, context) => await getList({
      ...args,
      model: MODEL,
      ctx: context.ctx,
    }),
  },

  Mutation: {
    createWallpapers: async (parents, args, context) => await create({
      ...args,
      model: MODEL,
      ctx: context.ctx,
    }),

    removeWallpapers: async (parents, args, context) => await remove({
      ...args,
      model: MODEL,
      ctx: context.ctx,
    }),

    updateWallpapers: async (parents, args, context) => await update({
      ...args,
      model: MODEL,
      ctx: context.ctx,
    }),
  },
};
