import characterSchema from '../characters/characterSchema';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
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

const User = mongoose.model('User', userSchema);
export default User;
