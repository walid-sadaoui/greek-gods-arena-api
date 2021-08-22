import { Character } from '../characters/characterModel';

export interface UserInfo {
  _id: string;
  username: string;
  email: string;
  password: string;
  characters: Character[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserData {
  _id: string;
  username: string;
  email: string;
  characters: Character[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DatabaseUser extends UserInfo {
  _id: string;
  username: string;
  email: string;
  password: string;
  characters: Character[];
  __v: number;
  createdAt: Date;
  updatedAt: Date;
}
