import mongoose from 'mongoose';
import { ICharacter } from './characterModel';

const { Schema } = mongoose;

export const characterSchema = new Schema<ICharacter>({
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
});
const Character = mongoose.model<ICharacter>('Character', characterSchema);

export default Character;
