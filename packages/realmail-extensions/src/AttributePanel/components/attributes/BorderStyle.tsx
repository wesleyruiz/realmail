import React, { useMemo } from 'react';
import { useFocusIdx } from 'realmail-editor';
import { SelectField } from '../../../components/Form';

export const borderStyleOptions = [
  {
    value: 'dashed',
    label: 'Dashed',
  },
  {
    value: 'dotted',
    label: 'Dotted',
  },
  {
    value: 'solid',
    label: 'Solid',
  },
  {
    value: 'double',
    label: 'double',
  },
  {
    value: 'ridge',
    label: 'ridge',
  },
  {
    value: 'groove',
    label: 'groove',
  },
  {
    value: 'inset',
    label: 'inset',
  },
  {
    value: 'outset',
    label: 'outset',
  },
];

export function BorderStyle({ name }: { name: string; }) {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <SelectField
        label='Style'
        name={name || `${focusIdx}.attributes.border-style`}
        options={borderStyleOptions}
      />
    );
  }, [focusIdx, name]);
}
