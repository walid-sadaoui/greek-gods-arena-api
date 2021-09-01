export interface ICharacter {
  _id: string;
  name: string;
  skillPoints: number;
  health: number;
  attack: number;
  defense: number;
  magik: number;
  level: number;
}

export interface CharacterData {
  name: string;
  skillPoints: number;
  health: number;
  attack: number;
  defense: number;
  magik: number;
  level: number;
}

export interface CharacterProperties {
  health: number;
  attack: number;
  defense: number;
  magik: number;
}

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
