import React, { useCallback, useMemo } from 'react';
import { InputWithUnitField } from '../../../components/Form';
import { useFocusIdx } from 'realmail-editor';
import { validation } from '@extensions/validation';

export function LineHeight({ name }: { name?: string; }) {
  const { focusIdx } = useFocusIdx();

  const validate = useCallback((val: string) => {
    if (!val) return;
    const Validate = validation.unit.typeConstructor('unit(px,%,)');
    const errMsg = new Validate(val || '').getErrorMessage();
    return errMsg ? `Attribute line-height ${errMsg}` : undefined;
  }, []);

  return useMemo(() => {
    return (
      <InputWithUnitField
        label='Line height'
        unitOptions='percent'
        name={name || `${focusIdx}.attributes.line-height`}
        validate={validate}
      />
    );
  }, [focusIdx, name, validate]);
}
