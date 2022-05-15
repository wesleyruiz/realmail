import { getNodeIdxClassName } from 'realmail-core';
import { getBlockNodes } from './getBlockNodes';
import { getEditorWindow } from './getEditorWindow';

export const getBlockNodeByIdx = (idx: string): HTMLElement | null => {
  if (!idx) return null;
  const idxClassName = getNodeIdxClassName(idx);
  const node = getBlockNodes().find((item) => {
    if (item instanceof getEditorWindow().HTMLElement) {
      return item.classList?.contains(idxClassName) && item.offsetParent; // if element is not visible, offsetParent will be null
    }
  }
  ) as HTMLElement;
  return node;
};
