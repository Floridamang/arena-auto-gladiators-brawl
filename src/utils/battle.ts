
import { Gladiator } from "@/types/gladiator";

export const calculateDamage = (attacker: Gladiator, defender: Gladiator) => {
  const damage = Math.max(0, attacker.attack - defender.defense);
  return Math.max(1, damage); // Ensure at least 1 damage is dealt
};

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
