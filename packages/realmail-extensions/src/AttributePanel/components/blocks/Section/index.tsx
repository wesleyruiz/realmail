import React from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { Background } from '@extensions/AttributePanel/components/attributes/Background';
import { Border } from '@extensions/AttributePanel/components/attributes/Border';
import { useCallback } from 'react';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse, Grid, Space, Switch, Tabs } from '@arco-design/web-react';
import { IconFont, Stack, useBlock, useFocusIdx } from 'realmail-editor';
import { BasicType, BlockManager } from 'realmail-core';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { Help } from '../../UI/Help';
import { ResponsiveDesign } from '../../attributes/ResponsiveDesign';
import { ResponsiveTabs } from '../../attributes/ResponsiveTabs';

export function Section() {

  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <ResponsiveTabs desktop={<AttributesContainer mode="desktop" />} mobile={<AttributesContainer mode='mobile' />} />
    </AttributesPanelWrapper>
  );
}

function AttributesContainer({ mode }: { mode: 'desktop' | 'mobile'; }) {
  const { focusIdx } = useFocusIdx();
  const { focusBlock, setFocusBlock } = useBlock();

  const noWrap = focusBlock?.data.value.noWrap;

  const onChange = useCallback((checked) => {
    if (!focusBlock) return;
    focusBlock.data.value.noWrap = checked;
    if (checked) {
      const children = [...focusBlock.children];
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (!child) continue;
        if (child.type === BasicType.GROUP) {
          children.splice(i, 1, ...child.children);
        }
      }
      focusBlock.children = [
        BlockManager.getBlockByType(BasicType.GROUP)!.create({
          children: children,
        }),
      ];
    } else {
      if (
        focusBlock.children.length === 1 &&
        focusBlock.children[0].type === BasicType.GROUP
      ) {
        focusBlock.children = focusBlock.children[0]?.children || [];
      }
    }
    setFocusBlock({ ...focusBlock });
  }, [focusBlock, setFocusBlock]);

  return (
    <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
      <Collapse.Item name='0' header='Dimension'>
        <Space direction='vertical'>

          <Grid.Row style={{ visibility: mode === 'desktop' ? undefined : 'hidden' }}>
            <Grid.Col span={8}>
              <label style={{ width: '100%', display: 'flex' }}>
                <Space size='mini'>
                  <span>Group</span> <Help title="Allows you to prevent columns from stacking on mobile" />
                </Space>
              </label>

            </Grid.Col>
            <Grid.Col span={12}>
              <Switch
                checked={noWrap}
                checkedText='True'
                uncheckedText='False'
                onChange={onChange}
              />
            </Grid.Col>
          </Grid.Row>

          <Padding name={mode === 'desktop' ? `${focusIdx}.attributes.padding` : `${focusIdx}.mobileAttributes.padding`} />
        </Space>
      </Collapse.Item>
      <Collapse.Item name='1' header='Background'>
        <Stack vertical spacing='tight'>
          <Background prefixName={mode === 'desktop' ? `${focusIdx}.attributes` : `${focusIdx}.mobileAttributes`} />
        </Stack>
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