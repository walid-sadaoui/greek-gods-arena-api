import { ITurn } from './turns/turnModel';

export interface IFight {
  _id: string;
  firstOpponentId: string;
  secondOpponentId: string;
  finished: boolean;
  winner: string;
  loser: string;
  turns: ITurn[];
  createdAt: Date;
  updatedAt: Date;
}
