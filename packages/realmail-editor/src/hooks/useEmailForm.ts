
import { IEmailTemplate } from '@/typings';
import { FormApi } from 'final-form';
import { useCallback } from 'react';
import { useForm, useFormState } from 'react-final-form';

export function useEmailForm<T extends IEmailTemplate>() {
  const formState = useFormState();
  const helpers = useForm<T>();
  const { change: changeForm } = helpers;

  const change: FormApi<T>['change'] = useCallback((...rest) => {
    changeForm(...rest);

  }, [changeForm]);

  return {
    formState,
    formHelpers: helpers,
    change,
  };
}
