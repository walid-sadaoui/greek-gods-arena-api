import mongoose from 'mongoose';
import { Character } from './characterModel';
import { UserInfo } from '../users/userModel';

export const createCharacter = async (
  user: UserInfo & mongoose.Document<any, any, UserInfo>,
  characterName: string
): Promise<UserInfo & mongoose.Document<any, any, UserInfo>> => {
  const newCharacter = new Character(characterName);
  user.characters.push(newCharacter);
  const updatedUser = await user.save();
  return updatedUser;
};

export const getCharacters = async (
  user: UserInfo & mongoose.Document<any, any, UserInfo>
): Promise<Character[]> => {
  const characterList: Character[] = user.toObject().characters;
  return characterList;
};

export const getCharacterByName = async (
  user: UserInfo & mongoose.Document<any, any, UserInfo>,
  characterName: string
): Promise<Character | undefined> => {
  const characterList: Character[] = await getCharacters(user);
  const character: Character | undefined = characterList.find(
    (character: Character) => character.name === characterName
  );
  return character;
};

export const updateCharacter = async (
  user: UserInfo & mongoose.Document<any, any, UserInfo>,
  characterName: string,
  newCharacterProperties: Partial<Character>
): Promise<Character> => {
  const characters: Character[] = user.toObject().characters;
  const updatedCharacters = characters.map((character: Character) =>
    character.name === characterName
      ? {
          ...character,
          ...newCharacterProperties,
        }
      : character
  );
  const index: number = user.characters.findIndex(
    (character: Character) => character.name === characterName
  );
  user.characters = updatedCharacters;
  const updatedUser = await user.save();
  return updatedUser.toObject().characters[index];
};

export const deleteCharacter = async (
  user: UserInfo & mongoose.Document<any, any, UserInfo>,
  characterName: string
): Promise<void> => {
  const updatedCharactersList = user
    .toObject()
    .characters.filter(
      (character: Character) => character.name !== characterName
    );
  user.characters = updatedCharactersList;
  await user.save();
};
