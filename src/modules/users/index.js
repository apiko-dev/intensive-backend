import { optionalAuth } from 'auth/helpers';
import * as schemas from './routesSchemas';
import * as handlers from './handlers';

async function routes(fastify) {
  fastify.get(
    '/users/:id/products',
    { schema: schemas.getUserProducts, onRequest: optionalAuth },
    handlers.getUserProducts,
  );

  fastify.get('/users/:id', { schema: schemas.getUser }, handlers.getUser);
}

export default routes;
