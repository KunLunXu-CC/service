/**
 * 权限修饰器: 为字段获取对象添加 resolve(解析器)
 * @param {} requires 需要的权限
 * @example
 * @auth(requires: ADMIN) 说明: requires 为当前字段必须角色
 */
const _ = require('lodash');
const { defaultFieldResolver } = require('graphql') ;
const { ROLE_TYPE } = require('../../../config/consts');
const { SchemaDirectiveVisitor } = require('graphql-tools') ;

class AuthDirective extends SchemaDirectiveVisitor {
  // 对对象类型进行访问控制
  visitObject(type) {
    this.ensureFieldsWrapped(type);
    type._requiredAuthRole = this.args.requires;
  }

  // 对具体字段进行访问控制
  // field 当前字段, details 提供父级相关方法
  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType);
    field._requiredAuthRole = this.args.requires;
  }

  // 处理函数
  ensureFieldsWrapped(objectType) {
    // 进行标记, 避免重复包裹
    if (objectType._authFieldsWrapped) return false;
    objectType._authFieldsWrapped = true;

    // 获取所有字段
    const fields = objectType.getFields();

    // 遍历所有字段, 处理 resolve (解析器)对需要进行权限控制的字段进行控制
    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;

      field.resolve = async  (...args) => {
        // 获取当前字段所需的必要角色
        const requiredRole =
          field._requiredAuthRole ||
          objectType._requiredAuthRole;

        // 1. 必要角色不存在则表示当前字段无需进行权限控制则原样返回
        if (!requiredRole) {
          return resolve.apply(this, args);
        }

        // 2. 必要角色存在则对当前角色进行校验
        const currentRoleType = _.get(args, '[2].ctx.state.role.type');
        if (currentRoleType !== ROLE_TYPE[this.args.requires]){
          throw new Error(`Not Authorized`);
        }

        return resolve.apply(this, args);
      };
    });
  }
}

module.exports = {
  directive: AuthDirective,
  typeDefs: `
  directive @auth(
    requires: RoleType = ADMIN,
  ) on OBJECT | FIELD_DEFINITION
  `,
}
