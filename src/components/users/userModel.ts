export interface UserInfo {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserData {
  _id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DatabaseUser extends UserInfo {
  _id: string;
  username: string;
  email: string;
  password: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
}
