import { PopoverProps } from '@arco-design/web-react';
import React, { useCallback, useMemo } from 'react';
import { getEditorWindow, IconFont, isIFrameChildElement } from 'realmail-editor';
import { ToolItem } from '../ToolItem';
import { EMAIL_BLOCK_CLASS_NAME } from 'realmail-core';
import { useSelectionRange } from '@extensions/AttributePanel/hooks/useSelectionRange';
import { getSelectionRangeNodeStyle } from '@extensions/utils/getSelectionRangeNodeStyle';

export interface LinkProps extends PopoverProps {
  currentRange: Range | null | undefined;
  onChange: () => void;
}

function getBoldNode(
  node: Node | null | undefined,
): Element | null {
  if (!node) return null;
  if (isIFrameChildElement(node) && node.classList.contains(EMAIL_BLOCK_CLASS_NAME)) return null;
  if (isIFrameChildElement(node) && node.tagName.toLocaleLowerCase() === 'b') return node;
  return getBoldNode(node.parentNode);
}

export function Bold(props: LinkProps) {
  const { onChange } = props;
  const { setRangeByElement } = useSelectionRange();
  const node = useMemo(() => {
    return getBoldNode(props.currentRange?.commonAncestorContainer);

  }, [props.currentRange]);

  const onClick = useCallback(() => {
    const rangeNode = node || props.currentRange?.commonAncestorContainer;
    if (isIFrameChildElement(rangeNode)) {
      setRangeByElement(rangeNode);
    }
    onChange();
  }, [node, onChange, props.currentRange?.commonAncestorContainer, setRangeByElement]);

  const isActive = +getSelectionRangeNodeStyle(props.currentRange?.commonAncestorContainer, 'font-weight') > 500;

  return (
    <ToolItem title='Bold' isActive={isActive} icon={<IconFont iconName='icon-bold' />} onClick={onClick} />
  );
}
