
import { Gladiator } from "@/types/gladiator";
import { toast } from "@/components/ui/sonner";
import { getRandomRomanName } from "@/context/initialState";

export const generateOpponent = (playerLevel: number): Gladiator => {
  const level = playerLevel || 1;
  const name = getRandomRomanName();
      
  return {
    id: "opponent",
    name,
    attack: 12 + (level - 1) * 2,
    defense: 8 + (level - 1),
    health: 100 + (level - 1) * 10,
    isLeft: false,
    strength: 20 + (level - 1) * 2,
    agility: 10 + (level - 1),
    stamina: 100 + (level - 1) * 5,
    maxStamina: 100 + (level - 1) * 5,
    endurance: 12 + (level - 1),
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

