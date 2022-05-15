import { IconEye, IconEyeInvisible } from '@arco-design/web-react/icon';
import React, { useCallback, useEffect, useMemo } from 'react';
import { EventManager, Stack, TextStyle, useBlock, EventType, useFocusIdx, useValidationContext, useRefState } from 'realmail-editor';
import { BasicType, BlockManager } from 'realmail-core';
import { Message } from '@arco-design/web-react';

export interface AttributesPanelWrapper {
  style?: React.CSSProperties;
  extra?: React.ReactNode;
}
export const AttributesPanelWrapper: React.FC<AttributesPanelWrapper> = (
  props
) => {
  const { focusIdx } = useFocusIdx();
  const { focusBlock } = useBlock();
  const { errorBlocksMap, errorsMap } = useValidationContext();
  const block = focusBlock && BlockManager.getBlockByType(focusBlock.type);

  const hasError = useMemo(() => {
    return !!errorBlocksMap[focusIdx];
  }, [errorBlocksMap, focusIdx]);

  const hasErrorRef = useRefState(hasError);

  useEffect(() => {
    const handler = (payload: { currentIdx: string; nextIdx: string; }) => {
      if (hasErrorRef.current) {
        Message.warning('Please fix the error first');
        return false;
      }
      return true;
    };
    EventManager.on(EventType.FOCUS_IDX_CHANGE, handler);
    return () => {
      EventManager.off(EventType.FOCUS_IDX_CHANGE, handler);

    };
  }, [hasErrorRef]);

  if (!block) return null;

  return (
    <div>
      <div
        style={{
          border: '1px solid var(--color-neutral-3, rgb(229, 230, 235))',
          borderBottom: 'none',
          padding: '10px 24px',
        }}
      >
        <Stack vertical>
          <Stack.Item fill>
            <Stack wrap={false} distribution='equalSpacing' alignment='center'>
              <Stack spacing='extraTight' alignment='center'>
                <EyeIcon />
                <TextStyle variation='strong' size='large'>
                  {block.name}
                </TextStyle>
              </Stack>
              <Stack.Item>{props.extra}</Stack.Item>
            </Stack>
          </Stack.Item>
        </Stack>
      </div>

      <div style={{ padding: '0px', ...props.style }}>{props.children}</div>
    </div>
  );
};

function EyeIcon() {
  const { setFocusBlock, focusBlock } = useBlock();

  const onToggleVisible = useCallback(
    (e: React.MouseEvent) => {
      if (!focusBlock) return null;
      e.stopPropagation();
      setFocusBlock({
        ...focusBlock,
        data: {
          ...focusBlock.data,
          hidden: !focusBlock.data.hidden,
        },
      });
    },
    [focusBlock, setFocusBlock]
  );

  if (!focusBlock) return null;

  if (focusBlock.type === BasicType.PAGE) return null;

  return focusBlock.data.hidden ? (
    <IconEyeInvisible
      style={{ cursor: 'pointer', fontSize: 18 }}
      onClick={onToggleVisible}
    />
  ) : (
    <IconEye
      style={{ cursor: 'pointer', fontSize: 18 }}
      onClick={onToggleVisible}
    />
  );
}
