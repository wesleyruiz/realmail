import { IBlockData } from '@core/typings';
import { BasicType } from '@core/constants';
import { createBlock } from '@core/utils/createBlock';
import { Wrapper } from '../Wrapper';
import { merge } from 'lodash';
import { generaMjmlMetaData } from '@core/utils/generaMjmlMetaData';
import { getAdapterAttributesString, getChildIdx, getPageIdx } from '@core/utils';
import React from 'react';
import { BlockRenderer } from '@core/components';
// only use in testing mode
import testingCss from './testing.scss?inline';

// only use in production mode
import basicCss from './basic.css?inline';
import inlineBasicCss from './inline-basic.css?inline';

export type IPage = IBlockData<
  {
    'background-color'?: string;
    width: string;
  },
  {
    breakpoint?: string;
    headAttributes: string;
    fonts?: { name: string; href: string }[];
    headStyles?: {
      content?: string;
      inline?: 'inline';
    }[];
    extraHeadContent?: string;
    responsive?: boolean;
    'font-family': string;
    'font-size': string;
    'font-weight': string;
    'line-height': string;
    'text-color': string;
    'user-style'?: {
      content?: string;
      inline?: 'inline';
    };
    'content-background-color'?: string;
  }
>;

export const Page = createBlock<IPage>({
  name: 'Page',
  type: BasicType.PAGE,
  create: payload => {
    const defaultData: IPage = {
      type: BasicType.PAGE,
      data: {
        value: {
          breakpoint: '480px',
          headAttributes: '',
          'font-size': '14px',
          'font-weight': '400',
          'line-height': '1.7',
          headStyles: [],
          fonts: [],
          responsive: true,
          'font-family':
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans','Helvetica Neue', sans-serif",
          'text-color': '#000000',
        },
      },
      attributes: {
        'background-color': '#efeeea',
        width: '600px',
      },
      children: [Wrapper.create()],
    };
    return merge(defaultData, payload);
  },
  render(params) {
    const { data, mode } = params;
    const metaData = generaMjmlMetaData(data);
    const value = data.data.value;

    const breakpoint = value.breakpoint
      ? `<mj-breakpoint width="${data.data.value.breakpoint}" />`
      : '';

    const nonResponsive = !value.responsive
      ? `<mj-raw>
            <meta name="viewport" />
           </mj-raw>
           <mj-style inline="inline">.mjml-body { width: ${
             data.attributes.width || '600px'
           }; margin: 0px auto; }</mj-style>`
      : '';

    const styles = [...(value.headStyles || [])];

    if (mode === 'testing') {
      styles.unshift({ content: testingCss });
    } else {
      styles.unshift({
        content: basicCss,
      });
      styles.unshift({
        content: inlineBasicCss,
        inline: 'inline',
      });
    }

    const stylesText =
      styles
        .map(
          style =>
            `<mj-style ${style.inline ? 'inline="inline"' : ''}>${
              style.content
            }</mj-style>`,
        )
        .join('\n') || '';

    const userStyle = value['user-style']
      ? `<mj-style ${value['user-style'].inline ? 'inline="inline"' : ''}>${
          value['user-style'].content
        }</mj-style>`
      : '';

    const extraHeadContent = value.extraHeadContent
      ? `<mj-raw>${value.extraHeadContent}</mj-raw>`
      : '';

    return (
      <>
        {`
          <mjml>
          <mj-head>
              ${metaData}
              ${nonResponsive}
              ${stylesText}
              ${userStyle}
              ${breakpoint}
              ${extraHeadContent}
              ${value.fonts
                ?.filter(Boolean)
                .map(item => `<mj-font name="${item.name}" href="${item.href}" />`)}
            <mj-attributes>
              ${value.headAttributes}
              ${
                value['font-family']
                  ? `<mj-all font-family="${value['font-family'].replace(/"/gm, '')}" />`
                  : ''
              }
              ${value['font-size'] ? `<mj-text font-size="${value['font-size']}" />` : ''}
              ${value['text-color'] ? `<mj-text color="${value['text-color']}" />` : ''}
        ${value['line-height'] ? `<mj-text line-height="${value['line-height']}" />` : ''}
        ${value['font-weight'] ? `<mj-text font-weight="${value['font-weight']}" />` : ''}
              ${
                value['content-background-color']
                  ? `<mj-wrapper background-color="${value['content-background-color']}" />
             <mj-section background-color="${value['content-background-color']}" />
            `
                  : ''
              }

            </mj-attributes>
          </mj-head>
          <mj-body ${getAdapterAttributesString(params)}>`}

        {data.children.map((child, index) => (
          <BlockRenderer
            {...params}
            idx={getChildIdx(getPageIdx(), index)}
            key={index}
            data={child}
          />
        ))}

        {'</mj-body></mjml > '}
      </>
    );
  },
  validParentType: [],
});
