import { useBlock, useFocusIdx } from 'realmail-editor';
import React, { useCallback, useMemo } from 'react';
import { useField } from 'react-final-form';
import { Form, Switch } from '@arco-design/web-react';
import { AdvancedType, HIDE_DESKTOP_BLOCK_CLASS_NAME, HIDE_DESKTOP_INLINE_BLOCK_CLASS_NAME, HIDE_MOBILE_BLOCK_CLASS_NAME, HIDE_MOBILE_INLINE_BLOCK_CLASS_NAME } from 'realmail-core';

export function ResponsiveDesign({ mode }: { mode: 'desktop' | 'mobile'; }) {
  const { focusIdx } = useFocusIdx();
  const { focusBlock } = useBlock();

  const isInlineBlock = ([AdvancedType.COLUMN, AdvancedType.GROUP] as string[]).includes(focusBlock?.type || '');

  const label = mode === 'desktop' ? 'Hide on Desktop' : 'Hide on Mobile';
  const name = mode === 'desktop' ? `${focusIdx}.attributes.css-class` : `${focusIdx}.mobileAttributes.css-class`;

  const { input } = useField<string>(name, {
    parse: (v) => v,
  });

  const hideClassName = useMemo(() => {
    if (mode === 'desktop') {
      return isInlineBlock ? HIDE_DESKTOP_INLINE_BLOCK_CLASS_NAME : HIDE_DESKTOP_BLOCK_CLASS_NAME;
    }
    return isInlineBlock ? HIDE_MOBILE_INLINE_BLOCK_CLASS_NAME : HIDE_MOBILE_BLOCK_CLASS_NAME;
  }, [isInlineBlock, mode]);

  const onChange = useCallback((checked: boolean) => {
    let classNameText = input.value + ` ${hideClassName}`;

    if (!checked) {

      classNameText = classNameText.replace(new RegExp(` ${hideClassName}`, 'ig'), '');
      console.log('next', classNameText);
    }
    input.onChange(classNameText);

  }, [hideClassName, input]);

  const checked = useMemo(() => {
    return input.value.includes(hideClassName);
  }, [hideClassName, input.value]);

  return (
    <Form.Item
      style={{ marginBottom: 0 }}
      labelCol={{
        span: 12,
        style: {
          textAlign: 'left'
        }
      }}
      wrapperCol={{
        span: 11,
        style: {
          textAlign: 'right'
        }
      }}
      label={label}
    >
      <Switch
        size='small'
        checked={checked}
        onChange={onChange}
      />
    </Form.Item>
  );
}