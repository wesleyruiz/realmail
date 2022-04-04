import React, { useCallback, useMemo } from 'react';
import { ColorPickerField } from '../../../components/Form';
import { useFocusIdx } from 'realmail-editor';
import { validation } from '@extensions/validation';

export function Color({
  title = 'Color',
  name
}: {
  title?: string;
  inline?: boolean;
  name?: string;
}) {
  const { focusIdx } = useFocusIdx();

  const validate = useCallback((val: string) => {
    if (!val) return;
    const Validate = validation.color.typeConstructor();
    const errMsg = new Validate(val || '').getErrorMessage();
    return errMsg ? `Attribute ${title.toLowerCase()} ${errMsg}` : undefined;
  }, [title]);

  return useMemo(() => {
    return (
      <ColorPickerField
        label={title}
        name={name || `${focusIdx}.attributes.color`}
        validate={validate}
      />
    );
  }, [focusIdx, name, title, validate]);
}
