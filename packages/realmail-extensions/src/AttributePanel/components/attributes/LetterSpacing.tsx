import React, { useCallback } from 'react';
import { InputWithUnitField } from '../../../components/Form';
import { useFocusIdx } from 'realmail-editor';
import { validation } from '@extensions/validation';

export function LetterSpacing({ name }: { name?: string; }) {
  const { focusIdx } = useFocusIdx();

  const validate = useCallback((val: string) => {
    if (!val) return;
    const Validate = validation.unit.typeConstructor('unitWithNegative(px,em)');
    const errMsg = new Validate(val || '').getErrorMessage();
    return errMsg ? `Attribute letter-spacing ${errMsg}` : undefined;
  }, []);

  return (
    <InputWithUnitField
      label='Letter spacing'
      name={name || `${focusIdx}.attributes.letter-spacing`}
      validate={validate}
    />
  );
}
