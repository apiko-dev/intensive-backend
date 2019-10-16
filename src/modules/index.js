import auth from 'auth';
import account from 'account';
import products from 'products';
import users from 'users';
import upload from 'upload';
import chats from 'chats/routes';

async function registerModules(fastify) {
  fastify.register(auth);
  fastify.register(account);
  fastify.register(products);
  fastify.register(users);
  fastify.register(upload);
  fastify.register(chats);
}

export default registerModules;
