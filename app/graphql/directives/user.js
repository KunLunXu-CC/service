/**
 * 用户修饰器: 为字段添加 resolve(解析器)
 * @example
 * @user(key: "creator") 说明: 在数据中的 key 值
 */
const _ = require('lodash');
const { findOne } = require('../../service/common');
const { SchemaDirectiveVisitor } = require('graphql-tools') ;

class UserDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    field.resolve = async (parents, args, context, info) => {
      // 使用修饰器时传入的 key, 表示用户字段所在的 key
      const { key } = this.args;
      if (parents[key]){
        const data = await findOne({
          model: 'User',
          ctx: context.ctx,
          search: { id: parents[key] },
        });
        return data.data;
      } else {
        return {};
      }
    };
  }
}

module.exports = {
  directive: UserDirective,
  typeDefs: 'directive @user(key: String) on FIELD_DEFINITION',
}
