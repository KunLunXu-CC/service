import fs from 'fs';
import config from '#config/system';
import { importFiles } from '#utils/fs';
import { ApolloServer } from 'apollo-server-koa';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mapSchema, MapperKind } from '@graphql-tools/utils';

/**
 * 解析 directive(指令)目录
 * @returns {typeDefs: string[], directives: {[指令种类]: fun[]} }
 * typeDefs: 指令类型定义, directives: 指令处理程序
 */
const parseDirective = async () => {
  const typeDefs = []; // 存储 typeDef(类型定义) 列表 => string[]
  const directives = {}; // 存储 directive(指令) 程序  => {[MapperKind.xxx]: fun[]}

  // 1. 读取所有指令文件 { value, fileName, filePath }[]
  const directiveFiles = await importFiles({ dir: new URL('./directive', import.meta.url) });

  // 2. 循环指令文件, 添加 typeDef(类型定义)、添加对应类型的指令函数列表
  directiveFiles.forEach(({ value: { typeDef, ...rest } }) => {
    // 添加类型定义
    typeDefs.push(typeDef);

    // 处理对应种类的指令类型
    Object.entries(rest).forEach(([kind, fun]) => {
      !directives[kind] && (directives[kind] = []);
      directives[kind].push(fun);
    });
  });

  // 3. 返回: 指令类型定义、指令配置
  return { typeDefs, directives };
};

/**
 * 解析 schema 目录
 * @returns {typeDefs: string[], resolvers: object[]} typeDefs: 类型定义, resolvers: 解析器列表
 */
const parseSchema = async () => {
  // 1. 模型位置
  const dir = new URL('./schema', import.meta.url);

  // 2. 读取解析器 object[]
  const resolvers = await importFiles({ dir });

  // 3. 读取类型定义 string[]
  const typeDefs = await importFiles({
    dir,
    extensions: '.gql',
    handler: (filePath) => fs.readFileSync(filePath, 'utf-8'),
  });

  // 4. 返回: 类型定义、解析器列表
  return {
    typeDefs: typeDefs.map(({ value }) => value),
    resolvers: resolvers.map(({ value }) => value),
  };
};

export default async (app) => {
  // 1. 解析模型
  const {
    resolvers,
    typeDefs: typeDefsWithSchema,
  } = await parseSchema();

  // 2. 解析指令
  const {
    directives,
    typeDefs: typeDefsWithDirective,
  } = await parseDirective();

  // 3. 创建可执行模式
  const schema = makeExecutableSchema({
    resolvers,
    typeDefs: [...typeDefsWithDirective, ...typeDefsWithSchema],
  });

  // 4. 处理 mapSchema 参数 => { [MapperKind.xxxx]: () => {} }
  const mapSchemaParams = Object.values(MapperKind)
    .reduce((total, kind) => ({
      ...total,
      [kind]: (conf) => {
        (directives[kind] || []).forEach((fun) => fun(schema, conf));
        return conf;
      },
    }), {});

  // 5. 创建服务
  const server = new ApolloServer({
    context: ({ ctx }) => ({ ctx }),                         // 下上文环境
    schema: mapSchema(schema, mapSchemaParams),              // 使用 mapSchema 处理指令, 返回新的 schema
    // formatError: (error) => ({ message: error.message }), // 格式化错误
  });

  // 6. 启动服务
  await server.start();
  server.applyMiddleware({ app, path: config.graphql.path });
};
