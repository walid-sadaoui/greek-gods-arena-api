export interface ITurn {
  count: number;
  attacker: IAttacker;
  defender: IDefender;
  damages: number;
  attackSuccess: boolean;
}

export interface IAttacker {
  id: string;
  attackValue: number;
  remainingHealth: number;
}

export interface IDefender {
  id: string;
  defenseSkillPoints: number;
  remainingHealth: number;
}
