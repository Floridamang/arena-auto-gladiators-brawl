
import React, { createContext, useContext, useState, useEffect } from "react";
import { Gladiator } from "@/types/gladiator";
import { toast } from "@/components/ui/sonner";

// Define the day cycle types
type DayCycle = "morning" | "noon" | "evening" | "night";

// Define the game state interface
interface GameState {
  dayCycle: DayCycle;
  playerGladiator: Gladiator;
  advanceCycle: () => void;
  resetToMorning: () => void;
  addExperiencePoints: (xp: number) => void;
  levelUp: () => void;
  allocateSkillPoint: (attribute: "strength" | "agility" | "endurance" | "maxStamina", value: number) => void;
  resetSkillPoints: () => void;
  availableSkillPoints: number;
  tempAttributes: {
    strength: number;
    agility: number;
    endurance: number;
    maxStamina: number;
  };
}

const initialPlayerGladiator: Gladiator = {
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
    name: "resentful",
    description: "Does double damage below 10% health"
  }],
  attackCount: 0
};

const GameContext = createContext<GameState | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dayCycle, setDayCycle] = useState<DayCycle>("morning");
  const [playerGladiator, setPlayerGladiator] = useState<Gladiator>(initialPlayerGladiator);
  const [availableSkillPoints, setAvailableSkillPoints] = useState<number>(0);
  const [tempAttributes, setTempAttributes] = useState({
    strength: 0,
    agility: 0,
    endurance: 0,
    maxStamina: 0,
  });

  // Advance the day cycle (morning -> noon -> evening -> night -> morning)
  const advanceCycle = () => {
    setDayCycle(prevCycle => {
      switch (prevCycle) {
        case "morning": return "noon";
        case "noon": return "evening";
        case "evening": return "night";
        case "night": return "morning";
        default: return "morning";
      }
    });
  };

  // Reset to morning (used when sleeping)
  const resetToMorning = () => {
    setDayCycle("morning");
  };

  // Add experience points and check for level up
  const addExperiencePoints = (xp: number) => {
    setPlayerGladiator(prev => {
      const newExperience = prev.experience + xp;
      const experienceNeeded = prev.experienceToNextLevel;
      
      if (newExperience >= experienceNeeded) {
        toast.success("Level up! You can now allocate skill points.");
        return {
          ...prev,
          experience: newExperience - experienceNeeded,
          level: prev.level + 1,
          experienceToNextLevel: calculateNextLevelXp(prev.level + 1),
        };
      }
      
      return {
        ...prev,
        experience: newExperience,
      };
    });
  };

  // Calculate experience needed for next level
  const calculateNextLevelXp = (level: number): number => {
    if (level <= 3) {
      return level * 100; // Levels 1-3: 100, 200, 300
    } else {
      // From level 4 onwards, 10% increase per level
      return Math.floor(300 * Math.pow(1.1, level - 3));
    }
  };

  // Effect to update skill points when level changes
  useEffect(() => {
    const prevLevel = playerGladiator.level - 1;
    const currentSkillPoints = prevLevel * 3;
    
    // Check if we need to add skill points (level up happened)
    if (availableSkillPoints < currentSkillPoints) {
      setAvailableSkillPoints(3);
    }
  }, [playerGladiator.level, availableSkillPoints]);

  // Level up the gladiator
  const levelUp = () => {
    // Apply the temporary attributes to the gladiator
    setPlayerGladiator(prev => ({
      ...prev,
      strength: prev.strength + tempAttributes.strength,
      agility: prev.agility + tempAttributes.agility,
      endurance: prev.endurance + tempAttributes.endurance,
      maxStamina: prev.maxStamina + tempAttributes.maxStamina,
      stamina: prev.stamina + tempAttributes.maxStamina, // Also increase current stamina
    }));
    
    // Reset skill points and temp attributes
    setAvailableSkillPoints(0);
    setTempAttributes({
      strength: 0,
      agility: 0,
      endurance: 0,
      maxStamina: 0
    });
    
    toast.success("Skills improved!");
  };

  // Allocate skill point to an attribute
  const allocateSkillPoint = (attribute: "strength" | "agility" | "endurance" | "maxStamina", value: number) => {
    // Check if we have points to allocate or if we're removing points
    if ((value > 0 && availableSkillPoints <= 0) || 
        (value < 0 && tempAttributes[attribute] <= 0)) {
      return;
    }
    
    setTempAttributes(prev => ({
      ...prev,
      [attribute]: Math.max(0, prev[attribute] + value)
    }));
    
    setAvailableSkillPoints(prev => prev - value);
  };

  // Reset skill points allocation
  const resetSkillPoints = () => {
    setAvailableSkillPoints(prev => prev + 
      tempAttributes.strength + 
      tempAttributes.agility + 
      tempAttributes.endurance + 
      tempAttributes.maxStamina
    );
    
    setTempAttributes({
      strength: 0,
      agility: 0,
      endurance: 0,
      maxStamina: 0
    });
  };

  return (
    <GameContext.Provider value={{
      dayCycle,
      playerGladiator,
      advanceCycle,
      resetToMorning,
      addExperiencePoints,
      levelUp,
      allocateSkillPoint,
      resetSkillPoints,
      availableSkillPoints,
      tempAttributes
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
