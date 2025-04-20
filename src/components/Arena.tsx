
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GladiatorCard from "./GladiatorCard";
import { Gladiator } from "@/types/gladiator";
import { calculateDamage, delay, rechargeStamina } from "@/utils/battle";
import { useToast } from "@/hooks/use-toast";

const INITIAL_GLADIATORS: [Gladiator, Gladiator] = [
  {
    id: "1",
    name: "Marcus",
    attack: 15,
    defense: 10,
    health: 100,
    isLeft: true,
    strength: 18,
    agility: 12,
    stamina: 100,
    maxStamina: 100,
    endurance: 15,
    traits: [{
      name: "resentful",
      description: "Does double damage below 10% health"
    }],
    attackCount: 0
  },
  {
    id: "2",
    name: "Brutus",
    attack: 12,
    defense: 8,
    health: 100,
    isLeft: false,
    strength: 20,
    agility: 10,
    stamina: 100,
    maxStamina: 100,
    endurance: 12,
    traits: [{
      name: "bold",
      description: "First two attacks are critical hits"
    }],
    attackCount: 0
  },
];

const Arena = () => {
  const [gladiators, setGladiators] = useState<[Gladiator, Gladiator]>(INITIAL_GLADIATORS);
  const [isFighting, setIsFighting] = useState(false);
  const [attackingGladiator, setAttackingGladiator] = useState<number | null>(null);
  const [hurtGladiator, setHurtGladiator] = useState<number | null>(null);
  const [criticalHit, setCriticalHit] = useState(false);
  const [evadedHit, setEvadedHit] = useState(false);
  const [battleEnded, setBattleEnded] = useState(false);
  const [winner, setWinner] = useState<Gladiator | null>(null);
  const { toast } = useToast();

  // Recharge stamina over time
  useEffect(() => {
    if (!isFighting) return;
    
    const interval = setInterval(() => {
      setGladiators(prevGladiators => [
        rechargeStamina(prevGladiators[0]),
        rechargeStamina(prevGladiators[1])
      ]);
    }, 500);
    
    return () => clearInterval(interval);
  }, [isFighting]);

  const resetBattle = () => {
    setGladiators(INITIAL_GLADIATORS);
    setIsFighting(false);
    setAttackingGladiator(null);
    setHurtGladiator(null);
    setCriticalHit(false);
    setEvadedHit(false);
    setBattleEnded(false);
    setWinner(null);
  };

  const checkBattleEnd = () => {
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

  const fight = async () => {
    if (isFighting) return;
    setIsFighting(true);
    setBattleEnded(false);
    setWinner(null);

    // Main battle loop
    while (!battleEnded) {
      // Check for battle end condition first
      if (checkBattleEnd()) {
        setIsFighting(false);
        break;
      }
      
      // Calculate attack order based on agility
      const attackOrder = gladiators[0].agility >= gladiators[1].agility ? [0, 1] : [1, 0];
      
      let shouldBreak = false;
      for (let i of attackOrder) {
        // Recheck for battle end after each attack
        if (checkBattleEnd()) {
          shouldBreak = true;
          break;
        }
        
        const attacker = i;
        const defender = 1 - i;
        
        // Calculate attack speed based on agility (300-1000ms)
        const attackSpeed = Math.max(300, 1000 - gladiators[attacker].agility * 50);
        
        setAttackingGladiator(attacker);
        
        // Calculate damage and check for evade/critical
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
          
          // Deduct stamina cost (10 points per attack)
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
          
          // Immediately check if the battle should end after updating health
          if (newHealth <= 0) {
            await delay(attackSpeed); // Allow animation to complete
            if (checkBattleEnd()) {
              shouldBreak = true;
              break;
            }
          }
        } else {
          // No stamina to attack
          setHurtGladiator(null);
          setCriticalHit(false);
          setEvadedHit(false);
        }
        
        await delay(attackSpeed);
        setAttackingGladiator(null);
        setHurtGladiator(null);
        setCriticalHit(false);
        setEvadedHit(false);
        await delay(200);
        
        // Check if we should break out of the inner loop
        if (shouldBreak || battleEnded) {
          break;
        }
      }
      
      // Check if we should break out of the outer loop
      if (shouldBreak || battleEnded) {
        break;
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-game-dark mb-8">Gladiator Arena</h1>
      
      {battleEnded && winner && (
        <div className="bg-game-primary/10 p-4 rounded-lg mb-6 text-center">
          <h2 className="text-2xl font-bold text-game-primary">
            {winner.name} is victorious!
          </h2>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
        {gladiators.map((gladiator, index) => (
          <GladiatorCard
            key={gladiator.id}
            gladiator={gladiator}
            isAttacking={attackingGladiator === index}
            isHurt={hurtGladiator === index}
            isCriticalHit={hurtGladiator === index && criticalHit}
            isEvaded={hurtGladiator !== index && attackingGladiator === 1-index && evadedHit}
          />
        ))}
      </div>
      <div className="flex justify-center gap-4">
        <Button
          onClick={fight}
          disabled={isFighting || battleEnded}
          className="bg-game-primary hover:bg-game-primary/90 text-white"
        >
          {battleEnded ? "Battle Ended" : isFighting ? "Fighting..." : "Start Battle"}
        </Button>
        <Button
          onClick={resetBattle}
          variant="outline"
          className="border-game-dark text-game-dark"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Arena;
