import { turnSchema } from './turns/turnSchema';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const fightSchema = new Schema(
  {
    firstOpponentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    secondOpponentId: {
      type: mongoose.Schema.Types.ObjectId,
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
