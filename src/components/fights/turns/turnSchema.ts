import mongoose from 'mongoose';
import { ITurn } from './turnModel';

const { Schema } = mongoose;

export const turnSchema = new Schema<ITurn>({
  count: {
    type: Number,
    required: true,
    sparse: true,
  },
  attacker: {
    id: { type: mongoose.Schema.Types.ObjectId },
    attackValue: { type: Number },
    remainingHealth: { type: Number },
  },
  defender: {
    id: { type: mongoose.Schema.Types.ObjectId },
    defenseSkillPoints: { type: Number },
    remainingHealth: { type: Number },
  },
  damages: { type: Boolean },
  attackSuccess: { type: Boolean },
});

const Turn = mongoose.model<ITurn>('Turn', turnSchema);

export default Turn;
