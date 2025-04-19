
import React from "react";
import { Gladiator } from "@/types/gladiator";
import { Progress } from "@/components/ui/progress";
import GladiatorSvg from "./GladiatorSvg";
import { Sword, Heart } from "lucide-react";

interface GladiatorCardProps {
  gladiator: Gladiator;
  isAttacking: boolean;
  isHurt: boolean;
  isCriticalHit?: boolean;
}

const GladiatorCard = ({ gladiator, isAttacking, isHurt, isCriticalHit }: GladiatorCardProps) => {
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
        />
      </div>
    </div>
  );
};

export default GladiatorCard;
