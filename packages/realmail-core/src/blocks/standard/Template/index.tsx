import { IBlockData } from '@core/typings';
import { BasicType } from '@core/constants';
import { createBlock } from '@core/utils/createBlock';
import { merge } from 'lodash';
import React from 'react';
import { BlockRenderer } from '@core/components';

export type ITemplate = IBlockData<
  {},
  {
    idx?: string | null;
    className?: string;
  }
>;

export const Template = createBlock<ITemplate>({
  name: 'Template',
  type: BasicType.TEMPLATE,
  create: payload => {
    const defaultData: ITemplate = {
      type: BasicType.TEMPLATE,
      data: {
        value: {
          idx: '',
          className: '',
        },
      },
      attributes: {},
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [],
  render(params) {
    const { data } = params;
    return (
      <>
        {`
          ${data.children.map((child, index) => (
            <BlockRenderer key={index} {...params} data={child} />
          ))}
        `}
      </>
    );
  },
});
