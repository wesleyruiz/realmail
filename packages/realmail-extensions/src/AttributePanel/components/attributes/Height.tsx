import React, { useCallback, useMemo } from 'react';
import { TextField } from '../../../components/Form';
import { useFocusIdx, Stack } from 'realmail-editor';
import { validation } from '@extensions/validation';

export function Height({ inline, name, title = 'height' }: { inline?: boolean; name?: string; title?: string; }) {
  const { focusIdx } = useFocusIdx();

  const validate = useCallback((val: string) => {
    if (!val) return;
    const Validate = validation.unit.typeConstructor('unit(px,%)');
    const errMsg = new Validate(val || '').getErrorMessage();
    return errMsg ? `Attribute ${title.toLowerCase()} ${errMsg}` : undefined;
  }, [title]);

  return useMemo(() => {
    return (
      <Stack wrap={false}>
        <Stack.Item fill>
          <TextField
            label='Height'
            name={name || `${focusIdx}.attributes.height`}
            quickchange
            inline={inline}
            validate={validate}
          />
        </Stack.Item>
      </Stack>
    );
  }, [focusIdx, inline, name, validate]);
}
