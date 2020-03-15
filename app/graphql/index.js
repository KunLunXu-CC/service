const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const system = require('../../config/system');
const { requireFiles } = require('../../utils');
const { gql, ApolloServer } = require('apollo-server-koa');

/**
 * 获取结构器并进行合并
 */
const getResolves = () => {
  const resolves = requireFiles({
    dir: path.resolve(__dirname, './resolvers'),
    filter: [path.resolve(__dirname, './resolvers/fragment.js')],
  });
  const mergeResolves = _.merge(..._.values(resolves));
  return mergeResolves;
}

/**
 * 获取 typeDefs 并进行合并
 */
const getTypeDefs = () => {
  // 1. 读取所有 typeDefs
  const typeDefs = requireFiles({
    extname: '.graphql',
    dir: path.resolve(__dirname, './schemas'),
    handler: file => fs.readFileSync(file, 'utf8'),
  });

  // 2. 获取所有定义 directive (修饰器)的 typeDefs
  const directiveTypeDefs = requireFiles({
    dir: path.resolve(__dirname, './directives')
  });

  return gql(`
    ${_.values(directiveTypeDefs).map(v => `\n${v.typeDefs || ''}\n`).join('')}
    ${_.values(typeDefs).join('')}
  `);
}

/**
 * 上下文配置
 */
const context = ({req, ctx}) => {
  return {ctx};
}

/**
 * 错误屏蔽和记录
 */
const formatError = (app, error) => {
  return {message: error.message};
}

/**
 * 获取修饰器
 */
const getSchemaDirectives = () => {
  const directives = {};

  _.forIn(
    requireFiles({ dir: path.resolve(__dirname, './directives') }),
    (value, key) => {
      if (!value.directive){return false;}
      directives[key] = value.directive;
    }
  )

  return directives;
}

module.exports = (app) => {
  const server = new ApolloServer({
    context: context,                           // 下上文环境
    typeDefs: getTypeDefs(),                    // 模型设置
    resolvers: getResolves(),                   // 解析器设置
    schemaDirectives: getSchemaDirectives(),    // 修饰器设置
    formatError: formatError.bind(null, app)    // 格式化错误
  });
  server.applyMiddleware({ app, path: system.graphql.path });
}
