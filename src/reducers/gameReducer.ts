
import { GameState, DayCycle } from "@/types/gameState";
import { Gladiator } from "@/types/gladiator";

type GameAction =
  | { type: "ADVANCE_CYCLE" }
  | { type: "RESET_TO_MORNING" }
  | { type: "ADD_EXPERIENCE"; payload: number }
  | { type: "LEVEL_UP" }
  | { type: "ALLOCATE_SKILL_POINT"; payload: { attribute: keyof Pick<Gladiator, "strength" | "agility" | "endurance" | "maxStamina">; value: number } }
  | { type: "RESET_SKILL_POINTS" };

export const calculateNextLevelXp = (level: number): number => {
  if (level <= 3) {
    return level * 100;
  } else {
    return Math.floor(300 * Math.pow(1.1, level - 3));
  }
};

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "ADVANCE_CYCLE": {
      const cycleMap: { [key in DayCycle]: DayCycle } = {
        morning: "noon",
        noon: "evening",
        evening: "night",
        night: "morning",
      };
      return { ...state, dayCycle: cycleMap[state.dayCycle] };
    }

    case "RESET_TO_MORNING":
      return { ...state, dayCycle: "morning" };

    case "ADD_EXPERIENCE": {
      const newExperience = state.playerGladiator.experience + action.payload;
      const experienceNeeded = state.playerGladiator.experienceToNextLevel;

      if (newExperience >= experienceNeeded) {
        const newLevel = state.playerGladiator.level + 1;
        return {
          ...state,
          playerGladiator: {
            ...state.playerGladiator,
            experience: newExperience - experienceNeeded,
            level: newLevel,
            experienceToNextLevel: calculateNextLevelXp(newLevel),
          },
          availableSkillPoints: 3,
        };
      }

      return {
        ...state,
        playerGladiator: {
          ...state.playerGladiator,
          experience: newExperience,
        },
      };
    }

    case "LEVEL_UP":
      return {
        ...state,
        playerGladiator: {
          ...state.playerGladiator,
          strength: state.playerGladiator.strength + state.tempAttributes.strength,
          agility: state.playerGladiator.agility + state.tempAttributes.agility,
          endurance: state.playerGladiator.endurance + state.tempAttributes.endurance,
          maxStamina: state.playerGladiator.maxStamina + state.tempAttributes.maxStamina,
          stamina: state.playerGladiator.stamina + state.tempAttributes.maxStamina,
        },
        availableSkillPoints: 0,
        tempAttributes: {
          strength: 0,
          agility: 0,
          endurance: 0,
          maxStamina: 0,
        },
      };

    case "ALLOCATE_SKILL_POINT": {
      const { attribute, value } = action.payload;
      
      // Check if we can allocate or deallocate points
      if ((value > 0 && state.availableSkillPoints <= 0) || 
          (value < 0 && state.tempAttributes[attribute] <= 0)) {
        return state;
      }

      return {
        ...state,
        tempAttributes: {
          ...state.tempAttributes,
          [attribute]: Math.max(0, state.tempAttributes[attribute] + value),
        },
        availableSkillPoints: state.availableSkillPoints - value,
      };
    }

    case "RESET_SKILL_POINTS":
      return {
        ...state,
        availableSkillPoints: state.availableSkillPoints + 
          state.tempAttributes.strength + 
          state.tempAttributes.agility + 
          state.tempAttributes.endurance + 
          state.tempAttributes.maxStamina,
        tempAttributes: {
          strength: 0,
          agility: 0,
          endurance: 0,
          maxStamina: 0,
        },
      };

    default:
      return state;
  }
};
