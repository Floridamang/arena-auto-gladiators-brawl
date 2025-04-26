
import { Gladiator } from "./gladiator";

export type DayCycle = "morning" | "noon" | "evening" | "night";

export interface TempAttributes {
  strength: number;
  agility: number;
  endurance: number;
  maxStamina: number;
}

export interface GameState {
  dayCycle: DayCycle;
  playerGladiator: Gladiator;
  gold: number;
  availableSkillPoints: number;
  tempAttributes: TempAttributes;
}
