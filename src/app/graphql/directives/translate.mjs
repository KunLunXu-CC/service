import _ from 'lodash';
import { MapperKind, getDirective } from '@graphql-tools/utils';
import { findOne, getList } from '../../service/common/index.mjs';

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
        console.log('%c [ config ]', 'font-size:13px; background:pink; color:#bf2c9f;', config);
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
