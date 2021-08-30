import { ICharacter } from './characters/characterModel';

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  characters: ICharacter[];
  createdAt: Date;
  updatedAt: Date;
}
export interface UserData {
  _id: string;
  username: string;
  email: string;
  characters: ICharacter[];
  createdAt: Date;
  updatedAt: Date;
}
