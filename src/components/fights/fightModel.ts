import { ICharacter } from 'components/users/characters/characterModel';
import { ITurn } from './turns/turnModel';

export interface IFight {
  _id: string;
  firstOpponent: ICharacter;
  secondOpponent: ICharacter;
  finished: boolean;
  winner: string;
  loser: string;
  turns: ITurn[];
  createdAt: Date;
  updatedAt: Date;
}
