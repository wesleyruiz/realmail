import { Stack } from '@/components/UI/Stack';
import React from 'react';
import { useBlock } from '@/hooks/useBlock';
import { IconFont } from '@/components/IconFont';
import { Button } from '@/components/UI/Button';
import { useMemo } from 'react';
import { useEditorContext } from '@/hooks/useEditorContext';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { get } from 'lodash';
import { BlockManager, getParentIdx, IBlockData } from 'realmail-core';
import { Tooltip } from '@/components/UI/Tooltip';

export function ToolsPanel() {
  const { redo, undo, redoable, undoable } = useBlock();
  const { focusIdx, setFocusIdx } = useFocusIdx();
  const { formState: { values } } = useEditorContext();

  const paths = useMemo(() => {
    const paths: Array<{ name: string, idx: string; }> = [];

    let prev: string | undefined = focusIdx;
    while (prev) {
      const current = get(values, prev) as IBlockData;
      if (!current) break;
      const name = BlockManager.getBlockByType(current.type)?.name || '';
      paths.push({ name, idx: prev });
      prev = getParentIdx(prev);
    }
    return paths.reverse();
  }, [focusIdx, values]);

  return useMemo(() => {
    return (
      <Stack alignment='center'>
        <div>
          <Stack spacing='none'>
            {
              paths.map((item, index) => {
                const isLast = index === paths.length - 1;
                return (
                  <span
                    key={item.idx}
                    style={{
                      cursor: 'pointer',
                      fontSize: 14,
                      fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, "Helvetica Neue", Arial, sans-serif
                  -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto`,
                      color: isLast ? '#000b1d' : '#666',
                      fontWeight: isLast ? 'bold' : undefined
                    }}
                  >
                    <span className='hover-underline' onClick={() => setFocusIdx(item.idx)}>{item.name}</span>
                    {!isLast && <span style={{ margin: '0px 4px' }}>-</span>}
                  </span>
                );
              })
            }

          </Stack>
        </div>
        <Tooltip
          position='top'
          content={'undo'}
        >
          <Button disabled={!undoable} onClick={undo}>
            <IconFont
              iconName='icon-undo'
              style={{
                cursor: 'inherit',
                opacity: undoable ? 1 : 0.75,
              }}
            />
          </Button>
        </Tooltip>
        <Tooltip
          position='top'
          content={'redo'}
        >
          <Button disabled={!redoable} onClick={redo}>
            <IconFont
              iconName='icon-redo'
              style={{
                cursor: 'inherit',
                opacity: redoable ? 1 : 0.75,
              }}
            />
          </Button>
        </Tooltip>

        <Stack.Item />

      </Stack>
    );
  }, [paths, redo, redoable, setFocusIdx, undo, undoable]);
}
