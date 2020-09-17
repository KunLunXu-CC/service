// 布尔值: isList 状态
const BOOLEAN = {
  FALSE: '0',   // 否
  TRUE: '1',    // 是
};

/**
 * 修饰器: 关联指定表中的数据
 * @param {String} model 关联的 mongo 模型名
 * @param {String} isList 关联的字段是否是列表, 具体取值参考上文中 BOOLEAN 常量
 * @example 下面表示使用修饰符的字段中 creator 字段关联到 User 模型
 * @relation(model: "User", isList: "1")
 */
const { findOne, getList } = require('../../service/common');
const { SchemaDirectiveVisitor } = require('graphql-tools') ;

class RelationDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    field.resolve = async (parents, args, context, info) => {
      // model: 关联的模型, isList: 是否是列表
      const { model, isList = BOOLEAN.FALSE } = this.args;
      const { name } = field; // name: 使用修饰器的字段
      if (!parents[name] || !model) {return null};

      if (isList === BOOLEAN.FALSE) { // 非列表
        const { data } = await findOne({
          model,
          ctx: context.ctx,
          search:  { id: parents[name] },
        });
        return data;
      } else { // 列表
        const { list } = await getList({
          model,
          ctx: context.ctx,
          search:  { ids: parents[name] },
        });
        return list;
      }
    };
  }
}

module.exports = {
  directive: RelationDirective,
  typeDefs: `directive @relation(
    model: String,
    isList: String,
  ) on FIELD_DEFINITION`,
}
