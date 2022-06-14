import React, { useMemo } from 'react';
import { BlockManager } from '@core/utils';
import { IBlockData, RecursivePartial } from '@core/typings';
import { isString, set } from 'lodash';
import { useEmailRenderContext } from '@core/utils/JsonToMjml';
import { BlockRenderer } from './BlockRenderer';

export interface MjmlBlockProps<T extends IBlockData> {
  idx?: string | null;
  type: T['type'];
  value?: RecursivePartial<T['data']['value']>;
  attributes?: RecursivePartial<T['attributes']>;
  children?: React.ReactNode;
}

export default function MjmlBlock<T extends IBlockData>({
  idx,
  value,
  type,
  attributes,
  children,
}: MjmlBlockProps<T>) {
  const { mode } = useEmailRenderContext();
  const block = BlockManager.getBlockByType(type);

  if (!mode) {
    throw new Error('mode is required!');
  }

  if (!block) {
    throw new Error(`Can no find ${type}`);
  }

  const mergeValue = useMemo((): undefined | {} => {
    if (!value) {
      value = {} as Record<string, any>;
    }

    if (typeof children === 'string') {
      set(value, 'content', children);
    } else if (Array.isArray(children) && children.every(isString)) {
      set(value, 'content', children.join(''));
    }

    return value;
  }, [children, value]);

  return (
    <BlockRenderer
      idx={idx}
      data={{
        type: block.type,
        data: {
          value: mergeValue,
        },
        attributes,
        children: [],
      }}
      children={children}
    />
  );
}
