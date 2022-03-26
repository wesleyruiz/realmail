import React, { useMemo } from 'react';
import { Stack, useFocusIdx } from 'realmail-editor';
import { RadioGroupField } from '../../../components/Form';

const options = [
  {
    value: 'left',
    label: 'left',
  },
  {
    value: 'center',
    label: 'center',
  },
  {
    value: 'right',
    label: 'right',
  },
];

export function Align({ name }: { name: string; }) {
  const { focusIdx } = useFocusIdx();

  return (
    <RadioGroupField
      label='Align'
      name={name || `${focusIdx}.attributes.align`}
      options={options}
    />
  );
}
