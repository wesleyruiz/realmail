import { FIXED_CONTAINER_ID, Tooltip, TooltipProps } from 'realmail-editor';
import { classnames } from '@extensions/utils/classnames';
import React from 'react';

export const ToolItem: React.FC<{
  title?: React.ReactNode;
  icon: React.ReactNode;
  onClick?: React.MouseEventHandler<any>;
  trigger?: string;
  style?: React.CSSProperties;
  isActive?: boolean;
  theme?: 'light' | 'dark';
  action?: 'click' | 'hover';
} & Partial<TooltipProps>> = (props) => {
  if (!props.title) {
    return (
      <button
        tabIndex={-1}
        className="realmail-extensions-emailToolItem"
        onClick={props.onClick}
        style={props.style}
      >
        {props.icon}
      </button>
    );
  }

  return (
    <Tooltip
      action={props.action}
      theme={props.theme}
      position={props.position}
      content={props.title}
      minTop={230}
      inEditor
      getPopupContainer={() => document.getElementById(FIXED_CONTAINER_ID)!}
    >
      <button
        tabIndex={-1}
        className={classnames(
          'realmail-extensions-emailToolItem',
          props.isActive && 'realmail-extensions-emailToolItem-active'
        )}
        onClick={props.onClick}
        style={props.style}
      >
        {props.icon}
      </button>
    </Tooltip>
  );
};
