import React from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { BorderWidth } from '@extensions/AttributePanel/components/attributes/BorderWidth';
import { BorderStyle } from '@extensions/AttributePanel/components/attributes/BorderStyle';
import { Width } from '@extensions/AttributePanel/components/attributes/Width';
import { Align } from '@extensions/AttributePanel/components/attributes/Align';

import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse, Grid, Space, Tabs } from '@arco-design/web-react';
import { IconFont, Stack, useFocusIdx } from 'realmail-editor';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { ResponsiveDesign } from '../../attributes/ResponsiveDesign';
import { Color } from '../../attributes';
import { ResponsiveTabs } from '../../attributes/ResponsiveTabs';

export function Divider() {
  return (
    <AttributesPanelWrapper>
      <ResponsiveTabs desktop={<AttributesContainer mode="desktop" />} mobile={<AttributesContainer mode='mobile' />} />
    </AttributesPanelWrapper>
  );
}

function AttributesContainer({ mode }: { mode: 'desktop' | 'mobile'; }) {
  const { focusIdx } = useFocusIdx();
  return (
    <CollapseWrapper defaultActiveKey={['-1', '0', '1', '2', '3']}>
      <Collapse.Item name='1' header='Dimension'>
        <Space direction='vertical'>
          <Grid.Row>
            <Grid.Col span={11}>
              <Width unitOptions='percent' name={mode === 'desktop' ? `${focusIdx}.attributes.width` : `${focusIdx}.mobileAttributes.width`} />
            </Grid.Col>
            <Grid.Col offset={1} span={11} />
          </Grid.Row>

          <Align name={mode === 'desktop' ? `${focusIdx}.attributes.align` : `${focusIdx}.mobileAttributes.align`} />
          <Padding name={mode === 'desktop' ? `${focusIdx}.attributes.padding` : `${focusIdx}.mobileAttributes.padding`} />
        </Space>
      </Collapse.Item>

      <Collapse.Item name='2' header='Border'>
        <Grid.Row>
          <Grid.Col span={6}>
            <BorderWidth name={mode === 'desktop' ? `${focusIdx}.attributes.border-width` : `${focusIdx}.mobileAttributes.border-width`} />
          </Grid.Col>
          <Grid.Col span={8}>
            <BorderStyle name={mode === 'desktop' ? `${focusIdx}.attributes.border-style` : `${focusIdx}.mobileAttributes.border-style`} />
          </Grid.Col>
          <Grid.Col span={10}>
            <Color title='Border color' name={mode === 'desktop' ? `${focusIdx}.attributes.border-color` : `${focusIdx}.mobileAttributes.border-color`} />
          </Grid.Col>
        </Grid.Row>

      </Collapse.Item>

      <Collapse.Item name='3' header='Background'>
        <Grid.Row>
          <Grid.Col span={11}>
            <Color title='Background color' name={mode === 'desktop' ? `${focusIdx}.attributes.container-background-color` : `${focusIdx}.mobileAttributes.container-background-color`} />
          </Grid.Col>
          <Grid.Col offset={1} span={11} />
        </Grid.Row>
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