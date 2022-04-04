import React, { useCallback } from 'react';
import {
  ColorPickerField,
  InputWithUnitField,
  SwitchField,
  TextAreaField,
  TextField,
} from '@extensions/components/Form';
import { Help } from '@extensions/AttributePanel/components/UI/Help';
import { AddFont } from '@extensions/components/Form/AddFont';
import { Collapse, Grid, Space } from '@arco-design/web-react';
import { Stack, TextStyle, useFocusIdx } from 'realmail-editor';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { FontFamily } from '../../attributes/FontFamily';
import { Color, FontSize, FontWeight, LineHeight, Width } from '../../attributes';
import { validation } from '@extensions/validation';

export function Page() {
  const { focusIdx } = useFocusIdx();

  const validate = useCallback((val: string) => {
    if (!val) return;
    const Validate = validation.unit.typeConstructor('unit(px)');
    const errMsg = new Validate(val || '').getErrorMessage();
    return errMsg ? `Attribute width ${errMsg}` : undefined;
  }, []);

  if (!focusIdx) return null;
  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <Stack.Item fill>
        <Collapse defaultActiveKey={['0', '1']}>
          <Collapse.Item name='0' header='Email Setting'>
            <Space style={{ width: '100%' }} direction='vertical'>
              <TextField label='Subject' name={'subject'} inline />
              {/* <TextField label='SubTitle' name={'subTitle'} inline /> */}
              <Width validate={validate} inline name={`${focusIdx}.attributes.width`} />
              {/* <InputWithUnitField
                label='Breakpoint'
                helpText='Allows you to control on which breakpoint the layout should go desktop/mobile.'
                name={`${focusIdx}.data.value.breakpoint`}
                inline
              /> */}
            </Space>
          </Collapse.Item>
          <Collapse.Item name='1' header='Theme Setting'>
            <Stack vertical spacing='tight'>
              <Grid.Row>
                <Grid.Col span={11}>
                  <FontFamily name={`${focusIdx}.data.value.font-family`} />
                </Grid.Col>
                <Grid.Col offset={1} span={11}>
                  <FontSize name={`${focusIdx}.data.value.font-size`} />
                </Grid.Col>
              </Grid.Row>

              <Grid.Row>
                <Grid.Col span={11}>
                  <LineHeight name={`${focusIdx}.data.value.line-height`} />
                </Grid.Col>
                <Grid.Col offset={1} span={11}>
                  <FontWeight name={`${focusIdx}.data.value.font-weight`} />
                </Grid.Col>
              </Grid.Row>

              <Grid.Row>
                <Grid.Col span={11}>
                  <Color title='Text color' name={`${focusIdx}.data.value.text-color`} />
                </Grid.Col>
                <Grid.Col offset={1} span={11}>
                  <Color title='Background' name={`${focusIdx}.attributes.background-color`} />
                </Grid.Col>
              </Grid.Row>

              <Grid.Row>
                <Color title='Content background' name={`${focusIdx}.data.value.content-background-color`} />
              </Grid.Row>

              <TextAreaField
                autoSize
                label='User style'
                name={`${focusIdx}.data.value.user-style.content`}
              />
              <Stack.Item />
              <Stack.Item />
              <AddFont />
              <Stack.Item />
              <Stack.Item />
            </Stack>
          </Collapse.Item>
        </Collapse>
      </Stack.Item>
    </AttributesPanelWrapper>
  );
}
