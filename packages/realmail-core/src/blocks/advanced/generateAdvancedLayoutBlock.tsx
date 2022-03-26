import { AdvancedType, BasicType } from '@core/constants';
import React from 'react';
import { Template } from '@core/components';
import MjmlBlock from '@core/components/MjmlBlock';

import { AdvancedBlock, generateAdvancedBlock } from './generateAdvancedBlock';
import { getPreviewClassName } from '@core/utils/getPreviewClassName';
import { classnames } from '@core/utils/classnames';
import { getParentByIdx } from '@core/utils';
import { isUndefined } from 'lodash';

export function generateAdvancedLayoutBlock<T extends AdvancedBlock>(option: {
  type: string;
  baseType: BasicType;
  validParentType: string[];
}) {
  return generateAdvancedBlock<T>({
    ...option,
    getContent: (params) => {
      const { data, idx, mode, context, dataSource, index } = params;

      const blockData = {
        ...data,
        type: option.baseType,
      };
      const previewClassName =
        mode === 'testing'
          ? classnames(index === 0 && getPreviewClassName(idx, data.type))
          : '';

      return (
        <MjmlBlock
          type={blockData.type}
          attributes={{
            ...blockData.attributes,
            'css-class': classnames(
              data.attributes['css-class'],
              previewClassName
            ),
          }}
          value={blockData.data.value}
        >
          <Template idx={index === 0 ? idx : null}>{data.children}</Template>
        </MjmlBlock>
      );
    },
  });
}
