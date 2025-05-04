
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bed, Users, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGame } from "@/context/GameContext";
import { toast } from "@/components/ui/sonner";
import GladiatorDetail from "@/components/gladiator/GladiatorDetail";

const Ludus = () => {
  const { resetToMorning, playerGladiator, ownedGladiators, selectActiveGladiator } = useGame();
  const [selectedGladiatorId, setSelectedGladiatorId] = useState<string | null>(null);
  
  const handleSleep = () => {
    resetToMorning();
    toast.success("You have rested until morning. Your gladiator has been fully restored.");
  };

  const handleGladiatorSelect = (id: string) => {
    setSelectedGladiatorId(id);
  };
  
  const handleSetActive = (id: string) => {
    selectActiveGladiator(id);
    toast.success("Gladiator set as active");
  };
  
  return (
    <div className="min-h-screen w-full bg-game-light p-8">
      <Link to="/" className="flex items-center gap-2 text-game-primary mb-6 hover:text-game-primary/80">
        <ArrowLeft className="h-5 w-5" />
        Back to Home
      </Link>
      
      <h1 className="text-4xl font-bold text-game-dark mb-8">Your Ludus</h1>
      
      <Tabs defaultValue="sleep" className="max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-3 w-full mb-6">
          <TabsTrigger value="sleep" className="flex items-center gap-2">
            <Bed className="h-4 w-4" />
            Sleep
          </TabsTrigger>
          <TabsTrigger value="gladiators" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Gladiators
          </TabsTrigger>
          <TabsTrigger value="relax" className="flex items-center gap-2">
            <Handshake className="h-4 w-4" />
            Relax Area
          </TabsTrigger>
        </TabsList>
        
        {/* Sleep Section */}
        <TabsContent value="sleep">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bed className="h-6 w-6" />
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
        </TabsContent>
        
        {/* Gladiators Section */}
        <TabsContent value="gladiators">
          <div className="grid md:grid-cols-[300px_1fr] gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Gladiators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {ownedGladiators.map(gladiator => (
                  <div 
                    key={gladiator.id}
                    className={`p-2 rounded cursor-pointer flex justify-between items-center ${
                      selectedGladiatorId === gladiator.id ? 'bg-game-primary text-white' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleGladiatorSelect(gladiator.id)}
                  >
                    <div>
                      <p className="font-medium">{gladiator.name}</p>
                      <p className="text-sm opacity-80">Level {gladiator.level}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={selectedGladiatorId === gladiator.id ? 'border-white text-white hover:bg-white/20' : ''}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSetActive(gladiator.id);
                      }}
                      disabled={gladiator.id === playerGladiator.id}
                    >
                      {gladiator.id === playerGladiator.id ? 'Active' : 'Set Active'}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {selectedGladiatorId && (
              <GladiatorDetail 
                gladiator={ownedGladiators.find(g => g.id === selectedGladiatorId)!} 
                isActive={selectedGladiatorId === playerGladiator.id}
                onSetActive={handleSetActive}
              />
            )}
          </div>
        </TabsContent>
        
        {/* Relax Area */}
        <TabsContent value="relax">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Handshake className="h-6 w-6" />
                Relax Area
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-6 text-center">
                <p className="text-lg text-muted-foreground">This area is under construction.</p>
                <p className="mt-2">More features coming soon!</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Ludus;
