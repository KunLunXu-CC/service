import { ROLE_TYPE } from '#config/constants';
import { MapperKind, getDirective } from '@graphql-tools/utils';

const DIRECTIVE_NAME = 'auth';

// 指令处理程序
const directive = (schema, config) => {
  // deprecatedDirective 指令参数
  const deprecatedDirective = getDirective(
    schema,
    config,
    DIRECTIVE_NAME,
  )?.[0];

  if (deprecatedDirective) {
    const defaultResolve = config.resolve;

    config.resolve = async (params, args, context, info) => {
      const { type: currentRoleType } = context.ctx.state.role;
      const { requires } = deprecatedDirective;
      const { value: name } = config.astNode.name;

      // 用户角色校验: 用户数据从 koa ctx.state 中获取
      if (currentRoleType !== ROLE_TYPE[requires]) {
        return null;
      }

      // 有默认指令则使用默认指令, 没有则从 params 中取值
      return defaultResolve
        ? await defaultResolve(params, args, context, info)
        : params?.[name];
    };
  }
};

export default {
  [MapperKind.OBJECT_FIELD]: directive,
  [MapperKind.QUERY_ROOT_FIELD]: directive,
  [MapperKind.MUTATION_ROOT_FIELD]: directive,
  typeDef: `directive @${DIRECTIVE_NAME}(requires: RoleType = ADMIN) on FIELD_DEFINITION`,
};
