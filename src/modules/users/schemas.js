import * as commonSchemas from 'common/schemas';

export const user = {
  title: 'User',
  type: 'object',
  properties: {
    id: { type: 'number' },
    fullName: { type: 'string' },
    location: { type: 'string', nullable: true },
    avatar: { type: 'string', nullable: true },
    phone: { type: 'string', nullable: true },
    ...commonSchemas.timestamps,
  },
};

export const userAccount = {
  title: 'Account',
  type: 'object',
  properties: {
    ...user.properties,
    email: { type: 'string' },
  },
};

export const userWithToken = {
  type: 'object',
  properties: {
    token: { type: 'string' },
    user: userAccount,
  },
};
