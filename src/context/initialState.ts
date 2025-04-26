
import { GameState } from "@/types/gameState";
import { GladiatorTrait } from "@/types/gladiator";

export const initialPlayerGladiator = {
  id: "player",
  name: "Septimus",
  attack: 15,
  defense: 10,
  health: 100,
  strength: 18,
  agility: 12,
  stamina: 100,
  maxStamina: 100,
  endurance: 15,
  level: 1,
  experience: 0,
  experienceToNextLevel: 100,
  wins: 0,
  traits: [{
    name: "resentful" as const,
    description: "Does double damage below 10% health"
  }],
  attackCount: 0
};

export const initialGameState: GameState = {
  dayCycle: "morning",
  playerGladiator: initialPlayerGladiator,
  gold: 500,
  availableSkillPoints: 0,
  tempAttributes: {
    strength: 0,
    agility: 0,
    endurance: 0,
    maxStamina: 0,
  }
};
