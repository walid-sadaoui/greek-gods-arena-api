import config from '../config';
import { signup } from './auth.swagger';

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
      name: 'signup',
    },
    {
      name: 'auth',
    },
  ],
  paths: {
    '/signup': {
      post: signup,
    },
  },
  components: {
    schemas: {},
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};
