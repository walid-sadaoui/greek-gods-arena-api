import { hashPassword } from '../../components/auth/authService';
import User from '../../components/users/userSchema';
import * as faker from 'faker';
import { IUser } from '../../components/users/userModel';
import { GreekGods } from '../../components/users/characters/characterModel';
import { ICharacter } from '../../components/users/characters/characterModel';
import Character from '../../components/users/characters/characterSchema';
import * as UserDM from '../../components/users/userDataManager';
import * as CharacterDM from '../../components/users/characters/characterDataManager';
import * as FightUtils from '../../components/fights/fightUtils';
import { IFight } from 'components/fights/fightModel';

export enum FakePassword {
  GOOD = 'abcABC123456!',
  GOOD_2 = 'defDEF123456!',
  LESS_THAN_8_CHAR = 'aA123!',
  // NO_DIGIT = 'abcdefABCDEF!',
  // No_LOWERCASE = 'ABCDEF123456!',
  // NO_UPPERCASE = 'abcdef123456!',
  // MORE_THAN_26_CHAR = 'abcABC123456!abcABC123456!',
}

export const createUser = async (): Promise<IUser> => {
  try {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = FakePassword.GOOD;
    const hashedPassword: string = await hashPassword(password);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const userSignedUp = await newUser.save();
    const { password: userPassword, __v, ...rest } = userSignedUp.toObject();
    const userInfo: IUser = { ...rest, password };
    return userInfo;
  } catch (error) {
    throw new Error(error);
  }
};

export const createCharacter = async (userId: string): Promise<ICharacter> => {
  try {
    const currentUser = await UserDM.getUser(userId);
    const newCharacter = new Character({ name: GreekGods.ZEUS });
    currentUser.characters.push(newCharacter);
    await currentUser.save();
    return newCharacter;
  } catch (error) {
    throw new Error(error);
  }
};

export const createCharacters = async (
  userId: string,
  number: number
): Promise<ICharacter[]> => {
  try {
    const currentUser = await UserDM.getUser(userId);
    const greekGods = Object.values(GreekGods);
    for (let index = 0; index < (number > 10 ? 10 : number); index++) {
      const greekGod = greekGods[index];
      const newCharacter = new Character({ name: greekGod });
      currentUser.characters.push(newCharacter);
    }
    await currentUser.save();
    return currentUser.characters;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateCharacter = async (
  userId: string,
  characterName: string
): Promise<ICharacter> => {
  try {
    const currentUser = await UserDM.getUser(userId);

    const updatedCharacterProperties = {
      skillPoints: 42,
      health: 20,
      attack: 12,
      defense: 14,
      magik: 2,
      level: 1,
    };
    const updatedCharacter = await CharacterDM.updateCharacter(
      currentUser,
      characterName,
      updatedCharacterProperties
    );
    return updatedCharacter;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateCharacterProperties = async (
  userId: string,
  characterName: string,
  newCharacterProperties: Partial<ICharacter>
): Promise<ICharacter> => {
  try {
    const currentUser = await UserDM.getUser(userId);
    const updatedCharacter = await CharacterDM.updateCharacter(
      currentUser,
      characterName,
      newCharacterProperties
    );
    return updatedCharacter;
  } catch (error) {
    throw new Error(error);
  }
};

export const newFight = async (
  firstUserId: string,
  secondUserId: string
): Promise<IFight> => {
  try {
    const firstUser = await UserDM.getUser(firstUserId);
    const secondUser = await UserDM.getUser(secondUserId);

    const fight = await FightUtils.launchFight(
      firstUser.characters[0],
      secondUser.characters[1]
    );
    return fight;
  } catch (error) {
    throw new Error(error);
  }
};
