
import { IconFont, isIFrameChildElement } from 'realmail-editor';
import React, { useCallback, useMemo, useState } from 'react';
import { ToolItem } from '../../ToolItem';
import { ColorResult, SketchPicker } from 'react-color';
import { isString } from 'lodash';

export function IconBgColor({ selectionRange, execCommand }: { selectionRange: Range | null; execCommand: (cmd: string, val?: any) => void; }) {

  const color = useMemo(() => {
    if (!selectionRange) return undefined;
    let bgColor = '';
    if (isIFrameChildElement(selectionRange.commonAncestorContainer)) {
      bgColor = getComputedStyle(selectionRange.commonAncestorContainer).backgroundColor;
    } else if (isIFrameChildElement(selectionRange.commonAncestorContainer.parentNode)) {
      bgColor = getComputedStyle(selectionRange.commonAncestorContainer.parentNode).backgroundColor;

    }
    if (isString(bgColor) && (bgColor.toLocaleLowerCase() === 'transparent' || bgColor === 'rgba(0, 0, 0, 0)')) {
      bgColor = '';
    }

    return bgColor;
  }, [selectionRange]);

  const [curColor, seCurColor] = useState(color);

  const onChangeComplete = useCallback(
    (color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) => {

      // 输入的时候要求是6位数字
      if (event.target.tagName.toLocaleLowerCase() === 'input' && event.target.value.replace('#', '').length !== 6) return;

      const newColor = color.hex;
      seCurColor(newColor);
      execCommand('backColor', newColor);

    },
    [execCommand]
  );

  return (

    <ToolItem
      action='click'
      autoPosition
      minTop={230}
      theme='light'
      icon={(
        <div style={{
          position: 'relative'
        }}
        >
          <IconFont size={12} iconName='icon-bg-color' style={{ position: 'relative', top: '-1px' }} />
          <div style={{ borderBottom: `2px solid ${color}`, position: 'absolute', width: '130%', left: '-15%', top: 16 }} />
        </div>
      )}
      title={(
        <SketchPicker
          color={curColor}
          presetColors={[]}
          disableAlpha
          onChangeComplete={onChangeComplete}
        />
      )}
    />
  );
}