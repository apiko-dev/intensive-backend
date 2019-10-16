import * as userSchemas from 'users/schemas';
import * as commonSchemas from 'common/schemas';

export const product = {
  title: 'Product',
  type: 'object',
  properties: {
    id: { type: 'number' },
    ownerId: { type: 'number' },
    title: { type: 'string' },
    description: { type: 'string', nullable: true },
    photos: {
      type: 'array',
      items: { type: 'string' },
      nullable: true,
    },
    location: { type: 'string' },
    price: { type: 'number' },
    saved: { type: 'boolean', default: false },
    ...commonSchemas.timestamps,
  },
};

export const productWithUser = {
  type: 'object',
  properties: {
    ...product.properties,
    chatId: { type: 'number', nullable: true },
    owner: userSchemas.user,
  },
};
