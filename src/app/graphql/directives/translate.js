// 布尔值: isList 状态
const BOOLEAN = {
  FALSE: '0',   // 否
  TRUE: '1',    // 是
};

/**
 * 修饰器: 翻译, 用于数据字典的翻译
 * @param {String Number} code 字典类型(参考 client 端字典常量: DATASETSFROM_CODE)
 * @param {String} saveField 存储的字段(id || value) 默认为 value
 * @param {String} isList 关联的字段是否是列表, 具体取值参考上文中 BOOLEAN 常量, 默认 BOOLEAN.FALSE
 * @example 下面是使用例子
 * Datasetsfrom @translate(code: "0", isList: "1", saveField: "id")
 */
const { findOne, getList } = require('../../service/common');
const { SchemaDirectiveVisitor } = require('graphql-tools') ;

class RelationDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    field.resolve = async (parents, args, context) => {
      // code: 字典类型(数字字符串), isList: 是否是列表
      const { code, isList = BOOLEAN.FALSE, saveField = 'value' } = this.args;
      const { name } = field; // name: 使用修饰器的字段

      // 这里 code 一定是字符串, 但是 parents 则不一定是字符串
      if ([null, void 0].includes(parents[name]) || !code) {
        return null;
      }

      if (isList === BOOLEAN.FALSE) { // 非列表
        const { data } = await findOne({
          ctx: context.ctx,
          model: 'Datasetsfrom',
          search: { [saveField]: parents[name], code: Number(code) },
        });
        return data;
      }  // 列表

      const { list } = await getList({
        ctx: context.ctx,
        model: 'Datasetsfrom',
        search: { [saveField]: parents[name], code: Number(code) },
      });
      return list;
    };
  }
}

module.exports = {
  directive: RelationDirective,
  typeDefs: `directive @translate(
    code: String,
    isList: String,
    saveField: String,
  ) on FIELD_DEFINITION`,
};
