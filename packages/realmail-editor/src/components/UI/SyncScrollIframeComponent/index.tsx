import { ActiveTabKeys } from '@/components/Provider/BlocksProvider';
import { RICH_TEXT_BAR_HEIGHT, SYNC_SCROLL_ELEMENT_CLASS_NAME } from '@/constants';
import { useDomScrollHeight } from '@/hooks/useDomScrollHeight';
import { getEditorRoot, isIFrameChildElement } from '@/utils';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props
  extends React.DetailedHTMLProps<
  React.IframeHTMLAttributes<HTMLIFrameElement>,
  HTMLIFrameElement
  > {
  children: React.ReactNode;
  title?: string;
  windowRef?: (e: Window) => void;
  pageWidth: number;
  activeTab: ActiveTabKeys;
}

export const SyncScrollIframeComponent = ({ children, title, windowRef, pageWidth, activeTab, ...props }: Props) => {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [contentWindow, setContentWindow] = useState<Window | null>(null);
  const { viewElementRef } = useDomScrollHeight();

  const setFirstVisibleEle = useCallback(debounce((root: Document) => {

    const { width } = getEditorRoot().getBoundingClientRect();

    const ele = root.elementFromPoint((width - pageWidth) / 2, RICH_TEXT_BAR_HEIGHT);

    if (!ele) return;

    const findSelectorNode = (ele: Element): Element | null => {
      if (ele.getAttribute('data-selector')) {
        return ele;
      }
      if (isIFrameChildElement(ele.parentNode)) {
        return findSelectorNode(ele.parentNode);
      }
      return null;
    };

    const selectorNode = ele && findSelectorNode(ele);

    viewElementRef.current = null;
    if (selectorNode) {
      const { top: selectorEleTop } = selectorNode.getBoundingClientRect();

      const selector = selectorNode.getAttribute('data-selector');

      if (selector) {
        viewElementRef.current = {
          selector: selector || '',
          top: selectorEleTop
        };
      }
    }
  }, 200), [viewElementRef]);

  const onLoad: React.ReactEventHandler<HTMLIFrameElement> = (evt) => {
    const contentWindow = (evt.target as any)?.contentWindow;
    if (!contentWindow) return;
    windowRef?.(contentWindow);
    const innerBody = contentWindow.document.body;
    innerBody.style.backgroundColor = 'transparent';
    setMountNode(innerBody);
    setContentWindow(contentWindow);
  };

  useEffect(() => {

    if (!mountNode) return;
    const viewElement = viewElementRef.current;
    const scrollEle = contentWindow?.document?.scrollingElement;
    if (viewElement && scrollEle) {
      const viewElementNode = mountNode.querySelector(`[data-selector="${viewElement?.selector}"]`);

      if (viewElementNode) {
        viewElementNode.scrollIntoView();
        contentWindow?.document?.scrollingElement?.scrollTo(0, scrollEle.scrollTop - viewElement.top);
      }
    }
  }, [viewElementRef, mountNode, activeTab, contentWindow?.document?.scrollingElement]);

  useEffect(() => {
    if (!contentWindow?.document.documentElement) return;
    const onScroll = (e: Event) => {
      setFirstVisibleEle(contentWindow.document);
    };
    contentWindow.addEventListener('scroll', onScroll, true);
    return () => {
      contentWindow?.removeEventListener('scroll', onScroll, true);
    };
  }, [contentWindow, setFirstVisibleEle]);

  return (
    <iframe
      title={title}
      srcDoc={
        '<!doctype html> <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head></head> <body> </body> </html>'
      }
      {...(props as any)}
      onLoad={onLoad}
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};
