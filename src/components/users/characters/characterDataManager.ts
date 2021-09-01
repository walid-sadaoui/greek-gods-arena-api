import mongoose from 'mongoose';
import { ICharacter } from './characterModel';
import Character from './characterSchema';
import { UserData } from '../userModel';
import User from '../userSchema';

export const createCharacter = async (
  user: UserData & mongoose.Document<any, any, UserData>,
  characterName: string
): Promise<UserData & mongoose.Document<any, any, UserData>> => {
  const newCharacter = new Character({ name: characterName });
  user.characters.push(newCharacter);
  const createdUser = await user.save();
  return createdUser;
};

export const getCharacters = async (
  user: UserData & mongoose.Document<any, any, UserData>
): Promise<ICharacter[]> => {
  const characterList: ICharacter[] = user.toObject().characters;
  return characterList;
};

export const getCharacterByName = async (
  user: UserData & mongoose.Document<any, any, UserData>,
  characterName: string
): Promise<ICharacter | undefined> => {
  const characterList: ICharacter[] = await getCharacters(user);
  const character: ICharacter | undefined = characterList.find(
    (character: ICharacter) => character.name === characterName
  );
  return character;
};

export const updateCharacter = async (
  user: UserData & mongoose.Document<any, any, UserData>,
  characterName: string,
  newCharacterProperties: Partial<ICharacter>
): Promise<ICharacter> => {
  const characters: ICharacter[] = user.toObject().characters;
  const updatedCharacters = characters.map((character: ICharacter) =>
    character.name === characterName
      ? {
          ...character,
          ...newCharacterProperties,
        }
      : character
  );
  const index: number = user.characters.findIndex(
    (character: ICharacter) => character.name === characterName
  );
  user.characters = updatedCharacters;
  const updatedUser = await user.save();
  return updatedUser.toObject().characters[index];
};

export const updateCharacterById = async (
  characterId: string,
  characterName: string,
  newCharacterProperties: Partial<ICharacter>
): Promise<ICharacter | void> => {
  const user = await User.findOne({ 'characters._id': characterId });
  if (!user) throw new Error('Character not found');
  const characterToUpdate = findCharacterByName(
    user.toObject().characters,
    characterName
  );
  if (!characterToUpdate) throw new Error('Character not found !');
  const updatedCharacter = await updateCharacter(
    user,
    characterToUpdate.name,
    newCharacterProperties
  );
  return updatedCharacter;
};

export const deleteCharacter = async (
  user: UserData & mongoose.Document<any, any, UserData>,
  characterName: string
): Promise<void> => {
  const updatedCharactersList = user
    .toObject()
    .characters.filter(
      (character: ICharacter) => character.name !== characterName
    );
  user.characters = updatedCharactersList;
  await user.save();
};

const findCharacterByName = (
  characters: ICharacter[],
  characterName: string
): ICharacter | undefined => {
  const character: ICharacter | undefined = characters.find(
    (character: ICharacter) => character.name === characterName
  );
  return character;
};
