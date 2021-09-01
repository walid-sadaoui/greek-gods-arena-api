import HttpError from '../../../common/error/httpError';
import { CharacterProperties, ICharacter } from './characterModel';
import * as CharacterDM from './characterDataManager';
import * as UserDM from '../userDataManager';
import {
  validateCharacterName,
  validateCharacterUpdate,
} from './characterUtils';

export const createCharacter = async (
  characterName: string,
  userId: string
): Promise<ICharacter> => {
  try {
    validateCharacterName(characterName);

    const currentUser = await UserDM.getUser(userId);

    if (currentUser.characters.length >= 10)
      throw new HttpError(
        400,
        'Create Character Error',
        `You cannot own more than 10 characters !`,
        true
      );

    const characterExists = await CharacterDM.getCharacterByName(
      currentUser,
      characterName
    );
    if (characterExists)
      throw new HttpError(
        409,
        'Create Character Error',
        `${characterExists.name} is already in you characters list !`,
        true
      );

    const updatedUser = await CharacterDM.createCharacter(
      currentUser,
      characterName
    );
    const createdCharacter = await CharacterDM.getCharacterByName(
      updatedUser,
      characterName
    );
    if (!createdCharacter)
      throw new HttpError(
        400,
        'Create Character Error',
        `There was an error while creating your character ${characterName} !`,
        true
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

export const getCharacters = async (userId: string): Promise<ICharacter[]> => {
  try {
    const currentUser = await UserDM.getUser(userId);
    const characters: ICharacter[] = await CharacterDM.getCharacters(
      currentUser
    );
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
): Promise<ICharacter> => {
  try {
    validateCharacterName(characterName);

    const currentUser = await UserDM.getUser(userId);
    const character = await CharacterDM.getCharacterByName(
      currentUser,
      characterName
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
      'Get Character Error',
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

    const currentUser = await UserDM.getUser(userId);
    const characterToDelete: ICharacter | undefined =
      await CharacterDM.getCharacterByName(currentUser, characterName);

    if (!characterToDelete)
      throw new HttpError(
        404,
        'Delete Character Error',
        `Character ${characterName} is not in you characters list !`,
        true
      );

    await CharacterDM.deleteCharacter(currentUser, characterName);
  } catch (error) {
    throw new HttpError(
      error.statusCode || 500,
      'Delete Characters Error',
      error.message || 'There was a problem retrieving the characters',
      true
    );
  }
};

export const updateCharacter = async (
  userId: string,
  characterName: string,
  newCharacterProperties: CharacterProperties
): Promise<ICharacter> => {
  try {
    validateCharacterName(characterName);

    const currentUser = await UserDM.getUser(userId);
    const characterToUpdate: ICharacter | undefined =
      await CharacterDM.getCharacterByName(currentUser, characterName);
    if (!characterToUpdate)
      throw new HttpError(
        404,
        'Update Character Error',
        `Character ${characterName} is not in you characters list !`,
        true
      );

    const updatedCharacterProperties: Omit<
      ICharacter,
      '_id' | 'name' | 'level'
    > = validateCharacterUpdate(characterToUpdate, newCharacterProperties);
    const updatedCharacter: ICharacter = await CharacterDM.updateCharacter(
      currentUser,
      characterName,
      updatedCharacterProperties
    );

    return updatedCharacter;
  } catch (error) {
    throw new HttpError(
      error.statusCode || 500,
      'Update Character Error',
      error.message || 'There was a problem updating the character',
      true
    );
  }
};
