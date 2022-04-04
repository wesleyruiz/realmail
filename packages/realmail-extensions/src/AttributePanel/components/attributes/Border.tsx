import React, { useMemo } from 'react';
import { TextField } from '../../../components/Form';
import { useFocusIdx } from 'realmail-editor';
import { Grid } from '@arco-design/web-react';
import { BorderRadius } from './BorderRadius';

export function Border({ prefixName }: { prefixName?: string; }) {
  const { focusIdx } = useFocusIdx();
  prefixName = prefixName || `${focusIdx}.attributes`;
  return useMemo(() => {
    return (
      <Grid.Row>
        <Grid.Col span={11}>
          <TextField label='Border' name={`${prefixName}.border`} />
        </Grid.Col>
        <Grid.Col offset={1} span={11}>
          <BorderRadius name={`${prefixName}.border-radius`} />
        </Grid.Col>
      </Grid.Row>
    );
  }, [prefixName]);
}
