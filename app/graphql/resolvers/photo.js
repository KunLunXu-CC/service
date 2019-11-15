const fs = require('fs');
const { creator, updater } = require('./fragment');
const removePhotos = require('../../service/photo/remove');
const { getList, create, remove, update } = require('../../service/common');

module.exports = {
  Query: {
    photos: async (parents, args, context, info) => {
      return await getList({ model: 'Photo', ...args, ctx: context.ctx });
    },
  },

  Mutation: {
    removePhotos: async (parents, args, context, info) => {
      // 1. 删除(假删)数据库记录 并返回完整的数据给客户端
      const data = await remove({ model: 'Photo', ...args, ctx: context.ctx });
      // 2. 处理图片(修改对象存储图片名、修改对应数据记录中的数据(url))
      removePhotos({ data: data.change, ctx: context.ctx });
      return data;
    },
  },

  Photo: {
    creator,
    updater,
  }
}
