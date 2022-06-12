import { MjmlBlock } from '@core/components';
import { IForEach } from '@core/blocks/logic/ForEach';
import React from 'react';
import { MjmlBlockProps } from './MjmlBlock';
import { LogicType } from '@core/constants';

export type ForEachProps = IForEach['data']['value'] & {
  children?: MjmlBlockProps<IForEach>['children'];
};

export function ForEach(props: ForEachProps) {
  const { children, ...rest } = props;

  return (
    <MjmlBlock
      value={{
        ...rest,
      }}
      type={LogicType.FOR_EACH}
    >
      {children}
    </MjmlBlock>
  );
}
