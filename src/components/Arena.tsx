
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import GladiatorCard from "./GladiatorCard";
import { Gladiator } from "@/types/gladiator";
import { rechargeStamina } from "@/utils/battle";
import { checkBattleEnd, processBattleRound } from "@/utils/battleUtils";
import { Square, ArrowLeft } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Link } from "react-router-dom";
import { useGame } from "@/context/GameContext";

const Arena = () => {
  const { playerGladiator, addExperiencePoints } = useGame();
  
  const generateOpponent = (): Gladiator => {
    const level = playerGladiator.level || 1;
    return {
      id: "opponent",
      name: "Brutus",
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
        name: "bold",
        description: "First two attacks are critical hits"
      }],
      attackCount: 0
    }
  };

  const [opponent, setOpponent] = useState<Gladiator>(generateOpponent());
  const [gladiators, setGladiators] = useState<[Gladiator, Gladiator]>([
    { ...playerGladiator, isLeft: true, attackCount: 0, health: playerGladiator.health },
    opponent
  ]);
  
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
  
  // Update refs when state changes
  useEffect(() => {
    isFightingRef.current = isFighting;
    console.log("isFighting state changed to:", isFighting);
  }, [isFighting]);

  useEffect(() => {
    gladiatorsRef.current = gladiators;
  }, [gladiators]);

  // Update the gladiators array when playerGladiator changes
  useEffect(() => {
    setGladiators(prev => [
      { ...playerGladiator, isLeft: true, attackCount: 0, health: playerGladiator.health },
      prev[1]
    ]);
  }, [playerGladiator]);

  // Update opponent when player level changes
  useEffect(() => {
    const newOpponent = generateOpponent();
    setOpponent(newOpponent);
    setGladiators(prev => [prev[0], newOpponent]);
  }, [playerGladiator.level]);

  // Stamina regeneration
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

  // Handle battle results (award XP)
  useEffect(() => {
    if (battleEnded && winner) {
      // If player won
      if (winner.id === playerGladiator.id) {
        // Award XP - 100 XP for winning
        const xpReward = 100;
        addExperiencePoints(xpReward);
        toast.success(`Victory! Gained ${xpReward} experience.`);
      }
    }
  }, [battleEnded, winner, playerGladiator.id, addExperiencePoints]);

  const resetBattle = () => {
    const newOpponent = generateOpponent();
    setOpponent(newOpponent);
    
    setGladiators([
      { ...playerGladiator, isLeft: true, attackCount: 0, health: playerGladiator.health },
      newOpponent
    ]);
    
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-center text-game-dark">Gladiator Arena</h1>
        <Link to="/">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Return Home
          </Button>
        </Link>
      </div>
      
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
          disabled={isFighting || battleInProgressRef.current}
          className="bg-game-primary hover:bg-game-primary/90 text-white"
        >
          {battleEnded ? "New Battle" : isFighting ? "Fighting..." : "Start Battle"}
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
