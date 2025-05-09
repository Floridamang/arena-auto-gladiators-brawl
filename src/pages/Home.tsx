
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Sword, GraduationCap, Store, Bed, Sun, SunMedium, Moon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useGame } from "@/context/GameContext";

const HomePage = () => {
  const { dayCycle, playerGladiator, gold } = useGame();
  
  const getCycleIcon = () => {
    switch (dayCycle) {
      case "morning": return <Sun className="h-5 w-5 text-game-secondary" />;
      case "noon": return <SunMedium className="h-5 w-5 text-game-secondary" />;
      case "evening": return <Sun className="h-5 w-5 text-game-accent" />;
      case "night": return <Moon className="h-5 w-5 text-white" />;
      default: return <Sun className="h-5 w-5 text-game-secondary" />;
    }
  };

  return (
    <div 
      className="w-full min-h-screen relative bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: "url('/lovable-uploads/c8f909b3-dfaf-4609-b69b-0d4b338d109c.jpg')",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/50 z-0" /> 
      
      <div className="relative z-10 p-8 w-full">
        {/* Character Info Section - Top Left */}
        <div className="flex items-start gap-4 mb-8">
          <Avatar className="w-24 h-24 border-4 border-game-primary">
            <AvatarImage src="/lovable-uploads/8f18e069-f431-4d6b-8b8b-7ed3f153d601.png" alt="Septimus" />
            <AvatarFallback>SG</AvatarFallback>
          </Avatar>
          <div className="text-white">
            <h1 className="text-4xl font-bold drop-shadow-lg">Septimus Gregorious</h1>
            <h2 className="text-2xl text-game-secondary drop-shadow-md">House Gregorious</h2>
            <div className="mt-2 text-xl">
              <span className="mr-2">Level {playerGladiator.level}</span>
              <span className="text-game-secondary">
                {playerGladiator.experience}/{playerGladiator.experienceToNextLevel} XP
              </span>
            </div>
            <div className="mt-2 text-xl">
              <span className="text-yellow-400 font-bold">{gold} Gold</span>
            </div>
          </div>
        </div>

        {/* Day Cycle Indicator - Top Center */}
        <div className="absolute top-8 right-8 bg-game-dark/80 rounded-lg p-2 px-4 text-white flex items-center gap-2">
          {getCycleIcon()}
          <span className="font-semibold capitalize">{dayCycle}</span>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
          <Link to="/ludus">
            <Card className="bg-white/90 hover:bg-white transition-colors border-2 border-game-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bed className="h-6 w-6" />
                  Ludus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Manage your gladiator school</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/training">
            <Card className="bg-white/90 hover:bg-white transition-colors border-2 border-game-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-6 w-6" />
                  Training Camp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Train your gladiators</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/arena">
            <Card className="bg-white/90 hover:bg-white transition-colors border-2 border-game-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sword className="h-6 w-6" />
                  Gladiator Battle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Enter the arena</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/market">
            <Card className="bg-white/90 hover:bg-white transition-colors border-2 border-game-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="h-6 w-6" />
                  Market
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Buy and sell gladiators</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
