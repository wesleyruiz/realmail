import React, { useMemo } from 'react';
import { useFocusIdx } from 'realmail-editor';
import { TextField } from '../../../components/Form';

export function BorderWidth({ name }: { name: string; }) {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <TextField
        label='Width'
        quickchange
        name={name || `${focusIdx}.attributes.border-width`}
      />
    );
  }, [focusIdx, name]);
}
