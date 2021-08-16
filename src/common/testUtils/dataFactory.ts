import { hashPassword } from '../../components/auth/authService';
import User from '../../components/users/userSchema';
import * as faker from 'faker';
import { UserInfo } from '../../components/users/userModel';

export enum FakePassword {
  GOOD = 'abcABC123456!',
  GOOD_2 = 'defDEF123456!',
  LESS_THAN_8_CHAR = 'aA123!',
  // NO_DIGIT = 'abcdefABCDEF!',
  // No_LOWERCASE = 'ABCDEF123456!',
  // NO_UPPERCASE = 'abcdef123456!',
  // MORE_THAN_26_CHAR = 'abcABC123456!abcABC123456!',
}

export const createUser = async (): Promise<UserInfo> => {
  const username = faker.internet.userName();
  const email = faker.internet.email();
  const password = FakePassword.GOOD;
  const hashedPassword: string = await hashPassword(password);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  const userSignedUp = await newUser.save();
  const { password: userPassword, __v, ...rest } = userSignedUp.toObject();
  const userInfo = { ...rest, password };
  return userInfo;
};
