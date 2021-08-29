import mongoose from 'mongoose';
import HttpError from '../../common/error/httpError';
import { UserInfo } from './userModel';
import User from './userSchema';

export const getUser = async (
  userId: string
): Promise<UserInfo & mongoose.Document<any, any, UserInfo>> => {
  const user = await User.findOne({ _id: userId });
  if (!user) throw new HttpError(404, 'Get User error', 'User not found', true);
  return user;
};
