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

## GraphQL 与 Service 指导

- `GraphQL` `schema` 按业务模块放在 `src/app/graphql/schema/<module>/`，通常由 `typeDef.gql` 和 `resolver.js` 组成；新增模块时应沿用这一结构。
- `typeDef.gql` 负责声明 `GraphQL` 类型、输入、`Query` 和 `Mutation`；除非需求明确要求，避免破坏已有字段、返回结构或 `resolver` 行为。
- `Resolver` 应保持薄层职责：接收 `parents`、`args`、`context`，把 `args` 与 `context.ctx` 传给 `service`，避免在 `resolver` 中堆叠复杂业务逻辑。
- 通用 `CRUD` 优先复用 `src/app/service/common/*`，包括 `create`、`remove`、`update`、`getList`、`findOne`；只有通用 `helper` 无法表达业务规则时，才新增或调用业务 `service`。
- 通用列表/写入返回结构通常为 `{ list, change, pagination, message }`；新增 `GraphQL` 返回类型时应优先保持这一响应形态，便于前端和既有 `resolver` 复用。
- 涉及用户数据隔离的查询、更新、删除，应评估是否需要传入 `astrictUser: true`，并确认 `ctx.state.user.id` 的使用不会绕过权限边界。
- 认证和角色信息来自 `Koa` `ctx.state.user` 与 `ctx.state.role`；不得在 `resolver` 或 `service` 中伪造、弱化或跳过既有认证/角色校验。
- 关系字段优先使用现有 `@relation` `directive`；字段级权限优先使用现有 `@auth` `directive`，避免重复实现关系查询或权限判断。
- `DB` 查询条件应通过现有 `getConditions` 和 `common service` 约定处理，避免直接拼接不可信输入或绕过软删除、分页、排序等既有约定。
- `Service` 层应承载业务流程、数据库写入、外部服务调用和日志；涉及 `OSS`、邮件、`Webhook`、脚本执行等边界能力时，必须控制输入、错误日志和敏感信息输出。

## Mongo 模型定义指导

- `Mongo` 模型定义集中放在 `src/mongo/models`，每个文件默认导出一个 `mongoose.Schema`；`src/mongo/index.js` 会按文件名注册模型名，新增模型文件名应与 `service/resolver` 中使用的 `mongoose.model('<Name>')` 名称保持一致。
- 模型文件应沿用现有写法：`import mongoose from 'mongoose'`、`const { Schema } = mongoose`、必要时使用 `const { ObjectId } = Schema.Types`，并在文件末尾 `export default schema`。
- 新增业务模型通常应包含公共审计与软删除字段：`creator`、`creationTime`、`updater`、`updateTime`、`isDelete`；`isDelete` 默认值应使用 `BOOLEAN.FALSE`，以配合 `getConditions` 和 `common service` 的默认过滤逻辑。
- 关联字段应存储 `ObjectId` 或 `ObjectId` 数组，并与 `GraphQL` `@relation` 字段保持命名一致；不要在 `schema` 中引入与现有 `@relation` 机制冲突的重复解析逻辑。
- 必填、默认值、枚举状态等约束应优先复用 `#config/constants` 中的常量；新增常量前先确认是否已有可复用定义。
- 唯一性约束应考虑软删除语义，优先使用包含 `isDelete` 的复合唯一索引；可为空的唯一字段应评估是否需要 `partialFilterExpression`，避免多个空值导致写入失败。
- 修改已有字段类型、索引、必填规则或默认值属于数据兼容性变更，必须评估历史数据、迁移成本、`GraphQL` `schema` 与 `service` 写路径影响。
- 不要绕过 `common service` 直接物理删除数据；既有删除语义以写入 `isDelete` 的软删除为主，除非需求明确要求并说明数据风险。
- 新增或修改模型字段时，应同步检查对应 `GraphQL` `typeDef.gql`、`resolver/service` 入参、`getConditions` 查询能力和前端依赖的返回字段。
