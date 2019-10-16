import { requiredAuth } from 'auth/helpers';
import * as schemas from './routesSchemas';
import * as handlers from './routeHandlers';

async function routes(fastify) {
  fastify.addHook('onRequest', requiredAuth);

  fastify.get('/chats', { schema: schemas.getChats }, handlers.getChats);

  fastify.post(
    '/chats/:id/messages',
    { schema: schemas.createMessage },
    handlers.createMessage,
  );

  fastify.get(
    '/chats/:id/messages',
    { schema: schemas.getMessages },
    handlers.getMessages,
  );

  fastify.post(
    '/products/:id/createChat',
    { schema: schemas.createChat },
    handlers.createChat,
  );
}

export default routes;
