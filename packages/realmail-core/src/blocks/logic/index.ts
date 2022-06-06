
import { LogicType } from '@core/constants';
import { Condition, ICondition } from './Condition';
import { ForEach, IForEach } from './ForEach';

export const logicBlocks = {
  [LogicType.CONDITION]: Condition,
  [LogicType.FOR_EACH]: ForEach,
};

export type { IForEach, ICondition as IConditionBlock };
