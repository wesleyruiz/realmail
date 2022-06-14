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

export const SyncScrollIframeComponent = ({
  children,
  title,
  windowRef,
  pageWidth,
  activeTab,
  ...props
}: Props) => {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [contentWindow, setContentWindow] = useState<Window | null>(null);

  const onLoad: React.ReactEventHandler<HTMLIFrameElement> = evt => {
    const contentWindow = (evt.target as any)?.contentWindow;
    if (!contentWindow) return;
    windowRef?.(contentWindow);
    const innerBody = contentWindow.document.body;
    innerBody.style.backgroundColor = 'transparent';
    setMountNode(innerBody);
    setContentWindow(contentWindow);
  };

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
