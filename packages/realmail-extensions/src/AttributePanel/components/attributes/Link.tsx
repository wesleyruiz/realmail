import React, { useMemo } from 'react';
import { useFocusIdx, Stack } from 'realmail-editor';
import { IconLink } from '@arco-design/web-react/icon';
import { SelectField, TextField } from '../../../components/Form';
import { Grid } from '@arco-design/web-react';

export function Link({ prefixName }: { prefixName?: string; }) {
  const { focusIdx } = useFocusIdx();
  prefixName = `${focusIdx}.attributes`;
  return useMemo(() => {
    return (
      <Grid.Row>
        <Grid.Col span={11}>
          <TextField
            prefix={<IconLink />}
            label={<span>Href&nbsp;&nbsp;&nbsp;</span>}
            name={`${prefixName}.href`}
          />
        </Grid.Col>
        <Grid.Col offset={1} span={11}>
          <SelectField
            label='Target'
            name={`${prefixName}.target`}
            options={[
              {
                value: '',
                label: '_self',
              },
              {
                value: '_blank',
                label: '_blank',
              },
            ]}
          />
        </Grid.Col>
      </Grid.Row>
    );
  }, [prefixName]);
}
