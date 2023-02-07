import moment from 'moment';
import config from '#config/system';
import options from '#service/common/options';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import { GraphQLScalarType } from 'graphql';

export default {
  // 上传(文件)
  Upload: GraphQLUpload,

  // Date 类型数据定义(待测试)
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date类型值',
    parseValue (value) {
      // 请求入参值
      return new Date(value);
    },
    serialize (value) {
      // 发起请求后获取到的值
      return moment(value).format('YYYY-MM-DD HH:mm:ss');
    },
    parseLiteral (ast) {
      // 解析请求参数值
      return new Date(ast.value);
    },
  }),

  Query: {
    options: async (parents, args, context) => await options({
      ...args,
      ctx: context.ctx,
    }),

    publicKey: async () => ({
      data: config.publicKey, message: '请求成功!',
    }),
  },
};
