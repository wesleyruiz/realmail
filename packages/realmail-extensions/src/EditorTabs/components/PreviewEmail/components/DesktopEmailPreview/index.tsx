
import { IframeComponent, usePreviewEmail, } from 'realmail-editor';
import React from 'react';

export function DesktopEmailPreview() {
  const { errMsg, reactNode } = usePreviewEmail();

  if (errMsg) {
    return (
      <div style={{ textAlign: 'center', fontSize: 24, color: 'red' }}>
        {errMsg}
      </div>
    );
  }

  return (
    <IframeComponent style={{
      width: '100%',
      height: 'calc(100%)',
    }}
    >
      {reactNode}
    </IframeComponent>
  );
}
