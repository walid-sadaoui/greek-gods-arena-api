import HttpError from '../../common/error/httpError';
import { verifyJWT } from '../../common/utils/jwt';
import { Request, Response, NextFunction } from 'express';
import { UserData } from '../users/userModel';

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
    if (token.startsWith('Bearer')) {
      token = token.slice(7, token.length);
      if (!token || token === '') {
        throw new HttpError(401, 'Auth error', 'No token provided', true);
      }
    }
    const decoded = <UserData>verifyJWT(token);
    if (!decoded)
      throw new HttpError(401, 'Auth error', 'Invalid signature', true);
    if (decoded) req.user = decoded;

    req.token = token;
    return next();
  } catch (error) {
    next(error);
  }
};

const validateUserIdRequestParam = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  try {
    const { id } = req.params;
    const user = <UserData>req.user;
    if (user?._id !== id)
      throw new HttpError(
        401,
        'Auth error',
        `You are not authorized to access these datas !`,
        true
      );
    return next();
  } catch (error) {
    next(error);
  }
};

const validateUserIdRequestBody = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  try {
    const { userId } = req.body;
    const user = <UserData>req.user;
    if (user?._id !== userId)
      throw new HttpError(
        401,
        'Auth error',
        `You are not authorized to perform this action !`,
        true
      );
    return next();
  } catch (error) {
    next(error);
  }
};

export { decodeHeader, validateUserIdRequestParam, validateUserIdRequestBody };
