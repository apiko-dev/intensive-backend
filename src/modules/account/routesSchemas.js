import * as userSchemas from 'users/schemas';
import { bearerAuth } from 'common/schemas';

export const getAccount = {
  tags: ['user'],
  response: {
    200: userSchemas.userAccount,
  },
  ...bearerAuth,
  description: 'Get user account',
};

export const updateAccount = {
  tags: ['user'],
  body: {
    type: 'object',
    properties: {
      fullName: { type: 'string' },
      avatar: { type: 'string', nullable: true },
      phone: { type: 'string', nullable: true },
      location: { type: 'string', nullable: true },
    },
    required: ['avatar', 'fullName', 'phone', 'location'],
  },
  response: {
    200: userSchemas.userAccount,
  },
  ...bearerAuth,
  description: 'Update user account',
};
