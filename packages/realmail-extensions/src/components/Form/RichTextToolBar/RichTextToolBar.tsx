import { BasicType, getNodeTypeClassName } from 'realmail-core';
import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';
import { getShadowRoot, RICH_TEXT_BAR_ID, useEditorContext, useFocusBlockLayout } from 'realmail-editor';
import { Tools } from './components/Tools';
import styleText from './shadow-dom.scss?inline';

export function RichTextToolBar(props: { onChange: (s: string) => void; }) {

  const { focusBlockNode } = useFocusBlockLayout();
  const { pageData } = useEditorContext();

  const pageWidth = isNaN(parseInt(pageData.attributes.width)) ? 600 : parseInt(pageData.attributes.width);

  const translateX = useMemo(() => {
    const root = getShadowRoot();
    if (!root || !focusBlockNode) return null;
    const ele = root.querySelector(`.${getNodeTypeClassName(BasicType.PAGE)}`)!;

    if (!ele) return null;

    const { left: eleLeft, width: pageEleWidth } = ele.getBoundingClientRect();

    const { left: pageEleLeft, } = focusBlockNode?.getBoundingClientRect();

    return eleLeft - pageEleLeft + (pageEleWidth - pageWidth) / 2;

  }, [focusBlockNode, pageWidth]);

  if (!focusBlockNode) return null;

  return (
    <>
      {createPortal(
        <>
          <style dangerouslySetInnerHTML={{ __html: styleText }} />
          <div
            id={RICH_TEXT_BAR_ID}
            style={{
              transform: `translate(${translateX}px,calc(-100% - 1px))`,
              padding: '4px 8px',
              boxSizing: 'border-box',
              position: 'absolute',
              left: 0,
              top: 0,
              zIndex: 100,
              width: pageWidth,
              minWidth: 600,
              maxWidth: '100vw',
            }}
          >
            <div
              style={{
                position: 'absolute',
                backgroundColor: '#41444d',
                height: '100%',
                width: '100%',
                left: 0,
                top: 0,
              }}
            />

            <Tools onChange={props.onChange} />
          </div>
        </>,
        focusBlockNode
      )}
    </>
  );
}
