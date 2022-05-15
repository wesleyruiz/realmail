import React from 'react';
import { Width } from '@extensions/AttributePanel/components/attributes/Width';
import { VerticalAlign } from '@extensions/AttributePanel/components/attributes/VerticalAlign';
import { Collapse, Grid, Space, Tabs } from '@arco-design/web-react';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { useFocusIdx, IconFont } from 'realmail-editor';
import { ResponsiveDesign } from '../../attributes/ResponsiveDesign';
import { Color } from '../../attributes';
import { ResponsiveTabs } from '../../attributes/ResponsiveTabs';

export function Group() {
  return (
    <AttributesPanelWrapper>
      <ResponsiveTabs desktop={<AttributesContainer mode="desktop" />} mobile={<AttributesContainer mode='mobile' />} />
    </AttributesPanelWrapper>
  );
}

function AttributesContainer({ mode }: { mode: 'desktop' | 'mobile'; }) {
  const { focusIdx } = useFocusIdx();
  return (
    <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
      <Collapse.Item name='0' header='Dimension'>
        <Grid.Row>
          <Grid.Col span={11}>
            <Width name={mode === 'desktop' ? `${focusIdx}.attributes.Width` : `${focusIdx}.mobileAttributes.Width`} />
          </Grid.Col>
          <Grid.Col offset={1} span={11}>
            <VerticalAlign name={mode === 'desktop' ? `${focusIdx}.attributes.vertical-align` : `${focusIdx}.mobileAttributes.vertical-align`} />
          </Grid.Col>
        </Grid.Row>
      </Collapse.Item>
      <Collapse.Item name='1' header='Background'>
        <Grid.Row>
          <Grid.Col span={11}>
            <Color title='Background color' name={mode === 'desktop' ? `${focusIdx}.attributes.background-color` : `${focusIdx}.mobileAttributes.background-color`} />
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