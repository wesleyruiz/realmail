import React, { useMemo } from 'react';
import { InputWithUnitField, TextField } from '../../../components/Form';
import { Stack, useFocusIdx } from 'realmail-editor';
import { Grid, Space } from '@arco-design/web-react';

export function Border({ prefixName }: { prefixName: string; }) {

  return useMemo(() => {
    return (
      <Grid.Row>
        <Grid.Col span={11}>
          <TextField label='Border' name={`${prefixName}.border`} />
        </Grid.Col>
        <Grid.Col offset={1} span={11}>
          <InputWithUnitField
            label='Border radius'
            name={`${prefixName}.border-radius`}
            unitOptions='percent'
          />
        </Grid.Col>
      </Grid.Row>
    );
  }, [prefixName]);
}
