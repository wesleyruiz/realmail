import React from 'react';

import { Collapse, Grid, Space, Tabs } from '@arco-design/web-react';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { Width } from '@extensions/AttributePanel/components/attributes/Width';
import { VerticalAlign } from '@extensions/AttributePanel/components/attributes/VerticalAlign';
import { Background } from '@extensions/AttributePanel/components/attributes/Background';
import { Border } from '@extensions/AttributePanel/components/attributes/Border';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { useFocusIdx, IconFont } from 'realmail-editor';
import { ResponsiveDesign } from '../../attributes/ResponsiveDesign';

export function Column() {
  return (
    <AttributesPanelWrapper>

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
    <CollapseWrapper key={mode} defaultActiveKey={['0', '1', '2']}>
      <Collapse.Item name='0' header='Dimension'>
        <Space direction='vertical'>
          <Grid.Row>
            <Grid.Col span={11}>
              <Width name={mode === 'desktop' ? `${focusIdx}.attributes.width` : `${focusIdx}.mobileAttributes.width`} />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <VerticalAlign name={mode === 'desktop' ? `${focusIdx}.attributes.vertical-align` : `${focusIdx}.mobileAttributes.vertical-align`} />
            </Grid.Col>
          </Grid.Row>

          <Padding name={mode === 'desktop' ? `${focusIdx}.attributes.padding` : `${focusIdx}.mobileAttributes.padding`} />
        </Space>
      </Collapse.Item>
      <Collapse.Item name='1' header='Background'>
        <Background prefixName={mode === 'desktop' ? `${focusIdx}.attributes` : `${focusIdx}.mobileAttributes`} />
      </Collapse.Item>
      <Collapse.Item name='2' header='Border'>
        <Border prefixName={mode === 'desktop' ? `${focusIdx}.attributes` : `${focusIdx}.mobileAttributes`} />
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