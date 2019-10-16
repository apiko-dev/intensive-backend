import { optionalAuth, requiredAuth } from 'auth/helpers';
import { customSchemaCompiler } from 'common/helpers';
import * as handlers from './handlers';
import * as schemas from './routesSchemas';

async function routes(fastify) {
  fastify.setSchemaCompiler(customSchemaCompiler);

  fastify.get(
    '/products/latest',
    { schema: schemas.getLatestProducts, onRequest: optionalAuth },
    handlers.getLatestProducts,
  );

  fastify.post(
    '/products',
    { schema: schemas.createProduct, onRequest: requiredAuth },
    handlers.createProduct,
  );

  fastify.get(
    '/products/:id',
    { schema: schemas.getProductById, onRequest: optionalAuth },
    handlers.getProductById,
  );

  fastify.post(
    '/products/:id/saved',
    { schema: schemas.saveProduct, onRequest: requiredAuth },
    handlers.saveProduct,
  );

  fastify.delete(
    '/products/:id/saved',
    { schema: schemas.unSaveProduct, onRequest: requiredAuth },
    handlers.unSaveProduct,
  );

  fastify.get(
    '/products/saved',
    { schema: schemas.getSavedProducts, onRequest: requiredAuth },
    handlers.getSavedProducts,
  );

  fastify.post(
    '/products/saved',
    { schema: schemas.saveMultipleProducts, onRequest: requiredAuth },
    handlers.saveMultipleProducts,
  );

  fastify.get(
    '/products/ids',
    { schema: schemas.getProductsByIds, onRequest: optionalAuth },
    handlers.getProductsByIds,
  );

  fastify.get(
    '/products/search',
    { schema: schemas.searchProducts, onRequest: optionalAuth },
    handlers.searchProducts,
  );
}

export default routes;
