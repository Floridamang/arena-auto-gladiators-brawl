
import { useState, useRef, useEffect } from "react";
import { Gladiator } from "@/types/gladiator";
import { toast } from "@/components/ui/sonner";
import { generateOpponent } from "@/services/battleService";
import { checkBattleEnd, processBattleRound } from "@/utils/battleUtils";

export const useBattle = (
  selectedGladiator: Gladiator,
  addExperiencePoints: (xp: number) => void
) => {
  const [opponent, setOpponent] = useState<Gladiator>(() => 
    generateOpponent(selectedGladiator.level || 1)
  );
  
  const [gladiators, setGladiators] = useState<[Gladiator, Gladiator]>([
    { ...selectedGladiator, isLeft: true, attackCount: 0, health: selectedGladiator.health },
    opponent
  ]);
  
  const [battleState, setBattleState] = useState({
    isFighting: false,
    attackingGladiator: null as number | null,
    hurtGladiator: null as number | null,
    criticalHit: false,
    evadedHit: false,
    battleEnded: false,
    winner: null as Gladiator | null,
    damageText: null as {text: string, position: number, type: "normal" | "critical" | "miss"} | null,
    xpAwarded: false
  });
  
  const isFightingRef = useRef(battleState.isFighting);
  const gladiatorsRef = useRef(gladiators);
  const battleInProgressRef = useRef(false);
  
  useEffect(() => {
    isFightingRef.current = battleState.isFighting;
  }, [battleState.isFighting]);

  useEffect(() => {
    gladiatorsRef.current = gladiators;
  }, [gladiators]);

  useEffect(() => {
    setGladiators(prev => [
      { ...selectedGladiator, isLeft: true, attackCount: 0, health: selectedGladiator.health },
      prev[1]
    ]);
  }, [selectedGladiator]);

  useEffect(() => {
    const newOpponent = generateOpponent(selectedGladiator.level || 1);
    setOpponent(newOpponent);
    setGladiators(prev => [prev[0], newOpponent]);
  }, [selectedGladiator.level]);

  const resetBattle = () => {
    const newOpponent = generateOpponent(selectedGladiator.level || 1);
    setOpponent(newOpponent);
    
    setGladiators([
      { ...selectedGladiator, isLeft: true, attackCount: 0, health: selectedGladiator.health },
      newOpponent
    ]);
    
    setBattleState({
      isFighting: false,
      attackingGladiator: null,
      hurtGladiator: null,
      criticalHit: false,
      evadedHit: false,
      battleEnded: false,
      winner: null,
      damageText: null,
      xpAwarded: false
    });
    
    battleInProgressRef.current = false;
  };

  const stopFight = () => {
    if (battleState.isFighting) {
      setBattleState(prev => ({ ...prev, isFighting: false }));
      battleInProgressRef.current = false;
      toast.info("Combat stopped");
    }
  };

  const fight = async () => {
    if (isFightingRef.current || battleInProgressRef.current) {
      return;
    }
    
    battleInProgressRef.current = true;
    setBattleState(prev => ({
      ...prev,
      isFighting: true,
      battleEnded: false,
      winner: null,
      attackingGladiator: null,
      hurtGladiator: null,
      criticalHit: false,
      evadedHit: false,
      damageText: null,
      xpAwarded: false
    }));
    
    const runBattleLoop = async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      let isBattleEnded = false;
  
      while (!isBattleEnded && isFightingRef.current) {
        const currentGladiators = gladiatorsRef.current;
        
        const checkEnd = () => {
          const result = checkBattleEnd(
            currentGladiators,
            (ended) => setBattleState(prev => ({ ...prev, battleEnded: ended })),
            (fighting) => setBattleState(prev => ({ ...prev, isFighting: fighting })),
            (winner) => setBattleState(prev => ({ ...prev, winner }))
          );
          isBattleEnded = result;
          return result;
        };
        
        if (checkEnd()) break;
  
        const shouldBreak = await processBattleRound(
          currentGladiators,
          setGladiators,
          (attacking) => setBattleState(prev => ({ ...prev, attackingGladiator: attacking })),
          (hurt) => setBattleState(prev => ({ ...prev, hurtGladiator: hurt })),
          (critical) => setBattleState(prev => ({ ...prev, criticalHit: critical })),
          (evaded) => setBattleState(prev => ({ ...prev, evadedHit: evaded })),
          checkEnd,
          (damage) => setBattleState(prev => ({ ...prev, damageText: damage }))
        );
  
        if (shouldBreak || isBattleEnded || !isFightingRef.current) break;
        
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      battleInProgressRef.current = false;
    };

    await runBattleLoop();
  };

  return {
    gladiators,
    battleState,
    fight,
    stopFight,
    resetBattle
  };
};
