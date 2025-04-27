
import { Gladiator } from "./gladiator";

export type DayCycle = "morning" | "noon" | "evening" | "night";

export interface GameState {
  dayCycle: DayCycle;
  playerGladiator: Gladiator;
  ownedGladiators: Gladiator[];
  activeGladiatorId: string;
  gold: number;
  availableSkillPoints: number;
  tempAttributes: {
    strength: number;
    agility: number;
    endurance: number;
    maxStamina: number;
  };
}
