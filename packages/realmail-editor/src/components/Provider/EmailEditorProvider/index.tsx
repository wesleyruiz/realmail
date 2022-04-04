import { IEmailTemplate } from '@/typings';
import { Form, useForm, useFormState, useField } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import React, { useCallback, useContext, useMemo } from 'react';
import { BlocksProvider } from '..//BlocksProvider';
import { HoverIdxProvider } from '../HoverIdxProvider';
import { PropsProvider, PropsProviderProps } from '../PropsProvider';
import { RecordProvider } from '../RecordProvider';
import { ScrollProvider } from '../ScrollProvider';
import { Config, FormApi, FormState } from 'final-form';
import { useEffect, useState } from 'react';
import setFieldTouched from 'final-form-set-field-touched';
import { FocusBlockLayoutProvider } from '../FocusBlockLayoutProvider';
import { PreviewEmailProvider } from '../PreviewEmailProvider';
import { get, isEqual, isObject } from 'lodash';
import { useEmailForm } from '@/hooks/useEmailForm';
import { useRef } from 'react';

export interface EmailEditorProviderProps<T extends IEmailTemplate = any>
  extends PropsProviderProps {
  data: T;
  children: (
    props: FormState<T>,
    helper: FormApi<IEmailTemplate, Partial<IEmailTemplate>>
  ) => React.ReactNode;
  onSubmit?: Config<IEmailTemplate, Partial<IEmailTemplate>>['onSubmit'];
  validationSchema?: Config<
    IEmailTemplate,
    Partial<IEmailTemplate>
  >['validate'];
}

export const EmailEditorProvider = <T extends any>(
  props: EmailEditorProviderProps & T
) => {
  const { data, children, onSubmit = () => { }, validationSchema } = props;

  const initialValues = useMemo(() => {
    return {
      subject: data.subject,
      subTitle: data.subTitle,
      content: data.content,
    };
  }, [data]);

  if (!initialValues.content) return null;

  return (
    <Form<IEmailTemplate>
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      validate={validationSchema}
      mutators={{ ...arrayMutators, setFieldTouched: setFieldTouched as any }}
      subscription={{ submitting: true, pristine: true }}
    >
      {() => (
        <>
          <PropsProvider {...props}>
            <PreviewEmailProvider>
              <RecordProvider>
                <BlocksProvider>
                  <HoverIdxProvider>
                    <ScrollProvider>
                      <FocusBlockLayoutProvider>
                        <FormWrapper children={children} />
                      </FocusBlockLayoutProvider>
                    </ScrollProvider>
                  </HoverIdxProvider>
                </BlocksProvider>
              </RecordProvider>
            </PreviewEmailProvider>

          </PropsProvider>
          <RegisterFields />
        </>
      )}
    </Form>
  );
};

function FormWrapper({
  children,
}: {
  children: EmailEditorProviderProps['children'];
}) {
  const data = useFormState<IEmailTemplate>();
  const helper = useForm<IEmailTemplate>();
  return <ValidationProvider>{children(data, helper)}</ValidationProvider>;
}

// final-form bug https://github.com/final-form/final-form/issues/169

const RegisterFields = React.memo(() => {
  const { touched } = useFormState<IEmailTemplate>();
  const [touchedMap, setTouchedMap] = useState<{ [key: string]: boolean; }>({});

  useEffect(() => {
    if (touched) {
      Object.keys(touched)
        .filter((key) => touched[key])
        .forEach((key) => {
          setTouchedMap((obj) => {
            obj[key] = true;
            return { ...obj };
          });
        });
    }
  }, [touched]);

  return (
    <>
      {Object.keys(touchedMap).map((key) => {
        return <RegisterField key={key} name={key} />;
      })}
    </>
  );
});

function RegisterField({ name, config }: { name: string; config?: any; }) {
  useField(name, config);
  return <></>;
}

const ValidationProvider: React.FC<{}> = (props) => {
  const [validationObj, setValidationObj] = useState<Record<string, any>>({});
  const { formState: { values, errors } } = useEmailForm();
  const lastErrorsMap = useRef<Record<string, string>>({});

  const errorsMap = useMemo(() => {

    const map: Record<string, string> = {};

    const loop = (key: string) => {
      const current = key ? get(errors, key) : errors;
      if (isObject(current)) {
        Object.keys(current).forEach(childKey => loop(key
          ?
          Array.isArray(current) ? `${key}.[${childKey}]` : `${key}.${childKey}`
          : childKey));
      } else {
        map[key] = current;
      }
    };

    if (errors) {
      loop('');
    }
    if (isEqual(lastErrorsMap.current, map)) return lastErrorsMap.current;
    lastErrorsMap.current = map;
    return map;
  }, [errors]);

  const addValidationField = useCallback((name: string, validation?: any) => {
    setValidationObj((old) => {
      if (old[name] === validation) {
        return old;
      }
      old[name] = validation;
      return {
        ...old
      };
    });
  }, []);

  useEffect(() => {
    setValidationObj((old) => {
      let isModify = false;
      Object.keys(old).forEach(key => {
        // 代表已经移除
        if (get(values, key) === undefined) {
          isModify = true;
          delete old[key];
        }
      });

      if (isModify) {
        return { ...old };
      }
      return old;

    });

  }, [values]);

  const errorBlocksMap = useMemo(() => {
    const map: Record<string, boolean> = {};

    Object.keys(errorsMap).forEach((key) => {
      let formatKey = key;

      if (/(.*\.children\.\[\d+\])\.(.*)$/.test(key)) {
        formatKey = key.replace(/(.*\.children\.\[\d+\])\.(.*)$/, '$1');
      } else if (/(content)\.(.*)$/.test(key)) {
        formatKey = key.replace(/(content)\.(.*)$/, '$1');
      }

      if (formatKey !== key) {
        map[formatKey] = true;
      }
    });

    return map;
  }, [errorsMap]);

  const value = useMemo(() => {
    return {
      value: validationObj,
      addValidationField,
      errorBlocksMap,
      errorsMap
    };
  }, [addValidationField, errorBlocksMap, errorsMap, validationObj]);

  return useMemo(() => {

    return (
      <ValidationContext.Provider value={value}>
        {props.children}
        {Object.keys(errorsMap).filter(Boolean).map(key => {
          return <RegisterField key={key} name={key} config={errorsMap[key]} />;
        })}
      </ValidationContext.Provider>
    );
  }, [errorsMap, props.children, value]);
};

const ValidationContext = React.createContext<{
  value: Record<string, any>;
  addValidationField: (name: string, validation?: Record<string, any>) => void;
  errorBlocksMap: Record<string, boolean>;
  errorsMap: Record<string, string>;
}>({
  value: {},
  addValidationField: () => { },
  errorBlocksMap: {},
  errorsMap: {}
});

export function useValidationContext() {
  return useContext(ValidationContext);
}