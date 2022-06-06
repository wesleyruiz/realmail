import React from 'react';
import { components, IBlockData } from '@core';
import { isUndefined } from 'lodash';
import { ICondition } from '@core/blocks/logic/Condition';
import { LogicType } from '@core/constants';
const { MjmlBlock } = components;

export type ConditionProps = ICondition['data']['value'] & {
  truthy: string | React.ReactElement | IBlockData;
  falsy?: string | React.ReactElement | IBlockData;
  showTruthyInEdit?: boolean;
};

export function Condition(props: ConditionProps) {
  const { expression, showTruthyInEdit } = props;
  return (
    <MjmlBlock
      value={{
        expression,
        showTruthyInEdit,
      }}
      type={LogicType.CONDITION}
    >
      {props.truthy}
      {isUndefined(props.falsy) ? null : props.falsy}
    </MjmlBlock>
  );
}
