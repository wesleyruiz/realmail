import React from 'react';

import { LogicType } from '@core/constants';

import { merge } from 'lodash';
import { Raw } from '@core/components';
import { IBlockData } from '@core/typings';
import { createBlock } from '@core/utils/createBlock';

export type ICondition = IBlockData<
  {},
  {
    expression: string;
    showTruthyInEdit?: boolean;
  }
>;

export const Condition = createBlock<ICondition>({
  name: 'Condition',
  type: LogicType.CONDITION,
  validParentType: [],
  create(payload) {
    const defaultData: ICondition = {
      type: LogicType.CONDITION,
      data: {
        value: {
          expression: '',
          showTruthyInEdit: true,
        },
      },
      attributes: {},
      children: [],
    };
    return merge(defaultData, payload);
  },
  render(params) {
    const { data, mode, children: jsxChildren } = params;
    const { expression, showTruthyInEdit = true } = data.data.value;
    const children = Array.isArray(jsxChildren) ? jsxChildren : data.children;
    if (mode === 'testing') {
      return showTruthyInEdit ? children[0] : children[1];
    }
    return (
      <>
        <Raw>
          {`
          <!-- htmlmin:ignore -->
          {% if ${expression} %}
          <!-- htmlmin:ignore -->
        `}
        </Raw>
        {children[0]}
        <Raw>{' <!-- htmlmin:ignore --> {% else %} <!-- htmlmin:ignore -->'}</Raw>
        {children[1]}
        <Raw>{' <!-- htmlmin:ignore -->{% endif %}  <!-- htmlmin:ignore -->'}</Raw>
      </>
    );
  },
});
