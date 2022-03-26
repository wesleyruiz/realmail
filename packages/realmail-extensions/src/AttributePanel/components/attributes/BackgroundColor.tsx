import React, { useMemo } from 'react';
import { ColorPickerField } from '../../../components/Form';
import { useFocusIdx } from 'realmail-editor';

export function BackgroundColor({
  title = 'Background color',
  name
}: {
  title?: string;
  name?: string;
}) {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <ColorPickerField
        label={title}
        name={name || `${focusIdx}.attributes.background-color`}
        alignment='center'
      />
    );
  }, [focusIdx, name, title]);
}
