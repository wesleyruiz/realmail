import { Grid, PopoverProps } from '@arco-design/web-react';
import React, { useCallback, useMemo } from 'react';
import { IconFont, isIFrameChildElement } from 'realmail-editor';
import { ToolItem } from '../ToolItem';
import { EMAIL_BLOCK_CLASS_NAME } from 'realmail-core';

export interface LinkParams {
  link: string;
  blank: boolean;
  underline: boolean;
  linkNode: HTMLAnchorElement | null;
}

export interface LinkProps extends PopoverProps {
  currentRange: Range | null | undefined;
  onChange: () => void;
}

function getAnchorElement(
  node: Node | null,
): HTMLAnchorElement | null {
  if (!isIFrameChildElement(node)) return null;
  if (node.tagName.toLocaleLowerCase() === 'a') {
    return node as HTMLAnchorElement;
  }
  if (node.classList.contains(EMAIL_BLOCK_CLASS_NAME)) return null;

  return getAnchorElement(node.parentNode);
}

function getLinkNode(
  currentRange: Range | null | undefined
): HTMLAnchorElement | null {
  let linkNode: HTMLAnchorElement | null = null;
  if (!currentRange) return null;
  linkNode = getAnchorElement(currentRange.commonAncestorContainer);
  return linkNode;
}

export function Unlink(props: LinkProps) {
  const { onChange } = props;
  const linkNode = useMemo(() => {
    return getLinkNode(props.currentRange);

  }, [props.currentRange]);

  const onUnlink = useCallback(() => {
    if (linkNode?.parentNode) {
      linkNode?.replaceWith(...linkNode.childNodes);
      onChange();
    }
  }, [linkNode, onChange]);

  return (
    <ToolItem title='Unlink' icon={<IconFont iconName='icon-unlink' />} onClick={onUnlink} />
  );
}
