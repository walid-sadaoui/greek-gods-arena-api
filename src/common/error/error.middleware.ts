import { Request, Response, NextFunction } from 'express';
import HttpError from './httpError';

const errorHandler = (
  error: HttpError,
  _request: Request,
  response: Response,
  // eslint-disable-next-line
  _next: NextFunction
): void => {
  const status = error.statusCode || 500;
  const httpError = new HttpError(
    status,
    error.description || 'Server Error',
    error.message,
    error.isOperational || false
  );
  response.status(status).send({ error: httpError });
};

export default errorHandler;
