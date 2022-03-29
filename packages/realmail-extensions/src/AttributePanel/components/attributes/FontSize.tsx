import React from 'react';
import { useFocusIdx } from 'realmail-editor';
import { InputWithUnitField } from '../../../components/Form';

export function FontSize({ name }: { name?: string; }) {
  const { focusIdx } = useFocusIdx();

  return (
    <InputWithUnitField
      label='Font size'
      name={name || `${focusIdx}.attributes.font-size`}
    />
  );
}
