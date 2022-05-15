import React from 'react';
import {
  InputWithUnitField,
  RadioGroupField,
  TextField,
} from '@extensions/components/Form';
import { Width } from '@extensions/AttributePanel/components/attributes/Width';
import { Height } from '@extensions/AttributePanel/components/attributes/Height';
import { VerticalAlign } from '@extensions/AttributePanel/components/attributes/VerticalAlign';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { Collapse, Grid, Space, Tabs } from '@arco-design/web-react';
import { IconFont, Stack, useEditorProps, useFocusIdx } from 'realmail-editor';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { ResponsiveDesign } from '../../attributes/ResponsiveDesign';
import { Color } from '../../attributes';
import { ImageUrl } from '../../attributes/ImageUrl';
import { ResponsiveTabs } from '../../attributes/ResponsiveTabs';

const options = [
  {
    value: 'fluid-height',
    label: 'Fluid height',
  },
  {
    value: 'fixed-height',
    label: 'Fixed height',
  },
];

export function Hero() {

  return (
    <AttributesPanelWrapper>
      <ResponsiveTabs desktop={<AttributesContainer mode="desktop" />} mobile={<AttributesContainer mode='mobile' />} />
    </AttributesPanelWrapper>
  );
}

function AttributesContainer({ mode }: { mode: 'desktop' | 'mobile'; }) {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();
  return (
    <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
      <Collapse.Item name='0' header='Dimension'>
        <Space direction='vertical'>
          <RadioGroupField
            label='Mode'
            name={mode === 'desktop' ? `${focusIdx}.attributes.mode` : `${focusIdx}.mobileAttributes.mode`}
            options={options}
          />
          <Grid.Row>
            <Grid.Col span={11}>
              <Width name={mode === 'desktop' ? `${focusIdx}.attributes.width` : `${focusIdx}.mobileAttributes.width`} />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <Height name={mode === 'desktop' ? `${focusIdx}.attributes.height` : `${focusIdx}.mobileAttributes.height`} />
            </Grid.Col>
          </Grid.Row>

          <Padding name={mode === 'desktop' ? `${focusIdx}.attributes.padding` : `${focusIdx}.mobileAttributes.padding`} />
          <VerticalAlign name={mode === 'desktop' ? `${focusIdx}.attributes.vertical-align` : `${focusIdx}.mobileAttributes.vertical-align`} />
        </Space>
      </Collapse.Item>
      <Collapse.Item name='1' header='Background'>
        <Space direction='vertical'>
          <ImageUrl
            name={mode === 'desktop' ? `${focusIdx}.attributes.background-url` : `${focusIdx}.mobileAttributes.background-url`}
          />

          <Grid.Row>
            <Grid.Col span={11}>
              <InputWithUnitField
                label='Background width'
                name={mode === 'desktop' ? `${focusIdx}.attributes.background-width` : `${focusIdx}.mobileAttributes.background-width`}
              />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <InputWithUnitField
                label='Background height'
                name={mode === 'desktop' ? `${focusIdx}.attributes.background-height` : `${focusIdx}.mobileAttributes.background-height`}
              />
            </Grid.Col>
          </Grid.Row>

          <Grid.Row>
            <Grid.Col span={11}>
              <TextField
                label='Background position'
                name={mode === 'desktop' ? `${focusIdx}.attributes.background-position` : `${focusIdx}.mobileAttributes.background-position`}
              />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <InputWithUnitField
                label='Border radius'
                unitOptions='percent'
                name={mode === 'desktop' ? `${focusIdx}.attributes.border-radius` : `${focusIdx}.mobileAttributes.border-radius`}
              />
            </Grid.Col>
            <Grid.Col span={11}>
              <Color title='Background color' name={mode === 'desktop' ? `${focusIdx}.attributes.background-color` : `${focusIdx}.mobileAttributes.background-color`} />

            </Grid.Col>
          </Grid.Row>
        </Space>
      </Collapse.Item>
      <Collapse.Item name='4' header='Extra'>
        <Grid.Col span={24}>
          <ResponsiveDesign mode={mode} />
        </Grid.Col>
        <Grid.Col span={24}>
          <ClassName name={mode === 'desktop' ? `${focusIdx}.attributes.css-class` : `${focusIdx}.mobileAttributes.css-class`} />
        </Grid.Col>
      </Collapse.Item>
    </CollapseWrapper>
  );
}