import * as commonSchemas from 'common/schemas';
import * as schemas from './schemas';

export const getLatestProducts = {
  tags: ['products'],
  ...commonSchemas.paginationFrom,
  response: {
    200: {
      type: 'array',
      items: schemas.product,
    },
  },
  description: 'Get latest products',
};

export const getProductById = {
  params: commonSchemas.idInParam,
  tags: ['products'],
  response: {
    200: schemas.productWithUser,
  },
  description: 'Get product by productId',
};

export const createProduct = {
  tags: ['products'],
  body: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      photos: {
        type: 'array',
        items: { type: 'string' },
      },
      location: { type: 'string' },
      price: { type: 'number' },
    },
    required: ['title', 'location', 'price'],
  },
  response: {
    200: schemas.product,
  },
  ...commonSchemas.bearerAuth,
  description: 'Create new product',
};

export const saveProduct = {
  tags: ['products'],
  params: commonSchemas.idInParam,
  response: {
    200: commonSchemas.success,
  },
  ...commonSchemas.bearerAuth,
  description: 'Add product to saved',
};

export const unSaveProduct = {
  tags: ['products'],
  params: commonSchemas.idInParam,
  response: {
    200: commonSchemas.success,
  },
  ...commonSchemas.bearerAuth,
  description: 'Remove product from saved',
};

export const getSavedProducts = {
  tags: ['products'],
  ...commonSchemas.paginationFrom,
  response: {
    200: {
      type: 'array',
      items: schemas.product,
    },
  },
  ...commonSchemas.bearerAuth,
  description: 'Get saved products',
};

export const saveMultipleProducts = {
  tags: ['products'],
  body: {
    type: 'object',
    properties: {
      ids: {
        type: 'array',
        items: { type: 'number' },
      },
    },
    required: ['ids'],
  },
  response: {
    200: {
      type: 'array',
      items: { type: 'number' },
    },
  },
  ...commonSchemas.bearerAuth,
  description: 'Save multiple products by ids. Return saved products ids',
};

export const getProductsByIds = {
  tags: ['products'],
  query: {
    type: 'object',
    properties: {
      id: {
        type: 'array',
        items: {
          type: 'number',
        },
      },
    },
    required: ['id'],
  },
  response: {
    200: {
      type: 'array',
      items: schemas.product,
    },
  },
  description: 'Get multiple products by ids',
};

export const searchProducts = {
  tags: ['products'],
  query: {
    type: 'object',
    properties: {
      keywords: { type: 'string' },
      location: { type: 'string' },
      priceFrom: { type: 'number' },
      priceTo: { type: 'number' },
      ...commonSchemas.paginationOffset.query.properties,
    },
  },
  response: {
    200: {
      type: 'array',
      items: schemas.product,
    },
  },
  description: 'Search products',
};
