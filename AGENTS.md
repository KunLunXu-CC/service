# AGENTS.md

## 技术栈

本仓库承载一个 `Node.js` 后端，使用 `ESM` 模块与 `package.json#imports` 路径别名。
主要运行单元由 `PM2` 管理，包括 `HTTP` 应用（`src/app`）、`WebSocket` 服务（`src/ws`）和定时任务（`src/cron`）。
核心技术栈包括:
- `HTTP`：`Koa`、`@koa/router`、`@koa/cors`、`koa-body`。
- `GraphQL`：`apollo-server-koa`、`graphql`、`@graphql-tools/*`、`.gql` `schema`。
- 数据层：`MongoDB`、`mongoose`，并复用现有 `CRUD/helper` 约定。
- 实时与任务：`ws`、`cron`。
- 认证与安全相关：`jsonwebtoken`、`node-rsa`。
- 基础设施与工具：`pm2`、`log4js`、`axios`、`ali-oss`、`sharp`、`nodemailer`、`zx`。
代理行为必须将安全性、正确性和可维护性置于速度之上。

## GraphQL 编写指南

- 新增或修改 `GraphQL` 模块前，先参考 `src/app/graphql/schema` 下现有模块结构，沿用 `typeDef.gql` + `resolver.js` 的组织方式。
- 通用列表、创建、更新、删除优先参考并复用 `src/app/service/common/*`；业务逻辑较多时，再参考 `src/app/service` 下现有业务
- `resolver` 写法参考现有模块，保持薄层：接收 `args`，注入 `context.ctx`，把业务交给 `service`；用户隔离场景参考现有 `astrictUser: true` 用法。
- 查询条件和软删除语义参考 `src/utils/getConditions.js` 与 `src/app/service/common/*`，避免绕过分页、排序、软删除和用户隔离约定。
- 关系字段和权限字段分别参考 `src/app/graphql/directive/relation.js`、`src/app/graphql/directive/auth.js`，优先使用现有 `@relation`、`@auth` 机制。

## Mongo 模型定义指南

- 新增或修改模型前，先参考 `src/mongo/models` 下的现有模型写法，注意默认不要显式指定 `collection`。
- 索引只保留必要的业务唯一索引，写法参考现有 `schema.index({ ... }, { unique: true })`；普通查询索引、自定义索引名或复杂索引只有在需求明确或性能验证后再加。
