import { productsFormatter } from './components/CustomBlocks/ProductRecommendation/productsFormatter';
export const testMergeTags = {
  user: {
    name: 'Ryan',
    age: 26,
    avatar:
      'https://assets.maocanhua.cn/bbb041da-62c3-4e6a-9648-60a06738836b-image.png',
    email: 'realmail@gmail.com',
    project: 'Easy email',
  },
  date: {
    today: new Date().toDateString()
  },
  emptyList: [],
  product_list: [
    {
      id: 0,
      image:
        'https://assets.maocanhua.cn/da9b173d-b272-4101-aa25-4635ed95e9e3-image.png',
      title: 'Slim Fit Printed shirt',
      price: '$59.99 HKD',
      url: 'https://realmail.vercel.app',
    },
    {
      id: 1,
      image:
        'https://assets.maocanhua.cn/4ef7cb65-ee1f-4b12-832c-17ab07a8b9ac-image.png',
      title: 'Casual Collar Youth Handsome',
      price: '$39.99 HKD',
      url: 'https://realmail.vercel.app',
    },
    {
      id: 2,
      image:
        'https://assets.maocanhua.cn/88fe9bfa-547f-4d5e-9ba5-ac6b91572dde-image.png',
      title: 'Shirt Business Casual',
      price: '$49.99 HKD',
      url: 'https://realmail.vercel.app',
    },
    {
      id: 3,
      image:
        'https://assets.maocanhua.cn/da9b173d-b272-4101-aa25-4635ed95e9e3-image.png',
      title: 'Slim Fit Printed shirt',
      price: '$59.99 HKD',
      url: 'https://realmail.vercel.app',
    },
    {
      id: 4,
      image:
        'https://assets.maocanhua.cn/4ef7cb65-ee1f-4b12-832c-17ab07a8b9ac-image.png',
      title: 'Casual Collar Youth Handsome',
      price: '$39.99 HKD',
      url: 'https://realmail.vercel.app',
    },
    {
      id: 5,
      image:
        'https://assets.maocanhua.cn/88fe9bfa-547f-4d5e-9ba5-ac6b91572dde-image.png',
      title: 'Shirt Business Casual',
      price: '$49.99 HKD',
      url: 'https://realmail.vercel.app',
    },
  ],
  company: {
    name: 'Easy email',
    member_list: [
      {
        id: 1,
        name: 'James',
        hobby: 'Swimming',
        age: 28,
        product_list: [
          {
            id: 0,
            image:
              'https://assets.maocanhua.cn/da9b173d-b272-4101-aa25-4635ed95e9e3-image.png',
            title: 'Slim Fit Printed shirt',
            price: '$59.99 HKD',
            url: 'https://realmail.vercel.app',
          },
          {
            id: 1,
            image:
              'https://assets.maocanhua.cn/4ef7cb65-ee1f-4b12-832c-17ab07a8b9ac-image.png',
            title: 'Casual Collar Youth Handsome Slim Print Blazer',
            price: '$59.99 HKD',
            url: 'https://realmail.vercel.app',
          },
          {
            id: 2,
            image:
              'https://assets.maocanhua.cn/88fe9bfa-547f-4d5e-9ba5-ac6b91572dde-image.png',
            title: 'Shirt Business Casual',
            price: '$59.99 HKD',
            url: 'https://realmail.vercel.app',
          },
        ],
      },
      {
        id: 2,
        name: 'Nick',
        hobby: 'Coding',
        age: 29,
        product_list: [
          {
            id: 0,
            image:
              'https://assets.maocanhua.cn/da9b173d-b272-4101-aa25-4635ed95e9e3-image.png',
            title: 'Slim Fit Printed shirt',
            price: '$59.99 HKD',
            url: 'https://realmail.vercel.app',
          },
          {
            id: 1,
            image:
              'https://assets.maocanhua.cn/4ef7cb65-ee1f-4b12-832c-17ab07a8b9ac-image.png',
            title: 'Casual Collar Youth Handsome Slim Print Blazer',
            price: '$59.99 HKD',
            url: 'https://realmail.vercel.app',
          },
          {
            id: 2,
            image:
              'https://assets.maocanhua.cn/88fe9bfa-547f-4d5e-9ba5-ac6b91572dde-image.png',
            title: 'Shirt Business Casual',
            price: '$59.99 HKD',
            url: 'https://realmail.vercel.app',
          },
        ],
      },
      {
        id: 3,
        name: 'Robert',
        hobby: 'skiing',
        age: 30,
        product_list: [
          {
            id: 0,
            image:
              'https://assets.maocanhua.cn/da9b173d-b272-4101-aa25-4635ed95e9e3-image.png',
            title: 'Slim Fit Printed shirt',
            price: '$59.99 HKD',
            url: 'https://realmail.vercel.app',
          },
          {
            id: 1,
            image:
              'https://assets.maocanhua.cn/4ef7cb65-ee1f-4b12-832c-17ab07a8b9ac-image.png',
            title: 'Casual Collar Youth Handsome Slim Print Blazer',
            price: '$59.99 HKD',
            url: 'https://realmail.vercel.app',
          },
          {
            id: 2,
            image:
              'https://assets.maocanhua.cn/88fe9bfa-547f-4d5e-9ba5-ac6b91572dde-image.png',
            title: 'Shirt Business Casual',
            price: '$59.99 HKD',
            url: 'https://realmail.vercel.app',
          },
        ],
      },
    ],
  },
  products: productsFormatter([
    {
      'id': 6840405917828,
      'title': 'Antique Drawers',
      'body_html': '<p>Antique wooden chest of drawers</p>',
      'vendor': 'Company 123',
      'product_type': 'Indoor',
      'created_at': '2022-05-24T21:24:02+08:00',
      'handle': 'antique-drawers',
      'updated_at': '2022-05-24T21:31:15+08:00',
      'published_at': '2022-05-24T21:24:01+08:00',
      'template_suffix': null,
      'status': 'active',
      'published_scope': 'web',
      'tags': 'Antique, Bedroom',
      'admin_graphql_api_id': 'gid://shopify/Product/6840405917828',
      'variants': [
        {
          'id': 40501247705220,
          'product_id': 6840405917828,
          'title': 'Default Title',
          'price': '250.00',
          'sku': null,
          'position': 1,
          'inventory_policy': 'deny',
          'compare_at_price': '300.00',
          'fulfillment_service': 'manual',
          'inventory_management': null,
          'option1': 'Default Title',
          'option2': null,
          'option3': null,
          'created_at': '2022-05-24T21:24:02+08:00',
          'updated_at': '2022-05-24T21:27:15+08:00',
          'taxable': true,
          'barcode': null,
          'grams': 0,
          'image_id': null,
          'weight': 0.0,
          'weight_unit': 'kg',
          'inventory_item_id': 42596734206084,
          'inventory_quantity': 1,
          'old_inventory_quantity': 1,
          'requires_shipping': true,
          'admin_graphql_api_id': 'gid://shopify/ProductVariant/40501247705220'
        }
      ],
      'options': [
        {
          'id': 8800509264004,
          'product_id': 6840405917828,
          'name': 'Title',
          'position': 1,
          'values': [
            'Default Title'
          ]
        }
      ],
      'images': [
        {
          'id': 30552937332868,
          'product_id': 6840405917828,
          'position': 1,
          'created_at': '2022-05-24T21:24:02+08:00',
          'updated_at': '2022-05-24T21:24:02+08:00',
          'alt': null,
          'width': 925,
          'height': 617,
          'src': 'https://cdn.shopify.com/s/files/1/0589/5644/7876/products/babys-room_925x_7cfacf59-a080-4bd7-b926-532518b7bb71.jpg?v=1653398642',
          'variant_ids': [],
          'admin_graphql_api_id': 'gid://shopify/ProductImage/30552937332868'
        }
      ],
      'image': {
        'id': 30552937332868,
        'product_id': 6840405917828,
        'position': 1,
        'created_at': '2022-05-24T21:24:02+08:00',
        'updated_at': '2022-05-24T21:24:02+08:00',
        'alt': null,
        'width': 925,
        'height': 617,
        'src': 'https://cdn.shopify.com/s/files/1/0589/5644/7876/products/babys-room_925x_7cfacf59-a080-4bd7-b926-532518b7bb71.jpg?v=1653398642',
        'variant_ids': [],
        'admin_graphql_api_id': 'gid://shopify/ProductImage/30552937332868'
      }
    },
    {
      'id': 6840406933636,
      'title': 'Bedside Table Bedside TableBedside TableBedside TableBedside TableBedside TableBedside Table',
      'body_html': '<p>Wooden bedside table</p>',
      'vendor': 'Company 123',
      'product_type': 'Indoor',
      'created_at': '2022-05-24T21:24:29+08:00',
      'handle': 'bedside-table',
      'updated_at': '2022-05-24T21:24:29+08:00',
      'published_at': '2022-05-24T21:24:28+08:00',
      'template_suffix': null,
      'status': 'active',
      'published_scope': 'web',
      'tags': 'Bedroom, Wood',
      'admin_graphql_api_id': 'gid://shopify/Product/6840406933636',
      'variants': [
        {
          'id': 40501248819332,
          'product_id': 6840406933636,
          'title': 'Default Title',
          'price': '69.99',
          'sku': null,
          'position': 1,
          'inventory_policy': 'deny',
          'compare_at_price': '85.00',
          'fulfillment_service': 'manual',
          'inventory_management': null,
          'option1': 'Default Title',
          'option2': null,
          'option3': null,
          'created_at': '2022-05-24T21:24:29+08:00',
          'updated_at': '2022-05-24T21:24:29+08:00',
          'taxable': true,
          'barcode': null,
          'grams': 0,
          'image_id': null,
          'weight': 0.0,
          'weight_unit': 'kg',
          'inventory_item_id': 42596735320196,
          'inventory_quantity': 1,
          'old_inventory_quantity': 1,
          'requires_shipping': true,
          'admin_graphql_api_id': 'gid://shopify/ProductVariant/40501248819332'
        }
      ],
      'options': [
        {
          'id': 8800510312580,
          'product_id': 6840406933636,
          'name': 'Title',
          'position': 1,
          'values': [
            'Default Title'
          ]
        }
      ],
      'images': [
        {
          'id': 30552939757700,
          'product_id': 6840406933636,
          'position': 1,
          'created_at': '2022-05-24T21:24:29+08:00',
          'updated_at': '2022-05-24T21:24:29+08:00',
          'alt': null,
          'width': 925,
          'height': 617,
          'src': 'https://cdn.shopify.com/s/files/1/0589/5644/7876/products/dark-wall-bedside-table_925x_dee23f19-21b2-4c66-bd29-137e63ee5f8a.jpg?v=1653398669',
          'variant_ids': [],
          'admin_graphql_api_id': 'gid://shopify/ProductImage/30552939757700'
        }
      ],
      'image': {
        'id': 30552939757700,
        'product_id': 6840406933636,
        'position': 1,
        'created_at': '2022-05-24T21:24:29+08:00',
        'updated_at': '2022-05-24T21:24:29+08:00',
        'alt': null,
        'width': 925,
        'height': 617,
        'src': 'https://cdn.shopify.com/s/files/1/0589/5644/7876/products/dark-wall-bedside-table_925x_dee23f19-21b2-4c66-bd29-137e63ee5f8a.jpg?v=1653398669',
        'variant_ids': [],
        'admin_graphql_api_id': 'gid://shopify/ProductImage/30552939757700'
      }
    },
    {
      'id': 6840406442116,
      'title': 'Biodegradable cardboard pots',
      'body_html': '<p>Biodegradable outdoor cardboard pots</p>',
      'vendor': 'Rustic LTD',
      'product_type': 'Outdoor',
      'created_at': '2022-05-24T21:24:16+08:00',
      'handle': 'biodegradable-cardboard-pots',
      'updated_at': '2022-05-24T21:24:19+08:00',
      'published_at': '2022-05-24T21:24:15+08:00',
      'template_suffix': null,
      'status': 'active',
      'published_scope': 'web',
      'tags': 'Garden, Plants',
      'admin_graphql_api_id': 'gid://shopify/Product/6840406442116',
      'variants': [
        {
          'id': 40501248393348,
          'product_id': 6840406442116,
          'title': 'Default Title',
          'price': '10.00',
          'sku': null,
          'position': 1,
          'inventory_policy': 'deny',
          'compare_at_price': null,
          'fulfillment_service': 'manual',
          'inventory_management': 'shopify',
          'option1': 'Default Title',
          'option2': null,
          'option3': null,
          'created_at': '2022-05-24T21:24:19+08:00',
          'updated_at': '2022-05-24T21:24:19+08:00',
          'taxable': true,
          'barcode': null,
          'grams': 0,
          'image_id': null,
          'weight': 0.0,
          'weight_unit': 'kg',
          'inventory_item_id': 42596734894212,
          'inventory_quantity': 8,
          'old_inventory_quantity': 8,
          'requires_shipping': true,
          'admin_graphql_api_id': 'gid://shopify/ProductVariant/40501248393348'
        }
      ],
      'options': [
        {
          'id': 8800509788292,
          'product_id': 6840406442116,
          'name': 'Title',
          'position': 1,
          'values': [
            'Default Title'
          ]
        }
      ],
      'images': [
        {
          'id': 30552938512516,
          'product_id': 6840406442116,
          'position': 1,
          'created_at': '2022-05-24T21:24:16+08:00',
          'updated_at': '2022-05-24T21:24:16+08:00',
          'alt': null,
          'width': 925,
          'height': 617,
          'src': 'https://cdn.shopify.com/s/files/1/0589/5644/7876/products/potted-seeds_925x_1f77e4b0-9ad5-4822-a0f2-544ed0fac781.jpg?v=1653398656',
          'variant_ids': [],
          'admin_graphql_api_id': 'gid://shopify/ProductImage/30552938512516'
        }
      ],
      'image': {
        'id': 30552938512516,
        'product_id': 6840406442116,
        'position': 1,
        'created_at': '2022-05-24T21:24:16+08:00',
        'updated_at': '2022-05-24T21:24:16+08:00',
        'alt': null,
        'width': 925,
        'height': 617,
        'src': 'https://cdn.shopify.com/s/files/1/0589/5644/7876/products/potted-seeds_925x_1f77e4b0-9ad5-4822-a0f2-544ed0fac781.jpg?v=1653398656',
        'variant_ids': [],
        'admin_graphql_api_id': 'gid://shopify/ProductImage/30552938512516'
      }
    },
    {
      'id': 6840406900868,
      'title': 'Black Beanbag',
      'body_html': '<p>Black leather beanbag</p>',
      'vendor': 'Company 123',
      'product_type': 'Indoor',
      'created_at': '2022-05-24T21:24:27+08:00',
      'handle': 'black-bean-bag',
      'updated_at': '2022-05-24T21:24:28+08:00',
      'published_at': '2022-05-24T21:24:27+08:00',
      'template_suffix': null,
      'status': 'active',
      'published_scope': 'web',
      'tags': 'Black, Leather',
      'admin_graphql_api_id': 'gid://shopify/Product/6840406900868',
      'variants': [
        {
          'id': 40501248786564,
          'product_id': 6840406900868,
          'title': 'Default Title',
          'price': '69.99',
          'sku': null,
          'position': 1,
          'inventory_policy': 'deny',
          'compare_at_price': '80.00',
          'fulfillment_service': 'manual',
          'inventory_management': null,
          'option1': 'Default Title',
          'option2': null,
          'option3': null,
          'created_at': '2022-05-24T21:24:28+08:00',
          'updated_at': '2022-05-24T21:24:28+08:00',
          'taxable': true,
          'barcode': null,
          'grams': 0,
          'image_id': null,
          'weight': 0.0,
          'weight_unit': 'kg',
          'inventory_item_id': 42596735287428,
          'inventory_quantity': 6,
          'old_inventory_quantity': 6,
          'requires_shipping': true,
          'admin_graphql_api_id': 'gid://shopify/ProductVariant/40501248786564'
        }
      ],
      'options': [
        {
          'id': 8800510279812,
          'product_id': 6840406900868,
          'name': 'Title',
          'position': 1,
          'values': [
            'Default Title'
          ]
        }
      ],
      'images': [
        {
          'id': 30552939397252,
          'product_id': 6840406900868,
          'position': 1,
          'created_at': '2022-05-24T21:24:27+08:00',
          'updated_at': '2022-05-24T21:24:27+08:00',
          'alt': null,
          'width': 925,
          'height': 740,
          'src': 'https://cdn.shopify.com/s/files/1/0589/5644/7876/products/comfortable-living-room-cat_925x_4d3e5c84-831f-4745-b85d-30c516c4e36a.jpg?v=1653398667',
          'variant_ids': [],
          'admin_graphql_api_id': 'gid://shopify/ProductImage/30552939397252'
        }
      ],
      'image': {
        'id': 30552939397252,
        'product_id': 6840406900868,
        'position': 1,
        'created_at': '2022-05-24T21:24:27+08:00',
        'updated_at': '2022-05-24T21:24:27+08:00',
        'alt': null,
        'width': 925,
        'height': 740,
        'src': 'https://cdn.shopify.com/s/files/1/0589/5644/7876/products/comfortable-living-room-cat_925x_4d3e5c84-831f-4745-b85d-30c516c4e36a.jpg?v=1653398667',
        'variant_ids': [],
        'admin_graphql_api_id': 'gid://shopify/ProductImage/30552939397252'
      }
    },
    {
      'id': 6840404672644,
      'title': 'Black Leather Bag',
      'body_html': '<p>Womens black leather bag, with ample space. Can be worn over the shoulder, or remove straps to carry in your hand.</p>',
      'vendor': 'partners-demo',
      'product_type': '',
      'created_at': '2022-05-24T21:23:16+08:00',
      'handle': 'black-leather-bag',
      'updated_at': '2022-05-24T21:23:16+08:00',
      'published_at': '2022-05-24T21:23:15+08:00',
      'template_suffix': null,
      'status': 'active',
      'published_scope': 'web',
      'tags': 'women',
      'admin_graphql_api_id': 'gid://shopify/Product/6840404672644',
      'variants': [
        {
          'id': 40501246328964,
          'product_id': 6840404672644,
          'title': 'Default Title',
          'price': '30.00',
          'sku': null,
          'position': 1,
          'inventory_policy': 'deny',
          'compare_at_price': null,
          'fulfillment_service': 'manual',
          'inventory_management': null,
          'option1': 'Default Title',
          'option2': null,
          'option3': null,
          'created_at': '2022-05-24T21:23:16+08:00',
          'updated_at': '2022-05-24T21:23:16+08:00',
          'taxable': true,
          'barcode': null,
          'grams': 0,
          'image_id': null,
          'weight': 0.0,
          'weight_unit': 'kg',
          'inventory_item_id': 42596732829828,
          'inventory_quantity': 1,
          'old_inventory_quantity': 1,
          'requires_shipping': true,
          'admin_graphql_api_id': 'gid://shopify/ProductVariant/40501246328964'
        }
      ],
      'options': [
        {
          'id': 8800507953284,
          'product_id': 6840404672644,
          'name': 'Title',
          'position': 1,
          'values': [
            'Default Title'
          ]
        }
      ],
      'images': [
        {
          'id': 30552933138564,
          'product_id': 6840404672644,
          'position': 1,
          'created_at': '2022-05-24T21:23:16+08:00',
          'updated_at': '2022-05-24T21:23:16+08:00',
          'alt': null,
          'width': 925,
          'height': 617,
          'src': 'https://cdn.shopify.com/s/files/1/0589/5644/7876/products/black-bag-over-the-shoulder_925x_891a9dff-cc5d-448d-aa26-ac31c66d7208.jpg?v=1653398596',
          'variant_ids': [],
          'admin_graphql_api_id': 'gid://shopify/ProductImage/30552933138564'
        }
      ],
      'image': {
        'id': 30552933138564,
        'product_id': 6840404672644,
        'position': 1,
        'created_at': '2022-05-24T21:23:16+08:00',
        'updated_at': '2022-05-24T21:23:16+08:00',
        'alt': null,
        'width': 925,
        'height': 617,
        'src': 'https://cdn.shopify.com/s/files/1/0589/5644/7876/products/black-bag-over-the-shoulder_925x_891a9dff-cc5d-448d-aa26-ac31c66d7208.jpg?v=1653398596',
        'variant_ids': [],
        'admin_graphql_api_id': 'gid://shopify/ProductImage/30552933138564'
      }
    },
    {
      'id': 6840405000324,
      'title': 'Blue Silk Tuxedo',
      'body_html': '<p>Blue silk tuxedo with marbled aquatic pattern and dark lining. Sleeves are complete with rounded hem and black buttons.</p>',
      'vendor': 'partners-demo',
      'product_type': '',
      'created_at': '2022-05-24T21:23:26+08:00',
      'handle': 'blue-silk-tuxedo',
      'updated_at': '2022-05-24T21:23:26+08:00',
      'published_at': '2022-05-24T21:23:25+08:00',
      'template_suffix': null,
      'status': 'active',
      'published_scope': 'web',
      'tags': 'men',
      'admin_graphql_api_id': 'gid://shopify/Product/6840405000324',
      'variants': [
        {
          'id': 40501246689412,
          'product_id': 6840405000324,
          'title': 'Default Title',
          'price': '70.00',
          'sku': null,
          'position': 1,
          'inventory_policy': 'deny',
          'compare_at_price': null,
          'fulfillment_service': 'manual',
          'inventory_management': null,
          'option1': 'Default Title',
          'option2': null,
          'option3': null,
          'created_at': '2022-05-24T21:23:26+08:00',
          'updated_at': '2022-05-24T21:23:26+08:00',
          'taxable': true,
          'barcode': null,
          'grams': 0,
          'image_id': null,
          'weight': 0.0,
          'weight_unit': 'kg',
          'inventory_item_id': 42596733190276,
          'inventory_quantity': 1,
          'old_inventory_quantity': 1,
          'requires_shipping': true,
          'admin_graphql_api_id': 'gid://shopify/ProductVariant/40501246689412'
        }
      ],
      'options': [
        {
          'id': 8800508280964,
          'product_id': 6840405000324,
          'name': 'Title',
          'position': 1,
          'values': [
            'Default Title'
          ]
        }
      ],
      'images': [
        {
          'id': 30552933957764,
          'product_id': 6840405000324,
          'position': 1,
          'created_at': '2022-05-24T21:23:26+08:00',
          'updated_at': '2022-05-24T21:23:26+08:00',
          'alt': null,
          'width': 925,
          'height': 617,
          'src': 'https://cdn.shopify.com/s/files/1/0589/5644/7876/products/man-adjusts-blue-tuxedo-bowtie_925x_14d432a0-0d51-498a-a97e-1c7b9108abd0.jpg?v=1653398606',
          'variant_ids': [],
          'admin_graphql_api_id': 'gid://shopify/ProductImage/30552933957764'
        }
      ],
      'image': {
        'id': 30552933957764,
        'product_id': 6840405000324,
        'position': 1,
        'created_at': '2022-05-24T21:23:26+08:00',
        'updated_at': '2022-05-24T21:23:26+08:00',
        'alt': null,
        'width': 925,
        'height': 617,
        'src': 'https://cdn.shopify.com/s/files/1/0589/5644/7876/products/man-adjusts-blue-tuxedo-bowtie_925x_14d432a0-0d51-498a-a97e-1c7b9108abd0.jpg?v=1653398606',
        'variant_ids': [],
        'admin_graphql_api_id': 'gid://shopify/ProductImage/30552933957764'
      }
    },

  ])
};
