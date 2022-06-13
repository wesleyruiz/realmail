import { EMAIL_BLOCK_CLASS_NAME } from '@core/constants';
import { getNodeIdxClassName, getNodeTypeClassName } from './block';
import { classnames } from './classnames';

export function getPreviewClassName(idx: string | null | undefined, type: string) {
  return classnames(EMAIL_BLOCK_CLASS_NAME,
    idx && getNodeIdxClassName(idx),
    getNodeTypeClassName(type));
}