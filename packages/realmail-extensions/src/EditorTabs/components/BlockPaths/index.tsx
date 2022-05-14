import { BlockManager, getParentIdx, IBlockData } from 'realmail-core';
import { get } from 'lodash';
import { useMemo } from 'react';
import { useEditorContext, useFocusIdx } from 'realmail-editor';
import React from 'react';
import { Space } from '@arco-design/web-react';

export function BlockPaths() {
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
      <div style={{ display: 'flex' }}>
        {
          paths.map((item, index) => {
            const isLast = index === paths.length - 1;
            return (
              <span
                key={item.idx}
                style={{
                  cursor: 'pointer',
                  fontSize: 12,
                  lineHeight: 1,
                  fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, "Helvetica Neue", Arial, sans-serif
            -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto`,
                  color: isLast ? '#000b1d' : '#666',
                  fontWeight: isLast ? 'bold' : undefined,
                  marginLeft: index === 0 ? 10 : 4
                }}
              >
                <span className='hover-underline' onClick={() => setFocusIdx(item.idx)}>{item.name}</span>
                {!isLast && <span style={{ marginLeft: 4 }}>-</span>}
              </span>
            );
          })
        }
      </div>
    );
  }, [paths, setFocusIdx]);
}
