import React, { useCallback } from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import {
  TextField,
} from '@extensions/components/Form';
import { Width } from '@extensions/AttributePanel/components/attributes/Width';
import { Height } from '@extensions/AttributePanel/components/attributes/Height';
import { Link } from '@extensions/AttributePanel/components/attributes/Link';
import { Align } from '@extensions/AttributePanel/components/attributes/Align';

import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse, Grid, Space, Tabs } from '@arco-design/web-react';
import { Border } from '@extensions/AttributePanel/components/attributes/Border';
import { IconFont, Stack, useFocusIdx } from 'realmail-editor';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { ResponsiveDesign } from '../../attributes/ResponsiveDesign';
import { ImageUrl } from '../../attributes/ImageUrl';
import { Color } from '../../attributes';
import { validation } from '@extensions/validation';
import { ResponsiveTabs } from '../../attributes/ResponsiveTabs';

export function Image() {

  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <ResponsiveTabs desktop={<AttributesContainer mode="desktop" />} mobile={<AttributesContainer mode='mobile' />} />
    </AttributesPanelWrapper>
  );
}

function AttributesContainer({ mode }: { mode: 'desktop' | 'mobile'; }) {
  const { focusIdx } = useFocusIdx();

  const heightValidate = useCallback((val: string) => {
    if (!val) return;
    const Validate = validation.unit.typeConstructor('unit(px,auto)');
    const errMsg = new Validate(val || '').getErrorMessage();
    return errMsg ? `Attribute height ${errMsg}` : undefined;
  }, []);

  const widthValidate = useCallback((val: string) => {
    if (!val) return;
    const Validate = validation.unit.typeConstructor('unit(px)');
    const errMsg = new Validate(val || '').getErrorMessage();
    return errMsg ? `Attribute width ${errMsg}` : undefined;
  }, []);

  return (
    <CollapseWrapper defaultActiveKey={['0', '1', '2', '3', '4']}>
      <Collapse.Item name='1' header='Setting'>
        <Stack vertical spacing='tight'>
          <ImageUrl name={mode === 'desktop' ? `${focusIdx}.attributes.src` : `${focusIdx}.mobileAttributes.src`} />
          <Color
            title='Background color'
            name={mode === 'desktop' ? `${focusIdx}.attributes.container-background-color` : `${focusIdx}.mobileAttributes.container-background-color`}
          />
        </Stack>
      </Collapse.Item>

      <Collapse.Item name='0' header='Dimension'>
        <Space direction='vertical'>
          <Grid.Row>
            <Grid.Col span={11}>
              <Width validate={widthValidate} name={mode === 'desktop' ? `${focusIdx}.attributes.width` : `${focusIdx}.mobileAttributes.width`} />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <Height validate={heightValidate} name={mode === 'desktop' ? `${focusIdx}.attributes.height` : `${focusIdx}.mobileAttributes.height`} />
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