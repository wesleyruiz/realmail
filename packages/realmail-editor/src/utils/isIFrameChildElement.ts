import { getEditorWindow } from './getEditorWindow';

export function isIFrameChildElement(target: any): target is HTMLElement {
  return target instanceof getEditorWindow()?.Element;
}