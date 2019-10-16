import config from './config';

export default {
  swagger: {
    info: {
      title: 'Apiko API',
      description: 'API for Apiko fall courses 2019',
      version: '0.1.0',
    },
    servers: [{ url: config.url }],
    consumes: ['application/json'],
    produces: ['application/json'],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  exposeRoute: true,
};
