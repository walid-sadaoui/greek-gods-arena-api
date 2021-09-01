import mongoose from 'mongoose';
import { IFight } from './fightModel';
import Fight from './fightSchema';

export const createFight = async (
  firstOpponentId: string,
  secondOpponentId: string
): Promise<IFight & mongoose.Document<any, any, IFight>> => {
  let newFight = new Fight({ firstOpponentId, secondOpponentId });
  newFight = await newFight.save();
  return newFight;
};
