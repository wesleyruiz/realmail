import {
  BasicType,
  components,
  createBlock,
  getPreviewClassName,
  IBlockData,
  variableGenerate,
} from 'realmail-core';
import { merge } from 'lodash';
import React from 'react';
import { CustomBlocksType } from '../constants';
import { ProductItem } from './productsFormatter';

const {
  Column,
  Section,
  Wrapper,
  Text,
  Button,
  Image,
  Group,
  ForEach,
  Raw,
  When,
  ResponsiveBlock,
} = components;

export type IProductRecommendation = IBlockData<
  {
    'background-color': string;
    'button-color': string;
    'button-text-color': string;
    'product-name-color': string;
    'product-price-color': string;
    'product-compare-price-color': string;
    'title-color': string;
  },
  {
    title: string;
    buttonText: string;
    quantity: number;
  }
>;

const PRODUCT_SOURCE_NAME = 'products';
const PRODUCT_ITEM_NAME = 'product';
export const ProductRecommendation = createBlock<IProductRecommendation>({
  name: 'Product recommendation',
  type: CustomBlocksType.PRODUCT_RECOMMENDATION,
  validParentType: [BasicType.PAGE],
  create: payload => {
    const defaultData: IProductRecommendation = {
      type: CustomBlocksType.PRODUCT_RECOMMENDATION,
      data: {
        value: {
          title: 'You might also like',
          buttonText: 'Buy now',
          quantity: 3,
        },
      },
      attributes: {
        'background-color': '#ffffff',
        'button-text-color': '#ffffff',
        'button-color': '#414141',
        'product-name-color': '#414141',
        'product-price-color': '#414141',
        'product-compare-price-color': '#cccccc',
        'title-color': '#222222',
      },
      children: [],
    };
    return merge(defaultData, payload);
  },
  render: params => {
    const { data, idx, mode, context } = params;
    const { title, buttonText, quantity } = data.data.value;
    const attributes = data.attributes;
    const getVariable = variableGenerate<ProductItem, typeof PRODUCT_ITEM_NAME>();

    const generateRenderList = (chunkNum: number) => {
      return (
        <>
          <Raw>{`{% assign chunkProducts = ${PRODUCT_SOURCE_NAME} | chunk:${chunkNum} %}`}</Raw>
          <ForEach source={'chunkProducts'} item={'chunkProductsItem'}>
            <Section padding="0px">
              <Group vertical-align="top" direction="ltr">
                <ForEach
                  mockQuantity={chunkNum}
                  source={'chunkProductsItem'}
                  item={PRODUCT_ITEM_NAME}
                >
                  <Column
                    width={`${(100 / chunkNum).toFixed(1)}%`}
                    padding="0px"
                    border="none"
                    vertical-align="top"
                  >
                    <Image
                      align="center"
                      height="auto"
                      padding="10px"
                      width="150px"
                      src={getVariable('product.image_url')}
                    />
                  </Column>
                </ForEach>
              </Group>
            </Section>
            <Section padding="0px">
              <Group vertical-align="top" direction="ltr">
                <ForEach
                  mockQuantity={chunkNum}
                  source={'chunkProductsItem'}
                  item={PRODUCT_ITEM_NAME}
                >
                  <Column
                    width={`${(100 / chunkNum).toFixed(1)}%`}
                    padding="0px"
                    border="none"
                    vertical-align="top"
                  >
                    <Text
                      font-size="12px"
                      padding="10px 0px 10px 0px "
                      line-height="1"
                      align="center"
                      color={attributes['product-name-color']}
                    >
                      {getVariable('product.title')}
                    </Text>
                  </Column>
                </ForEach>
              </Group>
            </Section>
            <Section padding="0px">
              <Group vertical-align="top" direction="ltr">
                <ForEach
                  mockQuantity={chunkNum}
                  source={'chunkProductsItem'}
                  item={PRODUCT_ITEM_NAME}
                >
                  <Column
                    width={`${(100 / chunkNum).toFixed(1)}%`}
                    padding="0px"
                    border="none"
                    vertical-align="top"
                  >
                    <Text
                      font-size="12px"
                      padding="0px"
                      line-height="1"
                      align="center"
                      text-decoration="line-through"
                      color={attributes['product-compare-price-color']}
                    >
                      {getVariable('product.first_variant.compare_at_price.amount')}
                    </Text>
                  </Column>
                </ForEach>
              </Group>
            </Section>
            <Section padding="0px">
              <Group vertical-align="top" direction="ltr">
                <ForEach
                  mockQuantity={chunkNum}
                  source={'chunkProductsItem'}
                  item={PRODUCT_ITEM_NAME}
                >
                  <Column
                    width={`${(100 / chunkNum).toFixed(1)}%`}
                    padding="0px"
                    border="none"
                    vertical-align="top"
                  >
                    <Text
                      font-size="12px"
                      padding="0px"
                      line-height="1"
                      align="center"
                      color={attributes['product-price-color']}
                    >
                      {getVariable('product.first_variant.price.amount')}
                    </Text>
                  </Column>
                </ForEach>
              </Group>
            </Section>
            <Section padding="0px">
              <Group vertical-align="top" direction="ltr">
                <ForEach
                  mockQuantity={chunkNum}
                  source={'chunkProductsItem'}
                  item={PRODUCT_ITEM_NAME}
                >
                  <Column
                    width={`${(100 / chunkNum).toFixed(1)}%`}
                    padding="0px"
                    border="none"
                    vertical-align="top"
                  >
                    <Button
                      align="center"
                      padding="15px 0px"
                      background-color={attributes['button-color']}
                      color={attributes['button-text-color']}
                      target="_blank"
                      vertical-align="middle"
                      border="none"
                      text-align="center"
                      href={getVariable('product.product_url')}
                    >
                      {buttonText}
                    </Button>
                  </Column>
                </ForEach>
              </Group>
            </Section>
          </ForEach>
        </>
      );
    };

    return (
      <When expression="products.size > 0">
        <Wrapper
          padding="20px 0px 20px 0px"
          border="none"
          direction="ltr"
          text-align="center"
          background-color={attributes['background-color']}
          css-class={getPreviewClassName(idx, data.type)}
        >
          <Section padding="0px">
            <Column padding="0px" border="none" vertical-align="top">
              <Text
                font-size="20px"
                padding="10px 25px 10px 25px"
                line-height="1"
                align="center"
                font-weight="bold"
                color={attributes['title-color']}
              >
                {title}
              </Text>
            </Column>
          </Section>
          <ResponsiveBlock
            {...params}
            desktop={() => generateRenderList(3)}
            mobile={() => generateRenderList(2)}
          ></ResponsiveBlock>
        </Wrapper>
      </When>
    );
  },
});

export { Panel } from './Panel';
