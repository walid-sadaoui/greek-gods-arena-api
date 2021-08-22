import mongoose from 'mongoose';

const { Schema } = mongoose;

const characterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, 'You already have a character with this name'],
      sparse: true,
    },
    skillPoints: { type: Number, required: true, default: 12 },
    health: { type: Number, required: true, default: 10 },
    attack: { type: Number, required: true, default: 0 },
    defense: { type: Number, required: true, default: 0 },
    magik: { type: Number, required: true, default: 0 },
    level: { type: Number, required: true, default: 1 },
  },
  { _id: false }
);

export default characterSchema;
