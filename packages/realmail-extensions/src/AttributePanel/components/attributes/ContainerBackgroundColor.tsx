import React, { useMemo } from 'react';
import { ColorPickerField } from '../../../components/Form';
import { useFocusIdx } from 'realmail-editor';

export function ContainerBackgroundColor({
  title = 'Container background color',
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
        name={name || `${focusIdx}.attributes.container-background-color`}
        alignment='center'
      />
    );
  }, [focusIdx, name, title]);
}
