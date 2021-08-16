import HttpError from '../../common/error/httpError';
import { verifyJWT } from '../../common/utils/jwt';
import { Request, Response, NextFunction } from 'express';

const decodeHeader = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      throw new HttpError(401, 'Auth error', 'No token provided', true);
    }
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
      if (!token || token === '')
        throw new HttpError(401, 'Auth error', 'No token provided', true);
    }
    const decoded = verifyJWT(token);
    if (!decoded)
      throw new HttpError(403, 'Auth error', 'Invalid signature', true);
    if (decoded) req.user = decoded;

    req.token = token;
    return next();
  } catch (error) {
    next(error);
  }
};

export { decodeHeader };
