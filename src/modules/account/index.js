import { requiredAuth } from 'auth/helpers';
import * as schemas from './routesSchemas';
import * as handlers from './handlers';

async function routes(fastify) {
  fastify.addHook('onRequest', requiredAuth);

  fastify.get('/account', { schema: schemas.getAccount }, handlers.getAccount);

  fastify.put(
    '/account',
    { schema: schemas.updateAccount },
    handlers.updateAccount,
  );
}

export default routes;
