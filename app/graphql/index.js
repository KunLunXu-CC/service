const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const system = require('../../config/system');
const { requireFiles } = require('../../utils');
const { gql, ApolloServer } = require('apollo-server-koa');

/**
 * 获取结构器并进行合并
 */
function getResolves(){
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
function getTypeDefs(){
  const resolves = requireFiles({
    extname: '.graphql',
    dir: path.resolve(__dirname, './schemas'),
    handler: file => fs.readFileSync(file, 'utf8'),
  });
  return _.values(resolves).join('');
}

/**
 * 上下文配置
 */
function context({req, ctx}){
  return {ctx};
}

/**
 * 错误屏蔽和记录
 */
function formatError(app, error){
  return {message: error.message};
}

module.exports = (app) => {
  const server = new ApolloServer({
    typeDefs: gql`${getTypeDefs()}`,
    resolvers: getResolves(),
    context: context,
    formatError: formatError.bind(null, app)
  });

  server.applyMiddleware({ app, path: system.graphql.path });
}
