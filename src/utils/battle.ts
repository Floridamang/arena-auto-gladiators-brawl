import { Gladiator } from "@/types/gladiator";

export const calculateDamage = (attacker: Gladiator, defender: Gladiator) => {
  // Check if attacker has enough stamina to attack
  if (attacker.stamina < 10) {
    return { damage: 0, isCritical: false, evaded: false };
  }
  
  // Calculate chance of evading based on defender's agility (0-20%)
  const evadeChance = defender.agility * 0.02; // 2% per agility point
  if (Math.random() < evadeChance) {
    return { damage: 0, isCritical: false, evaded: true };
  }
  
  // Base damage now uses strength instead of attack
  let baseDamage = Math.max(1, attacker.strength - defender.defense);
  
  // Bold trait: First two attacks are critical
  if (attacker.traits.some(t => t.name === "bold") && (attacker.attackCount || 0) < 2) {
    baseDamage *= 2;
    return { damage: baseDamage, isCritical: true, evaded: false };
  }
  
  // Resentful trait: Double damage below 10% health
  if (attacker.traits.some(t => t.name === "resentful") && attacker.health <= 10) {
    baseDamage *= 2;
    return { damage: baseDamage, isCritical: true, evaded: false };
  }
  
  return { damage: baseDamage, isCritical: false, evaded: false };
};

export const rechargeStamina = (gladiator: Gladiator): Gladiator => {
  // Recharge stamina based on endurance (higher endurance = faster recharge)
  const rechargeAmount = gladiator.endurance * 0.5; // 0.5 stamina per endurance point
  
  // Create a new gladiator object with ONLY stamina updated
  return {
    ...gladiator,
    stamina: Math.min(gladiator.maxStamina, gladiator.stamina + rechargeAmount),
    // Explicitly keep the same health to ensure it never changes
    health: gladiator.health
  };
};

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
