import { validation } from '@extensions/validation';
import React, { useCallback, useMemo } from 'react';
import { useFocusIdx } from 'realmail-editor';
import { TextField } from '../../../components/Form';

export function BorderWidth({ name }: { name: string; }) {
  const { focusIdx } = useFocusIdx();

  const validate = useCallback((val: string) => {
    if (!val) return;
    const Validate = validation.unit.typeConstructor('unit(px,%)');
    const errMsg = new Validate(val || '').getErrorMessage();
    return errMsg ? `Attribute border-width ${errMsg}` : undefined;
  }, []);

  return useMemo(() => {
    return (
      <TextField
        label='Width'
        quickchange
        name={name || `${focusIdx}.attributes.border-width`}
        validate={validate}
      />
    );
  }, [focusIdx, name, validate]);
}
