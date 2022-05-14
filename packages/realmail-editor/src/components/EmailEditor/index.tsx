import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';
import { EASY_EMAIL_EDITOR_ID, FIXED_CONTAINER_ID } from '@/constants';
import { EditEmailPreview } from './components/EditEmailPreview';
import './index.scss';
import '@/assets/font/iconfont.css';
(window as any).global = window; // react-codemirror

export const EmailEditor = () => {

  const fixedContainer = useMemo(() => {
    return createPortal(<div id={FIXED_CONTAINER_ID} />, document.body);
  }, []);

  return useMemo(
    () => (
      <div
        id={EASY_EMAIL_EDITOR_ID}
        style={{
          display: 'flex',
          flex: '1',
          overflow: 'hidden',
          justifyContent: 'center',
          minWidth: 640,
          height: '100%',
          flexDirection: 'column'
        }}
      >
        <EditEmailPreview />
        {fixedContainer}
      </div>
    ),
    [fixedContainer]
  );
};
