import React, { useEffect, useMemo, useState } from 'react';
import { MjmlDomRender } from '../EditEmailPreview/components/MjmlDomRender';
import { useDropBlock } from '@/hooks/useDropBlock';
import { useHotKeys } from '@/hooks/useHotKeys';
import { ShadowStyle } from './components/ShadowStyle';
import { useEditorContext } from '@/hooks/useEditorContext';
import { DATA_ATTRIBUTE_DROP_CONTAINER, SYNC_SCROLL_ELEMENT_CLASS_NAME } from '@/constants';
import { classnames } from '@/utils/classnames';
import { useActiveTab } from '@/hooks/useActiveTab';
import { SyncScrollIframeComponent } from '@/components/UI/SyncScrollIframeComponent';

export function EditEmailPreview() {
  useHotKeys();
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const { setRef } = useDropBlock();
  const { activeTab } = useActiveTab();

  const { setInitialized } = useEditorContext();

  useEffect(() => {
    setRef(containerRef);
  }, [containerRef, setRef]);

  useEffect(() => {
    if (containerRef) {
      setInitialized(true);
    }
  }, [containerRef, setInitialized]);

  return useMemo(
    () => (
      <SyncScrollIframeComponent
        // isActive={activeTab === ActiveTabKeys.EDIT}
        id='VisualEditorEditMode'
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
          id='realmail-plugins'
          style={{
            position: 'relative',
          }}
        />
        <div
          {
          ...{
            part: 'email-bg',
          }
          }
          className={classnames('shadow-container', SYNC_SCROLL_ELEMENT_CLASS_NAME)}
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
    ),
    []
  );
}
