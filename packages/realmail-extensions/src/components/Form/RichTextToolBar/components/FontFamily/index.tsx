import React, { useCallback } from 'react';

import { Menu, Popover } from '@arco-design/web-react';
import { ToolItem } from '../ToolItem';
import { IconFont } from 'realmail-editor';
import { useFontFamily } from '@extensions/hooks/useFontFamily';
import styleText from '../../styles/ToolsPopover.css?inline';
export interface FontFamilyProps {
  execCommand: (cmd: string, value: any) => void;
}

export function FontFamily(props: FontFamilyProps) {
  const { fontList } = useFontFamily();
  const { execCommand } = props;

  const onChange = useCallback((val: string) => {
    execCommand('fontName', val);
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
              {fontList.map((item) => (
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
      icon={<IconFont iconName='icon-font-family' />}
    />

  );
}
