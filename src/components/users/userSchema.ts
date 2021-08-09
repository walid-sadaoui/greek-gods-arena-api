import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: [true, 'This Username is already used'],
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
