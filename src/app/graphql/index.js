import fs from 'fs';
import config from '#config/system';
import { ApolloServer } from 'apollo-server-koa';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mapSchema, MapperKind } from '@graphql-tools/utils';

/**
 * 解析 directives(指令)目录
 * @returns { typeDefs: 类型定义, directives: 指令处理程序 }
 */
const parseDirectives = async () => {
  // 指令中 typeDef 列表
  const typeDefs = [];

  // 指令处理程序: { [MapperKind.xxxx]: [Function] }
  const directives = Object.values(MapperKind).reduce((total, key) => ({
    ...total,
    [key]: [],
  }), {});

  // 遍历所以文件
  const files = fs.readdirSync(new URL('./directives', import.meta.url));

  for (const file of files) {
    const path = new URL(`./directives/${file}`, import.meta.url);
    const { default: { typeDef, ...rest } } = await import(path);

    typeDefs.push(typeDef);
    Object.entries(rest).forEach(([field, fun]) => {
      directives[field] && directives[field].push(fun);
    });
  }

  return { typeDefs, directives };
};

/**
 * 解析 schema 目录
 * @returns { typeDefs: 类型定义, resolvers: 解析器列表 }
 */
const parseSchema = async () => {
  const resolvers = [];
  const typeDefs = [];
  const dirs = fs.readdirSync(new URL('./schema', import.meta.url));

  for (const dir of dirs) {
    const resolverPath = new URL(`./schema/${dir}/resolver.js`, import.meta.url);
    const typeDefPath = new URL(`./schema/${dir}/typeDef.gql`, import.meta.url);
    const { default: resolver } = await import(resolverPath);
    const typeDef = fs.readFileSync(typeDefPath, 'utf-8');
    resolvers.push(resolver);
    typeDefs.push(typeDef);
  }

  return { typeDefs, resolvers };
};

export default async (app) => {
  const {
    resolvers,
    typeDefs: typeDefsWithSchema,
  } = await parseSchema();

  const {
    directives,
    typeDefs: typeDefsWithDirective,
  } = await parseDirectives();

  // 1. 创建可执行模式
  const schema = makeExecutableSchema({
    resolvers,
    typeDefs: [...typeDefsWithDirective, ...typeDefsWithSchema],
  });

  // 2. 处理 mapSchema: 参数: { [MapperKind.xxxx]: () => {} }
  const mapSchemaParams = Object.values(MapperKind).reduce((total, field) => ({
    ...total,
    [field]: (conf) => {
      directives[field].forEach((fun) => fun(schema, conf));
      return conf;
    },
  }), []);

  // 3. 创建服务
  const server = new ApolloServer({
    context: ({ ctx }) => ({ ctx }),                         // 下上文环境
    schema: mapSchema(schema, mapSchemaParams),              // 使用 mapSchema 处理指令, 返回新的 schema
    // formatError: (error) => ({ message: error.message }), // 格式化错误
  });

  // 4. 启动服务
  await server.start();
  server.applyMiddleware({ app, path: config.graphql.path });
};
