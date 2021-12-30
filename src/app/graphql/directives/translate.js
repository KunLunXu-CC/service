import _ from 'lodash';
import getList from '#service/common/getList';
import findOne from '#service/common/findOne';
import { MapperKind, getDirective } from '@graphql-tools/utils';

const DIRECTIVE_NAME = 'translate';

export default {
  [MapperKind.OBJECT_FIELD]: (schema, config) => {
    // deprecatedDirective 指令参数
    const deprecatedDirective = getDirective(
      schema,
      config,
      DIRECTIVE_NAME,
    )?.[0];

    if (deprecatedDirective) {
      const { code, saveField = 'value' } = deprecatedDirective;
      const name = config.astNode.name.value; // 指令绑定的字段名

      config.resolve = async (parents) => {
        const value = parents[name];

        // 1. 空值处理
        if (!value) {
          return {};
        }

        // 2. 根据父级对应数据类型来进行来处理
        const requestFun = _.isArray(value) ? getList : findOne;
        const res = await requestFun({
          model: 'Datasetsfrom',
          search: { [saveField]: value, code: Number(code) },
        });

        return res?.data ?? res?.list;
      };
    }
  },
  typeDef: `directive @${DIRECTIVE_NAME}(code: String, saveField: String) on FIELD_DEFINITION`,
};
