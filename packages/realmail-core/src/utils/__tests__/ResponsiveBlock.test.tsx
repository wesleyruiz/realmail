import { Column, ResponsiveBlock, Text } from '@core/components';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { unescape } from 'lodash';

describe('Test parseXml', () => {
  const desktop = <Text font-size="24px">111</Text>;
  const mobile = <Text font-size="12px">111</Text>;
  const com = unescape(
    renderToStaticMarkup(
      <ResponsiveBlock
        mode="production"
        blockData={{
          type: 'text',
          data: {
            value: {
              content: '111',
            },
          },
          attributes: {
            padding: '0px 25px 0px 25px',
            align: 'center',
          },
          children: [],
        }}
        desktop={desktop}
        mobile={mobile}
      />,
    ),
  );
  it('render as expect', () => {
    expect(com).toMatchSnapshot();
  });
});

describe('Test parseXml nested blocks', () => {
  const desktop = (
    <Column>
      <Text font-size="24px">111</Text>
    </Column>
  );
  const mobile = (
    <Column>
      <Text font-size="12">111</Text>
    </Column>
  );
  const com = unescape(
    renderToStaticMarkup(
      <ResponsiveBlock
        mode="production"
        blockData={{
          type: 'column',
          data: {
            value: {
              content: '111',
            },
          },
          attributes: {
            padding: '0px 25px 0px 25px',
            align: 'center',
          },
          children: [],
        }}
        desktop={desktop}
        mobile={mobile}
      />,
    ),
  );
  it('render as expect', () => {
    expect(com).toMatchSnapshot();
  });
});
