import config from '../config';
import { login, signup } from './auth.swagger';
import { schemas } from './schemas';

export const swaggerDocument = {
  openapi: '3.0.3',
  info: {
    title: 'Greek Gods Arena API',
    version: '0.1.0',
    description: 'Express API for the Greek God Arena game',
    license: {
      name: 'MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Walid SADAOUI',
      url: 'https://walid-sadaoui.welovedevs.com/',
      email: 'walidsadaoui@hotmail.fr',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}`,
      description: 'Development Server',
    },
    {
      url: `https://greek-gods-arena-api.herokuapp.com/`,
      description: 'Test Server',
    },
  ],
  tags: [
    {
      name: 'Auth',
    },
  ],
  paths: {
    '/signup': {
      post: signup,
    },
    '/login': {
      post: login,
    },
  },
  components: {
    schemas: schemas,
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};
