import { getEditorRoot, useBlock, useEditorContext, useTransformScale } from 'realmail-editor';
import { Space, Tooltip } from '@arco-design/web-react';
import { IconMinus, IconPlus, IconRedo, IconUndo } from '@arco-design/web-react/icon';
import { onDrag } from '@extensions/AttributePanel/utils/onDrag';
import React, { useCallback, useEffect, useState } from 'react';
import './index.scss';
import { PreviewEmail } from '../PreviewEmail';

export function AffixTools() {
  const { redo, undo, redoable, undoable } = useBlock();
  const { initialized } = useEditorContext();

  const [offset, setOffset] = useState({
    left: 0,
    bottom: 80,
  });

  const { setScale, scale } = useTransformScale();
  const dragEleRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!initialized) return;
    const { left, width } = getEditorRoot().getBoundingClientRect();
    setOffset({
      left: left + width - 50,
      bottom: 40,
    });

  }, [initialized]);

  const onIncrease = useCallback(() => {
    setScale(s => Math.min(150, s + 10));
  }, [setScale]);

  const onReduce = useCallback(() => {
    setScale(s => Math.max(50, s - 10));
  }, [setScale]);

  const onDragStart = useCallback((evt: React.MouseEvent) => {

    let oldOffset: {
      left: number;
      bottom: number;
    };

    onDrag({
      event: evt as any,
      onMove: (x, y) => {

        setOffset(old => {
          if (!oldOffset) {
            oldOffset = old;
          }
          return {
            left: oldOffset.left + x,
            bottom: oldOffset.bottom - y,
          };
        });
      }
    });
  }, []);

  if (!initialized) return null;
  return (
    <div className='email-extension-affixTools' ref={dragEleRef} onMouseDown={onDragStart} style={{ position: 'fixed', bottom: offset.bottom, left: offset.left, zIndex: 11, cursor: 'grab' }}>
      <div style={{ cursor: 'default' }}>
        <Space>
          <span className='affix-item' data-enable={undoable}>
            <Tooltip
              position='top'
              content={'Undo'}
            >
              <IconUndo onClick={undo} />
            </Tooltip>
          </span>

          <span className='affix-item' data-enable={redoable}>
            <Tooltip
              position='top'
              content={'Redo'}
            >
              <IconRedo onClick={redo} />
            </Tooltip>
          </span>

          <span className='affix-item' data-enable={scale < 150}>

            <Tooltip
              position='top'
              content={'Zoom in'}
            >
              <IconPlus onClick={onIncrease} />
            </Tooltip>
          </span>
          <span>
            <Tooltip
              position='top'
              content={`Zoom: ${scale}%`}
            >
              <span style={{ fontSize: 12 }}>
                {scale}%
              </span>
            </Tooltip>
          </span>
          <span className='affix-item' data-enable={scale > 50}>
            <Tooltip
              position='top'
              content={'Zoom out'}
            >
              <IconMinus onClick={onReduce} />
            </Tooltip>
          </span>
          <span className='affix-item'> <PreviewEmail /></span>
        </Space>

      </div>
    </div>
  );
}