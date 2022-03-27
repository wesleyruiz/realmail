import { Template, ResponsiveBlock } from '@core/components';
import { AdvancedType, BasicType } from '@core/constants';
import { IBlock, IBlockData } from '@core/typings';
import { createCustomBlock } from '@core/utils/createCustomBlock';
import { getParentByIdx, TemplateEngineManager } from '@core/utils';
import { isString, isUndefined, merge, pickBy } from 'lodash';
import React from 'react';
import { IPage, standardBlocks } from '../standard';

const inlineBlockTypes = ([AdvancedType.GROUP, AdvancedType.COLUMN] as string[]);

export function generateAdvancedBlock<T extends AdvancedBlock>(option: {
  type: string;
  baseType: BasicType;
  getContent: (params: {
    index: number;
    data: T;
    idx: string | null;
    mode: 'testing' | 'production';
    context?: IPage;
    dataSource?: { [key: string]: any; };
  }) => ReturnType<NonNullable<IBlock['render']>>;
  validParentType: string[];
}) {
  const baseBlock = Object.values(standardBlocks).find(
    (b) => b.type === (option.baseType as any as keyof typeof standardBlocks)
  );
  if (!baseBlock) {
    throw new Error(`Can not find ${option.baseType}`);
  }

  return createCustomBlock<T>({
    name: baseBlock.name,
    type: option.type,
    validParentType: option.validParentType,
    create: (payload) => {
      const defaultData = {
        ...baseBlock.create(),
        type: option.type,
      } as any;
      return merge(defaultData, payload);
    },
    render: (data, idx, mode, context, dataSource) => {
      const { iteration, condition } = data.data.value;

      const parentBlockData = getParentByIdx({ content: context! }, idx!);

      const getDesktopBaseContent = (bIdx: string | null, index: number) => {
        let width = data.attributes.width;
        if (inlineBlockTypes.includes(data.type) && isUndefined(width) && parentBlockData) {
          width = (100 / parentBlockData.children.length).toFixed(2) + '%';
        }
        return option.getContent({
          index,
          data: {
            ...data,
            attributes: {
              ...data.attributes,
              width
            }
          },
          idx: bIdx,
          mode,
          context,
          dataSource,
        }) as any;
      };

      const getMobileBaseContent = (bIdx: string | null, index: number) => {
        let width = data.mobileAttributes?.width || data.attributes.width;
        if (inlineBlockTypes.includes(data.type) && isUndefined(width) && parentBlockData) {
          width = '100%';
        }
        return option.getContent({
          index,
          data: {
            ...data,
            attributes: {
              ...data.attributes,
              ...pickBy(data.mobileAttributes, (v) => !Boolean(isUndefined(v) || (isString(v) && v.trim() === ''))),
              width
            }
          },
          idx: bIdx,
          mode,
          context,
          dataSource,
        }) as any;
      };

      const getBaseContent = (bIdx: string | null, index: number) => {
        if (!data.mobileAttributes || Object.keys(data.mobileAttributes).length === 0) return getDesktopBaseContent(bIdx, index);
        return <ResponsiveBlock desktop={getDesktopBaseContent(bIdx, index)} mobile={getMobileBaseContent(bIdx, index)} display={inlineBlockTypes.includes(data.type) ? 'inline-block' : undefined} />;
      };

      let children = getBaseContent(idx, 0);

      if (mode === 'testing') {
        return (
          <Template>
            {children}
            <Template>
              {new Array((iteration?.mockQuantity || 1) - 1)
                .fill(true)
                .map((_, index) => (
                  <Template key={index}>
                    <Template>{getBaseContent(idx, index + 1)}</Template>
                  </Template>
                ))}
            </Template>
          </Template>
        );
      }

      if (condition && condition.enabled) {
        children = TemplateEngineManager.generateTagTemplate('condition')(
          condition,
          children
        );
      }

      if (iteration && iteration.enabled) {
        children = TemplateEngineManager.generateTagTemplate('iteration')(
          iteration,
          <Template>{children}</Template>
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
      };
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
