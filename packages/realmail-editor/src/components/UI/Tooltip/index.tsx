import { EASY_EMAIL_EDITOR_ID } from '@/constants';
import { getEditorRoot, getShadowRoot } from '@/utils';
import { classnames } from '@/utils/classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styleText from './index.scss?inline';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  tooltipStyle?: React.CSSProperties;
  position?: 'top' | 'bottom' | 'left' | 'right';
  getPopupContainer?: () => HTMLElement;
  mouseLeaveDelay?: number;
  mouseEnterDelay?: number;
  theme?: 'dark' | 'light';
  inEditor?: boolean;
  autoPosition?: boolean;
  action?: 'hover' | 'click';
  minTop?: number;
  minBottom?: number;
}

export const Tooltip = (props: TooltipProps) => {
  const popupContainerRef = useRef<HTMLDivElement>(null);
  const [refEle, setRefEle] = useState<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [positionStyle, setPositionStyle] = useState<React.CSSProperties | undefined>({});
  const { position = 'top', mouseLeaveDelay = 200, mouseEnterDelay = 200, theme = 'dark', inEditor, autoPosition, action = 'hover', minTop, minBottom } = props;
  const delayTimerRef = useRef<number | null>(null);

  const clearDelayTimer = useCallback(() => {
    if (delayTimerRef.current) {
      clearTimeout(delayTimerRef.current);
      delayTimerRef.current = null;
    }
  }, []);

  const delaySetVisible = useCallback((visible: boolean, delay: number, positionStyle?: React.CSSProperties) => {

    clearDelayTimer();
    if (delay) {
      delayTimerRef.current = window.setTimeout(() => {
        setPositionStyle(positionStyle);
        setVisible(visible);
        clearDelayTimer();
      }, delay);
    } else {
      setPositionStyle(positionStyle);
      setVisible(visible);
    }
  }, [clearDelayTimer]);

  const onMouseLeave = useCallback((e: MouseEvent) => {

    delaySetVisible(false, mouseLeaveDelay);
  }, [delaySetVisible, mouseLeaveDelay]);

  const calculatePosition = useCallback((position: TooltipProps['position']) => {
    if (!refEle) return;

    const { top, left, width, height, bottom, right } = refEle.getBoundingClientRect();
    let offsetX = 0;
    let offsetY = 0;

    if (inEditor) {
      const iframe = document.getElementById(EASY_EMAIL_EDITOR_ID)?.querySelector('iframe');
      if (iframe) {
        const { top, left } = iframe?.getBoundingClientRect();
        offsetY = top;
        offsetX = left;
      }
    }

    let formatPosition = position || 'top';

    if (autoPosition) {

      const midTop = document.body.clientHeight / 2;
      const midLeft = document.body.clientWidth / 2;

      if (['top', 'bottom'].includes(formatPosition)) {
        formatPosition = top + offsetY < midTop ? 'bottom' : 'top';
      }

      if (['left', 'right'].includes(formatPosition)) {
        formatPosition = left + offsetX < midLeft ? 'right' : 'left';
      }

    }

    const styles = {
      top: {
        left: left + width / 2 + offsetX,
        top: top - 10 + offsetY,
        transform: 'translate(-50%, -100%)'
      },
      bottom: {
        left: left + width / 2 + offsetX,
        top: bottom + 10 + offsetY,
        transform: 'translate(-50%, 0)'
      },
      left: {
        left: left - 10 + offsetX,
        top: bottom - height / 2 + offsetY,
        transform: 'translate(-100%, -50%)'
      },
      right: {
        left: right + 10 + offsetX,
        top: bottom - height / 2 + offsetY,
        transform: 'translate(0, -50%)'
      }
    };

    let style: { top: number; left: number; transform?: string; } = styles[position || 'top'];

    if (minTop && style.top < minTop) {
      style = styles['bottom'];
    }

    if (minBottom && bottom > minBottom) {
      style = styles['top'];
    }

    delaySetVisible(true, mouseEnterDelay, style);
  }, [autoPosition, delaySetVisible, inEditor, minBottom, minTop, mouseEnterDelay, refEle]);

  const onToggleVisible = useCallback(() => {
    if (!visible) {
      calculatePosition(position);
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [calculatePosition, position, visible]);

  useEffect(() => {
    if (action === 'hover') {
      const onMouseEnter = (e: MouseEvent) => {
        calculatePosition(position);
      };

      if (refEle) {
        refEle.addEventListener('mouseenter', onMouseEnter);
        refEle.addEventListener('mouseleave', onMouseLeave);
        return () => {
          refEle.removeEventListener('mouseenter', onMouseEnter);
          refEle.removeEventListener('mouseleave', onMouseLeave);
        };
      }
    }
  }, [action, calculatePosition, delaySetVisible, inEditor, mouseEnterDelay, onMouseLeave, position, refEle]);

  useEffect(() => {
    if (visible) {
      const onClick = (evt: MouseEvent) => {

        if (evt.target && popupContainerRef.current?.contains(evt.target as Node)) return;
        setVisible(false);
      };

      getShadowRoot().addEventListener('click', onClick, true);
      return () => {
        getShadowRoot().removeEventListener('click', onClick, true);
      };
    }
  }, [onToggleVisible, visible]);

  const popupContainer = props.getPopupContainer?.() || document.body;

  return (
    <>
      <style>{styleText}</style>
      <div
        onClick={onToggleVisible}
        ref={setRefEle}
        style={props.tooltipStyle}
      >
        {props.children}
      </div>
      {popupContainer &&
        visible &&

        createPortal(
          <div
            ref={popupContainerRef}
            className={classnames('email-editor-tooltip', `email-editor-tooltip-theme-${theme}`, `email-editor-tooltip-${props.position || 'top'}`)}
            style={{
              ...positionStyle
            }}
          >
            <div className='email-editor-tooltip-container'>
              <div
                style={{
                  pointerEvents: 'auto',
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "noto sans", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif'
                }}
              >
                {props.content}
              </div>
              <div className='email-editor-tooltip-arrow' />
            </div>
          </div>,
          popupContainer
        )}
    </>
  );
};
