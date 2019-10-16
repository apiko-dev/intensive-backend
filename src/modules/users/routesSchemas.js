import * as productSchemas from 'products/schemas';
import * as commonSchemas from 'common/schemas';
import * as schemas from './schemas';

export const getUserProducts = {
  tags: ['products'],
  params: commonSchemas.idInParam,
  response: {
    200: {
      type: 'object',
      properties: {
        list: {
          type: 'array',
          items: productSchemas.product,
        },
        count: { type: 'number' },
      },
    },
  },
  description: 'Get user products',
};

export const getUser = {
  tags: ['user'],
  params: commonSchemas.idInParam,
  response: {
    200: schemas.user,
  },
  description: 'Get user by id',
};
