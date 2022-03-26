import React, { useContext, useMemo } from 'react';
import {
  ImageUploaderField,
  InputWithUnitField,
  SelectField,
  TextField,
} from '../../../components/Form';
import { Stack, useFocusIdx, useEditorProps } from 'realmail-editor';
import { BackgroundColor } from './BackgroundColor';
import { Grid, Space } from '@arco-design/web-react';

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

export function Background({ prefixName }: { prefixName: string; }) {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();
  return useMemo(() => {
    return (
      <Space key={focusIdx} direction='vertical'>
        <ImageUploaderField
          label='Background image'
          name={`${prefixName}.background-url`}
          helpText='The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.'
          uploadHandler={onUploadImage}
        />

        <Grid.Row>
          <Grid.Col span={11}>
            <BackgroundColor name={`${prefixName}.background-color`} />
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
  }, [focusIdx, onUploadImage, prefixName]);
}
