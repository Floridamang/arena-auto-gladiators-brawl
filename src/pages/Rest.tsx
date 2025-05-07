
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";
import { toast } from "@/components/ui/sonner";

const Rest = () => {
  const { resetToMorning, playerGladiator } = useGame();
  
  const handleSleep = () => {
    resetToMorning();
    toast.success("You have rested until morning. Your gladiator has been fully restored.");
  };
  
  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: "url('/lovable-uploads/c8f909b3-dfaf-4609-b69b-0d4b338d109c.jpg')",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />
      
      <div className="relative z-10 p-8">
        <Link to="/" className="flex items-center gap-2 text-white mb-6 hover:text-white/80">
          <ArrowLeft className="h-5 w-5" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold text-white mb-8">Your Villa</h1>
        
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="h-6 w-6" />
                Rest & Recover
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Welcome to your personal villa, Septimus Gregorious. Here you can rest and
                recover your strength before your next battle.
              </p>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Gladiator Status</h3>
                <p>Name: {playerGladiator.name}</p>
                <p>Level: {playerGladiator.level}</p>
                <p>Health: {playerGladiator.health}</p>
                <p>Stamina: {playerGladiator.stamina}/{playerGladiator.maxStamina}</p>
              </div>
              
              <Button onClick={handleSleep} className="w-full bg-game-primary hover:bg-game-primary/90">
                Sleep Until Morning
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Rest;
