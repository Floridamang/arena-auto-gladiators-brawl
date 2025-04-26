
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useGame } from "@/context/GameContext";
import { Badge } from "@/components/ui/badge";
import { PurchasableGladiator } from "@/types/gladiator";
import { toast } from "@/components/ui/sonner";

const Market = () => {
  const { gold } = useGame();

  const purchasableGladiators: PurchasableGladiator[] = [
    {
      id: "ngubu",
      name: "Ngubu",
      attack: 12,
      defense: 8,
      health: 90,
      strength: 14,
      agility: 16,
      stamina: 100,
      maxStamina: 100,
      endurance: 12,
      level: 1,
      experience: 0,
      experienceToNextLevel: 100,
      cost: Math.floor(Math.random() * (300 - 200 + 1) + 200),
      image: "/lovable-uploads/6107e27e-31b1-4c9c-ba80-c9c9741eafdf.png",
      traits: [{
        name: "bold",
        description: "Has increased chance to land critical hits"
      }],
      wins: 0
    },
    {
      id: "greg",
      name: "Greg",
      attack: 18,
      defense: 14,
      health: 110,
      strength: 20,
      agility: 10,
      stamina: 100,
      maxStamina: 100,
      endurance: 16,
      level: 1,
      experience: 0,
      experienceToNextLevel: 100,
      cost: Math.floor(Math.random() * (300 - 200 + 1) + 200),
      image: "/lovable-uploads/30daa40b-659f-4b48-9d08-19982ac5767a.png",
      traits: [{
        name: "bold",
        description: "Has increased chance to land critical hits"
      }],
      wins: 0
    },
    {
      id: "reginald",
      name: "Reginald",
      attack: 16,
      defense: 18,
      health: 150,
      strength: 18,
      agility: 8,
      stamina: 100,
      maxStamina: 100,
      endurance: 20,
      level: 1,
      experience: 0,
      experienceToNextLevel: 100,
      cost: Math.floor(Math.random() * (300 - 200 + 1) + 200),
      image: "/lovable-uploads/683e2172-44b9-41ff-aa3c-3cc0317f1f55.png",
      traits: [{
        name: "bold",
        description: "Has increased chance to land critical hits"
      }],
      wins: 0
    }
  ];

  const handleBuy = (gladiator: PurchasableGladiator) => {
    if (gold >= gladiator.cost) {
      toast.success(`${gladiator.name} has been purchased!`);
    } else {
      toast.error("Not enough gold!");
    }
  };

  return (
    <div className="min-h-screen bg-game-light p-8">
      <Link to="/" className="flex items-center gap-2 text-game-primary mb-6 hover:text-game-primary/80">
        <ArrowLeft className="h-5 w-5" />
        Back to Home
      </Link>
      
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-game-dark">Market</h1>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          Gold: {gold}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {purchasableGladiators.map((gladiator) => (
          <Card key={gladiator.id} className="bg-white">
            <CardHeader>
              <CardTitle>{gladiator.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <img 
                src={gladiator.image} 
                alt={gladiator.name}
                className="w-full h-[400px] object-contain rounded-lg bg-game-light/50"
              />
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Attack: {gladiator.attack}</p>
                <p className="text-sm text-gray-600">Defense: {gladiator.defense}</p>
                <p className="text-sm text-gray-600">Health: {gladiator.health}</p>
                <p className="text-sm text-gray-600">Strength: {gladiator.strength}</p>
                <p className="text-sm text-gray-600">Agility: {gladiator.agility}</p>
                <p className="text-sm text-gray-600">Endurance: {gladiator.endurance}</p>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-lg font-bold text-game-primary">{gladiator.cost} Gold</span>
                <Button onClick={() => handleBuy(gladiator)}>
                  Buy Gladiator
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Market;
