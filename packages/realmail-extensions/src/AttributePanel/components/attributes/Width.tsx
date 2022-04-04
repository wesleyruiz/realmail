import React, { useCallback, useMemo } from 'react';
import { InputWithUnitField } from '../../../components/Form';
import { useFocusIdx } from 'realmail-editor';
import { InputWithUnitProps } from '@extensions/components/Form/InputWithUnit';
import { validation } from '@extensions/validation';

export function Width({
  inline = false,
  title = 'Width',
  unitOptions,
  name,
  validate: propsValidate,
}: {
  inline?: boolean;
  unitOptions?: InputWithUnitProps['unitOptions'];
  name?: string;
  title?: string;
  validate?: (val: string) => string | undefined;
}) {
  const { focusIdx } = useFocusIdx();

  const validate = useCallback((val: string) => {
    if (propsValidate) return propsValidate(val);
    if (!val) return;
    const Validate = validation.unit.typeConstructor('unit(px,%)');
    const errMsg = new Validate(val || '').getErrorMessage();
    return errMsg ? `Attribute ${title.toLowerCase()} ${errMsg}` : undefined;
  }, [propsValidate, title]);

  return useMemo(() => {
    return (
      (
        <InputWithUnitField
          validate={validate}
          label={title}
          inline={inline}
          name={name || `${focusIdx}.attributes.width`}
          unitOptions={unitOptions}

        />
      )
    );
  }, [focusIdx, inline, name, unitOptions, validate]);
}
