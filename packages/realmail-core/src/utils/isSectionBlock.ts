import { ISection } from '@core/blocks';
import { AdvancedType, BasicType } from '@core/constants';
import { IBlockData } from '@core/typings';

export function isSectionBlock(blockData: IBlockData): blockData is ISection {
  return blockData.type === BasicType.SECTION || blockData.type === AdvancedType.SECTION;
}