
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import GladiatorCard from "@/components/GladiatorCard";
import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";
import { useEffect } from "react";

const Training = () => {
  const { 
    playerGladiator, 
    advanceCycle, 
    availableSkillPoints, 
    tempAttributes,
    allocateSkillPoint,
    resetSkillPoints,
    levelUp
  } = useGame();

  // Advance day cycle when entering training
  useEffect(() => {
    advanceCycle();
  }, [advanceCycle]);

  return (
    <div className="min-h-screen bg-game-light p-8">
      <Link to="/" className="flex items-center gap-2 text-game-primary mb-6 hover:text-game-primary/80">
        <ArrowLeft className="h-5 w-5" />
        Back to Home
      </Link>
      
      <h1 className="text-4xl font-bold text-game-dark mb-8">Training Camp</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div>
          <GladiatorCard
            gladiator={playerGladiator}
            isAttacking={false}
            isHurt={false}
          />
        </div>
        
        {availableSkillPoints > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-game-dark">Level Up!</h2>
              <div className="bg-game-primary text-white px-3 py-1 rounded-full">
                {availableSkillPoints} Points Available
              </div>
            </div>
            
            <p className="mb-4 text-gray-600">
              Allocate your skill points to improve your gladiator's attributes.
            </p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <h3 className="font-semibold">Strength</h3>
                  <p className="text-sm text-gray-500">Increases damage dealt</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono">
                    {playerGladiator.strength} 
                    {tempAttributes.strength > 0 && (
                      <span className="text-green-600">+{tempAttributes.strength}</span>
                    )}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => allocateSkillPoint("strength", -1)} 
                    disabled={tempAttributes.strength <= 0}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => allocateSkillPoint("strength", 1)} 
                    disabled={availableSkillPoints <= 0}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <h3 className="font-semibold">Agility</h3>
                  <p className="text-sm text-gray-500">Increases attack speed and dodge chance</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono">
                    {playerGladiator.agility} 
                    {tempAttributes.agility > 0 && (
                      <span className="text-green-600">+{tempAttributes.agility}</span>
                    )}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => allocateSkillPoint("agility", -1)} 
                    disabled={tempAttributes.agility <= 0}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => allocateSkillPoint("agility", 1)} 
                    disabled={availableSkillPoints <= 0}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <h3 className="font-semibold">Endurance</h3>
                  <p className="text-sm text-gray-500">Increases stamina regeneration</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono">
                    {playerGladiator.endurance} 
                    {tempAttributes.endurance > 0 && (
                      <span className="text-green-600">+{tempAttributes.endurance}</span>
                    )}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => allocateSkillPoint("endurance", -1)} 
                    disabled={tempAttributes.endurance <= 0}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => allocateSkillPoint("endurance", 1)} 
                    disabled={availableSkillPoints <= 0}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <h3 className="font-semibold">Maximum Stamina</h3>
                  <p className="text-sm text-gray-500">Increases total stamina capacity</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono">
                    {playerGladiator.maxStamina} 
                    {tempAttributes.maxStamina > 0 && (
                      <span className="text-green-600">+{tempAttributes.maxStamina}</span>
                    )}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => allocateSkillPoint("maxStamina", -1)} 
                    disabled={tempAttributes.maxStamina <= 0}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => allocateSkillPoint("maxStamina", 1)} 
                    disabled={availableSkillPoints <= 0}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={resetSkillPoints}>
                Reset
              </Button>
              <Button 
                onClick={levelUp} 
                disabled={
                  availableSkillPoints === 3 || 
                  (tempAttributes.strength === 0 && 
                   tempAttributes.agility === 0 && 
                   tempAttributes.endurance === 0 && 
                   tempAttributes.maxStamina === 0)
                }
              >
                Confirm
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Training;
