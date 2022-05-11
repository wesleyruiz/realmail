import { getEditorWindow } from 'realmail-editor';

export function getSelectionRangeNodeStyle(node: Node | undefined, property: string) {
  if (!node) return '';
  if ((node instanceof getEditorWindow()?.Element)) {
    return getEditorWindow().getComputedStyle(node).getPropertyValue(property);;
  }
  if (node.parentElement) return getEditorWindow().getComputedStyle(node.parentElement).getPropertyValue(property);
  return '';
}