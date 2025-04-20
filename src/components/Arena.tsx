import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GladiatorCard from "./GladiatorCard";
import { Gladiator } from "@/types/gladiator";
import { rechargeStamina } from "@/utils/battle";
import { checkBattleEnd, processBattleRound } from "@/utils/battleUtils";

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

  useEffect(() => {
    if (!isFighting) return;
    
    // Only recharge stamina if the battle is ongoing and both gladiators are alive
    if (gladiators[0].health <= 0 || gladiators[1].health <= 0) return;
    
    const interval = setInterval(() => {
      setGladiators(prevGladiators => {
        // Only recharge stamina, but preserve current health values
        return [
          {
            ...rechargeStamina(prevGladiators[0]),
            health: prevGladiators[0].health
          },
          {
            ...rechargeStamina(prevGladiators[1]),
            health: prevGladiators[1].health
          }
        ] as [Gladiator, Gladiator];
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, [isFighting, gladiators]);

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

  const fight = async () => {
    if (isFighting) return;
    setIsFighting(true);
    setBattleEnded(false);
    setWinner(null);

    // Store battle ended state in a local variable to prevent race conditions
    let isBattleEnded = false;

    while (!isBattleEnded) {
      const checkEnd = () => {
        const result = checkBattleEnd(gladiators, setBattleEnded, setIsFighting, setWinner);
        isBattleEnded = result;
        return result;
      };
      
      if (checkEnd()) {
        break;
      }

      const shouldBreak = await processBattleRound(
        gladiators,
        setGladiators,
        setAttackingGladiator,
        setHurtGladiator,
        setCriticalHit,
        setEvadedHit,
        checkEnd
      );

      if (shouldBreak || isBattleEnded) {
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
