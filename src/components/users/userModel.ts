export interface User {
  _id: string;
  username: string;
  password: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserData {
  _id: string;
  username: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DatabaseUser extends User {
  _id: string;
  username: string;
  password: string;
  token: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
}
