
import React from 'react';
import { Gladiator } from "@/types/gladiator";
import { Progress } from "@/components/ui/progress";
import { Trophy, Book } from "lucide-react";

interface TrainingSummaryProps {
  selectedGladiator: Gladiator;
}

const TrainingSummary = ({ selectedGladiator }: TrainingSummaryProps) => {
  // Calculate XP progress percentage
  const xpProgress = (selectedGladiator.experience || 0) / 
    (selectedGladiator.experienceToNextLevel || 100) * 100;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-game-dark mb-4 flex items-center gap-2">
        <Trophy className="text-amber-500" /> Training
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Book className="text-blue-600" size={18} />
          <p className="text-gray-600">
            Your gladiator is currently at level {selectedGladiator.level}.
          </p>
        </div>
        
        <p className="text-gray-600">
          Win more battles to gain experience and level up.
        </p>
        
        <div className="mt-4 bg-game-light/50 p-4 rounded-md space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Experience</span>
            <span>{selectedGladiator.experience}/{selectedGladiator.experienceToNextLevel}</span>
          </div>
          <Progress value={xpProgress} className="h-2" />
        </div>
        
        {selectedGladiator.wins && selectedGladiator.wins > 0 && (
          <div className="mt-2 text-green-600 font-medium flex items-center gap-1">
            <Trophy size={16} />
            Victories: {selectedGladiator.wins}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingSummary;
