import * as UserDM from './userDataManager';

export const getUser = async (userId: string) => {
  const user = await UserDM.getUser(userId);
  return user;
};
