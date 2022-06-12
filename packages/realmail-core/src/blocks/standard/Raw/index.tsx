import { IBlockData } from '@core/typings';
import { BasicType } from '@core/constants';
import { createBlock } from '@core/utils/createBlock';
import { merge } from 'lodash';
import React from 'react';
import { BasicBlock } from '@core/components/BasicBlock';

export type IRaw = IBlockData<{}>;

export const Raw = createBlock<IRaw>({
  name: 'Raw',
  type: BasicType.RAW,
  create: payload => {
    const defaultData: IRaw = {
      type: BasicType.RAW,
      data: {
        value: {
          content: '<% if (user) { %>',
        },
      },
      attributes: {},
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [
    BasicType.PAGE,
    BasicType.WRAPPER,
    BasicType.SECTION,
    BasicType.GROUP,
    BasicType.COLUMN,
    BasicType.HERO,
  ],
  render(params) {
    return <BasicBlock params={params} tag="mj-raw" />;
  },
});
