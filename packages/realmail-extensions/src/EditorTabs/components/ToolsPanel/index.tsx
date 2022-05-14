import { BlockManager, getParentIdx, IBlockData } from 'realmail-core';
import { get } from 'lodash';
import { useMemo } from 'react';
import { Tooltip, useBlock, useEditorContext, useFocusIdx } from 'realmail-editor';
import React from 'react';
import { Button, Space } from '@arco-design/web-react';
import { IconRedo, IconUndo } from '@arco-design/web-react/icon';

export function ToolsPanel() {
  const { redo, undo, redoable, undoable } = useBlock();

  return useMemo(() => {
    return (
      <Space size="large">

        <Space>
          <Tooltip
            position='top'
            content={'undo'}
          >
            <Button disabled={!undoable} onClick={undo}>
              <IconUndo />
            </Button>
          </Tooltip>
          <Tooltip
            position='top'
            content={'redo'}
          >
            <Button disabled={!redoable} onClick={redo}>
              <IconRedo />
            </Button>
          </Tooltip>
        </Space>

      </Space>
    );
  }, [redo, redoable, undo, undoable]);
}
