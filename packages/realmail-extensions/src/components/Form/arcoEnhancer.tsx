
import { Form, FormItemProps } from '@arco-design/web-react';
import React from 'react';
import { useMemo } from 'react';
import { useField } from 'react-final-form';
import { enhancer, EnhancerProps } from './enhancer';

export interface ArcoEnhancerProps extends EnhancerProps {
  formItem?: FormItemProps;
  label?: FormItemProps['label'];
  inline?: boolean;
  required?: boolean;
  style?: React.CSSProperties;
  helpText?: React.ReactNode;
}

export function arcoEnhancer<T extends { onChange?: (...rest: any) => any; }>(Com: React.FC<any>, changeAdapter: (...args: Parameters<NonNullable<T['onChange']>>) => any) {

  const Wrapper = function (props: ArcoEnhancerProps) {
    const { name, config, inline, formItem, label, required, validate, style, helpText, ...rest } = props;
    const {
      meta
    } = useField(name, config);

    const layoutStyle = useMemo((): FormItemProps => {
      if (inline) {
        return {
          labelCol: {
            span: 7,
            style: {
              textAlign: 'right',
              paddingRight: 0
            }
          },
          wrapperCol: {
            span: 16,
            style: {

            }
          },

        };
      }

      return {
        labelCol: {
          span: 24,
          style: {
            paddingRight: 0
          }
        },
        wrapperCol: {
          span: 24,

        }
      };

    }, [inline]);

    return (
      <Form.Item
        style={{
          ...style,
          margin: '0px',
        }}
        rules={required ? [{ required: true }] : undefined}
        {...layoutStyle}
        {...formItem}
        label={label || formItem?.label}
        labelAlign="left"
        validateStatus={meta.touched && meta.error ? 'error' : undefined}
        help={meta.touched && meta.error ? meta.error : helpText}
      >
        {
          <Com name={name} {...rest} />
        }
      </Form.Item>
    );
  };

  return enhancer<ArcoEnhancerProps & T>(Wrapper, changeAdapter);
}