import React from 'react';

import { BasicType, components, createCustomBlock, IBlockData, LogicType } from '@core';

import { merge } from 'lodash';

const { Template, Raw } = components;

export type ICondition = IBlockData<
  {},
  {
    expression: string;
    showTruthyInEdit?: boolean;
  }
>;

export const Condition = createCustomBlock<ICondition>({
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
  render(data, idx, mode) {
    const { expression, showTruthyInEdit } = data.data.value;
    const children = data.children;

    if (mode === 'testing') {
      return showTruthyInEdit ? children[0] : children[1];
    }
    return (
      <Template>
        <Raw>
          {`
          <!-- htmlmin:ignore -->
          {% if ${expression} %}
          <!-- htmlmin:ignore -->
        `}
        </Raw>
        <Template idx={idx}>{children[0]}</Template>
        <Raw>
          {' <!-- htmlmin:ignore --> {% else %} <!-- htmlmin:ignore -->'}
        </Raw>
        <Template idx={idx}>{children[1]}</Template>
        <Raw>
          {' <!-- htmlmin:ignore -->{% endif %}  <!-- htmlmin:ignore -->'}
        </Raw>
      </Template>
    );
  },
});
