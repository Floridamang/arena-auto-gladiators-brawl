
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import GladiatorCard from "@/components/GladiatorCard";
import { Gladiator, GladiatorTrait } from "@/types/gladiator";

const Training = () => {
  const marcusTrait: GladiatorTrait = {
    name: "resentful",
    description: "Does double damage below 10% health"
  };

  const marcus: Gladiator = {
    id: "1",
    name: "Marcus",
    attack: 15,
    defense: 10,
    health: 100,
    isLeft: true,
    strength: 18,
    agility: 12,
    stamina: 100,
    maxStamina: 100,
    endurance: 15,
    traits: [marcusTrait],
    attackCount: 0
  };

  return (
    <div className="min-h-screen bg-game-light p-8">
      <Link to="/" className="flex items-center gap-2 text-game-primary mb-6 hover:text-game-primary/80">
        <ArrowLeft className="h-5 w-5" />
        Back to Home
      </Link>
      
      <h1 className="text-4xl font-bold text-game-dark mb-8">Training Camp</h1>
      
      <div className="max-w-md mx-auto">
        <GladiatorCard
          gladiator={marcus}
          isAttacking={false}
          isHurt={false}
        />
      </div>
    </div>
  );
};

export default Training;
