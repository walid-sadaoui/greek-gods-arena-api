import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import errorHandler from './common/error/error.middleware';
import notFoundHandler from './common/error/not-found.middleware';
import config from './config';
import authRouter from './components/auth';
import usersRouter from './components/users';
import fightsRouter from './components/fights';
import { swaggerDocument } from './swagger';

const app = express();
app.use(helmet());
config.nodeEnv == 'development' && app.use(logger('dev'));
app.use(
  cors({
    credentials: true,
    origin: config.clientUrl,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
  })
);
app.use(express.json());

// const options = {
//   definition: {
//     openapi: '3.0.3',
//     info: {
//       title: 'Greek Gods Arena API',
//       version: '0.1.0',
//       description: 'Express API for the Greek God Arena game',
//       license: {
//         name: 'MIT',
//         url: 'https://spdx.org/licenses/MIT.html',
//       },
//       contact: {
//         name: 'Walid SADAOUI',
//         url: 'https://walid-sadaoui.welovedevs.com/',
//         email: 'walidsadaoui@hotmail.fr',
//       },
//     },
//     servers: [
//       {
//         url: `http://localhost:${config.port}`,
//         description: 'Development Server',
//       },
//       {
//         url: `https://greek-gods-arena-api.herokuapp.com/`,
//         description: 'Test Server',
//       },
//     ],
//   },
//   apis: [
//     './src/components/auth/index.ts',
//     './src/components/users/index.ts',
//     './src/components/fights/index.ts',
//   ],
// };
// const specs = swaggerJsdoc(options);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true })
);

app.use('/', authRouter);
app.use('/users', usersRouter);
app.use('/fights', fightsRouter);
app.use(errorHandler);
app.use(notFoundHandler);

export default app;
