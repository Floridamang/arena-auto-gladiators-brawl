
import { Gladiator } from "@/types/gladiator";

export const calculateDamage = (attacker: Gladiator, defender: Gladiator) => {
  let baseDamage = Math.max(1, attacker.attack - defender.defense);
  
  // Bold trait: First two attacks are critical
  if (attacker.traits.some(t => t.name === "bold") && (attacker.attackCount || 0) < 2) {
    baseDamage *= 2;
    return { damage: baseDamage, isCritical: true };
  }
  
  // Resentful trait: Double damage below 10% health
  if (attacker.traits.some(t => t.name === "resentful") && attacker.health <= 10) {
    baseDamage *= 2;
    return { damage: baseDamage, isCritical: true };
  }
  
  return { damage: baseDamage, isCritical: false };
};

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
