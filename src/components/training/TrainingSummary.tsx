
import React from 'react';
import { Gladiator } from "@/types/gladiator";

interface TrainingSummaryProps {
  selectedGladiator: Gladiator;
}

const TrainingSummary = ({ selectedGladiator }: TrainingSummaryProps) => {
  return (
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
  );
};

export default TrainingSummary;
