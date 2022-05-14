import React, { useCallback } from 'react';

import { MergeTags as MergeTagsOptions } from '@extensions/AttributePanel';
import { ToolItem } from '../ToolItem';
import { IconFont } from 'realmail-editor';
import styleText from '../../styles/ToolsPopover.css?inline';

export interface MergeTagsProps {
  execCommand: (cmd: string, value: any) => void;
}

export function MergeTags(props: MergeTagsProps) {
  const { execCommand } = props;

  const onChange = useCallback((val: string) => {

    execCommand('insertHTML', val);
  }, [execCommand]);

  return (

    <ToolItem
      action='click'
      position='left'
      theme='light'
      title={(
        <div className='realmail-popover-scroll' style={{ maxHeight: 200, minWidth: 120, overflowY: 'auto', padding: '4px 12px', overflowX: 'hidden', }}>
          <style>{styleText}</style>
          <MergeTagsOptions
            value=''
            onChange={onChange}
          />
        </div>
      )}
      icon={<IconFont iconName='icon-merge-tags' />}
    />
  );
}
