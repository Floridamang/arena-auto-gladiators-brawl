
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import GladiatorCard from "./GladiatorCard";
import { Gladiator } from "@/types/gladiator";
import { calculateDamage, delay } from "@/utils/battle";
import { useToast } from "@/components/ui/use-toast";

const INITIAL_GLADIATORS: [Gladiator, Gladiator] = [
  {
    id: "1",
    name: "Marcus",
    attack: 8,
    defense: 5,
    health: 100,
    isLeft: true,
  },
  {
    id: "2",
    name: "Brutus",
    attack: 6,
    defense: 7,
    health: 100,
    isLeft: false,
  },
];

const Arena = () => {
  const [gladiators, setGladiators] = useState<[Gladiator, Gladiator]>(INITIAL_GLADIATORS);
  const [isFighting, setIsFighting] = useState(false);
  const [attackingGladiator, setAttackingGladiator] = useState<number | null>(null);
  const [hurtGladiator, setHurtGladiator] = useState<number | null>(null);
  const { toast } = useToast();

  const resetBattle = () => {
    setGladiators(INITIAL_GLADIATORS);
    setIsFighting(false);
    setAttackingGladiator(null);
    setHurtGladiator(null);
  };

  const fight = async () => {
    if (isFighting) return;
    setIsFighting(true);

    while (gladiators[0].health > 0 && gladiators[1].health > 0) {
      for (let i = 0; i < 2; i++) {
        if (gladiators[i].health <= 0) continue;
        
        const attacker = i;
        const defender = 1 - i;
        
        setAttackingGladiator(attacker);
        setHurtGladiator(defender);
        
        const damage = calculateDamage(gladiators[attacker], gladiators[defender]);
        
        setGladiators(prev => [
          { ...prev[0], health: defender === 0 ? Math.max(0, prev[0].health - damage) : prev[0].health },
          { ...prev[1], health: defender === 1 ? Math.max(0, prev[1].health - damage) : prev[1].health }
        ]);
        
        await delay(1000);
        setAttackingGladiator(null);
        setHurtGladiator(null);
        await delay(500);
      }
    }

    const winner = gladiators[0].health > 0 ? gladiators[0] : gladiators[1];
    toast({
      title: "Battle Finished!",
      description: `${winner.name} is victorious!`,
    });
    
    setIsFighting(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-game-dark mb-8">Gladiator Arena</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
        {gladiators.map((gladiator, index) => (
          <GladiatorCard
            key={gladiator.id}
            gladiator={gladiator}
            isAttacking={attackingGladiator === index}
            isHurt={hurtGladiator === index}
          />
        ))}
      </div>
      <div className="flex justify-center gap-4">
        <Button
          onClick={fight}
          disabled={isFighting}
          className="bg-game-primary hover:bg-game-primary/90 text-white"
        >
          Start Battle
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
