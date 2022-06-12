import React from 'react';
import { MjmlBlock } from '@core/components';
import { ICondition } from '@core/blocks/logic/Condition';
import { LogicType } from '@core/constants';

export type ConditionProps = ICondition['data']['value'] & {
  children: React.ReactElement;
  showTruthyInEdit?: boolean;
};

export function When(props: ConditionProps) {
  const { expression, showTruthyInEdit } = props;
  return (
    <MjmlBlock
      value={{
        expression,
        showTruthyInEdit,
      }}
      type={LogicType.CONDITION}
    >
      {props.children}
      <></>
    </MjmlBlock>
  );
}
