import React from 'react';

import { merge } from 'lodash';
import { LogicType } from '@core/constants';
import { Template, Raw, BlockRenderer } from '@core/components';
import { IBlockData } from '@core/typings';
import { createBlock } from '@core/utils/createBlock';

export type IForEach = IBlockData<
  {},
  {
    source: string;
    item: string;
    limit?: number;
    extra?: string;
    mockQuantity?: number;
  }
>;

export const ForEach = createBlock<IForEach>({
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
          mockQuantity: 1,
        },
      },
      attributes: {},
      children: [],
    };
    return merge(defaultData, payload);
  },
  render(params) {
    const { data, children, mode } = params;
    const { source, item, limit, extra, mockQuantity = 1 } = data.data.value;

    if (mode === 'testing') {
      return (
        <>
          {new Array(mockQuantity).fill(true).map((_, index) => {
            return (
              <React.Fragment key={index}>
                {children ||
                  data.children.map((child, index) => (
                    <BlockRenderer key={index} {...params} data={child} />
                  ))}
              </React.Fragment>
            );
          })}
        </>
      );
    }

    return (
      <>
        <Raw>
          {`
          <!-- htmlmin:ignore -->
          {% for ${item} in ${source} ${limit ? `limit:${limit}` : ''}  ${
            extra ? extra : ''
          } %}
          <!-- htmlmin:ignore -->
          `}
        </Raw>
        {children ||
          data.children.map((child, index) => (
            <BlockRenderer key={index} {...params} data={child} />
          ))}
        <Raw>{' <!-- htmlmin:ignore -->{% endfor %}  <!-- htmlmin:ignore -->'}</Raw>
      </>
    );
  },
});
