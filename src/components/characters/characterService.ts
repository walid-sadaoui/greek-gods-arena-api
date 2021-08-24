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

const validateCharacterName = (characterName: string) => {
  if (!(characterName in GreekGods))
    throw new HttpError(
      422,
      'Create Character Error',
      `You need to provide a valid Greek God name !`,
      true
    );
};

export const createCharacter = async (
  characterName: string,
  userId: string
): Promise<Character> => {
  try {
    validateCharacterName(characterName);

    const newCharacter = new Character(characterName);
    const currentUser = await User.findOne({ _id: userId }, 'characters');
    if (currentUser.characters.length >= 10)
      throw new HttpError(
        400,
        'Create Character Error',
        `You cannot own more than 10 characters !`,
        true
      );

    const characterExists = currentUser.characters.find(
      (character: Character) => character.name === characterName
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
      (character: Character) => character.name === characterName
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

export const getCharacter = async (
  userId: string,
  characterName: string
): Promise<Character> => {
  try {
    validateCharacterName(characterName);

    const currentUser: UserInfo = await User.findOne(
      { _id: userId },
      'characters'
    );
    const character: Character | undefined = currentUser.characters.find(
      (character: Character) => character.name === characterName
    );

    if (!character)
      throw new HttpError(
        404,
        'Create Character Error',
        `Character ${characterName} is not in you characters list !`,
        true
      );

    return character;
  } catch (error) {
    throw new HttpError(
      error.statusCode || 500,
      'Get Characters Error',
      error.message || 'There was a problem retrieving the characters',
      true
    );
  }
};

export const deleteCharacter = async (
  userId: string,
  characterName: string
): Promise<void> => {
  try {
    validateCharacterName(characterName);

    const currentUser = await User.findOne({ _id: userId }, 'characters');
    const characterToDelete: Character | undefined =
      currentUser.characters.find(
        (character: Character) => character.name === characterName
      );

    if (!characterToDelete)
      throw new HttpError(
        404,
        'Delete Character Error',
        `Character ${characterName} is not in you characters list !`,
        true
      );

    const updatedCharactersList = currentUser.characters.filter(
      (character: Character) => character.name !== characterToDelete.name
    );
    currentUser.characters = updatedCharactersList;
    await currentUser.save();
  } catch (error) {
    throw new HttpError(
      error.statusCode || 500,
      'Delete Characters Error',
      error.message || 'There was a problem retrieving the characters',
      true
    );
  }
};
