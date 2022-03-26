import React, { useState } from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { TextDecoration } from '@extensions/AttributePanel/components/attributes/TextDecoration';
import { FontWeight } from '@extensions/AttributePanel/components/attributes/FontWeight';
import { FontStyle } from '@extensions/AttributePanel/components/attributes/FontStyle';
import { FontFamily } from '@extensions/AttributePanel/components/attributes/FontFamily';
import { Height } from '@extensions/AttributePanel/components/attributes/Height';
import { ContainerBackgroundColor } from '@extensions/AttributePanel/components/attributes/ContainerBackgroundColor';
import { FontSize } from '@extensions/AttributePanel/components/attributes/FontSize';
import { Color } from '@extensions/AttributePanel/components/attributes/Color';
import { Align } from '@extensions/AttributePanel/components/attributes/Align';
import { LineHeight } from '@extensions/AttributePanel/components/attributes/LineHeight';
import { LetterSpacing } from '@extensions/AttributePanel/components/attributes/LetterSpacing';

import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse, Grid, Space, Switch, Tabs, Tooltip } from '@arco-design/web-react';
import { Button } from '@arco-design/web-react';
import { IconFont, useFocusIdx } from 'realmail-editor';
import { HtmlEditor } from '../../UI/HtmlEditor';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';

export function Text() {
  const [visible, setVisible] = useState(false);

  return (

    <AttributesPanelWrapper
      extra={(
        <Tooltip content='Html mode'>
          <Button
            onClick={() => setVisible(true)}
            icon={<IconFont iconName='icon-html' />}
          />
        </Tooltip>
      )}
    >
      <Tabs type='card-gutter'>
        <Tabs.TabPane title={<Space><IconFont size={12} iconName='icon-desktop' /><span>Desktop</span></Space>} key="1">
          <AttributesContainer mode="desktop" />
        </Tabs.TabPane>
        <Tabs.TabPane title={<Space><IconFont iconName='icon-mobile' /><span>Mobile</span></Space>} key="2">
          <AttributesContainer mode='mobile' />
        </Tabs.TabPane>
      </Tabs>

      <HtmlEditor visible={visible} setVisible={setVisible} />
    </AttributesPanelWrapper>

  );
}

function AttributesContainer({ mode }: { mode: 'desktop' | 'mobile'; }) {
  const { focusIdx } = useFocusIdx();
  return (
    <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
      <Collapse.Item name='0' header='Dimension'>
        <Space direction='vertical'>
          <Height name={mode === 'desktop' ? `${focusIdx}.attributes.height` : `${focusIdx}.mobileAttributes.height`} />
          <Padding name={mode === 'desktop' ? `${focusIdx}.attributes.padding` : `${focusIdx}.mobileAttributes.padding`} />
        </Space>
      </Collapse.Item>
      <Collapse.Item name='1' header='Color'>
        <Grid.Row>
          <Grid.Col span={11}>
            <Color name={mode === 'desktop' ? `${focusIdx}.attributes.color` : `${focusIdx}.mobileAttributes.color`} />
          </Grid.Col>
          <Grid.Col offset={1} span={11}>
            <ContainerBackgroundColor title='Background color' name={mode === 'desktop' ? `${focusIdx}.attributes.container-background-color` : `${focusIdx}.mobileAttributes.container-background-color`} />
          </Grid.Col>
        </Grid.Row>
      </Collapse.Item>
      <Collapse.Item name='2' header='Typography'>
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
              <LineHeight name={mode === 'desktop' ? `${focusIdx}.attributes.line-height` : `${focusIdx}.mobileAttributes.line-height`} />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <LetterSpacing name={mode === 'desktop' ? `${focusIdx}.attributes.letter-spacing` : `${focusIdx}.mobileAttributes.letter-spacing`} />
            </Grid.Col>
          </Grid.Row>

          <Grid.Row>
            <Grid.Col span={11}>
              <TextDecoration name={mode === 'desktop' ? `${focusIdx}.attributes.text-decoration` : `${focusIdx}.mobileAttributes.text-decoration`} />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <FontWeight name={mode === 'desktop' ? `${focusIdx}.attributes.font-weight` : `${focusIdx}.mobileAttributes.font-weight`} />
            </Grid.Col>
          </Grid.Row>

          <Align name={mode === 'desktop' ? `${focusIdx}.attributes.align` : `${focusIdx}.mobileAttributes.align`} />

          <FontStyle />

          <Grid.Row>
            <Grid.Col span={11} />
            <Grid.Col offset={1} span={11} />
          </Grid.Row>
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