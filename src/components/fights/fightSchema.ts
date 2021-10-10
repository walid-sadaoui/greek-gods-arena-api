import { turnSchema } from './turns/turnSchema';
import mongoose from 'mongoose';
import { characterSchema } from '../users/characters/characterSchema';

const { Schema } = mongoose;

const fightSchema = new Schema(
  {
    firstOpponent: {
      type: characterSchema,
      required: true,
    },
    secondOpponent: {
      type: characterSchema,
      required: true,
    },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
    },
    loser: {
      type: mongoose.Schema.Types.ObjectId,
    },
    finished: {
      type: Boolean,
      required: true,
      default: false,
    },
    turns: [turnSchema],
  },
  { timestamps: true }
);

const Fight = mongoose.model('Fight', fightSchema);
export default Fight;
