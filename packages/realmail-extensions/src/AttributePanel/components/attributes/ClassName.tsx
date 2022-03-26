import React, { useMemo } from 'react';
import { useFocusIdx } from 'realmail-editor';
import { TextField } from '../../../components/Form';

export function ClassName({ name }: { name?: string; }) {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <TextField label='Class name' name={name || `${focusIdx}.attributes.css-class`} />
    );
  }, [focusIdx, name]);
}
