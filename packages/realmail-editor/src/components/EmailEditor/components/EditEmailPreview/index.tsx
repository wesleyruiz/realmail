import React, { useEffect, useMemo, useState } from 'react';
import { MjmlDomRender } from '../EditEmailPreview/components/MjmlDomRender';
import { useDropBlock } from '@/hooks/useDropBlock';
import { useHotKeys } from '@/hooks/useHotKeys';
import { ShadowStyle } from './components/ShadowStyle';
import { useEditorContext } from '@/hooks/useEditorContext';
import {
  DATA_ATTRIBUTE_DROP_CONTAINER,
  SYNC_SCROLL_ELEMENT_CLASS_NAME,
} from '@/constants';
import { classnames } from '@/utils/classnames';
import { useActiveTab } from '@/hooks/useActiveTab';
import { SyncScrollIframeComponent } from '@/components/UI/SyncScrollIframeComponent';
import './index.scss';
import iphoneFrame from '@/assets/images/iphone.png';
import { usePreviewEmail } from '@/hooks/usePreviewEmail';
import { ActiveTabKeys } from '@/components/Provider/BlocksProvider';

const MOBILE_WIDTH = 375;
const MOBILE_Height = 640;

export function EditEmailPreview() {
  useHotKeys();
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const { setRef } = useDropBlock();
  const { activeTab } = useActiveTab();

  const { setInitialized, pageData } = useEditorContext();

  useEffect(() => {
    setRef(containerRef);
  }, [containerRef, setRef]);

  useEffect(() => {
    if (containerRef) {
      setInitialized(true);
    }
  }, [containerRef, setInitialized]);

  const isMobile = activeTab === ActiveTabKeys.MOBILE;
  console.log('isMobile', isMobile);

  const children = useMemo(() => {
    return (
      <SyncScrollIframeComponent
        // isActive={activeTab === ActiveTabKeys.EDIT}
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
            overflowY: 'auto',
            zIndex: 10,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 40,
            paddingBottom: 40,
            boxSizing: 'border-box',
          }}
          ref={setContainerRef}
        >
          <MjmlDomRender />
        </div>
        <ShadowStyle />
      </SyncScrollIframeComponent>
    );
  }, [activeTab]);

  return useMemo(() => {
    return (
      <div
        style={{
          height: 'calc(100% - 40px)',
          width: '100%',
          backgroundColor: pageData.attributes['background-color'],
        }}
      >
        <div
          style={{
            height: '100%',
            width: '100%',
            margin: 'auto',

          }}
        >
          {children}
        </div>
      </div>
    );
  }, [children, pageData.attributes]);
}
