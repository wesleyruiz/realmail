import React from 'react';
import { ColorPickerField } from '../../../components/Form';
import { useFocusIdx } from 'realmail-editor';

export function Color({
  title = 'Color',
}: {
  title?: string;
  inline?: boolean;
}) {
  const { focusIdx } = useFocusIdx();

  return (
    <ColorPickerField
      label={title}
      name={`${focusIdx}.attributes.color`}
      alignment='center'
    />
  );
}
