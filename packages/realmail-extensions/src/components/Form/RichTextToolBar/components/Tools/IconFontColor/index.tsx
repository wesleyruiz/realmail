
import { IconFont, isIFrameChildElement } from 'realmail-editor';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { ToolItem } from '../../ToolItem';
import { ColorResult, SketchPicker } from 'react-color';

export function IconFontColor({ selectionRange, execCommand, }: { selectionRange: Range | null; execCommand: (cmd: string, val?: any) => void; }) {

  const color = useMemo(() => {
    if (!selectionRange) return undefined;
    if (isIFrameChildElement(selectionRange.commonAncestorContainer)) {
      return getComputedStyle(selectionRange.commonAncestorContainer).color;
    } else if (isIFrameChildElement(selectionRange.commonAncestorContainer.parentNode)) {
      return getComputedStyle(selectionRange.commonAncestorContainer.parentNode).color;

    }

    return undefined;
  }, [selectionRange]);

  const [curColor, seCurColor] = useState(color);

  const onChangeComplete = useCallback(
    (color: ColorResult) => {

      const newColor = color.hex;
      seCurColor(newColor);
      execCommand('foreColor', newColor);
    },
    [execCommand]
  );

  return (

    <ToolItem
      action='click'
      autoPosition
      theme='light'
      icon={(
        <div style={{
          position: 'relative'
        }}
        >
          <IconFont size={12} iconName='icon-font-color' style={{ position: 'relative', top: '-1px' }} />
          <div style={{ borderBottom: `2px solid ${color}`, position: 'absolute', width: '130%', left: '-15%', top: 16 }} />
        </div>
      )}
      title={(
        <SketchPicker
          presetColors={[]}
          color={curColor}
          disableAlpha
          onChangeComplete={onChangeComplete}
        />
      )}
    />

  );
}