import { getShopInfo } from './getShopInfo';

export function productsFormatter(
  products: SourceProductItem[]
): ProductItem[] {
  return products.map((product) => {
    const firstVariant = product.variants?.[0];
    return {
      id: product.id,
      title: product.title,
      product_url: `${getShopInfo('store.url')}/products/${product.handle}`,
      first_variant: {
        price: {
          amount: firstVariant?.price,
        },
        compare_at_price: {
          amount: firstVariant?.compare_at_price,
        },
      },
      image_url: product.image?.src || product.images?.[0]?.src,
    };
  });
}

export type SourceProductItem = {
  id: number;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  created_at: string;
  handle: string;
  updated_at: string;
  published_at: string;
  template_suffix?: string;
  status: string;
  published_scope: string;
  tags: string;
  admin_graphql_api_id: string;
  variants?: Array<{
    id: number;
    product_id: number;
    title: string;
    price: string;
    sku?: string;
    position: number;
    inventory_policy: string;
    compare_at_price?: string;
    fulfillment_service: string;
    inventory_management?: string;
    option1: string;
    option2: any;
    option3: any;
    created_at: string;
    updated_at: string;
    taxable: boolean;
    barcode?: string;
    grams: number;
    image_id?: number;
    weight: number;
    weight_unit: string;
    inventory_item_id: number;
    inventory_quantity: number;
    old_inventory_quantity: number;
    requires_shipping: boolean;
    admin_graphql_api_id: string;
  }>;
  options: Array<{
    id: number;
    product_id: number;
    name: string;
    position: number;
    values: Array<string>;
  }>;
  images: Array<{
    id: number;
    product_id: number;
    position: number;
    created_at: string;
    updated_at: string;
    alt: any;
    width: number;
    height: number;
    src: string;
    variant_ids: Array<number>;
    admin_graphql_api_id: string;
  }>;
  image?: {
    id: number;
    product_id: number;
    position: number;
    created_at: string;
    updated_at: string;
    alt: any;
    width: number;
    height: number;
    src: string;
    variant_ids: Array<number>;
    admin_graphql_api_id: string;
  };
};

export type ProductItem = {
  id: number;
  title: string;
  product_url: string;
  first_variant?: {
    price: {
      amount?: string;
      currency?: string;
    };
    compare_at_price?: {
      amount?: string;
      currency?: string;
    };
  };
  image_url: string;
};