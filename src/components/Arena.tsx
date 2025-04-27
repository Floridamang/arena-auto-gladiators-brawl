
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useGame } from "@/context/GameContext";
import GladiatorCard from "./GladiatorCard";
import GladiatorSelector from "./GladiatorSelector";
import BattleControls from "./battle/BattleControls";
import { useBattle } from "@/hooks/useBattle";
import { handleBattleEnd } from "@/services/battleService";
import { toast } from "@/components/ui/sonner";

const Arena = () => {
  const { playerGladiator, addExperiencePoints, ownedGladiators } = useGame();
  const [selectedGladiator, setSelectedGladiator] = React.useState(playerGladiator);
  
  const {
    gladiators,
    battleState,
    fight,
    stopFight,
    resetBattle
  } = useBattle(selectedGladiator, addExperiencePoints);
  
  const handleSelectGladiator = (gladiator: typeof playerGladiator) => {
    if (battleState.isFighting) {
      toast.error("Cannot change gladiator during combat");
      return;
    }
    setSelectedGladiator(gladiator);
    resetBattle();
  };

  React.useEffect(() => {
    if (battleState.battleEnded && !battleState.xpAwarded) {
      const awarded = handleBattleEnd(battleState.winner, selectedGladiator, addExperiencePoints);
      if (awarded) {
        battleState.xpAwarded = true;
      }
    }
  }, [battleState.battleEnded, battleState.winner, selectedGladiator.id, addExperiencePoints, battleState.xpAwarded]);

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
      
      {battleState.battleEnded && battleState.winner && (
        <div className="bg-game-primary/10 p-4 rounded-lg mb-6 text-center">
          <h2 className="text-2xl font-bold text-game-primary">
            {battleState.winner.name} is victorious!
          </h2>
          <Link to="/" className="mt-4 inline-block">
            <Button className="bg-game-primary hover:bg-game-primary/90">
              Return to Home
            </Button>
          </Link>
        </div>
      )}
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Select Your Gladiator</h2>
        <GladiatorSelector 
          gladiators={ownedGladiators} 
          selectedGladiator={selectedGladiator}
          onSelectGladiator={handleSelectGladiator}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
        {gladiators.map((gladiator, index) => (
          <GladiatorCard
            key={gladiator.id}
            gladiator={gladiator}
            isAttacking={battleState.attackingGladiator === index}
            isHurt={battleState.hurtGladiator === index}
            isCriticalHit={battleState.hurtGladiator === index && battleState.criticalHit}
            isEvaded={battleState.hurtGladiator !== index && 
                     battleState.attackingGladiator === 1-index && 
                     battleState.evadedHit}
            damageText={battleState.damageText && battleState.damageText.position === index ? 
              { text: battleState.damageText.text, type: battleState.damageText.type } : null}
          />
        ))}
      </div>
      
      <BattleControls
        isFighting={battleState.isFighting}
        onFight={fight}
        onStop={stopFight}
        onReset={resetBattle}
        battleEnded={battleState.battleEnded}
      />
    </div>
  );
};

export default Arena;
