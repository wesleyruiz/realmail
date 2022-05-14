
import React from 'react';
import { TabHeader } from './components/TabHeader';
import { AffixTools } from './components/AffixTools';
import { BlockPaths } from './components/BlockPaths';

export const EditorTabs: React.FC = (props) => {

  return (
    <>
      <TabHeader right={null} left={<BlockPaths />} />

      <div style={{ height: 'calc(100% - 52px)' }}>
        {props.children}
      </div>
      <AffixTools />
    </>
  );
};
