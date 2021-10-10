import { ICharacter } from 'components/users/characters/characterModel';
import mongoose from 'mongoose';
import { IFight } from './fightModel';
import Fight from './fightSchema';

export const createFight = async (
  firstOpponent: ICharacter,
  secondOpponent: ICharacter
): Promise<IFight & mongoose.Document<any, any, IFight>> => {
  let newFight = new Fight({ firstOpponent, secondOpponent });
  newFight = await newFight.save();
  return newFight;
};

export const getFight = async (fightId: string): Promise<IFight> => {
  const fight: IFight = Fight.findOne({ _id: fightId }).lean();
  return fight;
};
