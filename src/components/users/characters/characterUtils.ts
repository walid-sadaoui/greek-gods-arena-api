import HttpError from '../../../common/error/httpError';
import { CharacterProperties, GreekGods, ICharacter } from './characterModel';

export const validateCharacterName = (characterName: string): void => {
  if (!(characterName in GreekGods))
    throw new HttpError(
      422,
      'Create Character Error',
      `You need to provide a valid Greek God name !`,
      true
    );
};

export const validateCharacterNewProperties = (
  character: ICharacter,
  updatedCharacterValues: CharacterProperties
): void => {
  const { attack, defense, health, magik } = updatedCharacterValues;
  if (attack < 0 || defense < 0 || health < 0 || magik < 0)
    throw new HttpError(
      400,
      'Update Character Error',
      `You cannot have negative values for attack, defense, health and magik !`,
      true
    );

  if (character.skillPoints === 0)
    throw new HttpError(
      400,
      'Update Character Error',
      `Your character has 0 skillPoints, it cannot be updated`,
      true
    );
};

export const calculateSkillPointsUsed = (
  previousValue: number,
  newValue: number
): number => {
  if (newValue < previousValue)
    throw new HttpError(
      400,
      'Update Character Error',
      'You cannot reduce skill amount !',
      true
    );
  if (newValue === previousValue) return 0;

  let skillPointsUsed = 0;
  for (let index = 0; index < newValue - previousValue; index++) {
    skillPointsUsed = skillPointsUsed + Math.ceil((previousValue + index) / 5);
  }
  return skillPointsUsed;
};

export const calculateHealthSkillPointsUsed = (
  previousValue: number,
  newValue: number
): number => {
  if (newValue < previousValue)
    throw new HttpError(
      400,
      'Update Character Error',
      'You cannot reduce skill amount !',
      true
    );
  if (newValue === previousValue) return 0;

  const skillPointsUsed = newValue - previousValue;
  return skillPointsUsed;
};

export const validateSkillPoints = (
  character: ICharacter,
  updatedCharacterValues: CharacterProperties
): number => {
  const healthkSkillPoints = calculateHealthSkillPointsUsed(
    character.health,
    updatedCharacterValues.health
  );
  const attackSkillPoints = calculateSkillPointsUsed(
    character.attack,
    updatedCharacterValues.attack
  );
  const defenseSkillPoints = calculateSkillPointsUsed(
    character.defense,
    updatedCharacterValues.defense
  );
  const magikSkillPoints = calculateSkillPointsUsed(
    character.magik,
    updatedCharacterValues.magik
  );
  const skillPointsUsed =
    healthkSkillPoints +
    attackSkillPoints +
    defenseSkillPoints +
    magikSkillPoints;
  if (skillPointsUsed > character.skillPoints) {
    throw new HttpError(
      400,
      'Update Character Error',
      `You used more skillPoints than your character can use !`,
      true
    );
  }
  const updatedSkillPoints = character.skillPoints - skillPointsUsed;
  return updatedSkillPoints;
};

export const validateCharacterUpdate = (
  character: ICharacter,
  updatedCharacterProperties: CharacterProperties
): Omit<ICharacter, '_id' | 'name' | 'level'> => {
  validateCharacterNewProperties(character, updatedCharacterProperties);
  const updatedSkillPoints: number = validateSkillPoints(
    character,
    updatedCharacterProperties
  );
  const characterProperties: Omit<ICharacter, '_id' | 'name' | 'level'> = {
    ...updatedCharacterProperties,
    skillPoints: updatedSkillPoints,
  };
  return characterProperties;
};
