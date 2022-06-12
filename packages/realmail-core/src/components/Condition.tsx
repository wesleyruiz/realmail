import React from 'react';
import { MjmlBlock } from '@core/components';
import { isUndefined } from 'lodash';
import { ICondition } from '@core/blocks/logic/Condition';
import { LogicType } from '@core/constants';

export type ConditionProps = ICondition['data']['value'] & {
  truthy: React.ReactElement;
  falsy?: React.ReactElement;
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
