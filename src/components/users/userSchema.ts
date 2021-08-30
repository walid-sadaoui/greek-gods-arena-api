import { characterSchema } from './characters/characterSchema';
import mongoose from 'mongoose';
import { IUser } from './userModel';

const { Schema } = mongoose;

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: [true, 'This Username is already used'],
    },
    email: {
      type: String,
      unique: [true, 'This email is already used'],
    },
    password: {
      type: String,
      required: true,
    },
    characters: [characterSchema],
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>('User', userSchema);
export default User;
