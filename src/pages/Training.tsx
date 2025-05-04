
import React, { useEffect, useState } from "react";
import { useGame } from "@/context/GameContext";
import GladiatorCard from "@/components/GladiatorCard";
import TrainingHeader from "@/components/training/TrainingHeader";
import AttributeAllocator from "@/components/training/AttributeAllocator";
import PrivateLessonsCard from "@/components/training/PrivateLessonsCard";
import DevToolsSection from "@/components/training/DevToolsSection";
import TrainingSummary from "@/components/training/TrainingSummary";

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
    <div className="min-h-screen w-full bg-game-light p-8">
      <TrainingHeader 
        gold={gold}
        selectedGladiator={selectedGladiator}
        ownedGladiators={ownedGladiators}
        onSelectGladiator={handleSelectGladiator}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div>
          <GladiatorCard
            gladiator={selectedGladiator}
            isAttacking={false}
            isHurt={false}
          />
          
          <PrivateLessonsCard 
            gold={gold}
            purchaseSkillPoint={purchaseSkillPoint}
          />

          <DevToolsSection 
            devIncreaseLevel={devIncreaseLevel}
            devAddGold={devAddGold}
          />
        </div>
        
        {availableSkillPoints > 0 ? (
          <AttributeAllocator
            selectedGladiator={selectedGladiator}
            availableSkillPoints={availableSkillPoints}
            tempAttributes={tempAttributes}
            allocateSkillPoint={allocateSkillPoint}
            resetSkillPoints={resetSkillPoints}
            levelUp={levelUp}
          />
        ) : (
          <TrainingSummary selectedGladiator={selectedGladiator} />
        )}
      </div>
    </div>
  );
};

export default Training;
