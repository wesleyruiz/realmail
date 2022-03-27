import React from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import {
  EditGridTabField,
  ImageUploaderField,
  InputWithUnitField,
  RadioGroupField,
  SelectField,
  TextField,
} from '@extensions/components/Form';
import { Align } from '@extensions/AttributePanel/components/attributes/Align';
import { IconClose, IconLink, IconPlus } from '@arco-design/web-react/icon';
import { Color } from '@extensions/AttributePanel/components/attributes/Color';
import { ContainerBackgroundColor } from '@extensions/AttributePanel/components/attributes/ContainerBackgroundColor';
import { FontFamily } from '@extensions/AttributePanel/components/attributes/FontFamily';
import { FontSize } from '@extensions/AttributePanel/components/attributes/FontSize';
import { FontStyle } from '@extensions/AttributePanel/components/attributes/FontStyle';
import { FontWeight } from '@extensions/AttributePanel/components/attributes/FontWeight';

import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Button, Card, Collapse, Grid, Space, Tabs, Typography } from '@arco-design/web-react';
import { TextDecoration } from '@extensions/AttributePanel/components/attributes/TextDecoration';
import { LineHeight } from '@extensions/AttributePanel/components/attributes/LineHeight';
import { IconFont, Stack, useBlock, useEditorProps, useFocusIdx } from 'realmail-editor';
import { ISocial } from 'realmail-core';
import { getImg } from '@extensions/AttributePanel/utils/getImg';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';

const options = [
  {
    value: 'vertical',
    label: 'vertical',
  },
  {
    value: 'horizontal',
    label: 'horizontal',
  },
];

export function Social() {
  const { focusBlock } = useBlock();
  const value = focusBlock?.data.value as ISocial['data']['value'];
  if (!value) return null;

  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <Tabs type='card-gutter'>
        <Tabs.TabPane title={<Space><IconFont size={12} iconName='icon-desktop' /><span>Desktop</span></Space>} key="1">
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
  return (
    <CollapseWrapper defaultActiveKey={['0', '1', '2', '3']}>
      <Collapse.Item name='1' header='Setting'>
        <Space direction='vertical'>
          <RadioGroupField
            label='Mode'
            name={mode === 'desktop' ? `${focusIdx}.attributes.mode` : `${focusIdx}.mobileAttributes.mode`}
            options={options}
          />

          <Align />

        </Space>
      </Collapse.Item>

      <Collapse.Item name='3' header='Typography'>
        <Space direction='vertical'>
          <Grid.Row>
            <Grid.Col span={11}>
              <FontFamily name={mode === 'desktop' ? `${focusIdx}.attributes.font-family` : `${focusIdx}.mobileAttributes.font-family`} />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <FontSize name={mode === 'desktop' ? `${focusIdx}.attributes.font-size` : `${focusIdx}.mobileAttributes.font-size`} />
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col span={11}>
              <FontWeight name={mode === 'desktop' ? `${focusIdx}.attributes.font-weight` : `${focusIdx}.mobileAttributes.font-weight`} />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <LineHeight name={mode === 'desktop' ? `${focusIdx}.attributes.line-height` : `${focusIdx}.mobileAttributes.line-height`} />
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col span={11}>
              <Color name={mode === 'desktop' ? `${focusIdx}.attributes.color` : `${focusIdx}.mobileAttributes.color`} />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>

              <ContainerBackgroundColor title='Background color' name={mode === 'desktop' ? `${focusIdx}.attributes.container-background-color` : `${focusIdx}.mobileAttributes.container-background-color`} />
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col span={11}>
              <TextDecoration name={mode === 'desktop' ? `${focusIdx}.attributes.text-decoration` : `${focusIdx}.mobileAttributes.text-decoration`} />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <FontStyle name={mode === 'desktop' ? `${focusIdx}.attributes.font-style` : `${focusIdx}.mobileAttributes.font-style`} />
            </Grid.Col>
          </Grid.Row>

        </Space>
      </Collapse.Item>

      {
        mode === 'desktop' && (
          <Collapse.Item
            name='2'
            header='Social item'
            contentStyle={{ padding: 10 }}
          >

            <EditGridTabField
              tabPosition='top'
              name={`${focusIdx}.data.value.elements`}
              label=''
              labelHidden
              renderItem={(item, index) => (
                <SocialElement item={item} index={index} />
              )}
            />
          </Collapse.Item>
        )
      }

      <Collapse.Item name='0' header='Dimension'>

        <Space direction="vertical" size="large">

          <Grid.Row>
            <Grid.Col span={11}>
              <InputWithUnitField
                label='Icon width'
                name={mode === 'desktop' ? `${focusIdx}.attributes.icon-size` : `${focusIdx}.mobileAttributes.icon-size`}
              />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <TextField
                label='Border radius'
                name={mode === 'desktop' ? `${focusIdx}.attributes.border-radius` : `${focusIdx}.mobileAttributes.border-radius`}
              />
            </Grid.Col>
          </Grid.Row>

          <Padding />
          <Padding name={mode === 'desktop' ? `${focusIdx}.attributes.inner-padding` : `${focusIdx}.mobileAttributes.inner-padding`} title='Icon padding' />
          <Padding name={mode === 'desktop' ? `${focusIdx}.attributes.text-padding` : `${focusIdx}.mobileAttributes.text-padding`} title='Text padding' />
        </Space>

      </Collapse.Item>
      <Collapse.Item name='4' header='Extra'>
        <Grid.Col span={24}>
          <ClassName name={mode === 'desktop' ? `${focusIdx}.attributes.css-class` : `${focusIdx}.mobileAttributes.css-class`} />
        </Grid.Col>
      </Collapse.Item>
    </CollapseWrapper>
  );
}

function SocialElement({
  index,
}: {
  item: ISocial['data']['value']['elements'][0];
  index: number;
}) {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();

  return (
    <Space direction='vertical'>
      <ImageUploaderField
        label='Image'
        labelHidden
        name={`${focusIdx}.data.value.elements.[${index}].src`}
        // helpText='The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.'
        uploadHandler={onUploadImage}
      />

      <Grid.Row>
        <Grid.Col span={11}>
          <TextField
            label='Content'
            name={`${focusIdx}.data.value.elements.[${index}].content`}
            quickchange
          />
        </Grid.Col>
        <Grid.Col offset={1} span={11}>
          <TextField
            prefix={<IconLink />}
            label='Link'
            name={`${focusIdx}.data.value.elements.[${index}].href`}
          />
        </Grid.Col>
      </Grid.Row>
      {/* <Grid.Row>
        <Grid.Col span={11}>
          <InputWithUnitField
            label='Icon width'
            name={`${focusIdx}.data.value.elements.[${index}].icon-size`}
          />
        </Grid.Col>
        <Grid.Col offset={1} span={11}>
          <InputWithUnitField
            label='Icon height'
            name={`${focusIdx}.data.value.elements.[${index}].icon-height`}
          />
        </Grid.Col>
      </Grid.Row> */}

    </Space>
  );
}

