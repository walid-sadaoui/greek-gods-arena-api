export interface CharacterData {
  name: string;
  skillPoints: number;
  health: number;
  attack: number;
  defense: number;
  magik: number;
  level: number;
}

export class Character {
  name: string;

  skillPoints: number;

  health: number;

  attack: number;

  defense: number;

  magik: number;

  level: number;

  constructor(name: string) {
    this.name = name;
    this.level = 1;
    this.skillPoints = 12;
    this.health = 10;
    this.attack = 0;
    this.defense = 0;
    this.magik = 0;
  }
}
