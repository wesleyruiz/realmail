import React, { useMemo } from 'react';
import { InputWithUnitField } from '../../../components/Form';
import { useFocusIdx } from 'realmail-editor';

export function BorderRadius({ name }: { name?: string; }) {
  const { focusIdx } = useFocusIdx();
  return useMemo(() => {
    return (
      <InputWithUnitField
        label='Border radius'
        name={name || `${focusIdx}.attributes.border-radius`}
        unitOptions='percent'
      />
    );
  }, [focusIdx, name]);
}
