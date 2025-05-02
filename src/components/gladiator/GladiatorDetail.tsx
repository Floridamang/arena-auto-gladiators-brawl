
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Gladiator } from "@/types/gladiator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface GladiatorDetailProps {
  gladiator: Gladiator;
  isActive: boolean;
  onSetActive: (id: string) => void;
}

const GladiatorDetail = ({ gladiator, isActive, onSetActive }: GladiatorDetailProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(part => part.charAt(0)).join('');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {gladiator.name}
            {isActive && (
              <Badge className="ml-2">Active</Badge>
            )}
          </CardTitle>
          {!isActive && (
            <Button 
              size="sm"
              onClick={() => onSetActive(gladiator.id)}
            >
              Set As Active
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-32 w-32 rounded-lg">
            <AvatarImage src="/lovable-uploads/8f18e069-f431-4d6b-8b8b-7ed3f153d601.png" alt={gladiator.name} />
            <AvatarFallback className="text-2xl">{getInitials(gladiator.name)}</AvatarFallback>
          </Avatar>
          
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-500">Level</p>
              <p className="text-lg font-medium">{gladiator.level}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Experience</p>
              <div className="flex items-center gap-2">
                <Progress value={(gladiator.experience! / gladiator.experienceToNextLevel!) * 100} className="w-32" />
                <span className="text-sm">{gladiator.experience}/{gladiator.experienceToNextLevel}</span>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Wins</p>
              <p className="text-lg font-medium">{gladiator.wins}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          <div>
            <p className="text-sm text-gray-500">Attack</p>
            <p className="text-lg font-medium">{gladiator.attack}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Defense</p>
            <p className="text-lg font-medium">{gladiator.defense}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Health</p>
            <p className="text-lg font-medium">{gladiator.health}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Strength</p>
            <p className="text-lg font-medium">{gladiator.strength}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Agility</p>
            <p className="text-lg font-medium">{gladiator.agility}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Endurance</p>
            <p className="text-lg font-medium">{gladiator.endurance}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Stamina</p>
            <p className="text-lg font-medium">{gladiator.stamina}/{gladiator.maxStamina}</p>
          </div>
        </div>
        
        {gladiator.traits && gladiator.traits.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Traits</h3>
            <div className="space-y-2">
              {gladiator.traits.map((trait, index) => (
                <div key={index} className="bg-gray-100 p-3 rounded-lg">
                  <p className="font-medium capitalize">{trait.name}</p>
                  <p className="text-sm text-gray-600">{trait.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GladiatorDetail;
