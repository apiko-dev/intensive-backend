import { product } from 'products/schemas';
import { user } from 'users/schemas';
import * as commonSchemas from 'common/schemas';
import { messageActions, chatEvents } from './constants';

export const message = {
  title: 'Message',
  type: 'object',
  properties: {
    id: { type: 'number' },
    chatId: { type: 'number' },
    ownerId: { type: 'number' },
    text: { type: 'string' },
    read: { type: 'boolean' },

    ...commonSchemas.timestamps,
  },
};

export const messageBody = {
  title: 'Message Body',
  type: 'object',
  properties: {
    message: { type: 'string' },
  },
  required: ['message'],
};

export const chat = {
  title: 'Chat',
  type: 'object',
  properties: {
    id: { type: 'number' },
    productId: { type: 'number' },
    ownerId: { type: 'number' },

    ...commonSchemas.timestamps,
  },
};

export const chatWithMessage = {
  title: 'Chat with Message',
  type: 'object',
  properties: {
    ...chat.properties,
    message: {
      ...message,
    },
  },
};

export const chatWithEntities = {
  title: 'Chat with Entities',
  type: 'object',
  properties: {
    ...chatWithMessage.properties,
    product,
    participants: {
      type: 'array',
      items: user,
    },
  },
};

export const messageWithActionType = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: Object.values(messageActions),
    },
    message,
  },
};

export const chatWithEventType = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: Object.values(chatEvents),
    },
    chat: chatWithEntities,
  },
};
