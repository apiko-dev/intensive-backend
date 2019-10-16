import * as commonSchemas from 'common/schemas';
import * as schemas from '../schemas';

export const getChats = {
  tags: ['chat'],
  response: {
    200: {
      type: 'array',
      items: schemas.chatWithEntities,
    },
  },
  ...commonSchemas.bearerAuth,
  description: 'Get user chats',
};

export const createChat = {
  tags: ['chat'],
  params: commonSchemas.idInParam,
  body: schemas.messageBody,
  response: {
    200: schemas.chatWithMessage,
  },
  ...commonSchemas.bearerAuth,
  description: `Create a chat related to the product.
    Also creates and returns message.`,
};

export const createMessage = {
  tags: ['chat'],
  params: commonSchemas.idInParam,
  body: schemas.messageBody,
  response: {
    200: schemas.message,
  },
  ...commonSchemas.bearerAuth,
  description: 'Send message',
};

export const getMessages = {
  tags: ['chat'],
  ...commonSchemas.paginationFrom,
  params: commonSchemas.idInParam,
  response: {
    200: {
      type: 'array',
      items: schemas.message,
    },
  },
  ...commonSchemas.bearerAuth,
  description: 'Get chat messages',
};
