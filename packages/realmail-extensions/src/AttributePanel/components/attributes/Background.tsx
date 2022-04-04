import React, { useMemo } from 'react';
import {
  SelectField,
  TextField,
} from '../../../components/Form';
import { useFocusIdx } from 'realmail-editor';
import { Grid, Space } from '@arco-design/web-react';
import { ImageUrl } from './ImageUrl';
import { Color } from './Color';

const backgroundRepeatOptions = [
  {
    value: 'no-repeat',
    label: 'No repeat',
  },
  {
    value: 'repeat',
    label: 'Repeat',
  },
  {
    value: 'repeat-x',
    label: 'Repeat X',
  },
  {
    value: 'repeat-y',
    label: 'Repeat Y',
  },
];

export function Background({ prefixName }: { prefixName?: string; }) {
  const { focusIdx } = useFocusIdx();
  prefixName = prefixName || `${focusIdx}.attributes`;
  return useMemo(() => {
    return (
      <Space key={focusIdx} direction='vertical'>
        <ImageUrl name={`${prefixName}.background-url`} />

        <Grid.Row>
          <Grid.Col span={11}>
            <Color title='Background color' name={`${prefixName}.background-color`} />
          </Grid.Col>
          <Grid.Col offset={1} span={11}>
            <SelectField
              label='Background repeat'
              name={`${prefixName}.background-repeat`}
              options={backgroundRepeatOptions}
            />
          </Grid.Col>
        </Grid.Row>
        <TextField
          label='Background size'
          name={`${prefixName}.background-size`}
        />
      </Space>
    );
  }, [focusIdx, prefixName]);
}
