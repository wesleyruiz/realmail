import React from 'react';
import { ColorPickerField } from '../../../components/Form';
import { useFocusIdx } from 'realmail-editor';

export function Color({
  title = 'Color',
  name
}: {
  title?: string;
  inline?: boolean;
  name?: string;
}) {
  const { focusIdx } = useFocusIdx();

  return (
    <ColorPickerField
      label={title}
      name={name || `${focusIdx}.attributes.color`}
      alignment='center'
    />
  );
}
