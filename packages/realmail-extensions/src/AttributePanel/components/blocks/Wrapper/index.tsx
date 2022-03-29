import React from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes//Padding';
import { Background } from '@extensions/AttributePanel/components/attributes//Background';
import { TextField } from '@extensions/components/Form';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse, Grid, Space, Tabs } from '@arco-design/web-react';
import { IconFont, Stack, useFocusIdx } from 'realmail-editor';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { ResponsiveDesign } from '../../attributes/ResponsiveDesign';

export function Wrapper() {

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
    <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
      <Collapse.Item name='0' header='Dimension'>
        <Stack vertical spacing='tight'>
          <Padding name={mode === 'desktop' ? `${focusIdx}.attributes.padding` : `${focusIdx}.mobileAttributes.padding`} />
        </Stack>
      </Collapse.Item>
      <Collapse.Item name='1' header='Background'>
        <Stack vertical spacing='tight'>
          <Background prefixName={mode === 'desktop' ? `${focusIdx}.attributes` : `${focusIdx}.mobileAttributes`} />
        </Stack>
      </Collapse.Item>
      <Collapse.Item name='2' header='Border'>
        <Stack vertical spacing='tight'>
          <TextField
            label='Border'
            name={mode === 'desktop' ? `${focusIdx}.attributes.border` : `${focusIdx}.mobileAttributes.border`}
            inline
          />
          <TextField
            label='Background border radius'
            name={mode === 'desktop' ? `${focusIdx}.attributes.border-radius` : `${focusIdx}.mobileAttributes.border-radius`}
            inline
          />
        </Stack>
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