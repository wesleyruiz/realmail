import { BasicType, COLUMN_NO_STACK_CLASS_NAME } from '@core/constants';
import React from 'react';
import { BlockRenderer } from '@core/components';

import { generateAdvancedBlock } from './generateAdvancedBlock';
import { getPreviewClassName } from '@core/utils/getPreviewClassName';
import { classnames } from '@core/utils/classnames';
import { isSectionBlock } from '@core/utils/isSectionBlock';
import { IBlockData } from '@core/typings';
import { getChildIdx } from '@core/utils';

export function generateAdvancedLayoutBlock<T extends IBlockData>(option: {
  type: string;
  baseType: BasicType;
  validParentType: string[];
}) {
  return generateAdvancedBlock<T>({
    ...option,
    getContent: params => {
      const { data, idx, mode, index } = params;

      const blockData = {
        ...data,
        type: option.baseType,
      };
      let previewClassName = '';

      if (mode === 'testing') {
        previewClassName = classnames(index === 0 && getPreviewClassName(idx, data.type));
        if (isSectionBlock(blockData)) {
          if (!blockData.data.value.noWrap) {
            previewClassName += ` ${COLUMN_NO_STACK_CLASS_NAME}`;
          }
        }
      }

      return (
        <BlockRenderer
          idx={idx}
          data={{
            ...blockData,
            attributes: {
              ...blockData.attributes,
              'css-class': classnames(data.attributes['css-class'], previewClassName),
            },
          }}
        >
          {blockData.children.map((child, index) => {
            return (
              <BlockRenderer
                key={index}
                {...params}
                data={child}
                idx={idx ? getChildIdx(idx, index) : null}
              />
            );
          })}
        </BlockRenderer>
      );
    },
  });
}
