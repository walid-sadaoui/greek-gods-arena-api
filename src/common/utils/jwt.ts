import config from '../../config';
import * as jwt from 'jsonwebtoken';

const generateJwt = (payload: any, exp: string): string => {
  if (config.jwtSecret) {
    const token: string = jwt.sign(payload, config.jwtSecret, {
      expiresIn: exp,
    });
    return token;
  } else {
    throw new Error('No JWT Secret specified');
  }
};

const verifyJWT = (payload: any) => {
  if (config.jwtSecret) {
    const token = jwt.verify(payload, config.jwtSecret);
    return token;
  } else {
    throw new Error('JWT not verified !');
  }
};

export { generateJwt, verifyJWT };
