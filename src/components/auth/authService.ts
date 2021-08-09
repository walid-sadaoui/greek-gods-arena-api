import argon2 from 'argon2-ffi';
import crypto from 'crypto';
import * as Bluebird from 'bluebird';
import Debug from 'debug';
// import Joi from 'joi';
import HttpError from '../../common/error/httpError';
import config from '../../config';
import User from '../users/userSchema';
import * as jwt from 'jsonwebtoken';
import { UserData } from 'components/users/userModel';

const debug = Debug('my-memo-api:auth-service');

const { argon2i } = argon2;
const randomBytes = Bluebird.Promise.promisify(crypto.randomBytes);

const hashPassword = async (password: string): Promise<string> => {
  try {
    return randomBytes(32).then((salt) => argon2i.hash(password, salt));
  } catch (error) {
    debug(error);
    throw error;
  }
};

const verifyPassword = (
  encodedHash: string,
  password: string
): Promise<boolean> => {
  return argon2i.verify(encodedHash, password);
};

// const validatePassword = (password) => {
//   const passwordSchema = Joi.string()
//     .regex(/[0-9]/)
//     .regex(/[A-Z]/)
//     .regex(/[a-z]/)
//     .regex(/[-! \"#$%&'()*+,./:;<=>?@[^_`{|}~\]]/)
//     .min(8)
//     .max(26)
//     .required();
//   const { error } = passwordSchema.validate(password);
//   if (error) {
//     return false;
//   }
//   return true;
// };

// const validateEmail = (email) => {
//   const emailSchema = Joi.string().email({ tlds: false }).required();
//   const { error } = emailSchema.validate(email);
//   if (error) {
//     return false;
//   }
//   return true;
// };

// const validateUsername = (username) => {
//   const usernameSchema = Joi.string().min(3).required();
//   const { error } = usernameSchema.validate(username);
//   if (error) {
//     return false;
//   }
//   return true;
// };

const signUp = async (
  username: string,
  password: string
): Promise<UserData> => {
  try {
    // if (!username || !password) {
    //   throw new HttpError(
    //     400,
    //     'Auth error',
    //     'Email and Password are required',
    //     true
    //   );
    // }

    // const usernameExist = await User.findOne({ username }).lean();
    // if (usernameExist) {
    //   throw new HttpError(409, 'Auth error', 'Username already exists', true);
    // }

    // if (!validatePassword(password)) {
    //   throw new HttpError(
    //     422,
    //     'Auth error',
    //     'Invalid password format : password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character and at most 26 characters',
    //     true
    //   );
    // }

    const hashedPassword: string = await hashPassword(password);
    let newUser = new User({
      username,
      password: hashedPassword,
    });
    if (config.jwtSecret) {
      const token: string = jwt.sign(
        { idUser: newUser._id, username },
        config.jwtSecret,
        {
          expiresIn: '2h',
        }
      );
      newUser.token = token;
      newUser = await newUser.save();
    }

    const { password: userPassword, __v, ...rest } = newUser.toObject();
    const userInfo = { ...rest };

    return userInfo;
  } catch (error) {
    throw new HttpError(
      error.httpCode || 500,
      'Auth error',
      error.message || 'There was a problem logging into your account',
      true
    );
  }
};

// const logIn = async (email, password) => {
//   try {
//     if (!email || !password) {
//       throw new HttpError(
//         400,
//         'Auth error',
//         'Email and Password are required',
//         true
//       );
//     }

//     const user = await User.findOne({ email }).lean();
//     if (!user) {
//       throw new HttpError(409, 'Auth error', 'Invalid credentials', true);
//     }

//     const passwordValid = await verifyPassword(user.password, password);
//     if (!passwordValid) {
//       throw new HttpError(409, 'Auth error', 'Invalid credentials', true);
//     }

//     const { password: userPassword, __v, ...rest } = user;
//     const userInfo = { ...rest };

//     return userInfo;
//   } catch (error) {
//     throw new HttpError(
//       error.httpCode || 500,
//       'Auth error',
//       error.description || 'There was a problem logging into your account',
//       true
//     );
//   }
// };

export {
  signUp,
  /*logIn,*/ hashPassword,
  verifyPassword /* validatePassword*/,
};
