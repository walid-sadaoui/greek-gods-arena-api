import mongoose from 'mongoose';
import HttpError from '../../common/error/httpError';
import { UserData } from './userModel';
import User from './userSchema';

export const getUser = async (
  userId: string
): Promise<UserData & mongoose.Document<any, any, UserData>> => {
  const user = await User.findOne({ _id: userId }).select('-password');
  if (!user) throw new HttpError(404, 'Get User error', 'User not found', true);
  return user;
};
