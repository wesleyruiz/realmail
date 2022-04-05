import { Field, UseFieldConfig } from 'react-final-form';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useValidationContext } from 'realmail-editor';
import { debounce } from 'lodash';
import { Form, FormItemProps } from '@arco-design/web-react';

export interface EnhancerProps {
  name: string;
  onChangeBefore?: (value: any) => any;
  validate?: (value: any) => string | undefined | Promise<string | undefined>;
  config?: UseFieldConfig<any, any>;
  changeOnBlur?: boolean;
  formItem?: FormItemProps;
  label?: FormItemProps['label'];
  inline?: boolean;
  required?: boolean;
  style?: React.CSSProperties;
  helpText?: React.ReactNode;
}

const parse = (v: any) => v;
export function enhancer<P extends { onChange?: (...rest: any) => any; }>(
  Component: React.FC<any>,
  changeAdapter: (args: Parameters<NonNullable<P['onChange']>>) => any
) {
  return (
    props: EnhancerProps & Omit<P, 'value' | 'onChange' | 'mutators'>
  ) => {
    const {
      name,
      validate,
      onChangeBefore,
      changeOnBlur,
      inline,
      formItem,
      label,
      required,
      style,
      helpText,
      ...rest
    } = props;
    const { addValidationField } = useValidationContext();

    const config = useMemo(() => {
      return {
        ...props.config,
        validate: validate || props.config?.validate,
        parse: props.config?.parse || parse,
      };
    }, [props.config, validate]);

    const [currentValue, setCurrentValue] = useState('');

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
            offset: 1,
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

    return useMemo(() => {

      return (
        <Field name={name} {...config}>
          {({ input: { onBlur, onChange, value }, meta }) => {

            // eslint-disable-next-line react-hooks/exhaustive-deps
            const debounceCallbackChange = useCallback(
              debounce(
                (val) => {
                  onChange(val);
                },
                500,
                {
                  // maxWait: 500,
                }
              ),
              [onChange]
            );

            const onFieldChange: P['onChange'] = useCallback(
              (e: any) => {
                console.log();

                const newVal = onChangeBefore
                  ? onChangeBefore(changeAdapter(e))
                  : changeAdapter(e);
                setCurrentValue(newVal);
                if (!changeOnBlur) {
                  debounceCallbackChange(newVal);
                  onBlur();
                }

              },
              [debounceCallbackChange, onBlur]
            );

            const onFieldBlur = useCallback(() => {
              if (changeOnBlur) {
                onChange(currentValue);
                onBlur();
              }
            }, [onBlur, onChange]);

            useEffect(() => {
              setCurrentValue(value);
            }, [value]);

            useEffect(() => {
              addValidationField(name, config);
            }, []);

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
                <Component
                  {...rest}
                  name={name}
                  checked={currentValue}
                  value={currentValue}
                  onChange={onFieldChange}
                  onBlur={onFieldBlur}
                />
              </Form.Item>

            );
          }}
        </Field>

      );
    }, [addValidationField, changeOnBlur, config, currentValue, formItem, helpText, label, layoutStyle, name, onChangeBefore, required, rest, style]);
  };

}