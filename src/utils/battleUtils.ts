
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
    toast({
      title: "Battle Finished!",
      description: `${gladiators[1].name} is victorious!`,
    });
    return true;
  } else if (gladiators[1].health <= 0) {
    setBattleEnded(true);
    setIsFighting(false);
    setWinner(gladiators[0]);
    toast({
      title: "Battle Finished!",
      description: `${gladiators[0].name} is victorious!`,
    });
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
  const attackOrder = gladiators[0].agility >= gladiators[1].agility ? [0, 1] : [1, 0];
  
  for (let i of attackOrder) {
    if (checkEndCondition()) {
      return true;
    }
    
    const attacker = i;
    const defender = 1 - i;
    
    // Calculate attack speed based on agility (300-1000ms)
    const attackSpeed = Math.max(300, 1000 - gladiators[attacker].agility * 50);
    
    setAttackingGladiator(attacker);
    
    const { damage, isCritical, evaded } = calculateDamage(gladiators[attacker], gladiators[defender]);
    
    if (evaded) {
      setEvadedHit(true);
      setHurtGladiator(null);
      setCriticalHit(false);
    } else if (damage > 0) {
      setHurtGladiator(defender);
      setCriticalHit(isCritical);
      setEvadedHit(false);
      
      const newHealth = Math.max(0, gladiators[defender].health - damage);
      
      setGladiators(prev => [
        {
          ...prev[0],
          health: defender === 0 ? newHealth : prev[0].health,
          attackCount: attacker === 0 ? (prev[0].attackCount || 0) + 1 : prev[0].attackCount,
          stamina: attacker === 0 ? Math.max(0, prev[0].stamina - 10) : prev[0].stamina
        },
        {
          ...prev[1],
          health: defender === 1 ? newHealth : prev[1].health,
          attackCount: attacker === 1 ? (prev[1].attackCount || 0) + 1 : prev[1].attackCount,
          stamina: attacker === 1 ? Math.max(0, prev[1].stamina - 10) : prev[1].stamina
        }
      ]);
      
      // Check for battle end after damage
      if (newHealth <= 0) {
        await delay(attackSpeed);
        if (checkEndCondition()) {
          return true;
        }
      }
    }
    
    await delay(attackSpeed);
    setAttackingGladiator(null);
    setHurtGladiator(null);
    setCriticalHit(false);
    setEvadedHit(false);
    await delay(200);
  }
  
  return false;
};
