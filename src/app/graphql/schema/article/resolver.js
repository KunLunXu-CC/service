import create from '#service/common/create';
import remove from '#service/common/remove';
import update from '#service/common/update';
import getList from '#service/common/getList';
import removeByPayload from '#src/app/service/photo/removeByPayload';

import { ARTICLE_STATUS } from '#config/constants';

export default {
  Query: {
    articles: async (parents, args, context) => await getList({
      ...args,
      model: 'Article',
      ctx: context.ctx,
      // astrictUser: true,
    }),
  },

  Mutation: {
    createArticles: async (parents, args, context) => await create({
      ...args,
      model: 'Article',
      ctx: context.ctx,
    }),

    removeArticles: async (parents, args, context) => {
      const data = await remove({
        ...args,
        model: 'Article',
        ctx: context.ctx,
        astrictUser: true,
      });
      removeByPayload({
        ctx: context.ctx,
        payload: data.change.map((v) => v.id),
      });
      return data;
    },

    updateArticles: async (parents, args, context) => await update({
      ...args,
      model: 'Article',
      ctx: context.ctx,
      astrictUser: true,
    }),

    // 发布
    releaseArticles: async (parents, args, context) => await update({
      ...args,
      model: 'Article',
      ctx: context.ctx,
      astrictUser: true,
      body: { status: ARTICLE_STATUS.RELEASE },
    }),

    // 撤销
    revokeArticles: async (parents, args, context) => await update({
      ...args,
      model: 'Article',
      ctx: context.ctx,
      astrictUser: true,
      body: { status: ARTICLE_STATUS.SAVE },
    }),
  },
};
