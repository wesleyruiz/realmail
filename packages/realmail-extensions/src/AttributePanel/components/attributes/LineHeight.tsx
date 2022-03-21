import React from 'react';
import { InputWithUnitField } from '../../../components/Form';
import { useFocusIdx } from 'realmail-editor';

export function LineHeight({ name }: { name?: string; }) {
  const { focusIdx } = useFocusIdx();

  return (
    <InputWithUnitField
      label='Line height'
      unitOptions='percent'
      name={name || `${focusIdx}.attributes.line-height`}
    />
  );
}
