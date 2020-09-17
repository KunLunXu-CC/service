/**
 * 修饰器: 关联指定表中的数据
 * @example 下面表示使用修饰符的字段中 creator 字段关联到 User 模型
 * @relation(model: 'User')
 */
const { findOne } = require('../../service/common');
const { SchemaDirectiveVisitor } = require('graphql-tools') ;

class RelationDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    field.resolve = async (parents, args, context, info) => {
      const { model } = this.args;  // model: 关联的模型
      const { name } = field;       // name: 使用修饰器的字段
      if (parents[name] && model){
        const data = await findOne({
          model,
          ctx: context.ctx,
          search: { id: parents[name] },
        });
        return data.data;
      } else {
        return {};
      }
    };
  }
}

module.exports = {
  directive: RelationDirective,
  typeDefs: 'directive @relation( model: String) on FIELD_DEFINITION',
}
