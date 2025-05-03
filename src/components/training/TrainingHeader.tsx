
import React from 'react';
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import GladiatorSelector from "@/components/GladiatorSelector";
import { Gladiator } from "@/types/gladiator";

interface TrainingHeaderProps {
  gold: number;
  selectedGladiator: Gladiator;
  ownedGladiators: Gladiator[];
  onSelectGladiator: (gladiator: Gladiator) => void;
}

const TrainingHeader = ({ gold, selectedGladiator, ownedGladiators, onSelectGladiator }: TrainingHeaderProps) => {
  return (
    <>
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
          onSelectGladiator={onSelectGladiator}
        />
      </div>
    </>
  );
};

export default TrainingHeader;
