import { validation } from '@extensions/validation';
import React, { useCallback } from 'react';
import { useFocusIdx } from 'realmail-editor';
import { InputWithUnitField } from '../../../components/Form';

export function FontSize({ name }: { name?: string; }) {
  const { focusIdx } = useFocusIdx();

  const validate = useCallback((val: string) => {
    if (!val) return;
    const Validate = validation.unit.typeConstructor('unit(px)');
    const errMsg = new Validate(val || '').getErrorMessage();
    return errMsg ? `Attribute font size ${errMsg}` : undefined;
  }, []);

  return (
    <InputWithUnitField
      label='Font size'
      name={name || `${focusIdx}.attributes.font-size`}
      validate={validate}
    />
  );
}
