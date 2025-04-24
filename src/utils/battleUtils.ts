import { Gladiator } from "@/types/gladiator";
import { calculateDamage, delay } from "./battle";
import { toast } from "@/components/ui/sonner";

export const checkBattleEnd = (
  gladiators: [Gladiator, Gladiator],
  setBattleEnded: (value: boolean) => void,
  setIsFighting: (value: boolean) => void,
  setWinner: (winner: Gladiator | null) => void
): boolean => {
  if (gladiators[0].health <= 0) {
    setBattleEnded(true);
    setIsFighting(false);
    setWinner(gladiators[1]);
    toast.success(`${gladiators[1].name} is victorious!`);
    return true;
  } else if (gladiators[1].health <= 0) {
    setBattleEnded(true);
    setIsFighting(false);
    setWinner(gladiators[0]);
    toast.success(`${gladiators[0].name} is victorious!`);
    return true;
  }
  return false;
};

export const processBattleRound = async (
  gladiators: [Gladiator, Gladiator],
  setGladiators: (value: [Gladiator, Gladiator]) => void,
  setAttackingGladiator: (value: number | null) => void,
  setHurtGladiator: (value: number | null) => void,
  setCriticalHit: (value: boolean) => void,
  setEvadedHit: (value: boolean) => void,
  checkEndCondition: () => boolean
): Promise<boolean> => {
  console.log("Processing battle round with gladiators:", gladiators);
  
  // Ensure gladiators don't get health updates if they're at 0 or below
  if (gladiators[0].health <= 0 || gladiators[1].health <= 0) {
    console.log("A gladiator has already fallen, checking end condition");
    return checkEndCondition();
  }
  
  const attackOrder = gladiators[0].agility >= gladiators[1].agility ? [0, 1] : [1, 0];
  console.log(`Attack order: ${attackOrder.join(' then ')}`);
  
  // Keep track of current health values to prevent regeneration
  const currentHealths = [gladiators[0].health, gladiators[1].health];
  
  for (let i of attackOrder) {
    // Check before each attack in case a previous attack ended the battle
    if (currentHealths[0] <= 0 || currentHealths[1] <= 0) {
      console.log("Mid-round health check: a gladiator has fallen");
      return checkEndCondition();
    }
    
    const attacker = i;
    const defender = 1 - i;
    
    console.log(`${gladiators[attacker].name} is attacking ${gladiators[defender].name}`);
    
    // Skip attack if attacker has no health
    if (currentHealths[attacker] <= 0) {
      console.log(`${gladiators[attacker].name} cannot attack (no health)`);
      continue;
    }
    
    // Calculate attack speed based on agility (300-1000ms)
    const attackSpeed = Math.max(300, 1000 - gladiators[attacker].agility * 50);
    console.log(`Attack speed: ${attackSpeed}ms`);
    
    setAttackingGladiator(attacker);
    
    const { damage, isCritical, evaded } = calculateDamage(gladiators[attacker], gladiators[defender]);
    console.log(`Damage calculation: damage=${damage}, critical=${isCritical}, evaded=${evaded}`);
    
    if (evaded) {
      console.log(`${gladiators[defender].name} evaded the attack`);
      setEvadedHit(true);
      setHurtGladiator(null);
      setCriticalHit(false);
      await delay(attackSpeed);
    } else if (damage > 0) {
      console.log(`${gladiators[defender].name} takes ${damage} damage${isCritical ? ' (CRITICAL)' : ''}`);
      setHurtGladiator(defender);
      setCriticalHit(isCritical);
      setEvadedHit(false);
      
      // Prevent negative health by clamping to 0
      const newHealth = Math.max(0, currentHealths[defender] - damage);
      console.log(`${gladiators[defender].name}'s health reduced from ${currentHealths[defender]} to ${newHealth}`);
      
      // Update our tracking variable
      currentHealths[defender] = newHealth;
      
      const updatedGladiators: [Gladiator, Gladiator] = [
        {
          ...gladiators[0],
          health: defender === 0 ? newHealth : currentHealths[0],
          attackCount: attacker === 0 ? (gladiators[0].attackCount || 0) + 1 : gladiators[0].attackCount,
          stamina: attacker === 0 ? Math.max(0, gladiators[0].stamina - 10) : gladiators[0].stamina
        },
        {
          ...gladiators[1],
          health: defender === 1 ? newHealth : currentHealths[1],
          attackCount: attacker === 1 ? (gladiators[1].attackCount || 0) + 1 : gladiators[1].attackCount,
          stamina: attacker === 1 ? Math.max(0, gladiators[1].stamina - 10) : gladiators[1].stamina
        }
      ];
      
      setGladiators(updatedGladiators);
      
      // Immediately check if the battle has ended
      if (newHealth <= 0) {
        console.log(`${gladiators[defender].name} has fallen!`);
        await delay(attackSpeed);
        return checkEndCondition();
      }
      
      await delay(attackSpeed);
    } else {
      console.log(`${gladiators[attacker].name} couldn't deal damage (not enough stamina or other issue)`);
      // If no damage (not enough stamina), still pause for visual effect
      await delay(attackSpeed/2);
    }
    
    setAttackingGladiator(null);
    setHurtGladiator(null);
    setCriticalHit(false);
    setEvadedHit(false);
    await delay(200);
  }
  
  console.log("Round complete");
  return false;
};
