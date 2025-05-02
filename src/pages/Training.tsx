
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Minus, Wrench } from "lucide-react";
import GladiatorCard from "@/components/GladiatorCard";
import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import GladiatorSelector from "@/components/GladiatorSelector";

const Training = () => {
  const { 
    playerGladiator, 
    advanceCycle, 
    availableSkillPoints, 
    tempAttributes,
    allocateSkillPoint,
    resetSkillPoints,
    levelUp,
    purchaseSkillPoint,
    devIncreaseLevel,
    devAddGold,
    gold,
    ownedGladiators,
    selectActiveGladiator
  } = useGame();

  const [devMode, setDevMode] = useState(false);
  const [selectedGladiator, setSelectedGladiator] = useState(playerGladiator);

  // Advance day cycle when entering training
  useEffect(() => {
    advanceCycle();
  }, [advanceCycle]);

  const handleSelectGladiator = (gladiator: typeof playerGladiator) => {
    setSelectedGladiator(gladiator);
    selectActiveGladiator(gladiator.id);
  };

  return (
    <div className="min-h-screen bg-game-light p-8">
      <Link to="/" className="flex items-center gap-2 text-game-primary mb-6 hover:text-game-primary/80">
        <ArrowLeft className="h-5 w-5" />
        Back to Home
      </Link>
      
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-game-dark">Training Camp</h1>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          Gold: {gold}
        </Badge>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Select Your Gladiator</h2>
        <GladiatorSelector 
          gladiators={ownedGladiators} 
          selectedGladiator={selectedGladiator}
          onSelectGladiator={handleSelectGladiator}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div>
          <GladiatorCard
            gladiator={selectedGladiator}
            isAttacking={false}
            isHurt={false}
          />
          
          {/* Private Lessons Section */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Private Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Purchase additional skill points to enhance your gladiator's abilities.
                Each skill point costs 100 gold.
              </p>
              <div className="flex items-center gap-3">
                <Button onClick={() => purchaseSkillPoint(1)} disabled={gold < 100}>
                  Buy 1 Skill Point (100 Gold)
                </Button>
                <Button onClick={() => purchaseSkillPoint(3)} disabled={gold < 300}>
                  Buy 3 Skill Points (300 Gold)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Developer Tools Section */}
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setDevMode(prev => !prev)}
                className="border-gray-300"
              >
                <Wrench className="h-4 w-4 mr-1" />
                {devMode ? "Hide" : "Show"} Dev Tools
              </Button>
            </div>
            
            {devMode && (
              <Card className="bg-gray-100 border-dashed border-gray-400">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-4 w-4" /> 
                    Developer Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button onClick={() => devIncreaseLevel()}>
                      Increase Level +1
                    </Button>
                    <Button onClick={() => devAddGold(500)}>
                      Add 500 Gold
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
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
                    {selectedGladiator.strength} 
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
                    {selectedGladiator.agility} 
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
                    {selectedGladiator.endurance} 
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
                    {selectedGladiator.maxStamina} 
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
                  tempAttributes.strength === 0 && 
                  tempAttributes.agility === 0 && 
                  tempAttributes.endurance === 0 && 
                  tempAttributes.maxStamina === 0
                }
              >
                Confirm
              </Button>
            </div>
          </div>
        )}
        
        {availableSkillPoints === 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-game-dark mb-4">Training</h2>
            <p className="text-gray-600">
              Your gladiator is currently at level {selectedGladiator.level}.
              Win more battles to gain experience and level up.
            </p>
            <div className="mt-4 bg-game-light/50 p-3 rounded-md">
              <p>Current XP: {selectedGladiator.experience}/{selectedGladiator.experienceToNextLevel}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Training;
