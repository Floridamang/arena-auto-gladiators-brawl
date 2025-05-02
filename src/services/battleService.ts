
import { Gladiator } from "@/types/gladiator";
import { toast } from "@/components/ui/sonner";
import { getRandomRomanName } from "@/context/initialState";

export const generateOpponent = (playerLevel: number): Gladiator => {
  // Ignore player level parameter - opponents are now fixed level
  const level = 1;
  const name = getRandomRomanName();
  
  // Base stats with some randomization - no player level scaling
  const baseStrength = Math.floor(18 + Math.random() * 4 - 2);
  const baseAgility = Math.floor(10 + Math.random() * 4 - 2);
  const baseEndurance = Math.floor(12 + Math.random() * 4 - 2);
  const baseMaxStamina = Math.floor(100 + Math.random() * 10 - 5);
  const baseHealth = Math.floor(100 + Math.random() * 10 - 5);
  
  // Apply the 10% reduction to make opponents easier
  const strength = Math.floor(baseStrength * 0.9);
  const agility = Math.floor(baseAgility * 0.9);
  const endurance = Math.floor(baseEndurance * 0.9);
  const maxStamina = Math.floor(baseMaxStamina * 0.9);
  const health = Math.floor(baseHealth * 0.9);
  
  // Calculate attack and defense based on strength and agility
  const attack = Math.floor((strength * 0.6 + agility * 0.2) * 0.9);
  const defense = Math.floor((strength * 0.2 + agility * 0.6) * 0.9);
      
  return {
    id: "opponent",
    name,
    attack,
    defense,
    health,
    isLeft: false,
    strength,
    agility,
    stamina: maxStamina,
    maxStamina,
    endurance,
    level,
    traits: [{
      name: "bold" as const,
      description: "First two attacks are critical hits"
    }],
    attackCount: 0
  };
};

export const handleBattleEnd = (
  winner: Gladiator | null,
  selectedGladiator: Gladiator,
  addExperiencePoints: (xp: number) => void
) => {
  if (winner && winner.id === selectedGladiator.id) {
    const xpReward = 100;
    addExperiencePoints(xpReward);
    toast.success(`Victory! Gained ${xpReward} experience.`);
    return true;
  }
  return false;
};
