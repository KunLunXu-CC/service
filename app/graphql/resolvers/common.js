const { GraphQLScalarType } = require('graphql');
const commonServer = require('../../service/common');
const { RESCODE } = require('../../../config/consts');
const { publicKey } = require('../../../config/system');

module.exports = {
  Query: {
    options: async ( parents, args, context, info ) => {
      return await commonServer.options({ ...args, ctx: context.ctx });
    },
    publicKey: async ( parents, args, context, info ) => {
      return { data: publicKey, rescode: RESCODE.SUCCESS, message: '请求成功!' };
    }
  },

  // Date 类型数据定义(待测试)
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date类型值',
    parseValue(value) {
      // 请求入参值
      return new Date(value);
    },
    serialize(value) {
      // 发起请求后获取到的值
      return new Date(value);
    },
    parseLiteral(ast) {
      // 解析请求参数值
      return new Date(ast.value);
    },
  }),
};
