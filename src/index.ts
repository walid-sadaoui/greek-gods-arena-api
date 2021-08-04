import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import errorHandler from './middlewares/error.middleware';
import notFoundHandler from './middlewares/not-found.middleware';

const app = express();
app.use(helmet());
app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.use(errorHandler);
app.use(notFoundHandler);

export default app;
