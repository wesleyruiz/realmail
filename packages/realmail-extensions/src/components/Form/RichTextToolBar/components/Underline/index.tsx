import { PopoverProps } from '@arco-design/web-react';
import React, { useCallback, useMemo } from 'react';
import { IconFont, isIFrameChildElement } from 'realmail-editor';
import { ToolItem } from '../ToolItem';
import { EMAIL_BLOCK_CLASS_NAME } from 'realmail-core';
import { useSelectionRange } from '@extensions/AttributePanel/hooks/useSelectionRange';

export interface LinkProps extends PopoverProps {
  currentRange: Range | null | undefined;
  onChange: () => void;
}

function getUnderlineNode(
  node: Node | null | undefined,
): Element | null {
  if (!node) return null;
  if (isIFrameChildElement(node) && node.classList.contains(EMAIL_BLOCK_CLASS_NAME)) return null;
  if (isIFrameChildElement(node) && node.tagName.toLocaleLowerCase() === 'u') return node;
  return getUnderlineNode(node.parentNode);
}

export function Underline(props: LinkProps) {
  const { onChange } = props;
  const { setRangeByElement } = useSelectionRange();
  const node = useMemo(() => {
    return getUnderlineNode(props.currentRange?.commonAncestorContainer);

  }, [props.currentRange]);

  const onClick = useCallback(() => {
    if (node) {
      setRangeByElement(node);
    }
    onChange();
  }, [node, onChange, setRangeByElement]);

  return (
    <ToolItem title='Underline' isActive={Boolean(node)} icon={<IconFont iconName='icon-underline' />} onClick={onClick} />
  );
}
