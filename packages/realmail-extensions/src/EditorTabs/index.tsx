
import React from 'react';
import { TabHeader } from './components/TabHeader';
import { AffixTools } from './components/AffixTools';

export const EditorTabs: React.FC = (props) => {

  return (
    <>
      <TabHeader left={null} right={null} />

      <div style={{ height: 'calc(100% - 52px)' }}>
        {props.children}
      </div>
      <AffixTools />
    </>
  );
};
