import { Error } from './error';
import {
  APIResponseData,
  SignupRequestBody,
  LoginRequestBody,
  LoginResponseData,
} from './common';
import { Attacker, Defender, Fight, Turn } from './fight';
import { Character, SecureUser, User } from './user';

export const schemas = {
  Error,
  APIResponseData,
  SecureUser,
  Character,
  Fight,
  Turn,
  Attacker,
  Defender,
  SignupRequestBody,
  User,
  LoginRequestBody,
  LoginResponseData,
};
