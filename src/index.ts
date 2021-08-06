import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import errorHandler from './middlewares/error.middleware';
import notFoundHandler from './middlewares/not-found.middleware';
import config from './config';

const app = express();
app.use(helmet());
config.nodeEnv == 'development' && app.use(logger('dev'));
app.use(
  cors({
    credentials: true,
    origin: config.clientUrl,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  })
);
app.use(express.json());

app.use(errorHandler);
app.use(notFoundHandler);

export default app;
