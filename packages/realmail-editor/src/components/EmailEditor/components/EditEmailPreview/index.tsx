import React, { useEffect, useMemo, useState } from 'react';
import { MjmlDomRender } from '../EditEmailPreview/components/MjmlDomRender';
import { useDropBlock } from '@/hooks/useDropBlock';
import { useHotKeys } from '@/hooks/useHotKeys';
import { ShadowStyle } from './components/ShadowStyle';
import { useEditorContext } from '@/hooks/useEditorContext';
import {
  DATA_ATTRIBUTE_DROP_CONTAINER,
  RICH_TEXT_BAR_HEIGHT,
  SYNC_SCROLL_ELEMENT_CLASS_NAME,
} from '@/constants';
import { classnames } from '@/utils/classnames';
import { useActiveTab } from '@/hooks/useActiveTab';
import { SyncScrollIframeComponent } from '@/components/UI/SyncScrollIframeComponent';
import { useTransformScale } from '@/hooks/useTransformScale';

export function EditEmailPreview() {
  useHotKeys();
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const { setRef } = useDropBlock();
  const { activeTab } = useActiveTab();
  const { scale } = useTransformScale();
  const { setInitialized, pageData } = useEditorContext();
  const pageWidth = parseInt(pageData.attributes.width) || 600;

  useEffect(() => {
    setRef(containerRef);
  }, [containerRef, setRef]);

  useEffect(() => {
    if (containerRef) {
      setInitialized(true);
    }
  }, [containerRef, setInitialized]);

  const children = useMemo(() => {
    return (
      <SyncScrollIframeComponent
        activeTab={activeTab}
        pageWidth={pageWidth}
        id="VisualEditorEditMode"
        {...{
          [DATA_ATTRIBUTE_DROP_CONTAINER]: 'true',
        }}
        style={{
          border: 'none',
          height: '100%',
          width: '100%',
          zIndex: 10,
          position: 'relative',
          outline: 'none',
        }}
      >
        <div
          id="realmail-plugins"
          style={{
            position: 'relative',
          }}
        />
        <div
          {...{
            part: 'email-bg',
            'data-view': activeTab,
          }}
          className={classnames(
            'shadow-container',
            SYNC_SCROLL_ELEMENT_CLASS_NAME
          )}
          style={{
            height: '100%',
            zIndex: 10,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: RICH_TEXT_BAR_HEIGHT,
            paddingBottom: 40,
            boxSizing: 'border-box',
          }}
          ref={setContainerRef}
        >
          <div style={{ height: `${scale}%`, width: '100%', transform: `scale(${scale}%)`, transformOrigin: 'top center' }}>
            <MjmlDomRender />
          </div>

        </div>
        <ShadowStyle />
      </SyncScrollIframeComponent>
    );
  }, [activeTab, pageWidth, scale]);

  return useMemo(() => {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: pageData.attributes['background-color'],
        }}
      >
        {children}
      </div>
    );
  }, [children, pageData.attributes]);
}
