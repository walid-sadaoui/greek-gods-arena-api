import { Request, Response, NextFunction } from 'express';

const notFoundHandler = (
  _request: Request,
  response: Response,
  // eslint-disable-next-line
  _next: NextFunction
): void => {
  const message = 'Resource not found';

  response.status(404).send({ message });
};

export default notFoundHandler;
