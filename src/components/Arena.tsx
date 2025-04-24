import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import GladiatorCard from "./GladiatorCard";
import { Gladiator } from "@/types/gladiator";
import { rechargeStamina } from "@/utils/battle";
import { checkBattleEnd, processBattleRound } from "@/utils/battleUtils";
import { Square } from "lucide-react";
import { toast } from "@/components/ui/sonner";

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
  const [damageText, setDamageText] = useState<{text: string, position: number, type: "normal" | "critical" | "miss"} | null>(null);
  
  const isFightingRef = useRef(isFighting);
  const gladiatorsRef = useRef(gladiators);
  const battleInProgressRef = useRef(false);
  
  useEffect(() => {
    isFightingRef.current = isFighting;
    console.log("isFighting state changed to:", isFighting);
  }, [isFighting]);

  useEffect(() => {
    gladiatorsRef.current = gladiators;
  }, [gladiators]);

  useEffect(() => {
    if (!isFighting) return;
    
    if (gladiators[0].health <= 0 || gladiators[1].health <= 0) return;
    
    const interval = setInterval(() => {
      setGladiators(prevGladiators => {
        const currentHealth0 = prevGladiators[0].health;
        const currentHealth1 = prevGladiators[1].health;
        
        return [
          {
            ...rechargeStamina(prevGladiators[0]),
            health: currentHealth0
          },
          {
            ...rechargeStamina(prevGladiators[1]),
            health: currentHealth1
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
    setDamageText(null);
    battleInProgressRef.current = false;
  };

  const stopFight = () => {
    if (isFighting) {
      setIsFighting(false);
      battleInProgressRef.current = false;
      toast.info("Combat stopped");
    }
  };

  const fight = async () => {
    if (isFightingRef.current || battleInProgressRef.current) {
      console.log("Battle already in progress, ignoring start request");
      return;
    }
    
    battleInProgressRef.current = true;
    
    setIsFighting(true);
    setBattleEnded(false);
    setWinner(null);
    setAttackingGladiator(null);
    setHurtGladiator(null);
    setCriticalHit(false);
    setEvadedHit(false);
    setDamageText(null);
    
    console.log("Starting battle...");

    const runBattleLoop = async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      let isBattleEnded = false;
  
      while (!isBattleEnded && isFightingRef.current) {
        const currentGladiators = gladiatorsRef.current;
        console.log("Battle round with gladiators:", currentGladiators);
        
        const checkEnd = () => {
          const result = checkBattleEnd(currentGladiators, setBattleEnded, setIsFighting, setWinner);
          isBattleEnded = result;
          return result;
        };
        
        if (checkEnd()) {
          console.log("Battle ended due to initial check");
          break;
        }
  
        const shouldBreak = await processBattleRound(
          currentGladiators,
          setGladiators,
          setAttackingGladiator,
          setHurtGladiator,
          setCriticalHit,
          setEvadedHit,
          checkEnd,
          setDamageText
        );
        
        console.log("Round complete, shouldBreak:", shouldBreak);
  
        if (shouldBreak || isBattleEnded || !isFightingRef.current) {
          console.log("Breaking battle loop");
          break;
        }
        
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      console.log("Battle loop finished");
      battleInProgressRef.current = false;
    };

    await runBattleLoop();
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
            damageText={damageText && damageText.position === index ? 
              { text: damageText.text, type: damageText.type } : null}
          />
        ))}
      </div>
      <div className="flex justify-center gap-4">
        <Button
          onClick={fight}
          disabled={isFighting || battleEnded || battleInProgressRef.current}
          className="bg-game-primary hover:bg-game-primary/90 text-white"
        >
          {battleEnded ? "Battle Ended" : isFighting ? "Fighting..." : "Start Battle"}
        </Button>
        
        {isFighting && (
          <Button
            onClick={stopFight}
            className="bg-red-500 hover:bg-red-600 text-white"
            title="Stop Combat"
          >
            <Square className="mr-1" /> Stop Combat
          </Button>
        )}
        
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
