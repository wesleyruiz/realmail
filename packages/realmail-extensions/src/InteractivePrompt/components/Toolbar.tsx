import React from 'react';
import { BasicType, getParentIdx, getSiblingIdx } from 'realmail-core';
import {
  useBlock,
  useFocusIdx,
  useEditorProps,
  isTextBlock,
} from 'realmail-editor';
import { classnames } from '@extensions/utils/classnames';
import { useAddToCollection } from '@extensions/hooks/useAddToCollection';
import { getBlockTitle } from '@extensions/utils/getBlockTitle';

export function Toolbar() {
  const { moveBlock, copyBlock, removeBlock, focusBlock } = useBlock();
  const { focusIdx, setFocusIdx } = useFocusIdx();
  const { modal, setModalVisible } = useAddToCollection();
  const props = useEditorProps();

  const isPage = focusBlock?.type === BasicType.PAGE;
  // const isText = isTextBlock(focusBlock?.type);

  const handleMoveUp = () => {
    moveBlock(focusIdx, getSiblingIdx(focusIdx, -1));
  };

  const handleMoveDown = () => {
    moveBlock(focusIdx, getSiblingIdx(focusIdx, 1));
  };

  const handleAddToCollection = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setModalVisible(true);
  };

  const handleCopy: React.MouseEventHandler<HTMLDivElement> = (ev) => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    copyBlock(focusIdx);
  };

  const handleDelete = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    removeBlock(focusIdx);
  };

  const handleSelectParent = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setFocusIdx(getParentIdx(focusIdx)!);
  };

  // if (isText) return null;
  return (
    <>
      <div
        id='realmail-extensions-InteractivePrompt-Toolbar'
        style={{
          height: 0,

          zIndex: 100,
        }}
      >
        <div
          style={{
            fontSize: 14,
            lineHeight: '22px',
            pointerEvents: 'auto',
            color: '#ffffff',
            width: 25,
            transform: 'translate(calc(-100% - 1px), 0px)',
            borderRadius: 3,
            marginRight: 2,
            overflow: 'hidden',

            // justifyContent: 'space-between',
          }}
        >
          {/* <div
            style={{
              color: '#ffffff',
              backgroundColor: 'var(--selected-color)',
              height: '22px',

              display: 'inline-flex',
              padding: '1px 5px',
              boxSizing: 'border-box',
              whiteSpace: 'nowrap',
              maxWidth: 300,
              overflow: 'hidden',
            }}
          >
            {focusBlock && getBlockTitle(focusBlock, false)}
          </div> */}
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            onMouseDown={(ev) => {
              ev.preventDefault();
            }}
            style={{
              display: isPage ? 'none' : 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'auto',
            }}
          >
            {/* <ToolItem
              width={12}
              iconName='icon-back-parent'
              onClick={handleSelectParent}
            /> */}
            <ToolItem iconName='icon-copy' onClick={handleCopy} />
            {props.onAddCollection && (
              <ToolItem
                iconName='icon-collection'
                onClick={handleAddToCollection}
              />
            )}
            <ToolItem iconName='icon-delete' onClick={handleDelete} />
          </div>
        </div>
      </div>
      {modal}
    </>
  );
}

function ToolItem(props: {
  iconName: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  width?: number;
}) {
  return (
    <div
      onClick={props.onClick}
      style={{
        color: '#ffffff',
        backgroundColor: 'var(--selected-color)',
        height: 30,
        fontSize: props.width || 14,
        lineHeight: '30px',
        width: 25,
        display: 'flex',
        pointerEvents: 'auto',
        cursor: 'pointer',
        justifyContent: 'center',
      }}
      className={classnames('iconfont', props.iconName)}
    />
  );
}
