import { UserInfo } from '../users/userModel';
import HttpError from '../../common/error/httpError';
import User from '../users/userSchema';
import { Character } from './characterModel';

export enum GreekGods {
  APHRODITE = 'APHRODITE',
  APOLLO = 'APOLLO',
  ARES = 'ARES',
  ARTEMIS = 'ARTEMIS',
  ATHENA = 'ATHENA',
  DEMETER = 'DEMETER',
  DIONYSUS = 'DIONYSUS',
  HADES = 'HADES',
  HEPHAESTUS = 'HEPHAESTUS',
  HERA = 'HERA',
  HERMES = 'HERMES',
  HESTIA = 'HESTIA',
  POSEIDON = 'POSEIDON',
  ZEUS = 'ZEUS',
}

export const createCharacter = async (
  name: string,
  userId: string
): Promise<Character> => {
  try {
    if (!(name in GreekGods))
      throw new HttpError(
        422,
        'Create Character Error',
        `You need to provide a valid Greek God name !`,
        true
      );
    const newCharacter = new Character(name);
    const currentUser = await User.findOne({ _id: userId }, 'characters');
    if (currentUser.characters.length >= 10)
      throw new HttpError(
        400,
        'Create Character Error',
        `You cannot own more than 10 characters !`,
        true
      );

    const characterExists = currentUser.characters.find(
      (character: Character) => character.name === name
    );

    if (characterExists)
      throw new HttpError(
        409,
        'Create Character Error',
        `${characterExists.name} is already in you characters list !`,
        true
      );

    currentUser.characters.push(newCharacter);
    const updatedUser = await currentUser.save();
    const createdCharacter = updatedUser.characters.find(
      (character: Character) => character.name === name
    );
    return createdCharacter;
  } catch (error) {
    throw new HttpError(
      error.statusCode || 500,
      'Create Character Error',
      error.message || 'There was a problem creating the new character',
      true
    );
  }
};

export const getCharacters = async (userId: string): Promise<Character[]> => {
  try {
    const currentUser: UserInfo = await User.findOne(
      { _id: userId },
      'characters'
    );
    const characters: Character[] = currentUser.characters;
    return characters;
  } catch (error) {
    throw new HttpError(
      error.statusCode || 500,
      'Get Characters Error',
      error.message || 'There was a problem retrieving the characters',
      true
    );
  }
};
