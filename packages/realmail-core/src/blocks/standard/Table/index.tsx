import { IBlockData } from '@core/typings';
import { BasicType } from '@core/constants';
import { createBlock } from '@core/utils/createBlock';
import { merge } from 'lodash';
import React from 'react';
import { BasicBlock } from '@core/components/BasicBlock';

export type ITable = IBlockData<{}, { content: string }>;

export const Table = createBlock<ITable>({
  name: 'Table',
  type: BasicType.TABLE,
  create: payload => {
    const defaultData: ITable = {
      type: BasicType.TABLE,
      data: {
        value: {
          content: '',
        },
      },
      attributes: {},
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN],
  render(params) {
    const { data } = params;
    return (
      <BasicBlock params={params} tag="mj-table">
        {data.data.value.content}
      </BasicBlock>
    );
  },
});
