
import { IconFont, isIFrameChildElement } from 'realmail-editor';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { ToolItem } from '../../ToolItem';
import { ColorResult, SketchPicker } from 'react-color';
import { debounce } from 'lodash';

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
    (color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) => {
      // 输入的时候要求是6位数字
      if (event.target.tagName.toLocaleLowerCase() === 'input' && event.target.value.replace('#', '').length !== 6) return;

      const newColor = color.hex;
      seCurColor(newColor);
      execCommand('foreColor', newColor);

    },
    [execCommand]
  );

  return (

    <ToolItem
      action='click'
      minTop={230}
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