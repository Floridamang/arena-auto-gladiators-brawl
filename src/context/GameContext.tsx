
import React, { createContext, useContext, useReducer } from "react";
import { toast } from "@/components/ui/sonner";
import { gameReducer } from "@/reducers/gameReducer";
import { initialGameState } from "./initialState";
import { GameState } from "@/types/gameState";
import { Gladiator } from "@/types/gladiator";

interface GameContextType extends GameState {
  advanceCycle: () => void;
  resetToMorning: () => void;
  addExperiencePoints: (xp: number) => void;
  levelUp: () => void;
  allocateSkillPoint: (attribute: keyof Pick<Gladiator, "strength" | "agility" | "endurance" | "maxStamina">, value: number) => void;
  resetSkillPoints: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  const advanceCycle = () => {
    dispatch({ type: "ADVANCE_CYCLE" });
  };

  const resetToMorning = () => {
    dispatch({ type: "RESET_TO_MORNING" });
  };

  const addExperiencePoints = (xp: number) => {
    dispatch({ type: "ADD_EXPERIENCE", payload: xp });
    
    // Check if leveled up by comparing current state with next state
    const currentLevel = state.playerGladiator.level;
    if (state.playerGladiator.experience + xp >= state.playerGladiator.experienceToNextLevel) {
      toast.success(`Level up! You can now allocate skill points.`);
    }
  };

  const levelUp = () => {
    // Verify there are actually points allocated
    if (Object.values(state.tempAttributes).every(v => v === 0)) {
      toast.error("You must allocate at least one skill point");
      return;
    }
    
    dispatch({ type: "LEVEL_UP" });
    toast.success("Skills improved!");
  };

  const allocateSkillPoint = (
    attribute: keyof Pick<Gladiator, "strength" | "agility" | "endurance" | "maxStamina">, 
    value: number
  ) => {
    dispatch({ type: "ALLOCATE_SKILL_POINT", payload: { attribute, value } });
  };

  const resetSkillPoints = () => {
    dispatch({ type: "RESET_SKILL_POINTS" });
  };

  return (
    <GameContext.Provider value={{
      ...state,
      advanceCycle,
      resetToMorning,
      addExperiencePoints,
      levelUp,
      allocateSkillPoint,
      resetSkillPoints,
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
