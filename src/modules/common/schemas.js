export const success = {
  title: 'Success',
  type: 'object',
  properties: {
    success: { type: 'boolean', default: true },
  },
};

export const error = {
  title: 'Error',
  type: 'object',
  properties: {
    error: { type: 'string' },
  },
};

export const paginationFrom = {
  query: {
    type: 'object',
    properties: {
      from: {
        type: 'number',
        description: 'Item `id` from which will fetch next items',
      },
      limit: { type: 'number', default: 20 },
    },
  },
};

export const paginationOffset = {
  query: {
    type: 'object',
    properties: {
      offset: { type: 'number', description: 'Offset', default: 0 },
      limit: { type: 'number', default: 20 },
    },
  },
};

export const bearerAuth = {
  security: [{ bearerAuth: [] }],
};

export const idInParam = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
    },
  },
};

export const createdAt = {
  createdAt: {
    type: 'string',
  },
};

export const updatedAt = {
  updatedAt: {
    type: 'string',
  },
};

export const timestamps = {
  ...createdAt,
  ...updatedAt,
};
