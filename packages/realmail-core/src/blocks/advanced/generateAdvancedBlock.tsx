import { ResponsiveBlock } from '@core/components';
import { AdvancedType, BasicType } from '@core/constants';
import { IBlockData } from '@core/typings';
import { getParentByIdx, TemplateEngineManager } from '@core/utils';
import { isString, isUndefined, merge, pickBy } from 'lodash';
import React from 'react';
import { IPage, standardBlocks } from '../standard';
import { createBlock } from '@core/utils/createBlock';

const inlineBlockTypes = [
  AdvancedType.GROUP,
  AdvancedType.COLUMN,
  BasicType.GROUP,
  BasicType.COLUMN,
] as string[];

export function generateAdvancedBlock<T extends AdvancedBlock>(option: {
  type: string;
  baseType: BasicType;
  getContent: (params: {
    index: number;
    data: T;
    idx: string | null | undefined;
    mode: 'testing' | 'production';
    context?: IPage;
    dataSource?: { [key: string]: any };
  }) => React.ReactElement;
  validParentType: string[];
}) {
  const baseBlock = Object.values(standardBlocks).find(
    b => b.type === (option.baseType as any as keyof typeof standardBlocks),
  );
  if (!baseBlock) {
    throw new Error(`Can not find ${option.baseType}`);
  }

  return createBlock<T>({
    name: baseBlock.name,
    type: option.type,
    validParentType: option.validParentType,
    create: payload => {
      const defaultData = {
        ...baseBlock.create(),
        type: option.type,
      } as any;
      return merge(defaultData, payload);
    },
    render: ({ data, idx, mode, context, dataSource }) => {
      const { iteration, condition } = data.data.value;

      const parentBlockData = getParentByIdx({ content: context! }, idx!);

      const getDesktopBaseContent = (bIdx: string | null | undefined, index: number) => {
        let width = data.attributes.width;
        if (
          inlineBlockTypes.includes(data.type) &&
          isUndefined(width) &&
          parentBlockData
        ) {
          width = (100 / parentBlockData.children.length).toFixed(2) + '%';
        }
        return option.getContent({
          index,
          data: {
            ...data,
            attributes: {
              ...data.attributes,
              width,
            },
          },
          idx: bIdx,
          mode,
          context,
          dataSource,
        });
      };

      const getMobileBaseContent = (bIdx: string | null | undefined, index: number) => {
        let width = data.mobileAttributes?.width || data.attributes.width;
        if (
          inlineBlockTypes.includes(data.type) &&
          isUndefined(width) &&
          parentBlockData
        ) {
          width = '100%';
        }
        return option.getContent({
          index,
          data: {
            ...data,
            attributes: {
              ...data.attributes,
              ...pickBy(
                data.mobileAttributes,
                v => !Boolean(isUndefined(v) || (isString(v) && v.trim() === '')),
              ),
              'css-class': data.mobileAttributes?.['css-class'] || '',
              width,
            },
          },
          idx: bIdx,
          mode,
          context,
          dataSource,
        });
      };

      const getBaseContent = (bIdx: string | null | undefined, index: number) => {
        let hasMobileView = false;
        if (data.mobileAttributes) {
          if (
            Object.keys(data.mobileAttributes).some(
              key => data.mobileAttributes[key] !== data.attributes[key],
            )
          ) {
            hasMobileView = true;
          }
        }

        return (
          <ResponsiveBlock
            mode={mode}
            desktop={() => getDesktopBaseContent(bIdx, index)}
            mobile={() =>
              hasMobileView
                ? getMobileBaseContent(bIdx, index)
                : getDesktopBaseContent(bIdx, index)
            }
            context={context}
            dataSource={dataSource}
          />
        );
      };

      let children = getBaseContent(idx, 0);

      if (mode === 'testing') {
        return (
          <>
            <React.Fragment key="children">{children}</React.Fragment>

            {new Array((iteration?.mockQuantity || 1) - 1).fill(true).map((_, index) => (
              <React.Fragment key={index}>
                {getBaseContent(idx, index + 1)}
              </React.Fragment>
            ))}
          </>
        );
      }

      if (condition && condition.enabled) {
        children = TemplateEngineManager.generateTagTemplate('condition')(
          condition,
          children,
        );
      }

      if (iteration && iteration.enabled) {
        children = TemplateEngineManager.generateTagTemplate('iteration')(
          iteration,
          children,
        );
      }

      return children;
    },
  });
}

// {% for product in collection.products %}
//   {{ product.title }}
// {% endfor %}

export interface AdvancedBlock<T extends IBlockData = IBlockData> extends IBlockData {
  mobileAttributes?: T['attributes'];
  data: {
    value: {
      condition?: ICondition;
      iteration?: {
        enabled: boolean;
        dataSource: string; // -> collection.products
        itemName: string; // -> product
        limit: number;
        mockQuantity: number;
      } & T['data']['value'];
    };
  };
}

export interface ICondition {
  groups: Array<IConditionGroup>;
  symbol: OperatorSymbol;
  enabled: boolean;
}

export interface IConditionGroup {
  symbol: OperatorSymbol;
  groups: Array<IConditionGroupItem>;
}

export interface IConditionGroupItem {
  left: string;
  operator: Operator;
  right: string | number;
}

export enum Operator {
  TRUTHY = 'truthy',
  FALSY = 'falsy',
  EQUAL = '==',
  NOT_EQUAL = '!=',
  GREATER = '>',
  GREATER_OR_EQUAL = '>=',
  LESS = '<',
  LESS_OR_EQUAL = '<=',
}

export enum OperatorSymbol {
  AND = 'and',
  OR = 'or',
}
