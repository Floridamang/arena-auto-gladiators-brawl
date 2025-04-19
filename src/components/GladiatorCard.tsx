
import React from "react";
import { Gladiator } from "@/types/gladiator";
import { Progress } from "@/components/ui/progress";
import GladiatorSvg from "./GladiatorSvg";
import { Sword, Shield, Zap, Activity, Clock, Heart } from "lucide-react";

interface GladiatorCardProps {
  gladiator: Gladiator;
  isAttacking: boolean;
  isHurt: boolean;
  isCriticalHit?: boolean;
  isEvaded?: boolean;
}

const GladiatorCard = ({ gladiator, isAttacking, isHurt, isCriticalHit, isEvaded }: GladiatorCardProps) => {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0 p-6 rounded-lg bg-game-light shadow-lg z-10">
        <h3 className="text-2xl font-bold text-game-dark mb-2">{gladiator.name}</h3>
        <div className="flex justify-center gap-2 mb-2">
          {gladiator.traits.map((trait) => (
            <div key={trait.name} className="tooltip" data-tip={trait.description}>
              {trait.name === "bold" ? (
                <Sword className="w-5 h-5 text-game-primary" />
              ) : (
                <Heart className="w-5 h-5 text-game-primary" />
              )}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-3 text-sm">
          <div className="flex items-center gap-1">
            <Sword className="w-4 h-4 text-game-primary" /> 
            <span>Strength: {gladiator.strength}</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-game-primary" /> 
            <span>Agility: {gladiator.agility}</span>
          </div>
          <div className="flex items-center gap-1">
            <Activity className="w-4 h-4 text-game-primary" /> 
            <span>Endurance: {gladiator.endurance}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-game-primary" /> 
            <span>Stamina: {Math.floor(gladiator.stamina)}</span>
          </div>
        </div>
        
        <div className="flex justify-between mb-2">
          <span className="text-game-dark">Health</span>
          <span className="text-game-primary">{gladiator.health}</span>
        </div>
        <Progress value={gladiator.health} className="h-2 bg-game-secondary" />
      </div>
      <div className="mt-40">
        <GladiatorSvg
          gladiator={gladiator}
          isAttacking={isAttacking}
          isHurt={isHurt}
          isCriticalHit={isCriticalHit}
          isEvaded={isEvaded}
        />
      </div>
    </div>
  );
};

export default GladiatorCard;
