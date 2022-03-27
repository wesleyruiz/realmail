import React, { useMemo } from 'react';
import { ColorPickerField } from '../../../components/Form';
import { useFocusIdx } from 'realmail-editor';

export function BorderColor({ name }: { name: string; }) {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <ColorPickerField
        label='Color'
        name={name || `${focusIdx}.attributes.border-color`}
      />
    );
  }, [focusIdx, name]);
}
