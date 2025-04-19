
import React from "react";
import { Gladiator } from "@/types/gladiator";
import { Progress } from "@/components/ui/progress";

interface GladiatorCardProps {
  gladiator: Gladiator;
  isAttacking: boolean;
  isHurt: boolean;
}

const GladiatorCard = ({ gladiator, isAttacking, isHurt }: GladiatorCardProps) => {
  const animationClass = gladiator.isLeft
    ? isAttacking
      ? "animate-attack-right"
      : isHurt
      ? "animate-take-hit"
      : ""
    : isAttacking
    ? "animate-attack-left"
    : isHurt
    ? "animate-take-hit"
    : "";

  return (
    <div
      className={`p-6 rounded-lg bg-game-light shadow-lg ${animationClass}`}
    >
      <h3 className="text-2xl font-bold text-game-dark mb-4">{gladiator.name}</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-game-dark">Health</span>
            <span className="text-game-primary">{gladiator.health}</span>
          </div>
          <Progress value={gladiator.health} className="h-2 bg-game-secondary" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-game-dark">Attack</p>
            <p className="text-2xl font-bold text-game-primary">{gladiator.attack}</p>
          </div>
          <div>
            <p className="text-game-dark">Defense</p>
            <p className="text-2xl font-bold text-game-accent">{gladiator.defense}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GladiatorCard;
