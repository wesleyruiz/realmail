import React from 'react';
import { Height } from '@extensions/AttributePanel/components/attributes/Height';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse, Grid, Space, Tabs } from '@arco-design/web-react';
import { IconFont, useFocusIdx } from 'realmail-editor';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { ResponsiveDesign } from '../../attributes/ResponsiveDesign';
import { Color } from '../../attributes';
import { ResponsiveTabs } from '../../attributes/ResponsiveTabs';

export function Spacer() {
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
          <Height name={mode === 'desktop' ? `${focusIdx}.attributes.height` : `${focusIdx}.mobileAttributes.height`} />
          <Padding name={mode === 'desktop' ? `${focusIdx}.attributes.padding` : `${focusIdx}.mobileAttributes.padding`} />
        </Space>
      </Collapse.Item>

      <Collapse.Item name='2' header='Background'>
        <Color title='Background color' name={mode === 'desktop' ? `${focusIdx}.attributes.container-background-color` : `${focusIdx}.mobileAttributes.container-background-color`} />
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