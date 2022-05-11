import React, { useCallback, useEffect } from 'react';

import { Menu, Popover } from '@arco-design/web-react';
import { ToolItem } from '../ToolItem';
import { IconFont } from 'realmail-editor';
import styleText from '../../styles/ToolsPopover.css?inline';

const list = [
  {
    value: '1',
    label: '12px',
  },
  {
    value: '2',
    label: '13px',
  },
  {
    value: '3',
    label: '16px',
  },
  {
    value: '4',
    label: '18px',
  },
  {
    value: '5',
    label: '24px',
  },
  {
    value: '6',
    label: '32px',
  },
  {
    value: '7',
    label: '48px',
  },
];

export interface FontSizeProps {
  execCommand: (cmd: string, value: any) => void;
}

export function FontSize(props: FontSizeProps) {
  const { execCommand } = props;

  const onChange = useCallback((val: string) => {
    execCommand('fontSize', val);
  }, [execCommand]);

  return (

    <ToolItem
      action='click'
      position='left'
      theme='light'
      title={(
        <>
          <style>{styleText}</style>
          <div
            className='realmail-popover-scroll'
            style={{
              maxWidth: 150,
              maxHeight: 200,
              minWidth: 120,
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: '4px 12px',
            }}
          >
            <Menu
              onClickMenuItem={onChange}
              selectedKeys={[]}
              style={{ border: 'none', padding: 0 }}
            >
              {list.map((item) => (
                <Menu.Item
                  style={{ lineHeight: '30px', height: 30 }}
                  key={item.value}
                >
                  {item.label}
                </Menu.Item>
              ))}
            </Menu>
          </div>
        </>
      )}
      icon={<IconFont iconName='icon-font-color' />}
    />

  );

}
