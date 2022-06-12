import { IBlock } from '@core/typings';
import { EMAIL_BLOCK_CLASS_NAME } from '@core/constants';

import { isString } from 'lodash';

import { classnames } from '@core/utils/classnames';
import { getNodeTypeClassName } from '@core/utils';
import { getPreviewClassName } from './getPreviewClassName';
export function getAdapterAttributesString(
  params: Parameters<IBlock['render']>[0]
) {
  const { data, idx, } = params;
  const isTest = params.mode === 'testing';
  const attributes = { ...data.attributes };
  const keepClassName = isTest ? params.keepClassName : false;

  if (isTest && idx) {
    attributes['css-class'] = classnames(
      attributes['css-class'],
      getPreviewClassName(idx, data.type)
    );
  }

  if (keepClassName) {
    attributes['css-class'] = classnames(
      attributes['css-class'],
      getNodeTypeClassName(data.type)
    );
  }

  let attributeStr = '';
  for (let key in attributes) {
    const keyName = key as keyof typeof attributes;
    const val = attributes[keyName];
    if (isString(val) && val) {
      const splitter = ' ';
      attributeStr += `${key}="${val.replace(/"/gm, '').trim()}"` + splitter;
    }
  }

  return attributeStr;
}
