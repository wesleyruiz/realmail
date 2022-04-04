import React, { useContext } from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import {
  ColorPickerField,
  ImageUploaderField,
  TextField,
} from '@extensions/components/Form';
import { Width } from '@extensions/AttributePanel/components/attributes/Width';
import { Height } from '@extensions/AttributePanel/components/attributes/Height';
import { Link } from '@extensions/AttributePanel/components/attributes/Link';
import { Align } from '@extensions/AttributePanel/components/attributes/Align';

import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse, Grid, Space, Tabs } from '@arco-design/web-react';
import { Border } from '@extensions/AttributePanel/components/attributes/Border';
import { IconFont, Stack, useEditorProps, useFocusIdx } from 'realmail-editor';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { ResponsiveDesign } from '../../attributes/ResponsiveDesign';

export function Image() {

  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <Tabs type='card-gutter'>
        <Tabs.TabPane title={<Space><IconFont iconName='icon-desktop' /><span>Desktop</span></Space>} key="1">
          <AttributesContainer mode="desktop" />
        </Tabs.TabPane>
        <Tabs.TabPane title={<Space><IconFont iconName='icon-mobile' /><span>Mobile</span></Space>} key="2">
          <AttributesContainer mode='mobile' />
        </Tabs.TabPane>
      </Tabs>
    </AttributesPanelWrapper>
  );
}

function AttributesContainer({ mode }: { mode: 'desktop' | 'mobile'; }) {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();
  return (
    <CollapseWrapper defaultActiveKey={['0', '1', '2', '3', '4']}>
      <Collapse.Item name='1' header='Setting'>
        <Stack vertical spacing='tight'>
          <ImageUploaderField
            label='src'
            labelHidden
            name={mode === 'desktop' ? `${focusIdx}.attributes.src` : `${focusIdx}.mobileAttributes.src`}
            helpText='The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.'
            uploadHandler={onUploadImage}
          />
          <ColorPickerField
            label='Background color'
            name={mode === 'desktop' ? `${focusIdx}.attributes.container-background-color` : `${focusIdx}.mobileAttributes.container-background-color`}
            inline
            alignment='center'
          />
        </Stack>
      </Collapse.Item>

      <Collapse.Item name='0' header='Dimension'>
        <Space direction='vertical'>
          <Grid.Row>
            <Grid.Col span={11}>
              <Width name={mode === 'desktop' ? `${focusIdx}.attributes.width` : `${focusIdx}.mobileAttributes.width`} />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <Height name={mode === 'desktop' ? `${focusIdx}.attributes.height` : `${focusIdx}.mobileAttributes.height`} />
            </Grid.Col>
          </Grid.Row>

          <Padding name={mode === 'desktop' ? `${focusIdx}.attributes.padding` : `${focusIdx}.mobileAttributes.padding`} />
          <Grid.Row>
            <Grid.Col span={24}>
              <Align name={mode === 'desktop' ? `${focusIdx}.attributes.align` : `${focusIdx}.mobileAttributes.align`} />
            </Grid.Col>
          </Grid.Row>
        </Space>
      </Collapse.Item>

      <Collapse.Item name='2' header='Link'>
        <Stack vertical spacing='tight'>
          <Link prefixName={mode === 'desktop' ? `${focusIdx}.attributes` : `${focusIdx}.mobileAttributes`} />
        </Stack>
      </Collapse.Item>

      <Collapse.Item name='3' header='Border'>
        <Border prefixName={mode === 'desktop' ? `${focusIdx}.attributes` : `${focusIdx}.mobileAttributes`} />
      </Collapse.Item>

      <Collapse.Item name='4' header='Extra'>
        <Grid.Row>
          <Grid.Col span={11}>
            <TextField label='title' name={mode === 'desktop' ? `${focusIdx}.attributes.title` : `${focusIdx}.mobileAttributes.title`} />
          </Grid.Col>
          <Grid.Col offset={1} span={11}>
            <TextField label='alt' name={mode === 'desktop' ? `${focusIdx}.attributes.alt` : `${focusIdx}.mobileAttributes.alt`} />
          </Grid.Col>
        </Grid.Row>
        <Grid.Col span={24}>
          <Grid.Col span={24}>
            <ResponsiveDesign mode={mode} />
          </Grid.Col>
          <TextField
            label='class name'
            name={mode === 'desktop' ? `${focusIdx}.attributes.css-class` : `${focusIdx}.mobileAttributes.css-class`}
          />
        </Grid.Col>
      </Collapse.Item>
    </CollapseWrapper>
  );
}