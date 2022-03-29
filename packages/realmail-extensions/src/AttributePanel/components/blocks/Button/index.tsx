import React from 'react';
import { Padding } from '../../attributes/Padding';
import { Border } from '../../attributes/Border';
import { BackgroundColor } from '../../attributes/BackgroundColor';
import { Color } from '../../attributes/Color';
import { Link } from '../../attributes/Link';
import { Width } from '../../attributes/Width';
import { ContainerBackgroundColor } from '../../attributes/ContainerBackgroundColor';
import { Align } from '../../attributes/Align';
import { FontSize } from '../../attributes/FontSize';
import { FontStyle } from '../../attributes/FontStyle';
import { FontWeight } from '../../attributes/FontWeight';
import { FontFamily } from '../../attributes/FontFamily';
import { TextDecoration } from '../../attributes/TextDecoration';
import { LineHeight } from '../../attributes/LineHeight';
import { LetterSpacing } from '../../attributes/LetterSpacing';
import { Collapse, Grid, Popover, Space, Tabs } from '@arco-design/web-react';
import { TextField } from '../../../../components/Form';
import { IconFont, useEditorProps, useFocusIdx } from 'realmail-editor';
import { AttributesPanelWrapper } from '../../attributes/AttributesPanelWrapper';
import { MergeTags } from '../../attributes';
import { useField } from 'react-final-form';
import { Button as ArcoButton } from '@arco-design/web-react';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { ResponsiveDesign } from '../../attributes/ResponsiveDesign';

export function Button() {

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
  const { mergeTags } = useEditorProps();
  const { focusIdx } = useFocusIdx();
  const { input } = useField(`${focusIdx}.data.value.content`, {
    parse: (v) => v,
  });

  return (
    <CollapseWrapper defaultActiveKey={['-1', '0', '1', '2', '3']}>
      {
        mode === 'desktop' && (
          <Collapse.Item name='-1' header='Setting'>
            <Space direction='vertical'>
              <TextField
                label={(
                  <Space>
                    <span>Content</span>
                    {mergeTags && (
                      <Popover
                        trigger='click'
                        content={(
                          <MergeTags
                            value={input.value}
                            onChange={input.onChange}
                          />
                        )}
                      >
                        <ArcoButton
                          type='text'
                          icon={<IconFont iconName='icon-merge-tags' />}
                        />
                      </Popover>
                    )}
                  </Space>
                )}
                name={`${focusIdx}.data.value.content`}
              />
              <Link />
            </Space>
          </Collapse.Item>
        )
      }

      <Collapse.Item name='0' header='Dimension'>
        <Space direction='vertical'>
          <Grid.Row>
            <Grid.Col span={11}>
              <Width name={mode === 'desktop' ? `${focusIdx}.attributes.width` : `${focusIdx}.mobileAttributes.width`} />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <FontWeight name={mode === 'desktop' ? `${focusIdx}.attributes.font-weight` : `${focusIdx}.mobileAttributes.font-weight`} />
            </Grid.Col>
          </Grid.Row>

          <Padding title='Padding' name={mode === 'desktop' ? `${focusIdx}.attributes.padding` : `${focusIdx}.mobileAttributes.padding`} />
          <Padding title='Inner padding' name={mode === 'desktop' ? `${focusIdx}.attributes.inner-padding` : `${focusIdx}.mobileAttributes.inner-padding`} />
        </Space>
      </Collapse.Item>

      <Collapse.Item name='1' header='Color'>
        <Space direction='vertical'>
          <Grid.Row>
            <Grid.Col span={11}>
              <Color title='Text color' name={mode === 'desktop' ? `${focusIdx}.attributes.color` : `${focusIdx}.mobileAttributes.color`} />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <BackgroundColor title='Button color' name={mode === 'desktop' ? `${focusIdx}.attributes.background-color` : `${focusIdx}.mobileAttributes.background-color`} />
            </Grid.Col>
            <Grid.Col span={11}>
              <ContainerBackgroundColor title='Background color' name={mode === 'desktop' ? `${focusIdx}.attributes.container-background-color` : `${focusIdx}.mobileAttributes.container-background-color`} />
            </Grid.Col>
          </Grid.Row>
        </Space>
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
              <FontWeight name={mode === 'desktop' ? `${focusIdx}.attributes.font-weight` : `${focusIdx}.mobileAttributes.font-weight`} />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <LineHeight name={mode === 'desktop' ? `${focusIdx}.attributes.line-height` : `${focusIdx}.mobileAttributes.line-height`} />
            </Grid.Col>
          </Grid.Row>

          <Grid.Row>
            <Grid.Col span={11}>
              <TextDecoration name={mode === 'desktop' ? `${focusIdx}.attributes.text-decoration` : `${focusIdx}.mobileAttributes.text-decoration`} />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <LetterSpacing name={mode === 'desktop' ? `${focusIdx}.attributes.letter-spacing` : `${focusIdx}.mobileAttributes.letter-spacing`} />
            </Grid.Col>
          </Grid.Row>
          <Align name={mode === 'desktop' ? `${focusIdx}.attributes.align` : `${focusIdx}.mobileAttributes.align`} />

          <FontStyle name={mode === 'desktop' ? `${focusIdx}.attributes.font-style` : `${focusIdx}.mobileAttributes.font-style`} />
        </Space>
      </Collapse.Item>

      <Collapse.Item name='3' header='Border'>
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