import mongoose from 'mongoose';
import { IFight } from '../fightModel';
import { IAttacker, IDefender } from './turnModel';
import Turn from './turnSchema';

export const createTurn = async (
  fight: IFight & mongoose.Document<any, any, IFight>,
  count: number,
  attacker: IAttacker,
  defender: IDefender,
  damages: number,
  attackSuccess: boolean
): Promise<IFight & mongoose.Document<any, any, IFight>> => {
  const newTurn = new Turn({
    count,
    attacker,
    defender,
    damages,
    attackSuccess,
  });
  fight.turns.push(newTurn);
  const updatedFight = await fight.save();
  return updatedFight;
};
