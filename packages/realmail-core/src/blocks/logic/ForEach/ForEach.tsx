import React from 'react';

import { merge } from 'lodash';
import { components, createCustomBlock, IBlockData, LogicType } from '@core';
const { Template, Raw } = components;

export type IForEach = IBlockData<
  {},
  {
    source: string;
    item: string;
    limit?: number;
    extra?: string;
  }
>;

export const ForEach = createCustomBlock<IForEach>({
  name: 'ForEach',
  type: LogicType.FOR_EACH,
  validParentType: [],
  create(payload) {
    const defaultData: IForEach = {
      type: LogicType.FOR_EACH,
      data: {
        value: {
          source: '',
          item: '',
        },
      },
      attributes: {},
      children: [],
    };
    return merge(defaultData, payload);
  },
  render(data, idx) {
    const { source, item, limit, extra } = data.data.value;
    return (
      <Template>
        <Raw>
          {`
        <!-- htmlmin:ignore -->
        {% for ${item} in ${source} ${limit ? `limit:${limit}` : ''}  ${extra ? extra : ''
            } %}
        <!-- htmlmin:ignore -->
        `}
        </Raw>
        <Template idx={idx}>{data.children}</Template>
        <Raw>
          {' <!-- htmlmin:ignore -->{% endfor %}  <!-- htmlmin:ignore -->'}
        </Raw>
      </Template>
    );
  },
});
