import _ from 'lodash';
import findOne from '#service/common/findOne';
import getList from '#service/common/getList';
import { MapperKind, getDirective } from '@graphql-tools/utils';

const DIRECTIVE_NAME = 'relation';

/**
 * 通过 ID(IDS) 关联到指定模型
 *
 * @param {string} model mongo 模型, 默认值指令绑定的对应类型
 */
export default {
  [MapperKind.OBJECT_FIELD]: (schema, config) => {
    // deprecatedDirective 指令参数
    const deprecatedDirective = getDirective(
      schema,
      config,
      DIRECTIVE_NAME,
    )?.[0];

    if (deprecatedDirective) {
      const { model = config.type } = deprecatedDirective;
      const name = config.astNode.name.value; // 指令绑定的字段名

      config.resolve = async (parents) => {
        const value = parents[name];

        // 1. 空值处理
        if (!value) {
          return {};
        }

        // 2. 根据父级对应数据类型来进行来处理
        const res = _.isArray(value)
          ? await getList({
            search: { ids: value },
            model: String(model).replace(/(\[|\])/g, ''),
          })
          : await findOne({
            search: { id: value },
            model: String(model).replace(/(\[|\])/g, ''),
          });

        return res?.data ?? res?.list;
      };
    }
  },
  typeDef: `directive @${DIRECTIVE_NAME}(model: String) on FIELD_DEFINITION`,
};
