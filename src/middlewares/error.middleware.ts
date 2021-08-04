import { Request, Response, NextFunction } from 'express';
import HttpError from '../common/httpError';

const errorHandler = (
  error: HttpError,
  _request: Request,
  response: Response,
  // eslint-disable-next-line
  _next: NextFunction
): void => {
  const status = error.statusCode || 500;

  response.status(status).send({ error });
};

export default errorHandler;
